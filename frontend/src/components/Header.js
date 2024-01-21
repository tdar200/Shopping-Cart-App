import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <Navbar
        style={{ backgroundColor: "#ed1c24" }}
        variant='dark'
        expand='lg'
        collapseOnSelect>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse
          style={{
            backgroundColor: "#ed1c24",
            zIndex: 1,
            transition: "none 0s ease 0s",
          }}
          id='basic-navbar-nav'>
          <Nav style={{ textTransform: "uppercase" }} className='ml-auto '>
            <Link style={{ color: "white" }} to={`/cart`}>
              CART
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
};

export default Header;
