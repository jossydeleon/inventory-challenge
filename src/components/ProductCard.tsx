import * as React from "react";
import { IProduct } from "../types";
import styled from "styled-components";
import { StepperCount } from "./StepperCount";
import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  makeStyles,
  Button,
} from "@material-ui/core";

interface ProductCardProps {
  product: IProduct;
  onBuy: (product: IProduct, quantity: number) => void;
}

const useStyles = makeStyles(() => ({
  root: {
    borderRadius: 16,
    transition: "0.2s",
    "&:hover": {
      transform: "scale(1.1)",
    },
  },
  card: {
    minWidth: 250,
    width: 280,
    borderRadius: 16,
  },
  media: {
    height: 200,
    width: "100%",
    objectFit: "contain",
  },
  content: {
    backgroundColor: "white",
    padding: "1rem 1.5rem 1.5rem",
  },
  title: {
    fontSize: "1.2rem",
    textTransform: "capitalize",
    textAlign: "center",
    fontWeight: "bold",
    paddingBottom: 13,
  },
  stock: {
    fontSize: "0.8rem",
  },
  price: {
    fontWeight: "bold",
    fontSize: "1rem",
  },
  input: {
    paddingRight: 50,
  },
  button: {
    paddingLeft: 20,
    paddingRight: 20,
  },
}));

const Flex = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const ProductCard: React.FC<ProductCardProps> = ({ product, onBuy }) => {
  const classes = useStyles();

  const [quantity, setQuantity] = React.useState(0);

  const handleSubmit = () => {
    //reset quantity
    setQuantity(0);
    onBuy(product, quantity);
  };

  return (
    <Grid item>
      <div className={classes.root}>
        <Card className={classes.card}>
          <CardMedia
            component="img"
            image={product.picture}
            className={classes.media}
          />
          <CardContent className={classes.content}>
            <Typography className={classes.title} variant={"h2"}>
              {product.name}
            </Typography>
            <Flex style={{ paddingBottom: 20 }}>
              <Typography
                className={classes.stock}
              >{`${product.stock} in Stock`}</Typography>
              <Typography className={classes.price}>{`$${product.price.toFixed(
                2
              )}`}</Typography>
            </Flex>
            <Flex>
              <StepperCount max={product.stock} onChangeValue={setQuantity} />

              <Button
                color="primary"
                type="submit"
                variant="contained"
                className={classes.button}
                fullWidth
                disabled={quantity <= 0}
                onClick={handleSubmit}
              >
                Buy
              </Button>
            </Flex>
          </CardContent>
        </Card>
      </div>
    </Grid>
  );
};
