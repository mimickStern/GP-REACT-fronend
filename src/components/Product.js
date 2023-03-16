import React from 'react';
import { Link } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import  Button  from 'react-bootstrap/Button';


const Product = (props) => {
    const {product} = props;
  return (
    <Card key={product.slug}>
    <div className="product" key={product.slug}>
                <Link to={`/product/${product.slug}`}>
                  <img src={product.image} alt=""></img>
                </Link>
                <Card.Body>
                <Link href={`/product/${product.slug}`}>
                    <Card.Title>{product.name}</Card.Title>
                  </Link>
                  <Card.Text>
                    {product.price}
                  </Card.Text>
                  <Button>Add To Cart</Button>
                </Card.Body>
                
              </div>
              </Card>
  )
}

export default Product