# Contrato financiero entre API y frontend

## Cuándo aplica

Al cambiar el modelo `FinancialMovement`, las rutas o respuestas de métricas del backend, los tipos financieros de TypeScript o el código que consume esas respuestas.

## Hechos del repositorio

- `backend/app/routes.py` define `FinancialMovement` con `create_date`, `amount`, `operation_type`, `category` y `business_type`, y restringe los valores con tipos `Literal` ([modelo y tipos](../../backend/app/routes.py#L11-L26)).
- `frontend/src/lib/financial-types.ts` declara esos mismos campos y valores. Los nombres del contrato, incluidos `operation_type` y `business_type`, conservan `snake_case`; `date` se entrega como texto ISO y `float` como número JSON ([tipos frontend](../../frontend/src/lib/financial-types.ts#L1-L10)).

## Reglas

- Si cambia un campo o valor permitido, actualiza el modelo del backend y el tipo del frontend en el mismo cambio.
- Conserva los nombres del contrato JSON aunque las variables y funciones TypeScript usen `camelCase`.
- Al cambiar la forma de la respuesta, agrega o actualiza una prueba de API que compruebe los nombres y valores serializados.
