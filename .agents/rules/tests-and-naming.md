# Pruebas y nombres del proyecto

## Cuándo aplica

Al añadir o modificar pruebas, funciones, variables, tipos o interfaces en `backend/` o `frontend/`.

## Hechos del repositorio

- Python usa `snake_case` y pytest usa funciones `test_...` ([ejemplos](../../backend/app/routes.py#L94-L103) y [pruebas](../../backend/tests/test_routes.py#L72-L79)).
- TypeScript usa `camelCase` para funciones y `PascalCase` para tipos ([función](../../frontend/src/lib/financial-utils.ts#L21-L21), [tipo](../../frontend/src/lib/financial-types.ts#L5-L10)).
- Backend prueba rutas con `TestClient`; frontend usa Vitest para cálculos puros. La prueba de `computeKPIs` no cubre llamadas HTTP ni renderizado ([backend](../../backend/tests/test_routes.py#L3-L9), [frontend](../../frontend/src/lib/financial-utils.test.ts#L35-L45)).

## Reglas

- Mantén `snake_case` en funciones y variables Python; nombra las pruebas pytest `test_<comportamiento>`.
- Mantén `camelCase` en funciones y variables TypeScript y `PascalCase` en tipos, interfaces y componentes.
- Usa pytest para el comportamiento de rutas y Vitest para cálculos frontend. Una prueba unitaria no sustituye la verificación de integración indicada en `api-integration-verification.md`.
