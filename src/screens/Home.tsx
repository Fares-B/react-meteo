import React from "react";
import CardCity from "../components/CardCity";
import {useAppSelector} from "../store/hooks";
import {Col, Container, Row} from "react-bootstrap";
import TCity from "../interface/city";

const Home: React.FC = (props) => {
    const citiesLocal: TCity[] = useAppSelector<TCity[]>(({cities}) => cities.cities);

    return (
        <>
            <Container>
                <h1>Mes villes</h1>
                <Row xs={1} md={2} lg={5}>
                    { citiesLocal.map((city, idx) => <Col key={idx}>
                        <CardCity city={city} status={true} />
                    </Col> )}
                </Row>
            </Container>
        </>
    );
}

export default Home;
