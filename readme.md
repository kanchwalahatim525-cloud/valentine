# Will You Be My Valentine? — Cute Romantic Proposal Webpage

A small, cute webpage that asks "Will you be my Valentine?" where the "No" button playfully dodges the user's attempts to click it — the only selectable response is "Yes". Built with simple HTML, CSS and JavaScript so you can run it locally or host it on GitHub Pages.

Demo
- Open `index.html` in your browser to try it.
- (Optional) Add your own music or confetti for extra romance.

Features
- Romantic, responsive layout using Google Fonts.
- "No" button dodges pointer, touch, and keyboard focus so only "Yes" can be clicked.
- Modal dialog appears after clicking "Yes".
- Simple, easy-to-edit code with comments for customization.

Files
- `index.html` — main HTML file
- `styles.css` — styling and visual layout
- `script.js` — logic for the dodging "No" button and modal behavior
- (optional) `assets/` — place for custom images, audio, or additional scripts

Requirements
- Any modern browser (Chrome, Edge, Firefox, Safari).
- No build steps required — pure static files.

Quick Start

1. Download or clone the project files into a folder:
   - `index.html`
   - `styles.css`
   - `script.js`

2. Open locally
   - Double-click `index.html` or open it in your browser: File → Open File → `index.html`

3. Serve with a simple HTTP server (recommended for some browsers):
   - Python 3:
     ```bash
     python3 -m http.server 8000
     # then open http://localhost:8000 in your browser
     ```
   - Or with `live-server` (Node):
     ```bash
     npm install -g live-server
     live-server
     ```

How it works (short)
- The "No" button is absolutely positioned within the button container.
- JavaScript listens for pointer, touch, and focus events on the "No" button and moves it to a new random position inside the container, avoiding overlap with the "Yes" button or the pointer.
- Clicking "Yes" opens a modal with a sweet message.

Customizations

1. Change text & styles
   - Edit `index.html` to change the question, messages, and button labels.
   - Edit `styles.css` to adjust colors, fonts, sizes, and layout. Font(s) are loaded from Google Fonts in `index.html`.

2. Add a romantic tune (play on "Yes")
   - Add an audio file to `assets/romance.mp3` and include this in `index.html`:
     ```html
     <audio id="romanceAudio" src="assets/romance.mp3" preload="auto"></audio>
     ```
   - Play it on Yes click in `script.js`:
     ```javascript
     document.getElementById('yesBtn').addEventListener('click', () => {
       const audio = document.getElementById('romanceAudio');
       audio.currentTime = 0;
       audio.play().catch(() => { /* autoplay or permission blocked; user-initiated click should allow play */ });
       showModal();
     });
     ```

3. Add confetti on acceptance
   - Use a lightweight library like [canvas-confetti](https://www.npmjs.com/package/canvas-confetti).
   - Or include this CDN in `index.html` and trigger on Yes:
     ```html
     <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.5.1/dist/confetti.browser.min.js"></script>
     ```
     ```javascript
     // inside the Yes click handler
     confetti({
       particleCount: 120,
       spread: 70,
       origin: { y: 0.6 }
     });
     ```

4. Swap positions instead of random moves
   - When the user hovers, swap `left/top` styles of Yes and No buttons so they switch places. Be mindful of layout and mobile.

Accessibility notes (please read)
- The playful dodging behavior can be frustrating for keyboard-only or assistive technology users.
- Current script:
  - Keeps the No button focusable but immediately moves it on focus. After repeated attempts it moves focus back to Yes.
- Recommendations:
  - Offer an accessible fallback (e.g., a link "Prefer keyboard access?" which reveals both choices without dodging).
  - Provide clear semantic HTML (buttons are proper `<button>` elements and the modal uses `role="dialog"` with `aria-hidden` toggling).
  - Ensure any added audio is user-initiated (play only after the user clicks Yes).
  - Test with a screen reader and keyboard navigation.

Deployment
- GitHub Pages (simple):
  1. Create a new repository and push your files:
     ```bash
     git init
     git add .
     git commit -m "Add Valentine proposal webpage"
     git remote add origin https://github.com/<your-username>/<repo>.git
     git push -u origin main
     ```
  2. In your repo settings, enable GitHub Pages from the main branch (or use `gh-pages` branch).
  3. Your site will be available at `https://<your-username>.github.io/<repo>/`.

- Other hosts: Netlify, Vercel, or any static-file host will work.

Troubleshooting
- No sound plays:
  - Modern browsers require user interaction for audio. Play the audio on the Yes button click.
- "No" button is partially off-screen on very small device widths:
  - Adjust the button-row height or in `script.js` reduce the maximum offset calculation to ensure the button remains visible.
- Modal not focus-trapped:
  - For stronger accessibility, add focus trapping inside the modal and return focus to the triggering element when closed.

License
- MIT License — feel free to reuse or modify for personal use.

Credits
- Built with ♥ using HTML, CSS and JavaScript.
- Google Fonts used: [Great Vibes](https://fonts.google.com/specimen/Great+Vibes), [Poppins](https://fonts.google.com/specimen/Poppins).

Want more?
- I can add:
  - Confetti + music built-in and wired to the Yes button.
  - A sharable link that pre-fills a message.
  - A downloadable single-file version (HTML with inline CSS/JS).
  - A print-friendly or mobile-first redesign.

If you'd like, tell me which extra(s) to add and I’ll update the project files.