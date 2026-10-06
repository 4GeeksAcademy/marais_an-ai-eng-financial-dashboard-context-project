# Verificación de integración frontend y API

## Cuándo aplica

Al cambiar la ruta de API, el proxy de Vite, la red de Docker Compose o al afirmar que la pantalla está integrada con el backend.

## Hechos del repositorio

- El recorrido actual es `frontend/src/App.tsx` → proxy `/api` en `frontend/vite.config.ts` → `backend/app/routes.py` ([llamada](../../frontend/src/App.tsx#L13-L17), [proxy](../../frontend/vite.config.ts#L11-L14), [ruta](../../backend/app/routes.py#L248-L260)).
- `VERIFICACION_FASE_1.md` registra un `502` y `ETIMEDOUT` al acceder desde el frontend. La causa raíz no quedó determinada ([fallo observado](../../VERIFICACION_FASE_1.md#L30-L38), [estado pendiente](../../VERIFICACION_FASE_1.md#L40-L51)).

## Reglas

- No consideres que la integración funciona solo porque los contenedores arrancan o porque la API responde desde el host.
- Comprueba que una petición real a través de Vite, como `GET /api/metrics`, devuelve datos que la pantalla puede consumir.
- Si falla, registra el resultado observado y deja la causa como pendiente hasta comprobarla; no presentes filtrado, enrutamiento u otra hipótesis como diagnóstico.
