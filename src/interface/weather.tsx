export interface TWeatherDay {
    dt: number,
    sunrise: number,
    sunset: number,
    moonrise?: number,
    moonset?: number,
    moon_phase?: number,
    temp: number | {
        day: number,
        min: number,
        max: number,
        night: number,
        eve: number,
        morn: number
    },
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
    lat: number,
    lon: number,
    timezone: string,
    timezone_offset: number,
    current: TWeatherDay,
    daily: TWeatherDay[],
};
