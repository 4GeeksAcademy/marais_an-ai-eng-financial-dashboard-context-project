import type { BusinessType, Category, OperationType } from "../src/lib/financial-types";

/** GET /api/metrics/facets: todos los campos son obligatorios y no admiten null. */
export interface FacetsResponse {
  /** Operaciones disponibles: "income" o "outcome"; array de strings. */ operation_types: OperationType[];
  /** Grupos disponibles: "B2B" o "B2C"; array de strings. */ business_types: BusinessType[];
  /** Categorias disponibles: "suppliers", "sales", "operational", "administrative", "others". */ categories: Category[];
  /** Fecha minima global del dataset; string de fecha YYYY-MM-DD, no nullable. */ min_date: string;
  /** Fecha maxima global del dataset; string de fecha YYYY-MM-DD, no nullable. */ max_date: string;
}
/** Elemento de GET /api/metrics/alerts; todos sus campos son obligatorios y no nullable. */
export interface AlertEntry {
  /** Periodo: string sin patron OpenAPI; formatos observados YYYY-MM-DD, YYYY-Www o YYYY-MM segun group_by. */ period: string;
  /** Outcome total registrado en el periodo; number sin limites documentados. */ outcome_total: number;
  /** Media de todos los periodos anteriores disponibles en el rango filtrado; number sin limites documentados. No cumple la media movil de tres periodos solicitada: documentar el conflicto pendiente en components.md y README.md. */ baseline_average: number;
  /** Incremento relativo (outcome_total - media) / media; number sin limites documentados, no porcentaje: multiplicar por 100 para mostrarlo. */ increase_ratio: number;
}
/** Respuesta real de /api/metrics/alerts: array, incluido [] cuando no hay alertas; no envoltorio ni null. */
export type AlertsResponse = AlertEntry[];
/** Elemento de GET /api/metrics/categories/top; campos obligatorios no nullable, sin porcentajes ni totales de grupo. */
export interface CategoryEntry {
  /** Categoria: "suppliers", "sales", "operational", "administrative" u "others". */ category: Category;
  /** Operacion agregada: "income" o "outcome". */ operation_type: OperationType;
  /** Importe total de la categoria para los filtros aplicados; number sin limites documentados. */ total_amount: number;
}
/** Respuesta real de /api/metrics/categories/top: array, incluido []; puede contener menos elementos que limit. */
export type TopCategoriesResponse = CategoryEntry[];