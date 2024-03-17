import { useContext } from "react";
import Placeholder from "../assets/placeholder.jpg";
import { Row } from "./Row";
import { CartContext } from "../context/CartProvider";
import { updateItemInCart } from "../utils/cartManagement";

export const CartItem= ({index,item})=>{
    const [cartItems,setCartItems] = useContext(CartContext);

    return(
        <>
            <div style={{ display: "flex",
                border: "1px solid lightgrey",
                justifyContent: "center",
                margin: "0px 40px 0px 40px",
                aspectRatio: 1/1,
                minWidth: "50px",
                minHeight: "50px",
                backgroundColor: "red"}}>
                <img src={item.imageSource || Placeholder} style={{width: "100%",height: "100%", objectFit: "contain", backgroundColor:"white"}}></img>
            </div>
            
            <p style={{textAlign:"left"}}>{item.title}</p>
            <p style={{textAlign:"left"}}>${item.price}</p>
            <Row>
                <button onClick={() => setCartItems((pre) => updateItemInCart("remove",item,pre))}>-</button>
                <p style={{textAlign:"center"}}>{item.count}</p>
                <button onClick={() => setCartItems((pre) => updateItemInCart("add",item,pre))}>+</button>
            </Row>
            <button onClick={() => setCartItems((pre) => updateItemInCart("delete",item,pre))} >Remove</button>
        </>
    )

}