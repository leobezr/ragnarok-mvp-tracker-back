export interface User {
  token: string;
  email: string;
  name: string;
  password: SaltHash;
  packages: string[];
  products: HotmartProduct[];
}

export interface UserCredentials {
  email: string;
  password: string;
}

export interface SaltHash {
  hash: string;
  salt: string;
}

export interface HotmartProduct {
  id: string; // HotmartWebhook.prod
  name: string; // HotmartWebhook.prod_name
  price: number; // HotmartWebhook.price
  purchaseDate: string; // HotmartWebhook.purchase_date
}

export interface HotmartWebhook {
  cms_aff: number;
  hottok: string;
  status: string;
  cms_marketplace: number;
  cms_vendor: number;
  price: number;
  full_price: number;
  name: string;
  email: string;
  first_name: string;
  last_name: string;
  phone_number: number;
  purchase_date: string;
  prod: string;
  prod_name: string;
}
