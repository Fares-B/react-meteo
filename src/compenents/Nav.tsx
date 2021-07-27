import React, { useState } from "react";
import { Container, Navbar } from "react-bootstrap";
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { AppDispatch } from "../store/store";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { changeTheme, Theme } from "../store/reducers/theme";

const Nav: React.FC = (props) => {

    const dispatch: AppDispatch = useAppDispatch();
    const [darkMode, setDarkMode] = useState<boolean>(false);
    const themeState: Theme = useAppSelector<Theme>(({theme}) => theme);

    useEffect(() => {
        setDarkMode(themeState.dark);
    }, [themeState.dark]);

    const changeStyle = ():void => {
        dispatch(changeTheme(!darkMode));
    };

    return (
        <Navbar bg="secondary">
            <Container>
                <Navbar.Brand as={Link} to="/">Météo</Navbar.Brand>
                <Navbar.Collapse className="justify-content-end">
                    <BootstrapSwitchButton
                        checked={darkMode}
                        onChange={changeStyle}
                        onlabel='dark'
                        offlabel='ligth'
                        onstyle="dark"
                        width={75}
                    />
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Nav;
