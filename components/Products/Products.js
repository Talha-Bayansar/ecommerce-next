import { CircularProgress, Grid } from "@material-ui/core";
import React from "react";
import { useCommerce } from "../../contexts/useCommerce";
import Product from "./Product/Product";
import useStyles from "./styles";

const Products = ({ onAddToCart }) => {
    const classes = useStyles();
    const { products } = useCommerce();

    if (!products.length)
        return (
            <div className={classes.progressIndicator}>
                <CircularProgress />
            </div>
        );

    return (
        <main className={classes.content}>
            <div className={classes.toolbar} />
            <Grid container justifyContent="center" spacing={4}>
                {products.map((product) => (
                    <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                        <Product product={product} onAddToCart={onAddToCart} />
                    </Grid>
                ))}
            </Grid>
        </main>
    );
};

export default Products;
