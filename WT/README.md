E-Learning Management Portal

This workspace contains a minimal full-stack e-learning portal example:

- backend: Node.js + Express + Mongoose (MongoDB)
- frontend: single-page HTML using React (via CDN) + CSS

Features implemented:
- Responsive HTML5 layout with CSS grid for categorized course content
- Hover transitions and animation effects
- JS-powered search, filtering and autosuggest (vanilla + React)
- React components: CourseCard, FilterPanel, Dashboard
- Backend APIs for users, courses, downloads, feedback (CRUD, validation)

See `backend/README.md` and `frontend/README.md` for how to run.

Quick start:

1. Start backend

	cd backend
	npm install
	copy .env.example .env  <-- on Windows, edit `.env` with your values
	npm start

2. (Optional) seed sample courses

	npm run seed

3. Serve frontend

	Open `frontend/index.html` in your browser or serve via a static server.
