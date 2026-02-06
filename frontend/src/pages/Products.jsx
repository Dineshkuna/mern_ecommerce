import React, { use, useEffect } from 'react'
import '../pageStyles/Products.css'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { useDispatch, useSelector } from 'react-redux';
import Product from '../components/Product';
import PageTitle from '../components/PageTitle';
import { getProduct } from '../features/products/productSlice';
import Loader from '../components/Loader';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

   

function Products() {
    const  { loading,error, products} = useSelector((state) => state.product);
    const dispatch = useDispatch();
   const location=  useLocation();
   const searchParams =  new URLSearchParams(location.search);
   const keyword = searchParams.get('keyword') || '';
    console.log(keyword);
    
   console.log(searchParams)
    useEffect(() => {
      dispatch(getProduct());
      }, [dispatch]);

      
       useEffect(() => {
          if (error) {
            toast.error(error.message,{position:'top-center', autoClose:3000});
            
          }
        },[dispatch, error])

  return (
    <>
    {   loading? (<Loader/>) : (<>

    <PageTitle title="Products - MyWebsite"/>
    <Navbar />

    <div className="products-layout">
        <div className="filter-section">
            <h3 className="filter-heading">CATEGORIES</h3>
            {/* Render Categories */}
        </div>
        <div className="products-section">
            <div className="products-product-container">
             {products.map(( product,index) => (< Product  product={ product} key={index}/>))}
            </div>
        </div>
    </div>

    <Footer />
    
    
    
    </>)}
    </>
  )
}

export default Products