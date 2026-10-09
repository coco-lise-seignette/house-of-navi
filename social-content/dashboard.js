/* House of Navi — content pipeline dashboard.
   Reads pipeline.json from the repo, keeps edits in this browser
   (localStorage), and exports an updated pipeline.json for the repo.
   Plain browser JS, no libraries. */
(function () {
  var STORE_KEY = 'navi-pipeline-v1';
  var board = document.getElementById('board');
  var saveState = document.getElementById('saveState');
  var edit = document.getElementById('edit');
  var editBody = document.getElementById('editBody');
  var editTitle = document.getElementById('editTitle');
  var editStage = document.getElementById('editStage');
  var backdrop = document.getElementById('editBackdrop');
  var toastEl = document.getElementById('toast');

  var data = null;      // working copy
  var repoJSON = '';    // pipeline.json as fetched, for reset
  var editingId = null;
  var renderTimer = null;

  /* ── Helpers ── */
  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }
  function assetUrl(src) {
    if (!src) return '';
    return '../' + src.split('/').map(encodeURIComponent).join('/');
  }
  function bg(node, src) {
    node.style.backgroundImage = src ? 'url("' + assetUrl(src) + '")' : 'none';
  }
  function stageIndex(id) {
    for (var i = 0; i < data.stages.length; i++) if (data.stages[i].id === id) return i;
    return 0;
  }
  function cardById(id) {
    for (var i = 0; i < data.cards.length; i++) if (data.cards[i].id === id) return data.cards[i];
    return null;
  }
  function toast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.add('is-on');
    clearTimeout(toast._t);
    toast._t = setTimeout(function () { toastEl.classList.remove('is-on'); }, 2200);
  }

  /* ── Storage (per browser; never required to work) ── */
  function readLocal() {
    try { var s = localStorage.getItem(STORE_KEY); return s ? JSON.parse(s) : null; }
    catch (e) { return null; }
  }
  function save() {
    var json = JSON.stringify(data);
    var local = json !== JSON.stringify(JSON.parse(repoJSON));
    try {
      if (local) localStorage.setItem(STORE_KEY, json);
      else localStorage.removeItem(STORE_KEY);
    } catch (e) { /* storage blocked: edits last until the tab closes */ }
    setSaveState(local);
  }
  function setSaveState(local) {
    saveState.textContent = local ? 'Changes saved in this browser · not in the repo yet' : 'Showing the repo version';
    saveState.classList.toggle('is-local', local);
  }

  /* ── Board ── */
  function render() {
    board.textContent = '';
    data.stages.forEach(function (stage, si) {
      var col = el('section', 'col');
      col.setAttribute('aria-label', stage.name);
      col.dataset.stage = stage.id;

      var head = el('div', 'col__head');
      var name = el('h2', 'col__name');
      name.appendChild(el('span', null, stage.no + '.'));
      name.appendChild(document.createTextNode(stage.name));
      head.appendChild(name);
      var cards = data.cards.filter(function (c) { return c.stage === stage.id; });
      head.appendChild(el('span', 'col__count', String(cards.length)));
      col.appendChild(head);

      var hints = {
        ideas: 'Work on these until you are 100% happy, then move them on.',
        approved: 'Finished carousels. The board checks and signs them off here.',
        scheduled: 'Signed off, with a posting date. Metricool posts them later.'
      };
      if (hints[stage.id]) col.appendChild(el('p', 'col__hint', hints[stage.id]));

      if (stage.id === 'ideas') {
        var add = el('button', 'btn btn--ghost btn--small', '+ New idea');
        add.type = 'button';
        add.style.marginBottom = '14px';
        add.addEventListener('click', newIdea);
        col.appendChild(add);
      }

      var list = el('div', 'cards');
      if (!cards.length) list.appendChild(el('p', 'col__empty', 'Nothing here yet. Drag a card in, or use the move buttons.'));
      cards.forEach(function (c) { list.appendChild(renderCard(c, si)); });
      col.appendChild(list);

      col.addEventListener('dragover', function (e) { e.preventDefault(); col.classList.add('is-drop'); });
      col.addEventListener('dragleave', function (e) { if (!col.contains(e.relatedTarget)) col.classList.remove('is-drop'); });
      col.addEventListener('drop', function (e) {
        e.preventDefault();
        col.classList.remove('is-drop');
        var id = e.dataTransfer.getData('text/plain');
        var c = cardById(id);
        if (c && c.stage !== stage.id) { c.stage = stage.id; changed(); toast('Moved to ' + stage.name); }
      });

      board.appendChild(col);
    });
  }

  function renderCard(c, si) {
    var card = el('article', 'card' + (c.id === editingId ? ' is-editing' : ''));
    card.draggable = true;
    card.dataset.id = c.id;
    card.addEventListener('dragstart', function (e) {
      e.dataTransfer.setData('text/plain', c.id);
      card.classList.add('is-dragging');
    });
    card.addEventListener('dragend', function () { card.classList.remove('is-dragging'); });

    var strip = el('div', 'card__strip');
    c.tiles.forEach(function (t) { var th = el('div', 'card__thumb'); bg(th, t.image); strip.appendChild(th); });
    card.appendChild(strip);

    var main = el('div', 'card__main');
    main.appendChild(el('h3', 'card__title', c.title || 'Untitled idea'));
    if (c.angle) main.appendChild(el('p', 'card__angle', c.angle));

    var meta = el('div', 'card__meta');
    meta.appendChild(el('span', null, c.tiles.length + (c.tiles.length === 1 ? ' tile' : ' tiles')));
    if (c.notes) meta.appendChild(el('span', 'is-flag', 'Feedback for Claude'));
    if (c.signedOff) meta.appendChild(el('span', 'is-flag', 'Board signed off'));
    if (c.date) meta.appendChild(el('span', null, 'Posts ' + c.date));
    main.appendChild(meta);

    var actions = el('div', 'card__actions');
    var editBtn = el('button', 'btn btn--pill btn--small', 'Edit');
    editBtn.type = 'button';
    editBtn.addEventListener('click', function () { openEdit(c.id); });
    actions.appendChild(editBtn);
    if (c.page) {
      var view = el('a', 'btn btn--ghost btn--small', 'View carousel');
      view.href = c.page;
      actions.appendChild(view);
    }
    if (si > 0) actions.appendChild(moveBtn(c, si - 1, '←'));
    if (si < data.stages.length - 1) actions.appendChild(moveBtn(c, si + 1, '→'));
    main.appendChild(actions);

    card.appendChild(main);
    return card;
  }

  function moveBtn(c, to, arrow) {
    var stage = data.stages[to];
    var b = el('button', 'btn btn--ghost btn--small', arrow === '←' ? '← ' + stage.name : stage.name + ' →');
    b.type = 'button';
    b.setAttribute('aria-label', 'Move to ' + stage.name);
    b.addEventListener('click', function () { c.stage = stage.id; changed(); toast('Moved to ' + stage.name); });
    return b;
  }

  function changed() {
    save();
    render();
    if (editingId) {
      var c = cardById(editingId);
      if (c) editStage.textContent = data.stages[stageIndex(c.stage)].no + ' · ' + data.stages[stageIndex(c.stage)].name;
    }
  }
  // Typing: save at once, redraw the board shortly after (keeps focus in the panel).
  function typed() {
    save();
    clearTimeout(renderTimer);
    renderTimer = setTimeout(render, 250);
  }

  /* ── Edit panel ── */
  function field(label, value, onInput, opts) {
    opts = opts || {};
    var wrap = el('label', 'field');
    wrap.appendChild(el('span', null, label));
    var input;
    if (opts.type === 'textarea') { input = el('textarea'); input.rows = opts.rows || 3; }
    else if (opts.type === 'select') {
      input = el('select');
      data.images.forEach(function (img) {
        var o = el('option', null, img.label);
        o.value = img.src;
        input.appendChild(o);
      });
      if (value && !data.images.some(function (i) { return i.src === value; })) {
        var extra = el('option', null, value); extra.value = value; input.appendChild(extra);
      }
    } else { input = el('input'); input.type = opts.type || 'text'; }
    input.value = value || '';
    if (opts.placeholder) input.placeholder = opts.placeholder;
    input.addEventListener(opts.type === 'select' ? 'change' : 'input', function () { onInput(input.value); });
    wrap.appendChild(input);
    return wrap;
  }

  function openEdit(id) {
    var c = cardById(id);
    if (!c) return;
    editingId = id;
    editTitle.textContent = c.title || 'Untitled idea';
    var st = data.stages[stageIndex(c.stage)];
    editStage.textContent = st.no + ' · ' + st.name;
    editBody.textContent = '';

    editBody.appendChild(field('Title', c.title, function (v) { c.title = v; editTitle.textContent = v || 'Untitled idea'; typed(); }));
    editBody.appendChild(field('Angle', c.angle, function (v) { c.angle = v; typed(); }, { type: 'textarea', rows: 2 }));

    var row = el('div', 'field-row');
    row.appendChild(field('Posting date', c.date, function (v) { c.date = v; typed(); }, { type: 'date' }));
    var so = el('label', 'field');
    so.appendChild(el('span', null, 'Board sign-off'));
    var sel = el('select');
    [['', 'Not yet'], ['yes', 'Signed off']].forEach(function (p) { var o = el('option', null, p[1]); o.value = p[0]; sel.appendChild(o); });
    sel.value = c.signedOff ? 'yes' : '';
    sel.addEventListener('change', function () { c.signedOff = sel.value === 'yes'; typed(); });
    so.appendChild(sel);
    row.appendChild(so);
    editBody.appendChild(row);

    editBody.appendChild(field('Feedback for Claude', c.notes, function (v) { c.notes = v; typed(); },
      { type: 'textarea', rows: 3, placeholder: 'What you like or don’t like. Claude reads this when you hand over pipeline.json.' }));

    editBody.appendChild(el('p', 'section-label', 'Tiles · imagery and copy'));
    c.tiles.forEach(function (t, i) { editBody.appendChild(tileEditor(c, t, i)); });

    var foot = el('div', 'edit__foot');
    var addTile = el('button', 'btn btn--ghost btn--small', '+ Add tile');
    addTile.type = 'button';
    addTile.addEventListener('click', function () {
      c.tiles.push({ image: '', kicker: '', headline: '', body: '' });
      changed(); openEdit(c.id);
    });
    foot.appendChild(addTile);
    if (c.page) {
      var view = el('a', 'btn btn--ghost btn--small', 'View full carousel');
      view.href = c.page; view.style.textDecoration = 'none';
      foot.appendChild(view);
    }
    var del = el('button', 'btn btn--ghost btn--small', 'Delete card');
    del.type = 'button';
    del.addEventListener('click', function () {
      if (!confirm('Delete “' + (c.title || 'Untitled idea') + '” from the board?')) return;
      data.cards = data.cards.filter(function (x) { return x.id !== c.id; });
      closeEdit(); changed(); toast('Card deleted');
    });
    foot.appendChild(del);
    editBody.appendChild(foot);

    edit.classList.add('is-open');
    edit.setAttribute('aria-hidden', 'false');
    backdrop.classList.add('is-open');
    render();
  }

  function tileEditor(c, t, i) {
    var wrap = el('div', 'tile-edit');
    var head = el('p', 'tile-edit__no', 'Tile ' + ('0' + (i + 1)).slice(-2));
    wrap.appendChild(head);

    var pv = el('div', 'preview');
    var txt = el('div', 'preview__text');
    var k = el('p', 'preview__kicker', t.kicker);
    var h = el('p', 'preview__headline', t.headline);
    txt.appendChild(k); txt.appendChild(h); pv.appendChild(txt);
    function paint() { bg(pv, t.image); pv.classList.toggle('is-light', !t.image); }
    paint();
    wrap.appendChild(pv);

    var f = el('div', 'tile-edit__fields');
    f.appendChild(field('Image', t.image, function (v) { t.image = v; paint(); typed(); }, { type: 'select' }));
    f.appendChild(field('Kicker', t.kicker, function (v) { t.kicker = v; k.textContent = v; typed(); }));
    f.appendChild(field('Headline', t.headline, function (v) { t.headline = v; h.textContent = v; typed(); }, { type: 'textarea', rows: 2 }));
    f.appendChild(field('Body', t.body, function (v) { t.body = v; typed(); }, { type: 'textarea', rows: 3 }));
    if (c.tiles.length > 1) {
      var rm = el('button', 'btn btn--ghost btn--small', 'Remove tile');
      rm.type = 'button'; rm.style.alignSelf = 'flex-start';
      rm.addEventListener('click', function () { c.tiles.splice(i, 1); changed(); openEdit(c.id); });
      f.appendChild(rm);
    }
    wrap.appendChild(f);
    return wrap;
  }

  function closeEdit() {
    editingId = null;
    edit.classList.remove('is-open');
    edit.setAttribute('aria-hidden', 'true');
    backdrop.classList.remove('is-open');
    render();
  }

  function newIdea() {
    var id = 'c' + Date.now().toString(36);
    data.cards.push({ id: id, stage: 'ideas', title: 'New idea', angle: '', page: '', date: '', notes: '',
      tiles: [{ image: '', kicker: '', headline: '', body: '' }] });
    changed();
    openEdit(id);
  }

  /* ── Toolbar ── */
  document.getElementById('exportBtn').addEventListener('click', function () {
    var blob = new Blob([JSON.stringify(data, null, 2) + '\n'], { type: 'application/json' });
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'pipeline.json';
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
    toast('pipeline.json downloaded');
  });
  document.getElementById('resetBtn').addEventListener('click', function () {
    if (!confirm('Throw away the changes saved in this browser and show the repo version?')) return;
    data = JSON.parse(repoJSON);
    closeEdit(); save(); render(); toast('Back to the repo version');
  });
  document.getElementById('editClose').addEventListener('click', closeEdit);
  backdrop.addEventListener('click', closeEdit);
  window.addEventListener('keydown', function (e) { if (e.key === 'Escape' && editingId) closeEdit(); });

  /* ── Load ── */
  fetch('pipeline.json', { cache: 'no-store' })
    .then(function (r) { if (!r.ok) throw new Error(r.status); return r.text(); })
    .then(function (text) {
      repoJSON = text;
      var repo = JSON.parse(text);
      var local = readLocal();
      data = local && local.version === repo.version ? local : repo;
      // the image list always comes from the repo, so new assets show up
      data.images = repo.images;
      setSaveState(JSON.stringify(data) !== JSON.stringify(repo));
      render();
    })
    .catch(function () {
      var box = el('div', 'load-error');
      box.appendChild(el('p', null, 'Could not load pipeline.json. Run the local server from the project root:'));
      var code = el('p'); code.appendChild(el('code', null, 'python3 -m http.server 8001'));
      box.appendChild(code);
      box.appendChild(el('p', null, 'then open http://localhost:8001/social-content/dashboard.html'));
      board.appendChild(box);
    });
})();
