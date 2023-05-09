import React, { useContext, useReducer } from 'react'
import { Store } from '../Store'
import { useLocation } from 'react-router-dom';

const ProductListScreen = () => {

    const { search, pathname } = useLocation();

    // {
    // pathname : /sdj/kjasdf/sjdf,
    // search : ?category='all'&query=avi&page=2   
    //}


    const sp = new URLSearchParams(search);
    const page = sp.get('page') || 1;

    // const [{loading, error, products, pages }, dispatch] = useReducer(reducer, {
    //     loading : true,
    //     error : '',

    // })

    const {state} = useContext(Store);
    const {userInfo} = state;


  return (
    <div>ProductListScreen</div>
  )
}

export default ProductListScreen