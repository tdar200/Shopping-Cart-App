import React, { useEffect, useState } from "react";
// import { Helmet } from "react-helmet";
// import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Card, Alert, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
// import Message from "../components/Message";
// import Loader from "../components/Loader";
// import { listProducts } from "../actions/productActions";

const Home = ({ match }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [products, setProducts] = useState([]);
  //   const dispatch = useDispatch();

  //   const productList = useSelector((state) => state.productList);
  //   const { loading, error, products } = productList;

  //   useEffect(() => {
  //     dispatch(listProducts());
  //   }, [dispatch]);

  // console.log(productList);

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("http://localhost:5000/api/products");

      if (data) {
        setLoading(false);
        setProducts(data);
      }
    } catch (err) {
      setLoading(false);
      setError(err.message || err.detail);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log(products);

  return (
    <div style={{ marginTop: "2rem" }}>
      <h1 style={{ textAlign: "center" }}>All Products</h1>
      {loading ? (
        <p>loading</p>
      ) : error ? (
        <Alert variant='danger'>{error}</Alert>
      ) : (
        <Row style={{ display: "flex", justifyContent: "center" }}>
          {products &&
            products.map((product, idx) => {
              if (
                product.item_name !== "Cigarette" &&
                product.item_name !== "Delivery Charges" &&
                product.item_name !== "Crockery" &&
                product.item_name !== "Gajjar-ka-Halwa" &&
                product.item_name !== "Biscuit" &&
                product.item_name !== "Deals" &&
                product.item_name !== "Sample name"
              ) {
                return (
                  <Col
                    key={product._id}
                    sm={16}
                    md={6}
                    lg={4}
                    xl={3}
                    className='products-card'>
                    <Card key={idx} className='my-3 p-3 rounded'>
                      <Link
                        style={{
                          boxShadow: "0 2px 10px 0 hsl(0deg 0% 61% / 50%)",
                        }}
                        to={`/product/${product._id}`}>
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
                      </Link>

                      <Card.Body>
                        <Card.Title as='div'>
                          <strong>{product.item_name}</strong>
                        </Card.Title>
                      </Card.Body>
                    </Card>
                  </Col>
                );
              }
            })}
        </Row>
      )}
    </div>
  );
};

export default Home;
