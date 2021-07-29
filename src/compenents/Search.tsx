import {Button, Col, Container, FloatingLabel, Form, Row} from "react-bootstrap";
import React, {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {AppDispatch} from "../store/store";
import {useAppDispatch, useAppSelector} from "../store/hooks";
import {updateSearch, updateCities, Search as TSearch} from "../store/reducers/search";
import {getCities} from "../services/fetchCity";
import {SearchIcon} from "@heroicons/react/outline";

const Search: React.FC = () => {
    const [searchCity, setSearchCity] = useState<string>("");
    const dispatch: AppDispatch = useAppDispatch();
    const search: TSearch = useAppSelector<TSearch>(({search}) => search);

    useEffect(() => {
        if (search.value) {
            getCities(search.value.split(' ').join('+')).then((cities) => {
                dispatch(updateCities(cities.features));
            });
        }
    }, [search.value]);

    const handleChange = (e: ChangeEvent<HTMLInputElement> ) => {
        setSearchCity(e.target.value);
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        dispatch(updateSearch(searchCity));
    };

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <Container fluid>
                    <Row>
                        <Col>
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Rechercher une ville"
                            >
                                <Form.Control
                                    type="city"
                                    placeholder="rechercher une ville"
                                    value={searchCity}
                                    onChange={handleChange}
                                />
                            </FloatingLabel>
                        </Col>
                        <Col>
                            <Button className="h-100" type="submit">
                                <SearchIcon className="h-100 w-50 text-blue-500" />
                            </Button>
                        </Col>
                    </Row>
                </Container>

            </Form>
        </>
    );
}

export default Search;
