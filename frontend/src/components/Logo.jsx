import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";

export const Logo = ({src=logo, style}) =>{
    const navigate = useNavigate();

    return(
        <img src={src} style={{minHeight: "20px", maxHeight:"60px", aspectRatio: "1:1", ...style}} onClick={()=> navigate("/")}></img>
    );
};