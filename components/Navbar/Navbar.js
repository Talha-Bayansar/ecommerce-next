import React from "react";
import { ShoppingCart } from "@material-ui/icons";
import {
    AppBar,
    Badge,
    IconButton,
    Toolbar,
    Typography,
} from "@material-ui/core";
import Image from "next/image";
import useStyles from "./styles";
import Link from "next/link";

const Navbar = ({ totalItems }) => {
    const classes = useStyles();

    return (
        <>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <Link href="/">
                        <Typography
                            variant="h6"
                            className={classes.title}
                            color="inherit"
                        >
                            <Image
                                src="/vercel.svg"
                                alt="Commerce.js"
                                height="20px"
                                width="100px"
                                className={classes.image}
                            />
                            Commerce.js
                        </Typography>
                    </Link>

                    <div className={classes.grow} />

                    <div className={classes.button}>
                        <Link href="/shoppingCart">
                            <IconButton
                                aria-label="Show cart items"
                                color="inherit"
                            >
                                <Badge
                                    badgeContent={totalItems}
                                    color="secondary"
                                >
                                    <ShoppingCart />
                                </Badge>
                            </IconButton>
                        </Link>
                    </div>
                </Toolbar>
            </AppBar>
        </>
    );
};

export default Navbar;
