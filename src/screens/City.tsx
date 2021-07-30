import React, {useEffect, useState} from "react";
import { useLocation } from "react-router-dom";
import TCity from "../interface/city";
import {Col, Container, Row} from "react-bootstrap";
import 'moment/locale/fr';
import TWeather, {TTempsDay} from "../interface/weather";
import moment from "moment/moment";
import Graph from "../compenents/Graph";


interface LocationCustom {
    city: TCity,
    weather: TWeather,
}

const City: React.FC = () => {
    const location = useLocation();
    const {city, weather} = location.state as LocationCustom; // Type Casting, then you can get the params passed via router
    const date = new Date();
    const [tempsDay, setTempsDay] = useState<TTempsDay>();

    useEffect(() => {
        if (typeof weather.daily[0].temp !== "number") {
            setTempsDay(weather.daily[0].temp);
        }
    }, [weather.daily]);

    return (
        <Container className="pt-2">
            <Row>
                <Col>
                    <h1>{city.properties.name}</h1>
                    {moment(date).fromNow()}
                </Col>
            </Row>
            <Row>
                <Col className="text-end">
                    <h3 className="display-1">{weather.current.temp}°</h3>
                    <p>
                        {weather.current.weather[0].description}
                        <span className="p-1">{tempsDay && tempsDay.min + "° / " + tempsDay.max + "°" }</span>
                    </p>
                    <img src={`https://openweathermap.org/img/wn/${weather.current.weather[0].icon}@2x.png`} alt="weather"/>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Graph weather={weather} />
                </Col>
            </Row>
        </Container>
    );
}

export default City;
