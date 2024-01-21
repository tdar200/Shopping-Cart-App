import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { Container } from "react-bootstrap";
import ProductScreen from "./pages/ProductScreen";
import Header from "./components/Header";
import CartScreen from "./pages/CartScreen";
function App() {
  return (
    <Container>
      <Router>
        <Header />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/product/:id' element={<ProductScreen />} />
          <Route path='/cart' exact element={<CartScreen />} />
        </Routes>
      </Router>
    </Container>
  );
}

export default App;
