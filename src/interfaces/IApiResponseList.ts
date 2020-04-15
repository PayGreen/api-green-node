export interface IApiResponseList {
    success: boolean;
    dataInfo: IList;
}

export interface IList {
    _links: object;
    _embedded: object;
}