import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";

const HomeScreen = () => {
  const [products, setProducts] = useState([]);
  console.log(products)
  
  useEffect(() => {
    const fetchData = async () => {
      
      const result = await axios.get('/api/products');

      setProducts(result.data);
      
    };

  fetchData()
    
  }, [])
  
  console.log(products)
  return (
    <div>
      <h1>Featured Products</h1>
      <div className="products">
        {products.map((product) => (
          <div className="product" key={product.slug}>
            <Link to={`/product/${product.slug}`}>
              <img src={product.image} alt=""></img>
            </Link>
            <div className="product-info">
              <Link href={`/product/${product.slug}`}>
                <p>{product.name}</p>
              </Link>
              <p>
                <strong>{product.price}</strong>
              </p>
              <button>Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeScreen;