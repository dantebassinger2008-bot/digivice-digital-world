DIGIVICE — ANDROID STARTER BUILD (v0.1)

WHAT THIS IS
A mobile-first progressive web app prototype. It gives you one randomly assigned partner, a scripted personality chat, bond/trust/energy stats, care actions, exploration events, a basic battle simulator, evolution-data progression, and local save data.

IMPORTANT LIMITATIONS
- This is a starter prototype, not the complete 3D Digimon anime experience yet.
- Partner chat is scripted locally. It is not a full language-model AI and does not understand every message.
- World exploration and battles are text-based prototypes.
- It uses original UI placeholders/emoji rather than official Digimon artwork or sounds.
- Save data is stored in the browser on your phone. Export a backup from Device > Export Save Data.

RUN ON ANDROID (RECOMMENDED: INSTALL AS AN APP)
1. Extract this ZIP on a computer or phone.
2. Upload the contents of this folder to a static HTTPS host, such as GitHub Pages or Netlify. Keep index.html, app.js, manifest.webmanifest, sw.js, and icon.svg together in the published root.
3. Open the published HTTPS address in Chrome on your Android phone.
4. Open Chrome's three-dot menu and choose "Install app" or "Add to Home screen".
5. Launch Digivice from the new home-screen icon. It opens full-screen like a standalone app and can cache its files for offline use after first load.

QUICK LOCAL TEST
Open index.html in a browser to test the interface. Some browser features, including installability and offline service-worker caching, require HTTPS (or localhost); opening the file directly will not install as a PWA.

GITHUB PAGES QUICK STEPS
1. Sign in to GitHub and create a new public repository named digivice.
2. Upload all files from this folder to the repository root.
3. In repository Settings > Pages, choose Deploy from a branch, select main and /(root), then Save.
4. Wait for the Pages URL, open it on Android Chrome, then install it.

NEXT DEVELOPMENT MILESTONES
1. Replace scripted chat with a real AI partner service (requires an API/backend; do not put secret API keys in browser code).
2. Add a real generated 2D/3D map and autonomous NPC simulation.
3. Add custom Digimon art, animations, sound, and evolution scenes.
4. Add proper battle mechanics and branching evolution trees.
