import React, {useEffect, useState} from "react";
import {Button, Card, Modal} from "react-bootstrap";
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
    const [showModal, setShowModal] = useState<boolean>(false);

    useEffect(() => {
        const coordinates: { lat: number, lon: number } = {
            lon: city.geometry.coordinates[0],
            lat: city.geometry.coordinates[1],
        };
        fetchWeather(coordinates).then((w:TWeather) => setWeather(w));
    }, [city]);

    const handleDeleteCity = () => {
        setStatusAddButton(false);
        dispatch(removeCity(city));
        setShowModal(false);
    }

    const handleAddCity = () => {
        dispatch(appendCity(city));
        setStatusAddButton(true);
    }

    return (
        <>
            <Card className="w-100">
                <Card.Body>
                    <Link to={{pathname: `/city/${city.properties.name.split(' ').join('+')}`, state: {city: city, weather: weather}}}>
                        <Card.Title>{city.properties.name}</Card.Title>
                        <Card.Text>
                            {weather?.current.temp}°
                        </Card.Text>
                    </Link>
                    <Card.Text className="text-end">
                        {statusAddButton
                            ? <Button variant="danger" onClick={()=> setShowModal(true)}>-</Button>
                            : <Button variant="primary" onClick={handleAddCity}>+</Button>
                        }
                    </Card.Text>
                </Card.Body>
            </Card>

            <Modal show={showModal} onHide={()=> setShowModal(false)} className="text-primary">
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleDeleteCity}>
                        supprimer
                    </Button>
                    <Button variant="primary" onClick={() => setShowModal(false)}>
                        Annuler
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default CardCity;

