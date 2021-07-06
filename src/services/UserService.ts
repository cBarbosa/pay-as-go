import { Person } from "../models/Person";
import api from "./api";

export const getByDocumentOrName = async (name: string, document: string) : Promise<Person[]> => {
    let result: Person[] = [];
    try {
        if(document && !name) {
            const {data} = await api.get(`/api/v1/person?document=${document}`);
            result = data.data;
        }

        if(name) {
            const {data} = await api.get(`/api/v1/person?name=${name}`);
            result = data.data;
        }
        return result as Person[];
    } catch (error) {
        return [];
    }
}
