import React, {useEffect, useState} from "react";
import {Button, Card} from "react-bootstrap";
import { Link } from "react-router-dom";
import TCity from "../interface/city";
import TWeather from "../interface/weather";
import fetchWeather from "../services/fetchWeather";
import {AppDispatch} from "../store/store";
import {useAppDispatch} from "../store/hooks";
import {appendCity, removeCity} from "../store/reducers/cities";

interface Props {
    city: TCity,
    status?: boolean,
}

const CardCity: React.FC<Props> = ({city, status = false}) => {
    const dispatch: AppDispatch = useAppDispatch();
    const [weather, setWeather] = useState<TWeather | null>(null);
    const [statusAddButton, setStatusAddButton] = useState<boolean>(status);

    useEffect(() => {
        const coordinates: { lat: number, lon: number } = {
            lon: city.geometry.coordinates[0],
            lat: city.geometry.coordinates[1],
        };
        fetchWeather(coordinates).then((w:TWeather) => setWeather(w));
    }, [city]);

    const handleButton = () => {
        !statusAddButton ? dispatch(appendCity(city)) : dispatch(removeCity(city));
        setStatusAddButton(!statusAddButton);
    }

    return (
        <Card className="w-100">
            <Card.Body>
                <Link to={{pathname: `/city/${city.properties.name.split(' ').join('+')}`, state: {city: city, weather: weather}}}>
                    <Card.Title>{city.properties.name}</Card.Title>
                    <Card.Text>
                        {weather?.current.temp}°
                    </Card.Text>
                </Link>
                <Card.Text className="text-end">
                    <Button variant={statusAddButton ? "danger" : "primary"} onClick={handleButton}>{statusAddButton ? "-" : "+"}</Button>
                </Card.Text>
            </Card.Body>
        </Card>
    );
};

export default CardCity;

