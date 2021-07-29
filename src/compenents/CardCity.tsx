import React, {useEffect, useState} from "react";
import {Button, Card} from "react-bootstrap";
import { Link } from "react-router-dom";
import TCity from "../interface/city";
import TWeather from "../interface/weather";
import fetchWeather from "../services/fetchWeather";

interface Props {
    city: TCity,
}


const CardCity: React.FC<Props> = ({city}) => {

    const [weather, setWeather] = useState<TWeather | null>(null);

    useEffect(() => {
        const coordinates: { lat: number, lon: number } = {
            lon: city.geometry.coordinates[0],
            lat: city.geometry.coordinates[1],
        };
        fetchWeather(coordinates).then((w:TWeather) => setWeather(w) );
    }, [city]);

    const handleButton = () => {
        console.log(city);
    }

    return (
        <Card className="w-100">
            <Card.Body>
                <Link to={{pathname: `/${city.properties.name.split(' ').join('+')}`, state: {city: city, weather: weather}}}>
                    <Card.Title>{city.properties.name}</Card.Title>
                    <Card.Text>
                        {weather?.current.temp}°
                    </Card.Text>
                </Link>
                <Card.Text className="text-end">
                    <Button variant="primary" onClick={handleButton}>+</Button>
                </Card.Text>
            </Card.Body>
        </Card>
    );
};

export default CardCity;

