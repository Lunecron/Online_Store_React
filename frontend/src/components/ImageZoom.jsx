import {Modal} from "./Modal";

export const ImageZoom = ({src,title,alt,isVisible,setVisibility}) => {
    
    return(
        <>
        {isVisible && (
            <Modal title={title} setVisibility={setVisibility}>
                <div style={{backgroundColor:"black"}}>
                        <img src={src} title={title} alt={alt} 
                        style={{
                            height: "80vh",
                            maxWidth: "90vw",
                            objectFit: "contain",
                            backgroundColor: "white"
                        }}></img>

                </div>
            </Modal>
        )}
        </>
    );

};