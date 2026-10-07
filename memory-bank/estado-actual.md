# Estado actual

Actualizado: 2026-10-07. Se separan los resultados históricos de integración de las verificaciones de la entrega de especificaciones; ninguna comprobación de tipos o del contrato OpenAPI demuestra que el recorrido frontend → Vite → backend esté resuelto.

## Evidencia histórica del dashboard

- En la verificación de fase 1, `GET /health` y `GET /api/metrics` desde el host respondieron HTTP 200; métricas devolvió 360 movimientos ([fase 1](../docs/verification/revision-dashboard/fase-01-producto-arranque-integracion.md#L20-L25)). Esto describe aquella ejecución, no el estado actual de contenedores.
- En esa misma verificación, `GET http://localhost:5173/api/metrics` devolvió `502` y Vite registró `ETIMEDOUT` hacia el backend; también hubo timeout desde el contenedor frontend. La causa raíz no quedó demostrada ([observación](../docs/verification/revision-dashboard/fase-01-producto-arranque-integracion.md#L30-L38), [pendiente](../docs/verification/revision-dashboard/fase-01-producto-arranque-integracion.md#L40-L51)).
- En la verificación de fase 3, `test_metrics_endpoint_returns_financial_movement_fields` pasó (`1 passed, 1 warning`). Comprueba los cinco nombres de campo mediante `TestClient`, no la integración de pantalla a través de Vite ([fase 3](../docs/verification/revision-dashboard/fase-03-contrato-movimientos.md#L5-L18), [prueba](../backend/tests/test_routes.py)).

## Prueba temporal y restauración, 2026-10-07

- **Comprobación del agente:** el gateway Compose era `172.18.0.1`. Una instancia temporal de Vite, sin editar archivos y con `/api` dirigido al gateway, sirvió la página con HTTP 200 y `GET /api/metrics` con HTTP 200, un array JSON de 360 movimientos y los cinco campos esperados. Esto valida solo la ruta temporal, no la configuración original.
- **Comprobación manual del usuario:** ambos gráficos admiten navegación con Tab, muestran el foco y permiten recorrer valores con las flechas.
- **Restauración comprobada:** la instancia temporal terminó con código 143 y se retiró. Se recreó únicamente `frontend` con `docker compose up -d --no-deps --no-build`, sin reconstruir imágenes ni eliminar volúmenes. La página original respondió HTTP 200, pero `GET http://localhost:5173/api/metrics` agotó el timeout de 25 segundos (`curl` HTTP 000). El proxy original sigue fallando; no se demostró la causa raíz.

## Skills de agentes, 2026-10-07

- Instaladas para GitHub Copilot en este repositorio: `accessibility`, fuente `addyosmani/web-quality-skills`, en [`../.agents/skills/accessibility/`](../.agents/skills/accessibility/SKILL.md); y `vercel-react-best-practices`, fuente `vercel-labs/agent-skills`, en [`../.agents/skills/vercel-react-best-practices/`](../.agents/skills/vercel-react-best-practices/SKILL.md). El manifiesto es [`../skills-lock.json`](../skills-lock.json).
- **Incidencia de instalación:** los comandos originales usaron `--yes`, contra la instrucción de la profesora. En adelante no usar `-y`, `--yes`, `-g` ni `--global`.
- Se detectaron cuatro enlaces locales rotos, todos complementarios: [`accessibility/SKILL.md`](../.agents/skills/accessibility/SKILL.md#L462) enlaza a la skill opcional ausente `../web-quality-audit/SKILL.md`; [`vercel-react-best-practices/AGENTS.md`](../.agents/skills/vercel-react-best-practices/AGENTS.md#L116), [línea 219](../.agents/skills/vercel-react-best-practices/AGENTS.md#L219) y [línea 892](../.agents/skills/vercel-react-best-practices/AGENTS.md#L892) enlazan reglas como si estuvieran junto a `AGENTS.md`, aunque están bajo [`rules/`](../.agents/skills/vercel-react-best-practices/rules/async-defer-await.md). No impiden seguir el contenido principal; el enlace a `web-quality-audit` no está disponible y los tres de Vercel no resuelven desde `AGENTS.md`. No se instaló otra skill ni se editaron las descargadas.
- **Hallazgos de accesibilidad aún sin corregir:** el error de carga en [`App.tsx`](../frontend/src/App.tsx#L51) no se anuncia con `role="alert"` o región viva; el título de página en [`index.html`](../frontend/index.html#L7) es genérico; [`CardTitle`](../frontend/src/components/ui/card.tsx#L31) renderiza un `div`, no un encabezado semántico. La revisión de todos los usos y del nivel apropiado de `CardTitle` sigue pendiente.

## Entrega de especificaciones frontend

- La entrega quedó completada y fusionada en `main` mediante la PR #1. El historial registra el merge commit `24f4d08` (`Merge pull request #1 from 4GeeksAcademy/feature/frontend-specs`). La rama activa para el ejercicio siguiente es `feature/agent-skills`, creada desde ese `main` actualizado.
- Las funcionalidades de filtro temporal, tabla de anomalías y comparativa B2B/B2C están especificadas, no implementadas. La entrega contiene documentación y tipos; no añade componentes React, llamadas frontend ni cambios backend ([verificación de la entrega](../frontend/specs/verification.md), [especificación](../frontend/specs/README.md)).
- **Verificaciones nuevas documentadas, 2026-10-07:** Swagger `/docs` y OpenAPI `/openapi.json` respondieron HTTP 200; se contrastaron rutas, queries y esquemas de cinco endpoints. Dos comandos de TypeScript con 6.0.2 terminaron con código 0: `npx tsc --noEmit` y una comprobación explícita estricta de los tipos en `specs/api-types.ts`, `specs/param-types.ts` y `src/lib/financial-types.ts`. También se comprobó la existencia de 28 enlaces locales ([detalle y límites](../frontend/specs/verification.md)). Son resultados de la revisión de contrato y tipos, no pruebas de integración de la interfaz; no se reejecutaron al actualizar esta memoria.
- **AN-06 sigue bloqueado:** la API calcula la media de todos los períodos anteriores presentes en el resumen filtrado, no una media móvil de los tres períodos previos. Si se mantiene ese requisito, hace falta decisión del PM y cambio verificable del backend/contrato.
- **BC-08 sigue bloqueado:** `/api/metrics/facets` entrega categorías globales, no separadas por B2B/B2C; el endpoint de top categorías es limitado y no constituye un catálogo exhaustivo. Hace falta aclaración del PM o ampliar y verificar el contrato.

## Estado y pendientes

- Las skills están instaladas, pero no se aplicaron correcciones de accesibilidad ni cambios a la aplicación.
- La conectividad frontend → proxy de Vite → backend sigue pendiente: el proxy temporal vía gateway funcionó, pero el proxy original agotó el timeout. No se ha demostrado la causa raíz ([regla de integración](../.agents/rules/api-integration-verification.md)).
- No presentar los criterios propuestos de las especificaciones como funcionalidades implementadas o aceptadas. Consultar [verification.md](../frontend/specs/verification.md) y [components.md](../frontend/specs/components.md) para límites y decisiones pendientes.