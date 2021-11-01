import React from "react";
import { Container, Grid } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { ProductCard } from "../components/ProductCard";
import { WindowToolbar } from "../components/WindowToolbar";
import { actionBuyProduct } from "../state/actions/DatabaseActions";
import { RootStore } from "../state/Store";
import { IProduct } from "../types";
import toast from "react-hot-toast";

const Shop: React.FC = () => {
  //Redux
  const { products, processingBuy } = useSelector(
    (state: RootStore) => state.database
  );
  const dispatch = useDispatch();

  /**
   * Handle buy process
   * @param product
   * @param quantity
   */
  const handleBuyProduct = (product: IProduct, quantity: number) => {
    dispatch(actionBuyProduct(product, quantity));
    toast.success("Your order is being proccesing...");
  };

  return (
    <Container>
      {/** First Row */}
      <Grid container spacing={3} style={{ alignItems: "center" }}>
        <WindowToolbar title="Shop" />
      </Grid>

      {/** Second Row */}
      <Grid container spacing={3}>
        {products.length > 0 &&
          products.map((product, index) => (
            <ProductCard
              key={index}
              product={product}
              onBuy={handleBuyProduct}
            />
          ))}
      </Grid>
    </Container>
  );
};

export default Shop;
