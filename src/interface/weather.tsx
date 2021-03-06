export interface TTempsDay {
    day: number,
    min: number,
    max: number,
    night: number,
    eve: number,
    morn: number
}

export interface TWeatherDay {
    dt: number,
    sunrise: number,
    sunset: number,
    moonrise?: number,
    moonset?: number,
    moon_phase?: number,
    temp: number | TTempsDay,
    feels_like: number | {
        day: number,
        night: number,
        eve: number,
        morn: number
    },
    pressure: number,
    humidity: number,
    dew_point: number,
    uvi: number,
    clouds: number,
    visibility?: number,
    wind_speed: number,
    wind_deg: number,
    wind_gust: number,
    weather: [
        {
            id: number,
            main: string,
            description: string,
            icon: string
        }
    ]
}


export default interface TWeather {
    _id?: string;
    date?: Date;
    lat: number;
    lon: number;
    timezone: string;
    timezone_offset: number;
    current: TWeatherDay;
    daily: TWeatherDay[];
};
