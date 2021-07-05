import api from "./api";
import { Plan } from "../models/Plan";

export const get = async () : Promise<Plan[]> => {
    try {
        const {data} = await api.get(`/api/v1/plan`);

        return data.data;
    } catch (error) {
        return [];
    }
}
