(Project README)

Summary of recent changes
- Restored and exported default React components for `PostList.jsx` and `SinglePost.jsx` so the app imports work correctly.
- Added basic styling to `src/index.css` to ensure the navbar and pages are visible without relying on Tailwind during development.
- Verified a production build completes successfully with Vite.

How to run (PowerShell / Windows)
1. Install dependencies (run once):

```powershell
cd 'D:\Jenny\PROJECTS\plp\MERN\mern-stack-integration-J-Njoroge\client\blog'
npm install
```

2. Start the dev server (hot-reload):

```powershell
cd 'D:\Jenny\PROJECTS\plp\MERN\mern-stack-integration-J-Njoroge\client\blog'
npm run dev
```

Notes
- Vite may display a Node.js version warning if your Node is slightly older/newer than its recommended range. Recommended Node versions: >= 20.19 or >= 22.12. The app can still run, but please upgrade Node if you see runtime/tooling issues.
- Backend (server) must be running and the `VITE_API_URL` env var (or default http://localhost:5000/api) should point to the server. Start the server from the project root (if present) using the server's instructions (for example: `node server.js` or `npm run start` from the `server` folder).

If you want, I can also:
- Add a one-line dev server supervisor script (concurrently) to start both client and server.
- Create a minimal README at the repo root that links to this client README and documents the server run steps.

If you want this text adjusted (shorter/longer or different phrasing), tell me exactly how terse you want it and I'll update it.

