# Multimodal Code Debug Assistant — Full scaffold

This archive contains a runnable scaffold for a full-stack app:
- React frontend (Vite)
- Express backend (Node.js)
- PostgreSQL (Docker)

## Quick start
1. Install Node.js (>=18), pnpm (optional), Docker & Docker Compose.
2. From the project root run:
   - `docker compose up --build` to build and run services OR
   - run backend and frontend locally (see backend/ and frontend/ README snippets).

## Notes
- This scaffold includes example code for collaboration, file uploads, and an `agent` endpoint stub.
- Add your LLM API keys to `backend/.env` before using agent routes.
