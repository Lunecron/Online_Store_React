import { useContext, useState } from "react";
import { Modal } from "./Modal";
import { InputField } from "./InputField";
import axios from "axios";
import { CurrentUserContext } from "../context/CurrentUserProvider";

export const SignUp = ({title = ""}) => {
    const [user,token,setToken] = useContext(CurrentUserContext);

    const [isVisible,setVisibility] = useState(false);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [location, setLocation] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isSubmitted,setIsSubmitted] = useState(false);
    const [errorMessage,setErrorMessage] = useState("");
    const signUpPage = "http://localhost:8080/api/signup";

    const emptyFormFields = !firstName || !lastName || !location || !email || !password || !confirmPassword;

    const passwordNoMatch = password !== confirmPassword;

    const validateEmail = (email) => {
        // Define the regular expression pattern
        const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

        return emailRegex.test(String(email).toLowerCase());
    };

    

    const validatePassword = (password) => {
       if(password.length >= 6){
        return true;
       }
       else{
        return false;
       }
    };

    

    if(!isVisible) return <button onClick={()=> setVisibility(true)}>Sign Up</button>

    return(
        <Modal title={title} setVisibility={setVisibility}>
            <InputField label= "First Name:" value={firstName} setValue={setFirstName}></InputField>
            <InputField label= "Last Name:" value={lastName} setValue={setLastName}></InputField>
            <InputField label= "Location:" value={location} setValue={setLocation}></InputField>
            <InputField label= "Email:" value={email} setValue={setEmail}></InputField>
            <InputField label= "Password:" value={password} setValue={setPassword} type= "password"></InputField>
            <InputField label= "Confirm Password:" value={confirmPassword} setValue={setConfirmPassword} type= "password"></InputField>

            {errorMessage && <div style={{ border: "2px solid red", borderRadius: "10px"}}> <p style={{color:"red"}}>{errorMessage}</p></div>}
            
            <button onClick={async ()=>{

                let errorText = "";
                setIsSubmitted(true);

                if(emptyFormFields) errorText += "All fields are required. \n";

                if(!validateEmail(email)) errorText += "Please enter a valid email. \n";

                if(!validatePassword(password)) errorText += "Password needs to be at least 6 characters long. \n";

                if(passwordNoMatch) errorText += "Password and Confirm Password are not the same. \n";
                
                setErrorMessage(errorText);
                if(errorText !== "") return ;

                try {
                    const response = await axios.post(signUpPage, {firstName,lastName,email,password,location});

                    const {data:{token}} = response;
                
                    setToken(token);
                    setVisibility(false);
                } catch (e) {
                    if(e.response.status === 409){
                        setErrorMessage("Email already in use.");
                    }
                    else{
                        setErrorMessage("Error creationg user");
                        console.log(e);
                    }
                    
                }


            }}>Sign Up</button>
        </Modal>

    );
};