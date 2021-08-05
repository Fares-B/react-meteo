import { Coordinates } from "../interface/city";
import {get} from "./fetch";
const apiId = "1b80a43843a074455ece98fbe1997942";
const urlApi: string = "https://api.openweathermap.org/data/2.5/onecall?units=metric&lang=fr&exclude=hourly,alerts,minutely&appid=" + apiId;


const fetchWeather = (coordinates: Coordinates) => get(`${urlApi}&lat=${coordinates.lat}&lon=${coordinates.lon}`);

export default fetchWeather;
