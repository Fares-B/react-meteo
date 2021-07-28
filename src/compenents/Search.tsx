import {FloatingLabel, Form} from "react-bootstrap";
import {ChangeEvent, useEffect, useState} from "react";
import {AppDispatch} from "../store/store";
import {useAppDispatch, useAppSelector} from "../store/hooks";
import {updateSearch, Search as TSearch} from "../store/reducers/search";
import {getCities} from "../services/fetchCity";

const Search: React.FC = (props) => {
    const [searchCity, setSearchCity] = useState<string>("");
    const dispatch: AppDispatch = useAppDispatch();
    const search: TSearch = useAppSelector<TSearch>(({search}) => search);

    useEffect(() => {
        setSearchCity(search.value);
        if (search.value) {
            getCities(search.value.split(' ').join('+')).then(cities => {
                console.log(cities.features);
            });
        }
    }, [search.value]);

    const handleChange = (e: ChangeEvent<HTMLInputElement> ) => {
        dispatch(updateSearch(e.target.value));
    }

    return (
        <>
            <FloatingLabel
                controlId="floatingInput"
                label="Rechercher une ville"
                className="mb-3"
            >
                <Form.Control
                    type="city"
                    placeholder="rechercher une ville"
                    value={searchCity}
                    onChange={handleChange}
                />
            </FloatingLabel>

        </>
    );
}

export default Search;
