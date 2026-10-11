---
name: formato-financiero
description: "Actívala al revisar o implementar el formato de importes, porcentajes, meses, años o período del dashboard financiero React + Vite."
---

# Formato financiero

## Objetivo

Aplicar de forma coherente las reglas aprobadas de presentación financiera del dashboard, distinguiendo la configuración del frontend del contrato de la API.

## Entradas

- Valores numéricos de importes y porcentajes mostrados en KPI, tooltips y ejes.
- Fechas o meses correspondientes a los datos visibles.
- El período real cubierto por los datos que se presenta en el encabezado.
- El código de frontend que calcula o renderiza esos valores y fechas.

## Instrucciones

1. Para importes de KPI y tooltips, usa USD, formato `en-US` y cero decimales.
2. En ejes de importes se permite abreviar en miles, por ejemplo `$12k`.
3. Para porcentajes de KPI y tooltips, muestra un decimal, por ejemplo `15.6%`.
4. En ejes de porcentajes se permiten valores enteros, por ejemplo `16%`.
5. Muestra los meses de los gráficos en inglés y conserva el formato actual `Sep 2026`. El encabezado debe mostrar las fechas mínima y máxima de los datos cargados, cada una con día, mes abreviado en inglés y año, por ejemplo `Sep 15, 2026 – Oct 15, 2026`; no uses un año fijo que contradiga esas fechas. Conserva el día calendario recibido de la API, sin desplazamientos por zona horaria.
6. Cuando una respuesta correcta no contenga movimientos, muestra `No data available`. Mientras la petición esté cargando o haya fallado, no muestres un rango inventado ni afirmes que la respuesta está vacía.
7. Describe USD como configuración del frontend. La API entrega importes numéricos y no declara una moneda; no presentes USD como parte del contrato de API.
8. Estas reglas de período solo definen el rótulo; no autorizan crear filtros de fechas.

## Salidas con ejemplos

- Importe de KPI o tooltip: `1234.56` → `$1,235`.
- Importe abreviado en eje: `12000` → `$12k`.
- Porcentaje de KPI o tooltip: `15.55` → `15.6%`.
- Porcentaje entero en eje: `15.55` → `16%`.
- Mes de gráfico: `September 2026` → `Sep 2026`.
- Encabezado de período: fechas mínima y máxima visibles `2026-09-15` y `2026-10-15` → `Sep 15, 2026 – Oct 15, 2026`.
- Fecha calendario de API: `2026-09-15` → `Sep 15, 2026`, también en zonas horarias al oeste de UTC.
- Respuesta correcta vacía: `[]` → `No data available`.
- Carga o error de petición: no mostrar un rango ni `No data available` como si la respuesta se hubiera recibido vacía.

## Criterios de aceptación

Responde Sí o No para cada criterio:

- ¿Los importes de KPI y tooltips usan USD, formato `en-US` y cero decimales?
- Si un importe de eje está abreviado, ¿la abreviatura representa miles, como `$12k`?
- ¿Los porcentajes de KPI y tooltips tienen un decimal?
- Si las etiquetas de porcentaje del eje se muestran como enteros, ¿usan `%` y cero decimales?
- ¿Los meses de los gráficos están en inglés y conservan el formato `Sep 2026`?
- ¿El encabezado muestra las fechas mínima y máxima de los datos visibles con día, mes abreviado en inglés y año?
- ¿El encabezado evita un año fijo que contradiga el período real?
- ¿Una respuesta correcta vacía muestra `No data available`?
- ¿Durante carga o error se omiten tanto el rango como el mensaje de respuesta vacía?
- ¿El día calendario del API se conserva sin desplazarse por la zona horaria del entorno?
- ¿Se aclara que USD es configuración del frontend y no una moneda declarada por la API?

## Cómo verificar

- Revisa los formateadores y los meses de gráfico en `frontend/src/lib/financial-utils.ts`; contrasta el encabezado con las fechas mínima y máxima de los datos cargados.
- Comprueba sus usos para KPI, tooltips, ejes y encabezado en `frontend/src/components/dashboard/` y `frontend/src/App.tsx`.
- Ejecuta pruebas Vitest para fechas desordenadas, respuesta vacía y conservación del día calendario con una zona horaria distinta de UTC. Comprueba también que carga/error no establecen un período.
- Contrasta aparte las etiquetas de eje y el encabezado renderizados con los valores de entrada. No añadas filtros de fechas como parte de esta verificación.
- Contesta cada criterio de aceptación con Sí o No y registra qué valor o vista observaste.
