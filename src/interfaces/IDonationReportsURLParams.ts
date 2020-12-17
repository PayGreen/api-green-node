/**
 * IDonationReportsURLParams
 * @property {string?} begin - begin date, accepted format YYYY-MM-DD, all entities received will be posterior to this date
 * @property {string?} end - end date, accepted format YYYY-MM-DD, all entities received will be anterior to this date
 * @property {string?} association - to check what has been collected for a specific charity/association structure
 * @property {number?} user - userId - to filter donations reports per user (only for association role)
 *
 */
export interface IDonationReportsURLParams {
    begin?: string | null;
    end?: string | null;
    association?: string | null;
    user?: string | null;
}
