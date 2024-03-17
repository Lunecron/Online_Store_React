import { Row } from "../components/Row";
import { sampleProductsList } from "../assets/productList";
import { ProductCard } from "../components/ProductCard";

export const Main = () =>{
    return (
    <Row style={{flexWrap: "wrap"}}>
        {sampleProductsList.map((p)=> (<ProductCard key={p.id + p.title} product={p}></ProductCard>))}
    </Row>   
  );
};