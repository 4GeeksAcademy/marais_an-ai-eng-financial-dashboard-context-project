# Arquitectura

## Recorrido observado

1. `frontend/src/App.tsx` lee `VITE_API_BASE_URL` y solicita `/api/metrics` ([frontend/src/App.tsx](../frontend/src/App.tsx#L13-L18)).
2. En desarrollo, Vite reenvía `/api` a `http://backend:8000` ([frontend/vite.config.ts](../frontend/vite.config.ts#L8-L15)).
3. FastAPI incluye el router de `backend/app/routes.py` ([backend/app/main.py](../backend/app/main.py#L1-L14)); ese router define `/api/metrics` y el modelo Pydantic `FinancialMovement` ([backend/app/routes.py](../backend/app/routes.py#L11-L26), [ruta](../backend/app/routes.py#L248-L260)).
4. Docker Compose declara los servicios frontend y backend ([docker-compose.yml](../docker-compose.yml#L1-L20)).

## Estado de la integración

El recorrido está configurado, pero no debe darse por funcional por esa sola configuración: la verificación de fase 1 registró un `502` y `ETIMEDOUT` entre frontend y backend, con causa raíz pendiente ([fase-01-producto-arranque-integracion.md](../docs/verification/revision-dashboard/fase-01-producto-arranque-integracion.md#L30-L51)). La prueba de contrato de fase 3 usa `TestClient` y no verifica el proxy ni la red entre contenedores ([fase-03-contrato-movimientos.md](../docs/verification/revision-dashboard/fase-03-contrato-movimientos.md#L7-L18)).

Para criterios operativos, consultar [la regla de contrato API/frontend](../.agents/rules/financial-api-contract.md) y [la regla de verificación de integración](../.agents/rules/api-integration-verification.md).