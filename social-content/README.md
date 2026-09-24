# Social content (internal only)

Instagram carousels and the content pipeline for House of Navi.

This folder lives in GitHub for internal review only. It is listed in
`/.vercelignore`, so Vercel never deploys it to houseofnavi.com.

## What's here

| File | What it is |
|---|---|
| `index.html` | List of all carousels |
| `carousel-01.html` | Campaign 01 · Introduction (5 tiles) |
| `carousel-02.html` | Campaign 02 · The Name (7 tiles) |
| `carousel.css` / `carousel.js` | Shared tile styles and swipe controls |

## Viewing locally

From the project root:

```bash
python3 -m http.server 8001
```

Then open `http://localhost:8001/social-content/`.

## Rules

- New carousels go in this folder and use assets from `brand/assets/` and `MKASANGA PICS/` only.
- Nothing in this folder may be linked from the public site pages.
