# Valentine Trick 💌

A cute, interactive Valentine’s Day web page that asks “Will you be my Valentine?” with a kawaii-style card, optional background music, and surprise options after saying yes.

## Overview

**Valentine Trick** is a single-page, static site built with HTML, CSS, and JavaScript. Visitors enter their name, see a playful “Yes” / “No” choice, and after choosing “Yes” they can open a love letter or view an animated rose. The design is soft and playful, with floating hearts, sparkles, and optional background music.

## Features

- **Valentine card** — Main “Will you be my Valentine?” card with a blushing character GIF
- **Name input** — Optional field so the experience can be personalized
- **Yes / No buttons** — “No” moves around and shows funny phrases; “Yes” grows and leads to surprises
- **Mood themes** — Switch between **Soft 💗**, **Extra Sparkly ✨**, and **Strawberry 🍓** to change the vibe
- **Background music** — Optional kawaii BGM (play/pause control)
- **Surprise options (after Yes)**  
  - **Option 1: Letter** — Opens a sweet love letter popup (personalized with the name)  
  - **Option 2: Flowers** — Shows an animated CSS rose with a “Back” button
- **Confetti** — Celebration effect when the user says yes
- **Floating particles** — Hearts and sparkles in the background
- **Decorative stickers** — Small emoji accents on the card

## Tech Stack

- **HTML5** — Structure and semantic markup
- **CSS3** — Styling, animations, and the rose (no images)
- **Vanilla JavaScript** — Interactivity, button logic, letter/flowers views
- **Google Fonts** — Nunito & Quicksand
- **Canvas Confetti** — [canvas-confetti](https://www.npmjs.com/package/canvas-confetti) (CDN)
- **External assets** — Pixabay BGM, Giphy GIFs (loaded via URLs)

## Project Structure

```
Valentine Trick/
├── index.html    # Main page and structure
├── style.css     # Styles and animations
├── script.js     # Card logic, music, letter, flowers
├── vercel.json   # Vercel deployment config
└── README.md     # This file
```

## Run Locally

1. Clone the repo (or download the folder).
2. Open `index.html` in a browser, or serve the folder with any static server, for example:
   - **VS Code:** Use the “Live Server” extension and open `index.html`.
   - **Node:** `npx serve .` in the project folder, then open the URL shown.

No build step or dependencies are required.

## Deploy

- The project is set up for **Vercel**: connect the GitHub repo in the [Vercel dashboard](https://vercel.com) and deploy. Each push to the linked branch will trigger a new deployment.
- It can also be hosted on any static hosting (GitHub Pages, Netlify, etc.) by serving the repo root.

## License

Use and modify as you like. External assets (music, GIFs) follow their respective licenses (Pixabay, Giphy).

---

Made with 💖 for Valentine’s Day.
