import { useContext } from "react";
import { Column } from "./Column";
import { Image } from "./Image";
import { Row } from "./Row";
import { CartContext } from "../context/CartProvider";
import { updateItemInCart } from "../utils/cartManagement";

export const ProductCard= ({product})=>{
    const {_id: id,title,altTitle,imageSource,price,availability} = product;
    const availabilityBool = (availability === 'true');
    const imagePath =  `http://localhost:8080/uploads/${imageSource}`;
    const [cartItems,setCartItems] = useContext(CartContext);
    

    if (availabilityBool) {
        return (
            <Column style={{width: "200px", height: "350px", margin: "8px", padding: "8px", border: "2px solid lightgray", borderRadius: "8px" , boxShadow:"5px 5px 13px 2px rgba(28,255,1,0.2)"}}>
            <Image container_style={{overflow: "clip", borderRadius:"10px"}} src={imagePath} alt={altTitle} title={title}></Image>
            <h3>{title}</h3>
            <Row>
                <h4>${price}</h4>
                {!availabilityBool && <p style={{color: "red" , fontStyle: "italic"}}>Out of Stock</p>}
            </Row>
            <button onClick={()=>setCartItems( (pre) => updateItemInCart("add", product, pre))} disabled= {!availabilityBool}>Add to 🛒</button>
            </Column>
    
        );
    }
    else{
        return (
            <Column style={{width: "200px", height: "350px", margin: "8px", padding: "8px", border: "2px solid darkred", borderRadius: "8px", boxShadow: "5px 5px 13px 2px rgba(167,49,49,0.2)"}}>
            <Image container_style={{overflow: "clip", borderRadius:"10px"}} src={imagePath} alt={altTitle} title={title}></Image>
            <h3>{title}</h3>
            <Row>
                <h4>${price}</h4>
                {!availabilityBool && <p style={{color: "red" , fontStyle: "italic"}}>Out of Stock</p>}
            </Row>
            <button onClick={()=>setCartItems( (pre) => updateItemInCart("add", product, pre))} disabled= {!availabilityBool}>Add to 🛒</button>
            </Column>
    
        );
    }
    
};