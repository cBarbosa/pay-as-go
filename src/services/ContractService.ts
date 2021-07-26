import { ContractModel } from "../models/Contract";
import api from "./api";

export const getAllContracts = async (recordPersonId: string) : Promise<ContractModel[]> => {
    try {
            const {data} = await api.get(`/api/v1/contract/person/${recordPersonId}`);
            return data.data as ContractModel[];
    } catch (error) {
        return [];
    }
}

export const get = async (recordId: string) : Promise<ContractModel> => {
    try {
            const {data} = await api.get(`/api/v1/contract/${recordId}`);
            return data.data as ContractModel;
    } catch (error) {
        return null as unknown as ContractModel;
    }
}
