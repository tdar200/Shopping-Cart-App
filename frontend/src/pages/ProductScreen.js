import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Row, Col, Card, Button, Alert } from "react-bootstrap";
import axios from "axios";

const ProductScreen = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [product, setProduct] = useState([]);

  const params = useParams();
  const navigate = useNavigate();

  const cartItems = useMemo(() => {
    const fromLocalStorage =
      JSON.parse(localStorage.getItem("cartItems")) || [];
    return fromLocalStorage;
  }, []);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:5000/api/products/${params?.id}`
      );

      if (data) {
        setLoading(false);
        setProduct(data);
      }
    } catch (err) {
      setLoading(false);

      setError(err.message || err.detail);
    }
  };

  useEffect(() => {
    fetchProduct().then(() => {
      if (cartItems && product) {
        setProduct((prevProduct) => {
          const updatedVariants = prevProduct.variants.map((variant) => {
            const cartItem = cartItems.find(
              (item) => item.vid === variant.variant_id
            );

            if (cartItem) {
              return { ...variant, quantity: cartItem.qty };
            }

            return variant;
          });

          return {
            ...prevProduct,
            variants: updatedVariants,
          };
        });
      }
    });
  }, []);

  const decrement = (index) => {
    setProduct((prevProduct) => {
      const updatedVariants = [...prevProduct.variants];
      const updatedItem = { ...updatedVariants[index] };

      updatedItem.quantity =
        updatedItem.quantity >= 1 ? updatedItem.quantity - 1 : 0;
      updatedVariants[index] = updatedItem;

      return {
        ...prevProduct,
        variants: updatedVariants,
      };
    });
  };

  const increment = (index) => {
    setProduct((prevProduct) => {
      const updatedVariants = [...prevProduct.variants];
      const updatedItem = { ...updatedVariants[index] };

      updatedItem.quantity = updatedItem.quantity
        ? updatedItem.quantity + 1
        : 1;
      updatedVariants[index] = updatedItem;
      return {
        ...prevProduct,
        variants: updatedVariants,
      };
    });
  };

  const addToCartHandler = (vid, variantName, index) => {
    console.log({ cartItems });
    const { _id, quantity, option1_value, option2_value, default_price } =
      product.variants[index];

    const payload = {
      product: _id,
      name: product.item_name,
      image: product.image_url,
      price: default_price,
      option1_value,
      option2_value,
      qty: quantity,
      vid,
    };

    const foundItem = cartItems.find((item) => item.vid === vid);

    if (foundItem) {
      foundItem.qty = quantity;
    } else {
      cartItems.push(payload);
    }

    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  };

  return (
    <div style={{ marginTop: "2rem" }}>
      {loading ? (
        <p>Loading</p>
      ) : error ? (
        <Alert variant='danger'>{error}</Alert>
      ) : (
        <>
          <h1 style={{ textAlign: "center" }}>
            <strong>{product?.item_name}</strong>
          </h1>
          <Row style={{ display: "flex", justifyContent: "center" }}>
            {product?.variants?.length > 0 &&
              product?.variants.map((item, index) => {
                return (
                  <Col
                    style={{ padding: "5px" }}
                    sm={16}
                    md={6}
                    lg={4}
                    xl={3}
                    key={index}>
                    <Card className='my-3 p-3 rounded'>
                      {item.option1_value && (
                        <Card.Text
                          style={{ textAlign: "center", marginBotton: "10px" }}
                          as='div'>
                          <strong> {item.option1_value} </strong>
                        </Card.Text>
                      )}
                      <Card.Img
                        style={{
                          width: "100%",
                          height: "350px",
                          borderRadius: 3,
                          objectFit: "cover",
                        }}
                        src={product.image_url}
                        variant='top'
                      />

                      <Card.Body>
                        {item.option2_value && (
                          <Card.Text>{item.option2_value}</Card.Text>
                        )}
                        <Card.Title>Rs. {item.default_price}</Card.Title>

                        <Col
                          style={{
                            marginTop: "10px",
                            marginBottom: "5px",
                            width: "100%",
                          }}
                          className='text-center py-3'>
                          <Button
                            type='button'
                            onClick={() => decrement(index)}
                            style={{
                              backgroundColor: "red",
                              alignContent: "center",
                              display: "inline-flex",
                              marginInline: "10px",
                            }}>
                            -
                          </Button>

                          <Card.Subtitle
                            style={{
                              marginInline: "10px",
                              alignContent: "center",
                              display: "inline-flex",
                            }}>
                            Quantity : {item.quantity ?? 0}
                          </Card.Subtitle>

                          <Button
                            type='button'
                            onClick={() => increment(index)}
                            style={{
                              backgroundColor: "red",
                              alignContent: "center",
                              display: "inline-flex",
                              marginInline: "10px",
                            }}>
                            +
                          </Button>
                        </Col>

                        <Button
                          onClick={() =>
                            addToCartHandler(
                              item.variant_id,
                              item.option1_value,
                              index
                            )
                          }
                          className='social-media'
                          type='button'
                          style={{
                            width: "100%",
                            backgroundColor: "red",
                            fontSize: "0.6em",
                          }}>
                          ADD TO CART
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                );
              })}
          </Row>
        </>
      )}
    </div>
  );
};

export default ProductScreen;
