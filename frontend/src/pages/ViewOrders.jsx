import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../context/CurrentUserProvider";
import axios from "axios";
import { Column } from "../components/Column";
import { CartItemsList } from "../components/CartItemsList";
import { Row } from "../components/Row";


export const ViewOrders = () => {
    const [, token] = useContext(CurrentUserContext);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const [orders, setOrders] = useState([]);

    const orderPageLink = "http://localhost:8080/api/orders";


    if (!token) return;

    useEffect(() => {
        if (!isLoading) return;

        const getUserOrders = async () => {
            try {
                const response = await axios.get(orderPageLink, {
                    headers: { authorization: `Bearer ${token}` },
                });

                const { data } = response;
                console.log("Successfully loaded orders:", data);
                setOrders(() => data);
                setIsLoading(false);
            } catch (e) {
                setErrorMessage("Error loading orders.");
                console.log(e);
                setIsLoading(false);
            }
        };
        getUserOrders();
    }, [isLoading]);

    if (isLoading) return <p>Loading...</p>;

    if (errorMessage) return <p>{errorMessage}</p>;
  
    if (orders.length < 1) return <p>You have no orders yet.</p>;
  
    return (
      <Column>
        <h3>Your orders:</h3>
        {orders.map((o) => (
            <Column key={o._id} style={{ borderBlockEnd: "2px solid white" , backgroundColor: "#1a1a1a" , borderRadius: "10px"}}>
              <p style={{fontSize: "12px"}}>Order id: {o._id}</p>
              <p style={{fontSize: "12px"}}>
                Order information: {o.firstName} {o.lastName}, {o.location}
              </p>
              <p style={{fontSize: "12px"}}>Order date: {new Date(o.orderDate).toString()}</p>
              <CartItemsList
                inMemory={false}
                cartItemsProp={o.cartItems}
                item_style={{maxHeight: "80px"}}
              />
            </Column>
        ))}
      </Column>
    );
};