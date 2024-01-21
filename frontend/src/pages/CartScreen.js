import React, { useEffect, useState } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Image, Button, Alert } from "react-bootstrap";
// import Message from "../components/Message";
// import { addToCart, removeFromCart } from "../actions/cartActions";

const CartScreen = () => {
  //   const match = useMatch();
  const location = useLocation();
  const params = useParams();
  //   console.log({ match, location });

  const productId = params.id;
  const qty = location.search ? Number(location.search.split("=")[2]) : 1;
  const vid = location.search && location.search.split("=")[1].split("?")[0];

  console.log({ location });
  //   const [cartItems, useCartItems] = useState([]);

  //   const dispatch = useDispatch();

  //   const cart = useSelector((state) => state.cart);
  //   const { cartItems } = cart;

  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  console.log({ cartItems });

  // useEffect(() => {
  //   if (productId) {
  //     dispatch(addToCart(productId, qty, vid));
  //   }
  // }, [dispatch, productId, qty, vid]);

  // const removeFromCartHandler = (id) => {
  //   dispatch(removeFromCart(id));
  // };

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

                    <Col md={2}>
                      <Button
                        type='button'
                        variant='light'
                        // onClick={() => removeFromCartHandler(item.vid)}
                      >
                        <i className='fas fa-trash' />
                      </Button>
                    </Col>
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
