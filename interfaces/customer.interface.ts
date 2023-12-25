export interface InsertCustomer {
  customer: {
    customer_id: number;
    customer_name: string;
    sales_type_code_id: number;
    customer_type_code_id: number;
    active: 0 | 1;
  };
  personNew: {
    person_id: number;
    firstname: string;
    lastname: string;
    nickname: string;
    title_code_id: number;
    description: string;
    active: 0 | 1;
  }[];
  personExist: number[];
  contactNew: {
    contact_id: number;
    customer_id: number;
    contact_code_id: number;
    value: string;
    active: 0 | 1;
  }[];
}
