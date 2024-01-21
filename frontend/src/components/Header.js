import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const Header = () => {
  //   let validUser = localStorage.getItem("uniqueUser");

  //   if (!validUser) {
  //     const uniqueId = uuidv4();
  //     localStorage.setItem("uniqueUser", uniqueId);
  //     validUser = uniqueId;
  //   }

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
