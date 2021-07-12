import React from "react";
import { useCommerce } from "../../contexts/useCommerce";
import Navbar from "../Navbar/Navbar";

export const Layout = ({ children }) => {
    const { cart } = useCommerce();

    return (
        <>
            <Navbar totalItems={cart.total_items} />
            <div>{children}</div>
        </>
    );
};
