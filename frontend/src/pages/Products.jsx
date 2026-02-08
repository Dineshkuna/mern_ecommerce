import React, { useEffect, useState } from 'react'
import '../pageStyles/Products.css'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { useDispatch, useSelector } from 'react-redux';
import Product from '../components/Product';
import PageTitle from '../components/PageTitle';
import { getProduct, removeErrors } from '../features/products/productSlice';
import Loader from '../components/Loader';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import NoProducts from '../components/NoProducts';
import Pagination from '../components/Pagination';


   

function Products() {
  const navigate = useNavigate();
    const  { loading,error, products,resultsPerPage,productCount} = useSelector((state) => state.product);
    const dispatch = useDispatch();
   const location=  useLocation();
   const searchParams =  new URLSearchParams(location.search);
   const keyword = searchParams.get('keyword') || '';
    console.log(keyword);
    const pageFromURL = parseInt(searchParams.get('page'),10) || 1;
    const [currentPage, setCurrentPage] = useState(pageFromURL);
    
   console.log(searchParams)
    useEffect(() => {
      dispatch(getProduct({keyword,page:currentPage}));
      }, [dispatch, keyword,currentPage]);

      
       useEffect(() => {
          if (error) {
            toast.error(error.message,{position:'top-center', autoClose:3000});
            dispatch(removeErrors());
          }
        },[dispatch, error])


        const handlePageChange = (page) => {
          if (page !== currentPage) {
            setCurrentPage(page);
            const newSearchParams = new URLSearchParams(location.search);
            if(page === 1){
              newSearchParams.delete('page');
            }else{
              newSearchParams.set('page', page);
            }
            navigate(`?${newSearchParams.toString()}`);
          }
        }

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
            {products.length>0 ? (<div className="products-product-container">
             {products.map(( product,index) => (< Product  product={ product} key={index}/>))}
            </div>):(<NoProducts keyword={keyword}/>)}
            <Pagination currentPage={currentPage} onPageChange={handlePageChange} />
        </div>
    </div>

    <Footer />
    
    
    
    </>)}
    </>
  )
}


export default Products