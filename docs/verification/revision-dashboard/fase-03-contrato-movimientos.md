# Verificación de fase 3

Fecha: 2026-10-06

## Prueba de contrato

- Prueba: `test_metrics_endpoint_returns_financial_movement_fields` en [backend/tests/test_routes.py](../../../backend/tests/test_routes.py).
- Comando: `docker compose run --rm backend pytest -q tests/test_routes.py::test_metrics_endpoint_returns_financial_movement_fields`.
- Resultado: `1 passed, 1 warning in 0.43s`.
- La prueba consulta `/api/metrics` mediante `TestClient` y comprueba que cada movimiento incluya exactamente los cinco campos `create_date`, `amount`, `operation_type`, `category` y `business_type`.
- La advertencia reportada es de deprecación: Starlette advierte que el uso de `httpx` con `starlette.testclient` está deprecado y recomienda `httpx2`. No hizo fallar la prueba.

## Reglas aplicadas

- [`.agents/rules/financial-api-contract.md`](../../../.agents/rules/financial-api-contract.md): comprobé los nombres de campos serializados que comparten backend y frontend.
- [`.agents/rules/tests-and-naming.md`](../../../.agents/rules/tests-and-naming.md): usé pytest, `TestClient` y el nombre `test_...` para comprobar el comportamiento de la ruta.
- [`.agents/rules/api-integration-verification.md`](../../../.agents/rules/api-integration-verification.md): limité la conclusión a la respuesta de la API probada en backend. Esta prueba no verifica la petición a través del proxy de Vite ni la conectividad frontend-backend entre contenedores.

## Alcance

La prueba verifica el conjunto exacto de claves de los movimientos devueltos; no comprueba los valores permitidos de cada campo ni la integración visual del dashboard.