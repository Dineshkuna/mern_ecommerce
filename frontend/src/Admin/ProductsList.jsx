import React, { useEffect } from 'react'
import '../AdminStyles/ProductsList.css'
import Navbar from '../components/Navbar'
import PageTitle from '../components/PageTitle'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'
import { Delete, Edit } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAdminProducts } from '../features/admin/adminSlice'

function ProductsList() {
    const {products,loading,error} = useSelector(state=>state.admin)
    console.log(products)
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(fetchAdminProducts())

    },[dispatch])
  return (
    <>
    <Navbar/>
    <PageTitle title="All Products"/>
        <div className="product-list-container">
           <h1 className="product-list-title">All Products</h1> 
           <table className="product-table">
              <thead>
                <tr>
                    <th>Sl No</th>
                    <th>Product Image</th>
                    <th>Product Name</th>
                    <th>Price</th>
                    <th>Ratings</th>
                    <th>Category</th>
                    <th>Stock</th>
                    <th>Created At</th>
                    <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product,index)=>(
                    <tr key={product._id}>
                    <td>{index+1}</td>
                    <td><img src={product.image[0].url} alt='Name' /></td>
                    <td>Mobile</td>
                    <td>200/-</td>
                    <td>4.5</td>
                    <td>Electronics</td>
                    <td>4</td>
                    <td>05-05-2025</td>
                    <td>
                        <Link to="/admin/product/:productId" className='action-icon edit-icon'><Edit/></Link>
                        <Link to="/admin/product/:productId" className='action-icon delete-icon'><Delete/></Link>
                    </td>
                </tr>
                ))}
              </tbody>
           </table>
        </div>


    <Footer/>   
    
    </>
  )
}

export default ProductsList
