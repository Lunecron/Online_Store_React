import './App.css'
import { Column } from './components/Column'
import { SiteHeader } from './components/SiteHeader'
import { TestModal } from './components/TestModal'
import { ProductCard } from './components/ProductCard'
import { sampleProductsList } from './assets/productList'
import { Row } from './components/Row'

function App() {

  return (
    <Column>
      <SiteHeader></SiteHeader>
      <Row style={{flexWrap: "wrap"}}>
        {sampleProductsList.map((p)=> (<ProductCard key={p.id + p.title} product={p}></ProductCard>))}
      </Row>
      
    </Column>
  );
}

export default App
