/**
 * IDonationURLParams
 * @property {string?} begin - begin date, accepted format YYYY-MM-DD, all entities received will be posterior to this date
 * @property {string?} end - end date, accepted format YYYY-MM-DD, all entities received will be anterior to this date
 * @property {string?} idAssociation - to check what has been collected for a specific charity/association structure
 * @property {number?} limit - number of entities received inside API response per page, limit is 25 by default
 * @property {number?} page - numerotation of page, number is 1 by default
 * @property { 0 | 1 ?} onlyNotRefundable- numeric literal types are 0|1, if 1, only the Donation that are not refundable anymore (14 days period), will be provided
 * @property {string?} externalId -  buyer identification provided by shop to display to buyers their donations history
 *
 */
export interface IDonationURLParams {
    begin?: string | null;
    end?: string | null;
    idAssociation?: string | null;
    limit?: number | null;
    page?: number | null;
    onlyNotRefundable?: 0 | 1 | null;
    externalId?: string | null;
}
