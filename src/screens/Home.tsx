import {FloatingLabel, Form} from "react-bootstrap";
import {ChangeEvent, useEffect, useState} from "react";
import {AppDispatch} from "../store/store";
import {useAppDispatch, useAppSelector} from "../store/hooks";
import {updateSearch, Search} from "../store/reducers/search";

const Home: React.FC = (props) => {
    const [searchCity, setSearchCity] = useState<string>("");
    const dispatch: AppDispatch = useAppDispatch();
    const search: Search = useAppSelector<Search>(({search}) => search);

    useEffect(() => {
        console.log(search.value);
        setSearchCity(search.value);
    }, [search.value]);

    const handleChange = (e: ChangeEvent<HTMLInputElement> ) => {
        dispatch(updateSearch(e.target.value));
    }

    return (
        <>
            <h1>Home page</h1>

            <FloatingLabel
                controlId="floatingInput"
                label="Rechercher une ville"
                className="mb-3"
            >
                <Form.Control type="city" placeholder="rechercher une ville" value={searchCity} onChange={handleChange} />
            </FloatingLabel>
        </>
    );
}

export default Home;
