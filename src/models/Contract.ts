import { Plan } from "./Plan";
import { Person } from "./Person";
import { Installment } from "./Installment";

export type ContractModel = {
    recordId: string;
    installments: number;
    amount: number;
    montlyAmount: number;
    discountPercent: number;
    billingDay: number;
    starts: Date;
    ends: Date;
    plan: Plan;
    person: Person;
    persons: Person[];
    installmentList: Installment[]; 
};
