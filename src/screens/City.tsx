import {useEffect, useState} from "react";
import { useLocation } from "react-router-dom";
import TCity from "../interface/city";
import {Col, Container, Row} from "react-bootstrap";
import 'moment/locale/fr';
import TWeather, {TTempsDay} from "../interface/weather";
import moment from "moment/moment";
import CanvasJSReact from '../assets/canvasjs.react';
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

interface LocationCustom {
    city: TCity,
    weather: TWeather,
}
interface IPoint {
    y: number, label: string
}

interface IDataPoint {
    type: string,
    name: string,
    showInLegend: boolean,
    dataPoints: IPoint[]
}

interface IChartMeteo {
    animationEnabled: boolean,
    title:{
        text: string
    },
    axisY : {
        title: string
    },
    toolTip: {
        shared: boolean
    },
    data: IDataPoint[]
}

const City = () => {
    const location = useLocation();
    const {city, weather} = location.state as LocationCustom; // Type Casting, then you can get the params passed via router
    const date = new Date();
    const [options, setOptions] = useState<IChartMeteo>();
    const [tempsDay, setTempsDay] = useState<TTempsDay>();

    useEffect(() => {
        if (typeof weather.daily[0].temp !== "number") {
            setTempsDay(weather.daily[0].temp);
        }
        let dataPointMin: IDataPoint = {type: "spline", name: "min", showInLegend: true, dataPoints: [] };
        let dataPointMax: IDataPoint = {type: "spline", name: "max", showInLegend: true, dataPoints: [] };
        for (let weatherDay of weather.daily) {
            const date = moment(new Date(weatherDay.dt * 1000)).format('dddd');
            if (typeof weatherDay.temp !== "number") {
                const pointMin: IPoint = {y: weatherDay.temp.min, label: date};
                const pointMax: IPoint = {y: weatherDay.temp.max, label: date};
                dataPointMin.dataPoints.push(pointMin);
                dataPointMax.dataPoints.push(pointMax);
            }
        }

        setOptions({
            animationEnabled: true,
            title: { text: "Météo de la semaine" },
            axisY : { title: "Météo de la semaine" },
            toolTip: { shared: true },
            data: [dataPointMin, dataPointMax]
        })
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
                    <CanvasJSChart options = {options} />
                </Col>
            </Row>
        </Container>
    );
}

export default City;
