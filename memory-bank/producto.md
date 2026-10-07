# Producto

## Comprobado

- El README describe el proyecto como un dashboard de métricas financieras con frontend React + TypeScript y backend FastAPI ([README.es.md](../README.es.md#L18)).
- La pantalla presenta cuatro KPI y gráficos mensuales de ingresos/egresos y margen ([verificación de fase 1](../docs/verification/revision-dashboard/fase-01-producto-arranque-integracion.md#L7), [montaje de la pantalla](../frontend/src/App.tsx#L45-L56)).
- La interfaz solicita `GET /api/metrics` y calcula KPI y series mensuales a partir de los movimientos ([frontend/src/App.tsx](../frontend/src/App.tsx#L13-L18)). La ruta actual genera movimientos sintéticos con semilla `42` ([backend/app/routes.py](../backend/app/routes.py#L94-L103)).

## No asumir

Estos archivos no establecen personas usuarias objetivo ni un flujo de negocio más amplio. La verificación identifica datos sintéticos en la ruta observada; no afirma que se haya auditado exhaustivamente todo el repositorio en busca de persistencia ([verificación de fase 1](../docs/verification/revision-dashboard/fase-01-producto-arranque-integracion.md#L18-L19)).