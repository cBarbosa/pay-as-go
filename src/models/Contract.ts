import { Plan } from "./Plan";
import { User } from "./User";

export type Contract = {
    recordId: string;
    installments: number;
    amount: number;
    montlyAmount: number;
    discountPercent: number;
    billingDay: number;
    starts: Date;
    ends: Date;
    plan: Plan;
    person: User;
    persons: User[];
};
