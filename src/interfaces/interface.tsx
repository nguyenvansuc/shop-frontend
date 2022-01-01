export interface Product {
  title: string;
  desc: string;
  price: number;
  category: string;
  imageUrl: string;
  sale: number;
  _id: string;
}

export interface Order {
  idProduct: string | undefined;
  idUser: string | undefined;
  numberPhoneUser: string | undefined;
  titleProduct: string | undefined;
  numberProduct: number;
  addressUser: string | undefined;
  priceProduct: number;
  username?: string | undefined;
  statusOrder?: string;
  _id?: string;
}

export interface UserSignIn {
  username: string;
  password: string;
}

export interface CurrentUser {
  username: string;
  password: string;
  rules: string;
  id: string;
}

export interface StateCurrentUser {
  isSignedIn: boolean;
  currentUser: CurrentUser;
}
export interface StateAllProducts {
  isLoading: boolean;
  listProducts: any;
  error: any;
}

export interface Filter {
  title: string | null;
  category: string | null;
  sale: 'noSale' | 'sale';
}

export interface StateFilter {
  filter: Filter;
}

export interface StateDetailsProduct {
  product: Product | null;
  isLoading: boolean;
  id: string | null;
}

export interface State {
  currentUser: StateCurrentUser;
  allProducts: StateAllProducts;
  filter: StateFilter;
  detailsProduct: StateDetailsProduct;
}

export interface ProductAdd {
  title: string;
  desc: string;
  price: number;
  sale: number;
  category: string;
  imageUrl: any;
}
