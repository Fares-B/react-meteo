import React, { useState } from "react";
import { Container, Navbar } from "react-bootstrap";
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { AppDispatch } from "../store/store";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { changeTheme, Theme } from "../store/reducers/theme";
import {toggleBodyClasses} from "../assets/darkMode";

const Nav: React.FC = (props) => {

    const dispatch: AppDispatch = useAppDispatch();
    const [darkMode, setDarkMode] = useState<boolean>(false);
    const themeState: Theme = useAppSelector<Theme>(({theme}) => theme);

    useEffect(() => {
        setDarkMode(themeState.dark);
        toggleBodyClasses(themeState.dark);
    }, [themeState.dark]);

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
