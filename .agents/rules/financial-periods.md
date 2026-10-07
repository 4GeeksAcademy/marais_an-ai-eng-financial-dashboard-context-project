# Fechas de datos financieros

## Cuándo aplica

Al cambiar la generación de movimientos, sus fechas, filtros temporales o el período que se muestra en el dashboard.

## Hechos del repositorio

- `generate_mock_movements(seed=42)` fija el generador aleatorio, pero asigna los años según `date.today()` mediante `_year_for_month` ([generación](../../backend/app/routes.py#L64-L103)). La semilla no fija el calendario.
- `frontend/src/App.tsx` muestra el rótulo fijo `2024 - Full Year` y solicita `/api/metrics` sin parámetros de fecha ([rótulo y petición](../../frontend/src/App.tsx#L13-L17) y [renderizado](../../frontend/src/App.tsx#L45-L50)). La verificación de fase 1 observó datos de octubre de 2025 a fecha de octubre de 2026 ([verificación](../../docs/verification/revision-dashboard/fase-01-producto-arranque-integracion.md#L25-L26)).

## Reglas

- Si se modifica el período mostrado o la generación de fechas, comprobar que el rótulo corresponde a los datos.
- No describas `seed=42` como garantía de fechas fijas; considera que el año depende de la fecha actual.
- Si una prueba depende del calendario, controla la fecha en la prueba en lugar de asumir el año actual.
