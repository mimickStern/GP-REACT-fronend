import React, { useContext, useEffect, useReducer } from 'react'
import { Store } from '../Store'
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import MessageBox from '../components/MessageBox';
import LoadingBox from '../components/LoadingBox';
import { getError } from '../utilis';

const reducer = (state, action) => {
  switch (action.type) {
      case 'FETCH_REQUEST':
          return { ...state, loading: true };
      case 'FETCH_SUCCESS':
          return {
              ...state,
              products: action.payload.products,
              page: action.payload.page,
              pages: action.payload.pages,
              loading: false,
          };
      case 'FETCH_FAIL':
          return { ...state, loading: false, error: action.payload };

      default:
          return state;
  }
};


const ProductListScreen = () => {

    const { search, pathname } = useLocation();

    // {
    // pathname : /sdj/kjasdf/sjdf,
    // search : ?category='all'&query=avi&page=2   
    //}


    const sp = new URLSearchParams(search);
    const page = sp.get('page') || 1;

    const [{loading, error, products, pages }, dispatch] = useReducer(reducer, {
        loading : true,
        error : '',

    })

    const {state} = useContext(Store);
    const {userInfo} = state;

    useEffect(() => {
      const fetchData = async () => {
          try {
              const { data } = await axios.get(`/api/products/admin?page=${page} `, {
                  headers: { authorization: `Bearer ${userInfo.token}` },
              });

              dispatch({ type: 'FETCH_SUCCESS', payload: data });
          } catch (err) {
            dispatch({ type: "FETCH_FAIL", payload: getError(err) });
           }
      };
      fetchData();
  }, [page, userInfo]);


  return (
    <div>
        <h1>Products</h1>
        {loading ? (
            <LoadingBox></LoadingBox>
        ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
        ) : (
            <>
                <table className="table">
                    <thead>
                        <tr>
                            <th>PRODUCT ID</th>
                            <th>PRODUCT NAME</th>
                            <th>PRICE</th>
                            <th>CATEGORY</th>
                            <th>BRAND</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product._id}>
                                <td>{product._id}</td>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td>{product.category}</td>
                                <td>{product.brand}</td>
                            </tr>
                        ))}
                    </tbody> 
                </table>
                <div>
                    {[...Array(pages).keys()].map((x) => (
                        <Link
                            className={x + 1 === Number(page) ? 'btn text-bold' : 'btn'}
                            key={x + 1}
                            to={`/admin/products?page=${x + 1}`}
                        >
                            {x + 1}
                        </Link>
                    ))}
                </div>
            </>
        )}
    </div>
);

}

export default ProductListScreen