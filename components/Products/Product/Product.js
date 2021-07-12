import React from "react";
import { AddShoppingCart } from "@material-ui/icons";
import {
    Card,
    CardActions,
    CardContent,
    CardMedia,
    IconButton,
    Typography,
} from "@material-ui/core";
import useStyles from "./styles";
import { useCommerce } from "../../../contexts/useCommerce";

const Product = ({ product }) => {
    const classes = useStyles();
    const { handleAddToCart } = useCommerce();

    return (
        <Card className={classes.root}>
            <CardMedia
                className={classes.media}
                image={product.media.source}
                title={product.name}
            />
            <CardContent>
                <div className={classes.cardContent}>
                    <Typography variant="h5" gutterBottom>
                        {product.name}
                    </Typography>
                    <Typography variant="h5">
                        {product.price.formatted_with_symbol}
                    </Typography>
                </div>
                <Typography
                    dangerouslySetInnerHTML={{ __html: product.description }}
                    variant="body2"
                    color="textSecondary"
                />
            </CardContent>
            <CardActions disableSpacing className={classes.cardActions}>
                <IconButton
                    area-label="Add to Cart"
                    onClick={() => handleAddToCart(product.id, 1)}
                >
                    <AddShoppingCart />
                </IconButton>
            </CardActions>
        </Card>
    );
};

export default Product;
