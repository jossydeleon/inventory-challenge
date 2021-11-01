export interface ICredentials {
  email: string;
  password: string;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  picture?: string;
}

export interface IProduct {
  id?: string;
  name: string;
  sku: string;
  category: string;
  price: number;
  stock: number;
  trackeable: boolean;
  picture?: string;
}
