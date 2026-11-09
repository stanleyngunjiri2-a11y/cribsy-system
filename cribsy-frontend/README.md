# RentConnect frontend

Week 1 frontend scaffold for the RentConnect rental property and tenant management project.

## Requirements
- Node.js 20.19+ or 22.12+
- npm

## Run locally
```bash
npm install
npm run dev
```

## Quality checks
```bash
npm run typecheck
npm run lint
npm run build
```

## Important project boundary
This repository currently contains frontend UI and clearly labelled demonstration data. Authentication, role authorization, database persistence, property image storage, enquiries, payments, maintenance workflows and admin actions are **not connected**. The frontend `ProtectedRoute` is a placeholder and is not a security boundary. Week 2 backend work must enforce authorization on the server for every protected action.

## Team ownership
See [TEAM_RESPONSIBILITIES.md](TEAM_RESPONSIBILITIES.md) and the OWNER comments at the top of source files.
