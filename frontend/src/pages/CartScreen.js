import React from "react";
import { Link } from "react-router-dom";
import { Row, Col, Image, Button, Alert } from "react-bootstrap";

const CartScreen = () => {
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  return (
    <Col>
      <h1
        style={{
          textAlign: "center",
          fontFamily: "Montserrat,sans-serif",
          fontWeight: "900",
          color: "#4a4a4a",
        }}>
        Cart
      </h1>
      <div style={{ display: "flex", width: "100%", flexDirection: "column" }}>
        {cartItems.length === 0 ? (
          <Alert>
            Your Cart is Empty <Link to='/'>Go Back</Link>
          </Alert>
        ) : (
          <div style={{ width: "100%" }}>
            {cartItems.length > 0 &&
              cartItems.map((item, index) => {
                return (
                  <Row
                    key={item.vid}
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      flexBasis: "33.3%",
                      padding: "10px",
                      alignItems: "center",
                      textAlign: "center",
                    }}>
                    <Col md={2}>
                      <Link to={`/product/${item.product}`}>
                        <Image
                          style={{
                            objectFit: "cover",
                            height: "150px",
                            width: "150px",
                          }}
                          src={item.image}
                          fluid
                          rounded></Image>
                      </Link>
                    </Col>
                    <Col>x {item.qty}</Col>
                    <Col md={3}>
                      <Row>
                        <h4>{item.option1_value}</h4>
                      </Row>
                      <Row>{item.option2_value}</Row>
                      <Row>{item.name}</Row>
                    </Col>

                    <Col md={2}>Rs.{item.price}</Col>
                  </Row>
                );
              })}
          </div>
        )}

        <Row
          style={{
            width: "100%",
            height: "fit-content",
            display: "flex",
            alignSelf: "center",
            justifyContent: "center",
            margin: "2rem",
          }}>
          <Row style={{ border: "1px solid rgba(0, 0, 0, 0.125" }}>
            <h3 style={{ marginLeft: "1rem" }}>
              Subtotal:{" "}
              {
                <p>
                  Rs.
                  {cartItems
                    .reduce((acc, item) => acc + item.qty * item.price, 0)
                    .toFixed(0)}
                </p>
              }
            </h3>
          </Row>
        </Row>
      </div>
    </Col>
  );
};

export default CartScreen;
