# Social content (internal only)

Instagram carousels and the content pipeline for House of Navi.

This folder lives in GitHub for internal review only. It is listed in
`/.vercelignore`, so Vercel never deploys it to houseofnavi.com.

## What's here

| File | What it is |
|---|---|
| `index.html` | List of all carousels and the dashboard |
| `dashboard.html` | Content pipeline board: Ideas → Approved → Scheduled content |
| `pipeline.json` | The board's data: every card, its stage, and the copy and image per tile |
| `dashboard.css` / `dashboard.js` | Dashboard styles and behaviour |
| `carousel-01.html` | Campaign 01 · Introduction (5 tiles) |
| `carousel-02.html` | Campaign 02 · The Name (7 tiles) |
| `carousel-03.html` | Campaign 03 · Why are we here? (3 tiles) |
| `carousel-04.html` | Campaign 04 · Walk with us (5 tiles) |
| `parked.html` | Tiles taken out of a campaign, kept for a future one |
| `carousel.css` / `carousel.js` | Shared tile styles and swipe controls |

## Viewing locally

From the project root:

```bash
python3 -m http.server 8001
```

Then open `http://localhost:8001/social-content/`.

## Content pipeline dashboard

Open `http://localhost:8001/social-content/dashboard.html`.

- Cards move left to right through **1. Ideas**, **2. Approved** and **3. Scheduled content**, by dragging or with the move buttons.
- **Edit** on a card opens a panel to change the title, angle, posting date, board sign-off and feedback for Claude, and the image, kicker, headline and body of every tile.
- Edits are saved in your browser only. To keep them, click **Download pipeline.json** and give the file to Claude, who replaces `social-content/pipeline.json` in the repo and applies the changes to the carousel pages.
- **Reset to repo version** throws away your browser's changes.

## Rules

- New carousels go in this folder and use assets from `brand/assets/` and `MKASANGA PICS/` only.
- Nothing in this folder may be linked from the public site pages.
