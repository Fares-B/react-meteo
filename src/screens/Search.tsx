import React, {useEffect, useState} from "react";
import TCity from "../interface/city";
import {Col, Container, Row} from "react-bootstrap";
import 'moment/locale/fr';
import Search from "../compenents/Search";
import CardCity from "../compenents/CardCity";
import {useAppSelector} from "../store/hooks";

const City = () => {

    const searchCities: TCity[] = useAppSelector<TCity[]>(({search}) => search.cities);
    const [cities, setCities] = useState<TCity[] | []>([]);

    useEffect(() => {
        setCities(searchCities);
    }, [searchCities]);

    return (
        <Container className="pt-2">
            <h1>Ajouter une ville</h1>
            <Search />
            <Row xs={1} md={2} lg={5}>
                { cities.map((city, idx) => (<Col key={idx}>
                    <CardCity city={city} />
                </Col>) ) }
            </Row>
        </Container>
    );
}

export default City;
