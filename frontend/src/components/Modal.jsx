import { Column } from "./Column";
import { Row } from "./Row";

export const Modal = ({title="",children, setVisibility}) =>{
    return (
        <div>
            <div 
            style={{backgroundColor: "rgba(0,0,0,0.8)",
                width: "150vw",
                height: "150vh",
                zIndex:0,
                top: "50%",
                left: "50%",
                transform: "translate(-50%,-50%)",
                position:"absolute",
            }}
            onClick={()=> setVisibility(false)}>
            
            </div>
            <Column
                style={{position:"fixed",
                top:"50%",
                left:"50%",
                minWidth: "60vw",
                maxHeight: "90vh",
                transform: "translate(-50%,-50%)",
                backgroundColor: "black",
                border: "2px solid white",
                borderRadius: "8px",
                padding: "16px",
                overflow: "auto",
                }}
            >
                <Row 
                    style={{justifyContent: "space-between"}}
                    
                >
                <div style={{alignSelf: "center"}}>{title}</div>
                <button onClick={()=> setVisibility(false)}>X</button>
                </Row>
                {children}
            </Column>
            
        </div>

    );
};