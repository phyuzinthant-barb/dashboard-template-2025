export interface CustomersFormValues {
  name: string;
}

export interface EditCustomersFormValues {
  name?: string;
  description?: string;
  price?: number;
  duration?: number;
  status?: boolean;
}

export interface CustomersDetail {
  name: string;
  email: string;
  phone: string;
  package: string;
  profilePictureUrl: string;
}
