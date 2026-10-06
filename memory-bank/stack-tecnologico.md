# Stack tecnológico

Las versiones de JavaScript indicadas aquí son las declaradas en `frontend/package.json`; no representan una comprobación de la versión instalada en ejecución.

## Frontend

- React y React DOM `^19.2.4`, TypeScript `~6.0.2`, Vite `^8.0.4`, Recharts `^3.8.1` y Vitest `^4.1.4` ([frontend/package.json](../frontend/package.json#L13-L45)).
- Scripts disponibles: `dev`, `build`, `lint` y `test` ([frontend/package.json](../frontend/package.json#L7-L12)).
- Contenedor declarado: `node:24-alpine` ([frontend/Dockerfile](../frontend/Dockerfile#L1-L12)).

## Backend

- FastAPI, `uvicorn[standard]`, debugpy, pytest, pytest-cov y httpx; `backend/requirements.txt` no fija versiones ([backend/requirements.txt](../backend/requirements.txt#L1-L6)).
- Contenedor declarado: `python:3.13-slim`; inicia Uvicorn con recarga y debugpy ([backend/Dockerfile](../backend/Dockerfile#L1-L12)).

## Ejecución local

Docker Compose publica frontend `5173`, backend `8000` y debugpy `5678` ([docker-compose.yml](../docker-compose.yml#L1-L20)). Estas son declaraciones de configuración, no una afirmación de que los servicios estén ejecutándose ahora.