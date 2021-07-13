import { useState, useContext, createContext, useEffect } from "react";
import { commerce } from "../services/commerce";

const CommerceContext = createContext();

export function CommerceProvider(props) {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState({});

    const fetchProducts = async () => {
        const { data } = await commerce.products.list();
        setProducts(data);
    };

    const fetchCart = async () => {
        const cart = await commerce.cart.retrieve();
        setCart(cart);
    };

    const handleAddToCart = async (productId, quantity) => {
        const { cart } = await commerce.cart.add(productId, quantity);
        setCart(cart);
    };

    const handleUpdateCartQty = async (productId, quantity) => {
        const { cart } = await commerce.cart.update(productId, { quantity });
        setCart(cart);
    };

    const handleRemoveFromCart = async (productId) => {
        const { cart } = await commerce.cart.remove(productId);
        setCart(cart);
    };

    const handleEmptyCart = async () => {
        const { cart } = await commerce.cart.empty();
        setCart(cart);
    };

    useEffect(() => {
        fetchProducts();
        fetchCart();
    }, []);

    const api = {
        products,
        cart,
        handleAddToCart,
        handleUpdateCartQty,
        handleRemoveFromCart,
        handleEmptyCart,
    };

    return (
        <CommerceContext.Provider value={api}>
            {props.children}
        </CommerceContext.Provider>
    );
}
export const useCommerce = () => useContext(CommerceContext);
