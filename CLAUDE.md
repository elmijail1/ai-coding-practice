# Project conventions

Practice project: Express + TypeScript (ESM, NodeNext) REST API in `backend/`.

## Architecture

- Handlers stay thin, logic goes in services. A route handler only parses input, calls a service function, and sends the response.
- Services (`src/services/`) take plain values, never `req`/`res`, so they are easy to test and swap to a DB later.
- Validate all external input (query, params, body) with Zod schemas in `src/schemas/`. Handlers call `schema.parse(...)`; a central error-handling middleware turns `ZodError` into a 400.

## Code style

- Relative imports need explicit `.js` extensions (NodeNext ESM).
- Use `import type` for type-only imports.
