import { Dispatch } from "redux";
import { IProduct } from "../../types";
import firebaseApp from "../../config/firebase";
import { sendEmailReport } from "../../util/Helper";
import {
  DatabaseDispatchTypes,
  DELETE_PRODUCT,
  SET_PROCESSING_BUY,
  UPDATE_PRODUCT,
} from "./DatabaseActionTypes";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  doc,
  deleteDoc,
  setDoc,
} from "firebase/firestore";
import {
  ADD_PRODUCT,
  SET_PRODUCTS,
  SET_PRODUCT_LOADING,
} from "./DatabaseActionTypes";

const db = getFirestore(firebaseApp);

/**
 * Action to set products
 * @returns
 */
export const actionSetProducts = () => async (dispatch: Dispatch<any>) => {
  try {
    dispatch(actionProductLoading(true));

    //Reference to get products
    const productsRef = collection(db, "products");
    const result = await getDocs(productsRef);

    const products = result.docs.map((doc) => {
      const product: IProduct = {
        id: doc.id,
        name: doc.data()?.name,
        picture: doc.data()?.picture,
        price: doc.data()?.price,
        stock: doc.data()?.stock,
        sku: doc.data()?.sku,
        category: doc.data()?.category,
        trackeable: doc.data()?.trackeable,
      };
      return product;
    });

    dispatch({
      type: SET_PRODUCTS,
      payload: products,
    });
  } catch (error) {
  } finally {
    dispatch(actionProductLoading(false));
  }
};

/**
 * Action to add product
 * @param product
 * @returns
 */
export const actionAddProduct =
  (product: IProduct) => async (dispatch: Dispatch<any>) => {
    try {
      dispatch(actionProductLoading(true));

      //Reference to add product
      const productRef = await addDoc(collection(db, "products"), product);

      dispatch({
        type: ADD_PRODUCT,
        payload: {
          ...product,
          id: productRef.id,
        },
      });
    } catch (error) {
    } finally {
      dispatch(actionProductLoading(false));
    }
  };

/**
 * Action to edit product
 * @param product
 * @returns
 */
export const actionEditProduct =
  (product: IProduct) => async (dispatch: Dispatch<any>, getState: any) => {
    try {
      dispatch(actionProductLoading(true));

      //Override product
      await setDoc(
        doc(db, "products", `${product.id}`),
        {
          ...product,
        },
        { merge: true }
      );

      //
      //Check if product stock hits zero and has trackeable property.
      //If so, checks if admin email is set up.
      if (product.stock === 0 && product.trackeable) {
        const { email } = getState().settings;
        if (email) {
          sendEmailReport(product, email);
        }
      }

      //
      dispatch({
        type: UPDATE_PRODUCT,
        payload: product,
      });
    } catch (error) {
    } finally {
      dispatch(actionProductLoading(false));
    }
  };

/**
 * Action to delete a product
 * @param product
 * @returns
 */
export const actionDeleteProduct =
  (id: string) => async (dispatch: Dispatch<any>) => {
    try {
      dispatch(actionProductLoading(true));

      //Reference to delete product
      await deleteDoc(doc(db, "products", id));

      dispatch({
        type: DELETE_PRODUCT,
        payload: id,
      });
    } catch (error) {
    } finally {
      dispatch(actionProductLoading(false));
    }
  };

/**
 * Action to buy a product
 * @param product
 * @param quantity
 * @returns
 */
export const actionBuyProduct =
  (product: IProduct, quantity: number) => async (dispatch: Dispatch<any>) => {
    try {
      dispatch(actionProcessingBuy(true));

      //Update product stock
      const productUpdate = {
        ...product,
        stock: product.stock - quantity,
      };

      dispatch(actionEditProduct(productUpdate));
    } catch (error) {
    } finally {
      dispatch(actionProcessingBuy(false));
    }
  };

/**
 * Action to enable/disable product loading
 * @returns
 */
const actionProductLoading =
  (state: boolean) => async (dispatch: Dispatch<DatabaseDispatchTypes>) => {
    dispatch({
      type: SET_PRODUCT_LOADING,
      payload: state,
    });
  };

/* Action to enable/disable buy loading
 * @returns
 */
const actionProcessingBuy =
  (state: boolean) => async (dispatch: Dispatch<DatabaseDispatchTypes>) => {
    dispatch({
      type: SET_PROCESSING_BUY,
      payload: state,
    });
  };
