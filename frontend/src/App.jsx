import './App.css';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { Column } from './components/Column';
import { SiteHeader } from './components/SiteHeader';
import { ProductCard } from './components/ProductCard';
import { sampleProductsList } from './assets/productList';
import { Row } from './components/Row';
import { Main } from './pages/Main';
import { CheckOut } from './pages/CheckOut';

function App() {

  return (
    <Router>
      <Column>
        <SiteHeader></SiteHeader>
        <Routes>
          <Route path= "/" element={<Main/>}/>
          <Route path= "/check-out" element={<CheckOut/>}/>
        </Routes>
      </Column>
    </Router>
    
  );
}

export default App
