/**
 * IReportURLParams
 * @property {string?} begin - begin date, accepted format YYYY-MM-DD, all entities received will be posterior to this date
 * @property {string?} end - end date, accepted format YYYY-MM-DD, all entities received will be anterior to this date
 * @property { 0 | 1 ?} daily - numeric literal types are 0|1, if 1, day by day data will be provided
 */
export interface IReportURLParams {
    begin?: string | null;
    end?: string | null;
    daily?: 0 | 1 | null;
}
