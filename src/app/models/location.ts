/**
 * 
 */
export interface ILocation {
    uuid: string,
    name: string,
    longitude: number,
    latitude: number,
    isHome: boolean
}

/**
 * 
 */
export interface IOSMLocation {
    osm_id: number,
    name: string,
    display_name: string,
    lat: number,
    lon: number
}

/**
 * 
 */
export class Location {

    /**
     * 
     * @param _uuid 
     * @param _name 
     * @param _longitude 
     * @param _latitude 
     * @param _isHome 
     */
    constructor(
        private _uuid: string,
        private _name: string,
        private _longitude: number,
        private _latitude: number,
        private _isHome: boolean,
        private _displayName?: string) {
    }

    /**
     * 
     * @returns 
     */
    public static empty(): Location {
        return new Location('', '', 0, 0, false);
    }

    /**
     * 
     * @returns 
     */
    public isEmpty(): boolean {
        return !this._uuid;
    }

    /**
     * 
     * @param json 
     * @returns 
     */
    public static fromJson(json: ILocation): Location {
        return new Location(json.uuid, json.name, json.longitude, json.latitude, json.isHome);
    }

    /**
     * 
     * @param json 
     * @returns 
     */
    public static fromOSMJson(json: IOSMLocation): Location {
        return new Location('' + json.osm_id, json.name, json.lon, json.lat, false, json.display_name);
    }

    /**
     * 
     * @param json 
     * @returns 
     */
    public toJson(): ILocation {
        return {

            uuid: this._uuid,
            name: this._name,
            longitude: this._longitude,
            latitude: this._latitude,
            isHome: this._isHome
        }
    }

    /**
     * 
     */
    public get uuid(): string {
        return this._uuid;
    }

    /**
     * 
     */
    public get name(): string {
        return this._name;
    }

    /**
     * 
     */
    public get latitude(): number {
        return this._latitude;
    }

    /**
     * 
     */
    public get longitude(): number {
        return this._longitude;
    }

    /**
     * 
     */
    public get isHome(): boolean {
        return this._isHome;
    }

    /**
     * 
     */
    public get displayName(): string | undefined {
        return this._displayName;
    }

    /**
     * 
     * @returns 
     */
    public toString(): string {
        return this.displayName || this.name;
    }
}

