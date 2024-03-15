import Placeholder from "../assets/placeholder.jpg";
import { ImageZoom } from "./ImageZoom";
import { useState } from "react";

export const Image = ({src=Placeholder, title, alt, style}) =>{

    const [isVisible,setVisibility] = useState(false);

    return (
        <>
            <div 
                style={{display: "flex",
                placeItems: "center",
                border: "1px solid lightgrey",
                minHeight: "200px",
                backgroundColor:"white",
                cursor : "pointer"
                }}
                onClick={()=>setVisibility(true)}
            >
                    <img src={src} title={title} alt={alt} style={{width: "100%",height: "100%", objectFit: "contain",...style}}/>

            </div>
            <ImageZoom src={src} isVisible={isVisible} setVisibility={setVisibility} alt={alt} title={title}/>
        </>
    )
}