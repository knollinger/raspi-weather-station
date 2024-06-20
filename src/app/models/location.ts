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
        private _isHome: boolean) {
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
}
