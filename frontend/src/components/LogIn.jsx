import { useState } from "react";
import { Modal } from "./Modal";
import { InputField } from "./InputField";

export const LogIn = ({title= ""}) => {
    const [isVisible,setVisibility] = useState(false);
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    if(!isVisible) return <button onClick={()=>setVisibility(true)}>Log In</button>;
    
    return (
        <Modal title={title} setVisibility={setVisibility}>
            <InputField label="Email:" value={email} setValue={setEmail} type="email"/>
            <InputField label="Password:" value={password} setValue={setPassword} type="password"/>
            <button>Log In</button>
        </Modal>
    );
};