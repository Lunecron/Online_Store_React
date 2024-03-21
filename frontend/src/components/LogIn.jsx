import { useState } from "react";
import { Modal } from "./Modal";
import { InputField } from "./InputField";
import axios from "axios";
import { useContext } from "react";
import { CurrentUserContext } from "../context/CurrentUserProvider";

const logInPage ="http://localhost:8080/api/sign-in";

export const LogIn = ({title= ""}) => {
    const [, , setToken] = useContext(CurrentUserContext);
    const [isVisible,setVisibility] = useState(false);
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    if(!isVisible) return <button onClick={()=>setVisibility(true)}>Log In</button>;
    
    return (
        <Modal title={title} setVisibility={setVisibility}>
            <InputField label="Email:" value={email} setValue={setEmail} type="email"/>
            <InputField label="Password:" value={password} setValue={setPassword} type="password"/>
            <button onClick={async ()=>{

            try {
                const response = await axios.post(logInPage, {email,password});

                const {data:{token}} = response;

                setToken(token);
                setVisibility(false);
            } catch (e) {
                console.log(e);
            }

            }}>Log In</button>
        </Modal>
    );
};