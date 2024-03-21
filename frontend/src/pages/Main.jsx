import { Row } from "../components/Row";
import { sampleProductsList } from "../assets/productList";
import { ProductCard } from "../components/ProductCard";
import { ProductEntries } from "../components/ProductEntries";
import { useEffect, useState } from "react";

export const Main = () =>{
    /*return (
    <Row style={{flexWrap: "wrap"}}>
        {sampleProductsList.map((p)=> (<ProductCard key={p.id + p.title} product={p}></ProductCard>))}
    </Row>   
  );
  */
      return( 
      <>
        <ProductEntries>
        </ProductEntries>   
      </>
      )
};