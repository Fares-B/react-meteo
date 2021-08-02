import React, {useEffect, useState} from "react";
import TCity, {getCityId} from "../interface/city";
import {Col, Container, Row} from "react-bootstrap";
import 'moment/locale/fr';
import Search from "../components/Search";
import CardCity from "../components/CardCity";
import {useAppSelector} from "../store/hooks";

const City = () => {

    const searchCities: TCity[] = useAppSelector<TCity[]>(({search}) => search.cities);
    const [cities, setCities] = useState<TCity[] | []>([]);

    useEffect(() => {
        setCities(searchCities);
    }, [searchCities]);

    return (
        <Container>
            <h1>Ajouter une ville</h1>
            <Search />
            <Row xs={1} md={2} lg={5}>
                { cities.map((city) => (<Col key={getCityId(city)}>
                    <CardCity city={city} />
                </Col>) ) }
            </Row>
        </Container>
    );
}

export default City;
