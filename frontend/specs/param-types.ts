import type { BusinessType, OperationType } from "../src/lib/financial-types";

/** Queries opcionales: omitir propiedades sin valor. OpenAPI admite null en fechas y business_type, pero estos tipos usan omision, nunca el texto "null". Formatos y limites numericos requieren validacion en ejecucion. */
export interface DateRangeFilter {
  /** Inicio inclusivo: fecha valida YYYY-MM-DD. Opcional; sin default explicito ni limites de rango documentados; omitir para no limitar el inicio. */ start_date?: string;
  /** Fin inclusivo: fecha valida YYYY-MM-DD. Opcional; sin default explicito ni limites de rango documentados; omitir para no limitar el fin. */ end_date?: string;
}
/** Query de GET /api/metrics/alerts; hereda las fechas opcionales. */
export interface AlertsParams extends DateRangeFilter {
  /** Umbral relativo: API number >= 0, sin maximo documentado, default 0.3; interfaz solicitada 0.01-1.0. Restriccion de interfaz, no de API. */ threshold?: number;
  /** Agrupacion: "day", "week" o "month"; default API "month". */ group_by?: "day" | "week" | "month";
  /** Grupo: "B2B" o "B2C". API nullable, sin default explicito; omitir para incluir ambos, no enviar "null". */ business_type?: BusinessType;
}
/** Query de GET /api/metrics/categories/top; hereda las fechas opcionales. */
export interface TopCategoriesParams extends DateRangeFilter {
  /** Operacion: "income" o "outcome"; default API "outcome". La comparativa de ingresos necesita "income" explicitamente. */ operation_type?: OperationType;
  /** Maximo de categorias: entero entre 1 y 20 inclusive; default API 5. No garantiza cinco resultados. */ limit?: number;
  /** Grupo: "B2B" o "B2C". API nullable, sin default explicito; omitir para incluir ambos, no enviar "null". */ business_type?: BusinessType;
}