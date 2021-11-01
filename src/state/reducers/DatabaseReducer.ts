import { IProduct } from "../../types";
import {
  ADD_PRODUCT,
  DatabaseDispatchTypes,
  DELETE_PRODUCT,
  SET_PRODUCTS,
  SET_PRODUCT_LOADING,
  SET_PROCESSING_BUY,
  UPDATE_PRODUCT,
} from "../actions/DatabaseActionTypes";

interface IDefaultAppState {
  products: IProduct[];
  loadingProducts: boolean;
  processingBuy: boolean;
}

const defaultState: IDefaultAppState = {
  products: [],
  loadingProducts: false,
  processingBuy: false,
};

const databaseReducer = (
  state = defaultState,
  action: DatabaseDispatchTypes
) => {
  switch (action.type) {
    case SET_PRODUCT_LOADING:
      return {
        ...state,
        loadingProducts: action.payload,
      };
    case SET_PROCESSING_BUY:
      return {
        ...state,
        processingBuy: action.payload,
      };
    case SET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };
    case ADD_PRODUCT:
      return {
        ...state,
        products: [action.payload, ...state.products],
      };
    case UPDATE_PRODUCT:
      const indexToUpdate = state.products.findIndex(
        (product) => product.id === action.payload.id
      );
      let newArray = [...state.products];
      newArray[indexToUpdate] = action.payload;
      return {
        ...state,
        products: [...newArray],
      };
    case DELETE_PRODUCT:
      return {
        ...state,
        products: state.products.filter(
          (product) => product.id !== action.payload
        ),
      };

    default:
      return state;
  }
};

export default databaseReducer;
