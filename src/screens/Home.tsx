import React, {useEffect, useState} from "react";
import Search from "../compenents/Search";
import CardCity from "../compenents/CardCity";
import {useAppSelector} from "../store/hooks";
import {Col, Container, Row} from "react-bootstrap";
import TCity from "../interface/city";

const Home: React.FC = (props) => {
    const searchCities: TCity[] = useAppSelector<TCity[]>(({search}) => search.cities);
    const [cities, setCities] = useState<TCity[] | []>([]);

    useEffect(() => {
        setCities(searchCities);
        console.log(searchCities)
    }, [searchCities]);

    return (
        <>
            <h1>Home page</h1>
            <Search />
            <Container>
                <Row xs={1} md={2} lg={5}>
                    { cities.map((city, idx) => <Col key={idx}>
                        <CardCity city={city}  />
                    </Col> ) }
                </Row>
            </Container>
        </>
    );
}

export default Home;
