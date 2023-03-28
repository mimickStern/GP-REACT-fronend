import React from 'react';
import { Link } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import  Button  from 'react-bootstrap/Button';
import Rating from './Rating';
import axios from 'axios';
import { useContext } from 'react';
import { Store } from '../Store';


const Product = (props) => {
  const {product} = props;

  const { state, dispatch: ctxDispatch} = useContext(Store);
  const  {cart}  = state;

    const addToCartHandler = async(product) => {
    
      const existItem = cart.cartItems.find((x) => x._id === product._id);
      const quantity = existItem ? existItem.quantity + 1 : 1; 
      const { data } = await axios.get(`/api/product/${product._id}`);
      console.log(data)
  
      if (data.countInStock < quantity) {
        window.alert('Product is out of stock')
        return;
      }
  
      ctxDispatch({
        type: 'CART_ADD_ITEM',
        payload: { ...product, quantity},
      });
  
    };

  return (
    <Card key={product.slug}>
    <div className="product" key={product.slug}>
                <Link to={`/product/${product.slug}`}>
                  <img src={product.image} alt="" className='card-img-top'></img>
                </Link>
                <Card.Body>
                <Link to={`/product/${product.slug}`}>
                    <Card.Title>{product.name}</Card.Title>
                  </Link>
                  <Rating rating={product.rating} numReviews={product.numReviews} />
                  <Card.Text>
                    {product.price}
                  </Card.Text>
                  {product.countInStock === 0 ? (
                    <Button variant="light" disabled>
                        Out Of Stock
                    </Button>
                ) : (
                    <Button onClick={() => addToCartHandler(product)}>Add To Cart</Button>)}
             

                  
                </Card.Body>
                
              </div>
              </Card>
  )
}

export default Product