# Hallazgos de fase 2

Alcance: revision de convenciones, pruebas, documentacion y entorno. Los hechos describen lo observado en los archivos o en la verificacion ya registrada. Las reglas son propuestas para futuras ediciones; no son convenciones ya adoptadas.

## Arquitectura

### Hechos observados

- El frontend solicita `GET /api/metrics` en [frontend/src/App.tsx](../../../frontend/src/App.tsx#L13-L17). Vite reenvia `/api` a `http://backend:8000` en [frontend/vite.config.ts](../../../frontend/vite.config.ts#L11-L14), y FastAPI implementa esa ruta en [backend/app/routes.py](../../../backend/app/routes.py#L248-L260).
- El backend tipa movimientos con Pydantic y valores `Literal` en [backend/app/routes.py](../../../backend/app/routes.py#L11-L26). El frontend define el tipo correspondiente en [frontend/src/lib/financial-types.ts](../../../frontend/src/lib/financial-types.ts#L1-L10): `create_date`, `amount`, `operation_type`, `category` y `business_type` coinciden. Los nombres de campos compartidos con la API, como `operation_type` y `business_type`, conservan `snake_case` aunque TypeScript use `camelCase` para sus variables y funciones. `date`/`float` del backend corresponden al texto ISO/`number` de JSON y TypeScript.
- La API genera datos sinteticos mediante `generate_mock_movements(seed=42)` en [backend/app/routes.py](../../../backend/app/routes.py#L94-L103). El generador fija la semilla del modulo `random`, pero asigna los anos con `date.today()` y `_year_for_month`.
- La interfaz muestra el periodo fijo `2024 - Full Year` y solicita `/api/metrics` sin parametros de fecha en [frontend/src/App.tsx](../../../frontend/src/App.tsx#L13-L17) y [frontend/src/App.tsx](../../../frontend/src/App.tsx#L45-L50). La verificacion de fase 1 registro datos de octubre de 2025 a fecha de octubre de 2026, por lo que el rotulo no describe el periodo devuelto: [fase-01-producto-arranque-integracion.md](fase-01-producto-arranque-integracion.md#L16) y [fase-01-producto-arranque-integracion.md](fase-01-producto-arranque-integracion.md#L25-L26).
- La verificacion registro `502` y `ETIMEDOUT` al acceder al backend desde el contenedor frontend; la causa raiz quedo sin determinar: [fase-01-producto-arranque-integracion.md](fase-01-producto-arranque-integracion.md#L30-L38) y [fase-01-producto-arranque-integracion.md](fase-01-producto-arranque-integracion.md#L48-L51).

### Regla propuesta

- Al cambiar el contrato, actualizar backend y frontend y probar que coincidan los cinco campos y sus valores permitidos.
- Antes de afirmar que la integracion funciona, comprobar que la pantalla recibe datos reales de la API a traves del proxy. Que ambos servicios arranquen no alcanza.
- Al cambiar fechas o generacion aleatoria, considerar que `seed=42` hace repetibles los sorteos en ejecuciones secuenciales con el mismo entorno, pero no fija el calendario: las fechas dependen de `date.today()`. Evitar depender de la semilla global si otros consumidores de `random` pueden interferir.
- Si se modifica el período mostrado o la generación de fechas, comprobar que el rótulo corresponde a los datos.

## Nombres

### Hechos observados

- Python usa `snake_case` en funciones y variables, por ejemplo `generate_mock_movements` e `income_probability`, en [backend/app/routes.py](../../../backend/app/routes.py#L94-L103). Las pruebas usan el prefijo `test_`, por ejemplo `test_metrics_endpoint_filters_by_category`, en [backend/tests/test_routes.py](../../../backend/tests/test_routes.py#L72-L79).
- TypeScript usa `camelCase` para funciones, por ejemplo `computeKPIs`, en [frontend/src/lib/financial-utils.ts](../../../frontend/src/lib/financial-utils.ts#L21-L21), y `PascalCase` para tipos, por ejemplo `FinancialMovement`, en [frontend/src/lib/financial-types.ts](../../../frontend/src/lib/financial-types.ts#L5-L10).

### Regla propuesta

- Mantener `snake_case` para funciones y variables Python y `test_<comportamiento>` para pruebas pytest.
- Mantener `camelCase` para funciones y variables TypeScript y `PascalCase` para tipos, interfaces y componentes.

## Pruebas

### Hechos observados

- Backend: [backend/tests/test_routes.py](../../../backend/tests/test_routes.py#L72-L79) consulta `/api/metrics?category=sales` y comprueba HTTP 200, que el resultado no este vacio y que todos los movimientos tengan categoria `sales`. Usa `TestClient`; no pasa por Vite, Docker ni la red entre contenedores.
- Frontend: [frontend/src/lib/financial-utils.test.ts](../../../frontend/src/lib/financial-utils.test.ts#L35-L45) entrega movimientos de muestra a `computeKPIs` y comprueba ingresos, egresos, beneficio y porcentaje. Es una prueba unitaria: no llama a la API ni verifica el renderizado o los graficos. Otra prueba comprueba porcentaje cero cuando no hay ingresos en [frontend/src/lib/financial-utils.test.ts](../../../frontend/src/lib/financial-utils.test.ts#L47-L59).
- Hay scripts `test`, `lint` y `build` para el frontend en [frontend/package.json](../../../frontend/package.json#L7-L12). Esta recopilacion no volvio a ejecutar las suites.

### Regla propuesta

- Para cambios en rutas, probar respuestas y filtros con pytest; para calculos puros, cubrir resultados y casos limite con Vitest.
- Para cambios de integracion, agregar o ejecutar una comprobacion que atraviese frontend, proxy y API; una prueba unitaria o el estado `Up` de los contenedores no la sustituye.
- Informar que pruebas se ejecutaron y no presentar como verificado lo que solo se inspecciono.

## Documentacion

### Hechos observados

- Existen instrucciones en ingles y espanol en [README.md](../../../README.md#L20-L46) y [README.es.md](../../../README.es.md#L20-L46); ambos describen como iniciar el proyecto y la estructura esperada para agentes.
- [AGENTS.md](../../../AGENTS.md#L3-L14) pide revisar `.agents/rules`, `.agents/skills` y `memory-bank`. Esas ubicaciones no estaban presentes al inspeccionar el workspace. El README documenta la estructura esperada de `.agents` en [README.es.md](../../../README.es.md#L28-L38). No se crearon esas carpetas en esta tarea.
- Correccion de ubicacion sobre `.env.example`: se habia indicado la raiz del repositorio, pero la comprobacion confirma que el unico archivo esta en [frontend/.env.example](../../../frontend/.env.example), no en la raiz. La busqueda inicial no encontro archivos ocultos. `read_file` lo marco como ignorado; la presencia se confirmo con `find`, y su contenido se leyo con `sed`: `VITE_API_BASE_URL=`. La instruccion relacionada esta en [README.es.md](../../../README.es.md#L44-L46), y el frontend lee esa variable en [frontend/src/App.tsx](../../../frontend/src/App.tsx#L13-L17).
- La instruccion global de usuario indicada por el entorno no se pudo leer porque Copilot la marco como ignorada, segun [fase-01-producto-arranque-integracion.md](fase-01-producto-arranque-integracion.md#L52).

### Regla propuesta

- Mantener sincronizadas las instrucciones inglesa y espanola cuando se cambien los pasos de ejecucion o configuracion.
- Al buscar archivos ocultos, usar una comprobacion que los incluya antes de afirmar que no existen; distinguir ausencia de imposibilidad de lectura.
- Revisar las reglas locales cuando esten disponibles y documentar claramente si no existen o no se pueden leer.

## Entorno de desarrollo

### Hechos observados

- [docker-compose.yml](../../../docker-compose.yml#L1-L20) publica frontend en `5173`, backend en `8000` y debugpy en `5678`. [backend/Dockerfile](../../../backend/Dockerfile#L10-L12) inicia debugpy escuchando en `0.0.0.0:5678` y Uvicorn con `--reload`.
- [backend/app/main.py](../../../backend/app/main.py#L7-L13) configura CORS con `allow_origins=["*"]` y `allow_credentials=True`. Esto se observa en la configuracion; no se verifico aqui un fallo de CORS en el flujo actual.
- [frontend/.env.example](../../../frontend/.env.example) deja `VITE_API_BASE_URL` vacia; la aplicacion usa cadena vacia por defecto y Vite configura el proxy local.

### Regla propuesta

- Tratar recarga, debugpy y sus puertos publicados como configuracion de desarrollo; revisar y restringirlos antes de usar una configuracion equivalente en produccion.
- Revisar y limitar los origenes CORS segun los clientes previstos, especialmente antes de habilitar solicitudes con credenciales.
- Mantener el proxy local como valor por defecto documentado y comprobar cualquier cambio de destino con una peticion de extremo a extremo.

## Pendiente de verificar

- La causa del timeout entre frontend y backend no esta establecida. La evidencia acota el problema a la conectividad entre contenedores, pero filtrado, enrutamiento u otra causa siguen siendo hipotesis: [fase-01-producto-arranque-integracion.md](fase-01-producto-arranque-integracion.md#L40-L51).
- No se volvio a ejecutar pytest, Vitest, lint ni build al preparar este documento.
- La inspeccion de rutas confirma el uso de datos sinteticos en esos endpoints; no se hizo una auditoria exhaustiva para afirmar que no exista persistencia en otras partes del repositorio.