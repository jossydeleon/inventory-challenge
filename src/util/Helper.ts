import axios from "axios";
import { IProduct } from "../types";

const API = process.env.REACT_APP_MAIL_SERVER;

/**
 * Add 2 decimals to number
 * @param value number
 * @returns
 */
export function convertToCurrency(value: number) {
  return value.toFixed(2);
}

/**
 * Send post to remote api
 * @param product
 * @param email
 */
export async function sendEmailReport(product: IProduct, email: string) {
  try {
    await axios.post(`${API}`, {
      product: product.name,
      email,
    });
  } catch (error) {
    throw error;
  }
}
