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
    rain?: any,
    snow?: any,
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

