import { useState } from "react";
import { Modal } from "./Modal";

export const TestModal = () => {
    const [isVisible,setVisibility] = useState(false);

    if(!isVisible) return <button onClick={()=>setVisibility(true)}>Show Modal</button>;
    
    return (
        <Modal setVisibility={setVisibility}>
            <p>Test Modal</p>
        </Modal>
    );
};