import { useContext, useState } from "react";
import { Modal } from "./Modal";
import { Column } from "./Column";
import { Row } from "./Row";
import { CurrentUserContext } from "../context/CurrentUserProvider";
import { CartContext } from "../context/CartProvider";
import { getCartTotal, getNumberOfItemsInCart } from "../utils/cartManagement";
import axios from "axios";

export const ConfirmModal = ({setIsConfirmed,label})=> {
    const [cartItems] = useContext(CartContext);
    const [currentUser,token,] = useContext(CurrentUserContext);
    const [isVisible,setVisibility] = useState(false);
    const postOrderLink = "http://localhost:8080/api/place-order";

    return(
        <>
            <button onClick={()=>setVisibility(true)}>{label}</button>
            {isVisible && (
            <Modal setVisibility={setVisibility}>
                <Column>
                    <h3>Are you sure?</h3>
                    <Row style={{justifyContent: "center"}}>
                        <button onClick={async ()=>{
                            try{
                                const cartTotal = getCartTotal(cartItems);
                                const numberOfItems = getNumberOfItemsInCart(cartItems);
                                await axios.post(postOrderLink, {...currentUser,cartItems,cartTotal,numberOfItems},{headers: {authorization : `Bearer ${token}`}});
                                setIsConfirmed(true); 
                                setVisibility(false);
                            }catch(e){
                                console.log("Error placing order.", e);
                            }
                            }}>Confirm</button>
                        <button onClick={()=>{setVisibility(false);}}>Cancel</button>
                    </Row>
                </Column>

            </Modal>)}
        </>
    );
};