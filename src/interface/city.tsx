export function getCityId(city:TCity): string {
    return JSON.stringify(city.geometry.coordinates);
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
