import React, {useEffect, useState} from "react";
import TCity, {getCityId} from "../interface/city";
import {Col, Container, Row} from "react-bootstrap";
import 'moment/locale/fr';
import Search from "../components/Search";
import CardCity from "../components/CardCity";
import {useAppSelector} from "../store/hooks";
import TransitionAnimation from "../components/TransitionAnimation";

const City = () => {

    const searchCities: TCity[] = useAppSelector<TCity[]>(({search}) => search.cities);
    const localCities: TCity[] = useAppSelector<TCity[]>(({cities}) => cities.cities);
    const [cities, setCities] = useState<TCity[] | []>([]);

    useEffect(() => {
        setCities(searchCities);
    }, [searchCities]);

    const selectedCity = (city: TCity): boolean => {
        const id: string = getCityId(city);
        const filter = localCities.filter(c => getCityId(c) === id );
        return filter.length > 0;
    };

    return (
        <TransitionAnimation>
            <Container>
                <h1>Ajouter une ville</h1>
                <Search />
                <Row xs={1} md={2} lg={5}>
                    { cities.map((city) => (<Col key={getCityId(city)}>
                        <CardCity city={city} status={selectedCity(city)} />
                    </Col>) ) }
                </Row>
            </Container>
        </TransitionAnimation>
    );
}

export default City;
