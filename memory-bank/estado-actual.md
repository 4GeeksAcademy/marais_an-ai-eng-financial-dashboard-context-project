# Estado actual

Actualizado: 2026-10-07. Se separan los resultados históricos de integración de las verificaciones de la entrega de especificaciones; ninguna comprobación de tipos o del contrato OpenAPI demuestra que el recorrido frontend → Vite → backend esté resuelto.

## Evidencia histórica del dashboard

- En la verificación de fase 1, `GET /health` y `GET /api/metrics` desde el host respondieron HTTP 200; métricas devolvió 360 movimientos ([fase 1](../docs/verification/revision-dashboard/fase-01-producto-arranque-integracion.md#L20-L25)). Esto describe aquella ejecución, no el estado actual de contenedores.
- En esa misma verificación, `GET http://localhost:5173/api/metrics` devolvió `502` y Vite registró `ETIMEDOUT` hacia el backend; también hubo timeout desde el contenedor frontend. La causa raíz no quedó demostrada ([observación](../docs/verification/revision-dashboard/fase-01-producto-arranque-integracion.md#L30-L38), [pendiente](../docs/verification/revision-dashboard/fase-01-producto-arranque-integracion.md#L40-L51)).
- En la verificación de fase 3, `test_metrics_endpoint_returns_financial_movement_fields` pasó (`1 passed, 1 warning`). Comprueba los cinco nombres de campo mediante `TestClient`, no la integración de pantalla a través de Vite ([fase 3](../docs/verification/revision-dashboard/fase-03-contrato-movimientos.md#L5-L18), [prueba](../backend/tests/test_routes.py)).

## Entrega de especificaciones frontend

- La entrega quedó completada y fusionada en `main` mediante la PR #1. El historial registra el merge commit `24f4d08` (`Merge pull request #1 from 4GeeksAcademy/feature/frontend-specs`). La rama activa para el ejercicio siguiente es `feature/agent-skills`, creada desde ese `main` actualizado.
- Las funcionalidades de filtro temporal, tabla de anomalías y comparativa B2B/B2C están especificadas, no implementadas. La entrega contiene documentación y tipos; no añade componentes React, llamadas frontend ni cambios backend ([verificación de la entrega](../frontend/specs/verification.md), [especificación](../frontend/specs/README.md)).
- **Verificaciones nuevas documentadas, 2026-10-07:** Swagger `/docs` y OpenAPI `/openapi.json` respondieron HTTP 200; se contrastaron rutas, queries y esquemas de cinco endpoints. Dos comandos de TypeScript con 6.0.2 terminaron con código 0: `npx tsc --noEmit` y una comprobación explícita estricta de los tipos en `specs/api-types.ts`, `specs/param-types.ts` y `src/lib/financial-types.ts`. También se comprobó la existencia de 28 enlaces locales ([detalle y límites](../frontend/specs/verification.md)). Son resultados de la revisión de contrato y tipos, no pruebas de integración de la interfaz; no se reejecutaron al actualizar esta memoria.
- **AN-06 sigue bloqueado:** la API calcula la media de todos los períodos anteriores presentes en el resumen filtrado, no una media móvil de los tres períodos previos. Si se mantiene ese requisito, hace falta decisión del PM y cambio verificable del backend/contrato.
- **BC-08 sigue bloqueado:** `/api/metrics/facets` entrega categorías globales, no separadas por B2B/B2C; el endpoint de top categorías es limitado y no constituye un catálogo exhaustivo. Hace falta aclaración del PM o ampliar y verificar el contrato.

## Estado y pendientes

- El ejercicio de skills de agentes está iniciando en `feature/agent-skills`. No se ha instalado ni aplicado ninguna skill.
- La conectividad frontend → proxy de Vite → backend permanece pendiente de una nueva petición real a través de Vite. Los resultados históricos `502`/`ETIMEDOUT` siguen sin causa raíz demostrada; los HTTP 200 de Swagger/OpenAPI y los resultados de TypeScript no prueban que se haya resuelto ([regla de integración](../.agents/rules/api-integration-verification.md)).
- No presentar los criterios propuestos de las especificaciones como funcionalidades implementadas o aceptadas. Consultar [verification.md](../frontend/specs/verification.md) y [components.md](../frontend/specs/components.md) para límites y decisiones pendientes.