import { Closs } from "./Class";

export type Plan = {
    recordId: string;
    code: string;
    name: string;
    discount: number;
    classes: Closs[];
  };
