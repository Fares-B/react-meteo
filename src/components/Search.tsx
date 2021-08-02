import {Button, Form, FormControl, InputGroup} from "react-bootstrap";
import React, {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {AppDispatch} from "../store/store";
import {useAppDispatch, useAppSelector} from "../store/hooks";
import {updateSearch, updateSearchCities, clearSearchCities, Search as TSearch} from "../store/reducers/search";
import {getCities} from "../services/fetchCity";
import {useHistory} from "react-router-dom";

const Search: React.FC = () => {
    const [searchCity, setSearchCity] = useState<string>("");
    const dispatch: AppDispatch = useAppDispatch();
    const search: TSearch = useAppSelector<TSearch>(({search}) => search);
    const history = useHistory();

    useEffect(() => {
        if (search.value) {
            setSearchCity(search.value);
            history.push({ pathname: '/search', search: '?q=' + search.value.split(' ').join('+') });
            getCities(search.value.split(' ').join('+')).then((cities) => {
                dispatch(updateSearchCities(cities.features));
            });
        }
        else {
            dispatch(clearSearchCities());
            history.push({ pathname: '/search', search: '' });
        }
    }, [search.value, dispatch, history]);

    const handleChange = (e: ChangeEvent<HTMLInputElement> ) => {
        setSearchCity(e.target.value);
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        dispatch(updateSearch(searchCity));
    };

    return (
        <Form onSubmit={handleSubmit}>
            <InputGroup className="mb-3">
                <FormControl
                    type="city"
                    value={searchCity}
                    onChange={handleChange}
                    placeholder="Rechercher une ville"
                />
                <Button variant="outline-secondary" type="submit">search</Button>
            </InputGroup>
        </Form>
    );
}

export default Search;
