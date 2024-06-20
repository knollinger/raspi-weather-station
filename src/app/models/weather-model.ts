export interface IShortWeatherDesc {
    id: number,
    main: string,
    description: string,
    icon: string
}

export interface IBaseWeather {
    dt: number,
    temp: number,
    feels_like: number,
    pressure: number,
    humidity: number,
    dew_point: number,
    uvi: number,
    clouds: number,
    visibility: number,
    wind_speed: number,
    wind_deg: number,
    wind_gust: number,
    rain?: number,
    snow?: number,
    weather: IShortWeatherDesc[]
}

export interface ICurrentWeather extends IBaseWeather {
    sunrise: number,
    sunset: number,
}

export interface IDailyWeather {
    dt: number,
    sunrise: number,
    sunset: number,
    moonrise: number,
    moonset: number,
    moon_phase: number,
    summary: string,
    temp: {
        day: number,
        min: number,
        max: number,
        night: number,
        eve: number,
        morn: number,
    },
    feels_like: {
        day: number,
        night: number,
        eve: number,
        morn: number,
    },
    pressure: number,
    humidity: number,
    dew_point: number,
    wind_speed: number,
    wind_deg: number,
    wind_gust: number,
    weather: IShortWeatherDesc[],
    clouds: number,
    pop: number,
    uvi: number,
    rain?: number,
    snow?: number
}

export interface IWeatherModel {
    lat: number,
    lon: number,
    timezone: string,
    timezone_offset: number,
    current: ICurrentWeather,
    hourly: IBaseWeather[]
    daily: IDailyWeather[]
}

/**
 * Das Interface für den einheitlichen Zugriff auf current/hourly/daily records
 */
export interface IWeatherSnapshot {
    get temp(): number;
    get humidity(): number;
    get windSpeed(): number;
    get windDirection(): number;
    get pressure(): number;
    get perticipation(): number;
}

/**
 * 
 */
export class DailyWeather implements IWeatherSnapshot {

    constructor(private _weather: IDailyWeather) {

    }

    get temp(): number {
        throw new Error("Method not implemented.")
    }
    get humidity(): number {
        throw new Error("Method not implemented.")
    }
    get windSpeed(): number {
        throw new Error("Method not implemented.")
    }
    get windDirection(): number {
        throw new Error("Method not implemented.")
    }
    get pressure(): number {
        throw new Error("Method not implemented.")
    }
    get perticipation(): number {
        throw new Error("Method not implemented.")
    }
}
