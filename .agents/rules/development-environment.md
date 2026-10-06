# Límites del entorno de desarrollo

## Cuándo aplica

Al cambiar `docker-compose.yml`, los Dockerfiles, la configuración CORS o al preparar una configuración para producción.

## Hechos del repositorio

- Compose publica los puertos `5173`, `8000` y `5678`; el Dockerfile del backend inicia debugpy en `0.0.0.0:5678` y Uvicorn con `--reload` ([Compose](../../docker-compose.yml#L1-L20), [backend Dockerfile](../../backend/Dockerfile#L10-L12)).
- FastAPI permite cualquier origen y credenciales en `backend/app/main.py`; esto describe la configuración actual, no un fallo CORS verificado ([CORS](../../backend/app/main.py#L7-L13)).

## Reglas

- Trata debugpy, sus puertos publicados y `--reload` como configuración de desarrollo; no los traslades a producción sin revisión explícita.
- Antes de desplegar o cambiar CORS, define los orígenes y el uso de credenciales que realmente necesita la aplicación; no asumas que la configuración amplia actual es un requisito.
