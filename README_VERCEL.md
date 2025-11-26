Preparing this monorepo for Vercel

Overview
- This repository contains a Vite React `Frontend/` and an Express `Backend/`.
- The provided `vercel.json` is configured to build the frontend as a static site and the backend as a serverless function.

What I changed
- `Backend/app.js` now exports the Express `app` (serverless handler) and only calls `app.listen` when running locally.
- Root `vercel.json` updated to build `Frontend` (static) and `Backend` (Node serverless). Routes map `/api/*` to the backend.
- Added `.vercelignore` to exclude node_modules, build outputs and secrets.

Environment variables (set these in Vercel dashboard or via `vercel env`):
- `MONGO_URI` - MongoDB connection string
- `CLOUDINARY_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` - Cloudinary creds
- `JWT_SECRET` - JWT secret
- `FRONTEND_URL` - URL of frontend (optional, used for CORS)

Deploy steps (recommended separate projects option)
- Option A (recommended): Create two Vercel projects:
  - Project 1: Frontend
    - Root directory: `Frontend`
    - Build command: `npm run build`
    - Output directory: `dist`
  - Project 2: Backend
    - Root directory: `Backend`
    - Framework: Node.js (Vercel will use `@vercel/node` automatically)
    - No special build command required

- Option B (single project - uses root `vercel.json`):
  - Deploy from repository root. Vercel will run the Frontend static build and make `/api/*` route to the backend serverless function.

Local test
- To run backend locally: `cd Backend` then `npm install` and `npm run dev` (requires `.env` with `MONGO_URI` etc.)
- To run frontend locally: `cd Frontend` then `npm install` and `npm run dev`

Notes
- Serverless functions have cold starts and limited execution time; consider using a managed server if you need persistent socket connections or long-running tasks.
- If you prefer using one Vercel project per service, choose Option A and set the project root accordingly in Vercel.
