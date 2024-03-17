import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom";
import { Modal } from "./Modal"
import { CartContext } from "../context/CartProvider";
import { getNumberOfItemsInCart } from "../utils/cartManagement";
import { CartItemsList } from "./CartItemsList";

export const ViewCart= ({title}) => {
    const [cartItems] = useContext(CartContext);
    const [isVisible, setVisibility] = useState(false);
    const navigate = useNavigate();

    const numberOfItemsInCart = getNumberOfItemsInCart(cartItems);
    return (
        <>
            <button onClick={()=> setVisibility(true)}>🛒 {numberOfItemsInCart > 0 ? `(${numberOfItemsInCart})`: ""}</button>

            {isVisible && (<Modal title = {title} setVisibility={setVisibility}>
                <CartItemsList/>
                {numberOfItemsInCart > 0 ?
                    <button onClick={()=>{
                        navigate("/check-out");
                        setVisibility(false);
                    } }>Check Out 🛒</button>
                : <></>}
            </Modal>
            

            
            )}
        </>
        
    )
}