import axios from "axios";
import { IProduct } from "../types";

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
    const result = await axios.post("https://fncapi.vercel.app/api/mailer", {
      product: product.name,
      email,
    });

    console.log(JSON.stringify(result));
  } catch (error) {
    throw error;
  }
}
