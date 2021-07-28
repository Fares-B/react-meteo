import { useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";

interface TParams { city: string };

const City = ({ match }: RouteComponentProps<TParams>) => {

    useEffect(() => {
        console.log(match.params.city);
    }, [match.params.city]);

    return (
        <h1>City page</h1>
    );
}

export default City;
