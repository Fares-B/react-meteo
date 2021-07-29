import {useEffect, useState} from "react";
import { useLocation } from "react-router-dom";
import TCity from "../interface/city";
import {Col, Container, Row} from "react-bootstrap";
// import Moment from "react-moment";
import 'moment/locale/fr';
import TWeather, {TWeatherDay} from "../interface/weather";
import moment from "moment/moment";

interface LocationCustom {
    city: TCity,
    weather: TWeather,
}

const City = () => {
    const location = useLocation();
    const {city, weather} = location.state as LocationCustom; // Type Casting, then you can get the params passed via router
    const [date, setDate] = useState<Date>(new Date());
    useEffect(() => {
        console.log(weather)
    }, [city]);

    return (
        <Container className="pt-2">
            <Row>
                <Col className="">
                    <h1>{city.properties.name}</h1>
                    {moment(date).fromNow()}
                </Col>
            </Row>
            <Row>
                <Col className="text-end">
                    <h3 className="display-1">{weather.current.temp}°</h3>
                    <p>
                        {weather.current.weather[0].description}
                        {/*<span>{weather.daily[0].temp.min} / {weather.daily[0].temp.max}</span>*/}
                    </p>
                    <img src={`https://openweathermap.org/img/wn/${weather.current.weather[0].icon}@2x.png`} alt="weather"/>
                </Col>
            </Row>
        </Container>
    );
}

export default City;
