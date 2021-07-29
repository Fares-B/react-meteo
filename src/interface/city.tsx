import TWeather from "./weather";

export default interface TCity  {
    type: string,
    geometry: {
        type: string,
        coordinates: [
            number,
            number
        ]
    },
    properties: {
        label: string,
        score: number,
        id: string,
        type: string,
        name: string,
        postcode: string,
        citycode: string,
        x: number,
        y: number,
        population: number,
        city: string,
        context: string,
        importance: number
    },
    // weather?: TWeather,
}
