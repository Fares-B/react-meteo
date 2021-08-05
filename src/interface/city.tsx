export function getCityId(city: TCity | undefined): string {
    if (city === undefined)
        return "";
    return JSON.stringify(city.geometry.coordinates);
}

export interface Coordinates {
    lon: number,
    lat: number,
}

export function getCoordinates(coordinates: [number, number]): Coordinates {
    return { lon: coordinates[0], lat: coordinates[1] };
}

export default interface TCity  {
    _id?: string,
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
}
