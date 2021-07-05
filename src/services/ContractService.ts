import { User } from "../models/User";
import api from "./api";

export const get = async (name: string, document: string) : Promise<User[]> => {
    let result: User[] = [];
    try {
        if(document && !name) {
            const {data} = await api.get(`/api/v1/contract?document=${document}`);
            result = data.data;
        }

        if(name) {
            const {data} = await api.get(`/api/v1/person?name=${name}`);
            result = data.data;
        }
        return result;
    } catch (error) {
        return [];
    }
}
