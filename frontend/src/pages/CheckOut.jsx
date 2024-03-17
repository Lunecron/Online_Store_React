import { useContext, useEffect, useState } from "react";
import { Column } from "../components/Column";
import { CartItemsList } from "../components/CartItemsList";
import { useNavigate } from "react-router-dom";
import { ConfirmModal } from "../components/ConfirmModal";
import { Row } from "../components/Row";
import { CartContext } from "../context/CartProvider";

export const CheckOut = () => {
    const [isConfirmed,setIsConfirmed] = useState(false);
    const [, setCartItems] = useContext(CartContext);
    const navigate = useNavigate();
    const waitTime = 5 * 1000;
    const [timeRemaining, setTimeRemaining]= useState(waitTime / 1000);

    useEffect(()=>{
        if(isConfirmed){
            setCartItems([]);
            setTimeout(()=> navigate("/"),waitTime);
            setInterval(()=> setTimeRemaining((pre) => pre-1), 1000);
        }
    },[isConfirmed]);
    return (
        <Column>
            {isConfirmed ? (
            <p>
                Thank you, your order has been confirmed. You will be redirected in {timeRemaining} seconds.
            </p>)
            : (<Column>
                <h2>User Info:</h2>
                <CartItemsList/>
                <Row style={{justifyContent: "center"}}>
                    <ConfirmModal label={"Confirm Order"} setIsConfirmed={setIsConfirmed}/>
                    <button onClick={()=> {navigate("/")}}>Continue Shopping</button>
                </Row>

            </Column>
            )}
        
        </Column>
    
    ) 
};