import "./App.css";
import { useContext } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import HomeScreen from "./screen/HomeScreen";
import ProductScreen from "./screen/ProductScreen";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { LinkContainer } from "react-router-bootstrap";
import Badge from 'react-bootstrap/Badge';
import Nav from 'react-bootstrap/Nav';
import { Store } from "./Store";
import CartScreen from "./screen/CartScreen";


function App() {

  const { state } =useContext(Store);
  const { cart } = state;


  return (
    <BrowserRouter>
      <div className="d-flex flex-column site-container">
        <header>
          <Navbar bg="dark" variant="dark">
            <Container>
              <LinkContainer to="/">
                <Navbar.Brand> webstore</Navbar.Brand>
              </LinkContainer>
              <Nav className='me-auto'>
                <Link to='/cart' className='nav-link'>
                  Cart
                  {cart.cartItems.length > 0 && (
                    <Badge pill='danger'>
                      {cart.cartItems.reduce((a,c) => a + c.quantity, 0)}
                    </Badge>
                  )}
                </Link>
              </Nav>
            </Container>
          </Navbar>
          {/* <a href="/">webstore</a> */}
        </header>
        <main>
          <Container>
            <Routes>
              <Route path="/product/:slug" element={<ProductScreen />} />
              <Route path="/cart" element={<CartScreen />} />
              <Route path="/" element={<HomeScreen />}></Route>
            </Routes>
          </Container>
        </main>
        <footer>
          <div className="text-center">@2023 All rights reserved</div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
