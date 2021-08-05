import React, { useState } from "react";
import { Container, Navbar } from "react-bootstrap";
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { AppDispatch } from "../store/store";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { changeTheme, Theme } from "../store/reducers/theme";
import {toggleBodyClasses} from "../assets/darkMode";
import TWeather from "../interface/weather";
import fetchWeather from "../services/fetchWeather";
import TCity, {getCityId, getCoordinates} from "../interface/city";
import {appendAllWeather} from "../store/reducers/weather";

const Nav: React.FC = (props) => {

    const dispatch: AppDispatch = useAppDispatch();
    const [darkMode, setDarkMode] = useState<boolean>(false);
    const themeState: Theme = useAppSelector<Theme>(({theme}) => theme);
    const citiesLocal: TCity[] = useAppSelector<TCity[]>(({cities}) => cities.cities);

    useEffect(() => {
        setDarkMode(themeState.dark);
        toggleBodyClasses(themeState.dark);
    }, [themeState.dark]);

    useEffect(() => {
        (async () => {
            const weathers: TWeather[] = [];
            for (const city of citiesLocal) {
                await fetchWeather(getCoordinates(city.geometry.coordinates)).then((weather: TWeather) => {
                    weathers.push({ ...weather, _id: getCityId(city), date: new Date() });
                });
            }
            dispatch(appendAllWeather(weathers));
        })();
    });

    const changeStyle = ():void => {
        dispatch(changeTheme(!darkMode));
    };

    return (
        <Navbar className="bg-info mb-5">
            <Container>
                <Navbar.Brand as={Link} to="/">Mes Villes</Navbar.Brand>
                <Navbar.Brand as={Link} to="/search">Ajouter</Navbar.Brand>
                <Navbar.Collapse className="justify-content-end">
                    <BootstrapSwitchButton
                        checked={darkMode}
                        onChange={changeStyle}
                        onlabel='Nuit'
                        offlabel='Jour'
                        onstyle="dark"
                        width={75}
                    />
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Nav;
