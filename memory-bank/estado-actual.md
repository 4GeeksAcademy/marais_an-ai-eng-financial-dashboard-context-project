# Estado actual

Última evidencia registrada: 2026-10-06. Los resultados de fase 1 son observaciones de esa verificación, no una comprobación del estado presente de los contenedores.

## Comprobado

- En fase 1, `GET /health` y `GET /api/metrics` desde el host respondieron HTTP 200; la ruta de métricas devolvió 360 movimientos ([fase-01-producto-arranque-integracion.md](../docs/verification/revision-dashboard/fase-01-producto-arranque-integracion.md#L20-L25)).
- En esa misma verificación, `GET http://localhost:5173/api/metrics` devolvió `502` y Vite registró `ETIMEDOUT` hacia el backend. Hubo timeout desde el contenedor frontend; la causa raíz no quedó demostrada ([fase-01-producto-arranque-integracion.md](../docs/verification/revision-dashboard/fase-01-producto-arranque-integracion.md#L30-L38), [pendiente](../docs/verification/revision-dashboard/fase-01-producto-arranque-integracion.md#L40-L51)).
- En fase 3, la prueba `test_metrics_endpoint_returns_financial_movement_fields` pasó: `1 passed, 1 warning`. Comprueba los cinco nombres de campo mediante `TestClient`, no el recorrido desde la pantalla a través de Vite ([fase-03-contrato-movimientos.md](../docs/verification/revision-dashboard/fase-03-contrato-movimientos.md#L5-L18), [prueba](../backend/tests/test_routes.py)).

## Pendiente

- Resolver y volver a verificar la conectividad frontend → proxy de Vite → backend. No atribuir el timeout a filtrado, enrutamiento u otra causa hasta demostrarla.
- La prueba de contrato confirma claves de respuesta; no confirma valores de todos los campos ni integración visual. Para pautas de verificación, consultar [api-integration-verification.md](../.agents/rules/api-integration-verification.md).