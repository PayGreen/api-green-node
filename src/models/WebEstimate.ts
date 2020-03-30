import { Serializable, JsonProperty } from 'typescript-json-serializer';
import { IWebNavigation } from '../interfaces';
import { EstimateType } from '../enums';

/** WebEstimate Model Class with methods to manage web estimate data */

@Serializable()
class WebNavigation {
    @JsonProperty('userAgent')
    public userAgent?: string | null;
    @JsonProperty('device')
    public device?: string | null;
    @JsonProperty('browser')
    public browser?: string | null;
    @JsonProperty('countImages')
    public countImages?: number | null;
    @JsonProperty('countPages')
    public countPages?: number | null;
    @JsonProperty('time')
    public time?: number | null;
    @JsonProperty('externalId')
    public externalId?: string | null;

    constructor(
        userAgent?: string | null,
        countImages?: number | null,
        countPages?: number | null,
        time?: number | null,
        externalId?: string | null
        ) {
        this.userAgent = userAgent;
        this.device = "";
        this.browser = "";
        this.countImages = countImages;
        this.countPages = countPages;
        this.time = time;
        externalId ? this.externalId = externalId : this.externalId = null;
    }
}

@Serializable()
export class WebEstimate {
    @JsonProperty('type')
    public type : string | null;
    @JsonProperty('fingerprint')
    public fingerprint?: string | null;
    @JsonProperty('webNavigation')
    public webNavigation: WebNavigation;

    /**
     * Create the web navigation estimate object.
     * @param {string?} fingerprint - unique string to identify a Carbon offsetting estimate file
     * @param {string?} userAgent - user agent headers
     * @param {number?} countImages - number of images requested during the navigation
     * @param {number?} countPages - number of pages requested during the navigation
     * @param {number?} time - time spent during the navigation (in seconds)
     * @param {string?} externalId - user ExternalId you may use to identify him in your system
     */
    constructor(
        fingerprint?: string | null,
        userAgent?: string | null,
        countImages?: number | null,
        countPages?: number | null,
        time?: number | null,
        externalId?: string | null
    ) {
        this.type = EstimateType[0];
        this.fingerprint = fingerprint;
        this.webNavigation = new WebNavigation(
            userAgent,
            countImages,
            countPages,
            time,
            externalId
        )
    }

    /**
     * VERIFY WEB NAVIGATION OBJECT |
     * @param {any} data - Object with all web navigation informations
     * @returns {IUser} - New object with all web navigation informations with final structure/names for API compatibility
     */
    verify = (data: any): IWebNavigation => {
        for (const property in data) {
            if (data[property] == null && data[property] !== this.webNavigation.externalId ) {
                throw `Error ${property} is null`;
            }
        } return {
            type: data.type,
            fingerprint: data.fingerprint,
            webNavigation: {
                userAgent:data.webNavigation.userAgent,
                device:"",
                browser:"",
                countImages:data.webNavigation.countImages,
                countPages:data.webNavigation.countPages,
                time:data.webNavigation.time,
                externalId:data.webNavigation.time,
                },
            };
    };
}