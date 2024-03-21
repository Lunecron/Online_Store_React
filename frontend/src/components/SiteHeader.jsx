import { useContext } from "react";
import { Column } from "./Column";
import { LogIn } from "./LogIn";
import { Row } from "./Row";
import { SignUp } from "./SignUp";
import { ViewCart } from "./ViewCart";
import { CurrentUserContext } from "../context/CurrentUserProvider";
import { useNavigate } from "react-router-dom";
import { Logo } from "./Logo";


export const SiteHeader = () => {

    const [currentUser, , setToken] = useContext(CurrentUserContext);
    const navigate = useNavigate();

    return (
        <Column>
        <Row>
            <Logo></Logo>
            <h1>Ecommerce App</h1>
            <Row>
                <ViewCart title="Your Items:"></ViewCart>
                {currentUser ?
                    (<>
                        <button onClick={() => navigate("/orders")}>View Orders</button>
                        <button onClick={()=> setToken(null)}>Sign Out</button>
                    </>) 
                    : (<>
                        <SignUp title="Sign Up"/>
                        <LogIn title="Log In"/>
                    </>)
                }
            </Row>
        </Row>
        </Column>
    )
}