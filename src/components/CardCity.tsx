import React, {useEffect, useState} from "react";
import {Button, Card, Modal} from "react-bootstrap";
import { Link } from "react-router-dom";
import TCity, { getCityId } from "../interface/city";
import TWeather from "../interface/weather";
import {AppDispatch} from "../store/store";
import {useAppDispatch, useAppSelector} from "../store/hooks";
import {appendCity, removeCity} from "../store/reducers/cities";

interface CardProps {title:string, text?: any}
const CardInfo: React.FC<CardProps> = (props: CardProps) => {
    return <>
        <Card.Title><span style={{color: "#0d6efd"}}>{props.title}</span></Card.Title>
        {props.text && <Card.Text>{props.text}°</Card.Text>}
    </>
};

interface Props {
    city: TCity,
    status?: boolean,
}

const CardCity: React.FC<Props> = ({city, status = false}) => {
    const dispatch: AppDispatch = useAppDispatch();
    const weathers: TWeather[] = useAppSelector<TWeather[]>(({ weather }) => weather.weather);
    const [weather, setWeather] = useState<TWeather | null>(null);
    const [statusAddButton, setStatusAddButton] = useState<boolean>(status);
    const [showModal, setShowModal] = useState<boolean>(false);

    useEffect(() => {
        const w: TWeather | undefined = weathers.filter(w => w._id === getCityId(city)).shift();
        if (w !== undefined) {
            setWeather(w);
        }
    }, [weathers, city]);

    const handleDeleteCity = () => {
        setStatusAddButton(false);
        dispatch(removeCity(city));
        setShowModal(false);
    }

    const handleAddCity = () => {
        dispatch(appendCity(city));
        setStatusAddButton(true);
    }

    const getLink = (): string => city.properties.name.split(' ').join('+');

    return (
        <>
            <Card className="w-100">
                <Card.Body>
                    {statusAddButton
                        ? <><Link to={{pathname: `/city/${getLink()}`, state: {city: city, weather: weather}}}>
                                <CardInfo title={city.properties.name} text={weather?.current.temp} />
                            </Link>
                            <Card.Text className="text-end">
                                <Button variant="danger" onClick={()=> setShowModal(true)}>-</Button>
                            </Card.Text></>
                        : <><CardInfo title={city.properties.name} />
                            <Card.Text className="text-end">
                                <Button variant="primary" onClick={handleAddCity}>+</Button>
                            </Card.Text>
                        </>
                    }
                </Card.Body>
            </Card>

            <Modal show={showModal} onHide={()=> setShowModal(false)} className="text-primary">
                <Modal.Header closeButton>
                    <Modal.Title>Suppression d'une ville</Modal.Title>
                </Modal.Header>
                <Modal.Body>Êtes vous sûr de vouloir supprimer {city.properties.name} ?</Modal.Body>
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



