/**
 * IPurchaseURLParams
 * @property {number?} limit - number of entities received inside API response per page, limit is 50 by default
 * @property {number?} page - numerotation of page, number is 1 by default
 * @property {string?} begin - begin date, accepted format YYYY-MM-DD, all entities received will be posterior to this date
 * @property {string?} end - end date, accepted format YYYY-MM-DD, all entities received will be anterior to this date
 * @property {"rolling" | "strict"?} type - string literal types are "strict" (default mode) or "rolling", if rolling, data will be requested for the last past month
 */
export interface IPurchaseURLParams {
    limit?: number | null;
    page?: number | null;
    begin?: string | null;
    end?: string | null;
    type?: 'rolling' | 'strict' | null;
}
