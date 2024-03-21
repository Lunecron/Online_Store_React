import { useContext } from "react";
import { CartContext } from "../context/CartProvider";
import { CartItem } from "./CartItem";
import { getCartTotal, getNumberOfItemsInCart } from "../utils/cartManagement";

export const CartItemsList = ({inMemory = true, cartItemsProp = [] , style ,grid_style, item_style})=>{
    const cartItems = inMemory ? useContext(CartContext)[0] : cartItemsProp;
    const numberOfItems = getNumberOfItemsInCart(cartItems);
    const totalPrice = getCartTotal(cartItems);

    return (
        <div style={{...style,}}>
            <div 
            style = {{
                display: "grid",
                gap : "8px 8px",
                gridTemplateColumns: "2fr 5fr 2fr 2fr 1fr",
                justifyContent:"space-between",
                alignItems: "center",
                ...grid_style,
            }}>
                {cartItems.map((item,index)=> (<CartItem key={item.id + item.title} index = {index} item={item} inMemory={inMemory} style={item_style} />
                ))}
            </div>

            {numberOfItems > 0 ? 
            <div>
                <p>Number of Items in cart: {numberOfItems}</p>
                <p>Your total is: ${totalPrice}</p>
            </div> 
            : <p>Empty</p>}
            
            
            
            
        </div>
    );

};