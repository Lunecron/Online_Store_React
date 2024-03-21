import { useContext } from "react";
import Placeholder from "../assets/placeholder.jpg";
import { Row } from "./Row";
import { CartContext } from "../context/CartProvider";
import { updateItemInCart } from "../utils/cartManagement";

export const CartItem= ({index,item,inMemory,style})=>{
    const [cartItems, setCartItems] = useContext(CartContext);
    const imagePath =  `http://localhost:8080/uploads/${item.imageSource}`

    return(
        <>
            <div style={{ display: "flex",
                border: "1px solid lightgrey",
                borderRadius: "10px",
                overflow: "clip",
                justifyContent: "center",
                margin: "0px 40px 0px 40px",
                aspectRatio: 1/1,
                minWidth: "50px",
                minHeight: "50px",
                ...style,
                }}>
                <img src={imagePath || Placeholder} style={{width: "100%",height: "100%", objectFit: "contain", backgroundColor:"white"}}></img>
            </div>
            
            <p style={{textAlign:"left" }}>{item.title}</p>
            <p style={{textAlign:"left" }}>${item.price}</p>
            {inMemory ? <>
                <Row>
                    <button  onClick={() => setCartItems((pre) => updateItemInCart("remove",item,pre))}>-</button>
                    <p style={{textAlign:"center"}}>{item.count}</p>
                    <button onClick={() => setCartItems((pre) => updateItemInCart("add",item,pre))}>+</button>
                </Row>
                <button  onClick={() => setCartItems((pre) => updateItemInCart("delete",item,pre))} >Remove</button>
            </>
            : <>
            <p>Amount: {item.count}</p>
            <p/>        
            </>
            }
             
        </>
    );

};