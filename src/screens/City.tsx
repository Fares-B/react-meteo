import React, {useEffect, useState} from "react";
import TCity from "../interface/city";
import {Col, Container, Row} from "react-bootstrap";
import 'moment/locale/fr';
import TWeather, {TTempsDay} from "../interface/weather";
import moment from "moment/moment";
import Graph from "../components/Graph";
import {AppDispatch} from "../store/store";
import {useAppDispatch} from "../store/hooks";
// import {updateWeather} from "../store/reducers/weather";
// import fetchWeather from "../services/fetchWeather";
import {useLocation} from "react-router-dom";

interface LocationCustom {
    city: TCity;
    weather: TWeather;
}

const City: React.FC = () => {
    const dispatch: AppDispatch = useAppDispatch();
    const [tempsDay, setTempsDay] = useState<TTempsDay>();
    const location = useLocation();
    const {city, weather} = location.state as LocationCustom; // Type Casting, then you can get the params passed via router
    const [updatedAt, setUpdatedAt] = useState<string>();

    useEffect(() => {
        setUpdatedAt(moment(weather?.date).fromNow());
        const subs = setInterval(() => {
            setUpdatedAt(moment(weather?.date).fromNow());
            console.log(updatedAt)
        }, 60_000);
        return clearInterval(subs);
    }, [weather]);

    useEffect(() => {
        if (typeof weather?.daily[0].temp !== "number") {
            setTempsDay(weather?.daily[0].temp);
        }
    }, [weather?.daily])

    // const refreshWeather = ():void => {
    //     const coordinates: Coordinates = getCoordinates(JSON.parse(weather._id as string));
    //     fetchWeather(coordinates).then(w => dispatch(updateWeather(w)) );
    // };

    return (
        <Container className="pt-2">
            <Row className="">
                <Col>
                    <h1>{city.properties.name}</h1>
                    {updatedAt}
                </Col>
                {/*<Col className="text-end">*/}
                {/*    <Button onClick={refreshWeather}>Rafraichir</Button>*/}
                {/*</Col>*/}
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
                    <Graph weatherDaily={weather.daily} />
                </Col>
            </Row>
        </Container>
    );
}

export default City;
