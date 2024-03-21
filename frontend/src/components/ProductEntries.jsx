import { useEffect, useState } from "react";
import axios from "axios";
import { Row } from "./Row";
import { ProductCard } from "./ProductCard";

export const ProductEntries = () => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const productListLink = "http://localhost:8080/api/productList";
    const [pageNumber,setPageNumber] = useState(1);
    const [totalPages,setTotalPages] = useState(1);

    useEffect(() => {
        if (!isLoading) return;

        const getProductsOnPage = async () => {
            try {
                const productLinkAndPage = productListLink+"?pageNumber="+pageNumber.toString();
                const response = await axios.get(productLinkAndPage);
                const { data } = response;
                setTotalPages(data.shift().totalPages);
                console.log("Successfully loaded products:", data);
                setProducts(() => data);
                setIsLoading(false);
            } catch (e) {
                setErrorMessage("Error loading products.");
                console.log(e);
                setIsLoading(false);
            }
        };
        getProductsOnPage();
    }, [isLoading]);

    useEffect(()=> {
        if(pageNumber > totalPages){
            setPageNumber(totalPages);
        }
        else if (pageNumber< 1){
            setPageNumber(1);
        }
    },[pageNumber]);

    
    if (isLoading) return <p>Loading...</p>;

    if (errorMessage) return <p>{errorMessage}</p>;
  
    if (products.length < 1) return <p>You have no products yet.</p>;
  
    return (
        <>
            <Row style={{flexWrap: "wrap"}}>
                {products.map((p)=> (<ProductCard key={p.id + p.title} product={p}></ProductCard>))}
            </Row>   
            <Row>
                {pageNumber === 1 ? (
                <button disabled onClick={()=>{
                    if (pageNumber> 1){
                        setPageNumber(pageNumber-1);
                        
                    }
                    else{
                        setPageNumber(1);
                    }
                    setIsLoading(true);
                    
                }}>Prev Page</button>)
                :(
                    <button onClick={()=>{
                        if (pageNumber> 1){
                            setPageNumber(pageNumber-1);
                            
                        }
                        else{
                            setPageNumber(1);
                        }
                        setIsLoading(true);
                        
                    }}>Prev Page</button>)
                }
                <p>Page {pageNumber} / {totalPages}</p>
                {pageNumber === totalPages ? 
                    (<button disabled onClick={()=>{
                        if (pageNumber< totalPages){
                            setPageNumber(pageNumber+1);
                        }
                        else{
                            setPageNumber(totalPages);
                        }
                        setIsLoading(true);
                        
                    }}>Next Page</button>)
                    : (
                        <button onClick={()=>{
                            if (pageNumber< totalPages){
                                setPageNumber(pageNumber+1);
                            }
                            else{
                                setPageNumber(totalPages);
                            }
                            setIsLoading(true);
                            
                        }}>Next Page</button>
                    )
                }
                
            </Row>   
        </>  
    );
}