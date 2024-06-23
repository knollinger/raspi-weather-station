export interface IOpenWeatherSettings {
    apiKey: string,
    refreshInt: number
}

/**
 * 
 */
export class OpenWeatherSettings {

    /**
     * 
     * @param _apiKey 
     * @param _refreshInt 
     */
    constructor(
        private _apiKey: string,
        private _refreshInt: number) {
    }

    /**
     * 
     * @returns 
     */
    public static empty(): OpenWeatherSettings {
        return new OpenWeatherSettings('', 15);
    }

    /**
     * 
     * @returns 
     */
    public isEmpty(): boolean {
        return !this._apiKey;
    }

    /**
     * 
     * @param json 
     * @returns 
     */
    public static fromJSON(json: IOpenWeatherSettings): OpenWeatherSettings {
        return new OpenWeatherSettings(json.apiKey, json.refreshInt);
    }

    /**
     * 
     * @returns 
     */
    public toJSON(): IOpenWeatherSettings {
        return {
            apiKey: this._apiKey,
            refreshInt: this._refreshInt
        }
    }

    /**
     * 
     */
    public get apiKey(): string {
        return this._apiKey;
    }

    /**
     * 
     */
    public set apiKey(val: string) {
        this._apiKey = val;
    }

    /**
     * 
     */
    public get refreshInt(): number {
        return this._refreshInt;
    }

    /**
     * 
     */
    public set refreshInt(val: number) {
        this._refreshInt = val;
    }
}