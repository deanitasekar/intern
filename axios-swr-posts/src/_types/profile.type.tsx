export interface AddressType {
  street: string;
  city: string;
  zipcode: string;
  country: string;
}

export interface CompanyType {
  name: string;
  position: string;
  industry: string;
}

export interface ProfileType {
  id?: number;
  name: string;
  email: string;
  phone: string;
  website: string;
  avatar?: string;
  bio?: string;
  address: AddressType;
  company: CompanyType;
}
