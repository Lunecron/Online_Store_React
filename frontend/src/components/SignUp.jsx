import { useState } from "react";
import { Modal } from "./Modal";
import { InputField } from "./InputField";

export const SignUp = ({title = ""}) => {
    const [isVisible,setVisibility] = useState(false);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [location, setLocation] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    if(!isVisible) return <button onClick={()=> setVisibility(true)}>Sign Up</button>

    return(
        <Modal title={title} setVisibility={setVisibility}>
            <InputField label= "First Name:" value={firstName} setValue={setFirstName}></InputField>
            <InputField label= "Last Name:" value={lastName} setValue={setLastName}></InputField>
            <InputField label= "Location:" value={location} setValue={setLocation}></InputField>
            <InputField label= "Email:" value={email} setValue={setEmail}></InputField>
            <InputField label= "Password:" value={password} setValue={setPassword} type= "password"></InputField>
            <button>Sign Up</button>
        </Modal>
    );
};