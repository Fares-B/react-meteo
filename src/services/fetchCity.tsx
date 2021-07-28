import { get } from "./fetch";
const urlApi = "https://api-adresse.data.gouv.fr/search/?q=";

export const getCities = (city: string = "") => get(urlApi + city);
