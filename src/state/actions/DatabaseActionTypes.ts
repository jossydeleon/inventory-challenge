import { IProduct } from "../../types";

//Action types for settings reducer
export const SET_PRODUCT_LOADING = "@setProductLoading";
export const SET_PRODUCTS = "@setProducts";
export const ADD_PRODUCT = "@addProduct";
export const DELETE_PRODUCT = "@deleteProduct";
export const UPDATE_PRODUCT = "@editProduct";
export const SET_PROCESSING_BUY = "@processingBuy";

export interface setProductLoading {
  type: typeof SET_PRODUCT_LOADING;
  payload: boolean;
}

export interface setProccessingBuy {
  type: typeof SET_PROCESSING_BUY;
  payload: boolean;
}

export interface setProducts {
  type: typeof SET_PRODUCTS;
  payload: IProduct[];
}

export interface addProduct {
  type: typeof ADD_PRODUCT;
  payload: IProduct;
}

export interface editProduct {
  type: typeof UPDATE_PRODUCT;
  payload: IProduct;
}

export interface deleteProduct {
  type: typeof DELETE_PRODUCT;
  payload: string;
}

export type DatabaseDispatchTypes =
  | setProductLoading
  | setProccessingBuy
  | setProducts
  | addProduct
  | editProduct
  | deleteProduct;
