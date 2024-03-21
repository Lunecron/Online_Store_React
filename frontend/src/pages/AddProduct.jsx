import { useContext, useState } from "react";
import { Column } from "../components/Column";
import { CurrentUserContext } from "../context/CurrentUserProvider";
import { InputField } from "../components/InputField";
import axios from "axios";

export const AddProduct = () => {
    const [, token] = useContext(CurrentUserContext);
    const [title,setTitle] = useState("");
    const [altTitle,setAltTitle] = useState("");
    const [price,setPrice] = useState(0);
    const [availability,setAvailability] = useState(true);
    const [image,setImage] = useState(null);

    const [message,setMessage] = useState("");

    return(
        <Column>
            <InputField label="Product title:" value={title} setValue={setTitle}></InputField>
            <InputField label="Product alternative title:" value={altTitle} setValue={setAltTitle}></InputField>
            <InputField label="Product price:" value={price} setValue={setPrice}></InputField>
            <button onClick={()=> {
                if(availability) {
                    setAvailability(false);
                }
                else{
                    setAvailability(true);
                }
            }}>Availability: {availability.toString()}</button>
            <input label = "Product image:" name="productImage" type="file" accept=".png, .jpg, .jpeg, .svg" onChange={(e) => setImage(e.target.files[0])}></input>
            {message && <p>{message}</p>}
            <button onClick={async () => {
                const formData = new FormData();
                formData.append("title",title);
                formData.append("altTitle",altTitle);
                formData.append("price",price);
                formData.append("availability",availability);
                formData.append("productImage",image);

                try {
                    await axios.post("http://localhost:8080/api/product", formData, {
                      headers: {
                        authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                      },
                    });
        
                    setMessage("Successfully uploaded file.");
                  } catch (e) {
                    setMessage("Error uploading file.");
                    console.log(e);
                  }
            }}>Upload Product</button>
        </Column>
    );
};