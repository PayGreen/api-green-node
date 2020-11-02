import { Status } from '../enums';

/**
 * IFootprintURLParams
 * @property {Status} status - based on enum, choose between 'PURCHASED', 'CLOSED', 'ONGOING' footprints
 * @property {number} limit - number of entities received inside API response per page, limit is 50 by default
 * @property {number} page - numerotation of page, number is 1 by default
 * @property {string} begin - begin date, accepted format YYYY-MM-DD, all entities received will be posterior to this date
 * @property {string} end - end date, accepted format YYYY-MM-DD, all entities received will be anterior to this date
 */
export interface IFootprintURLParams {
    status?: Status | null;
    limit?: number | null;
    page?: number | null;
    begin?: string | null;
    end?: string | null;
}
