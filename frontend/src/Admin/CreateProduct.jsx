import React from 'react'
import '../AdminStyles/CreateProduct.css'
import Navbar from '../components/Navbar'
import PageTitle from '../components/PageTitle'
import Footer from '../components/Footer'

function CreateProduct() {
  return (
    <>
    <Navbar/>
    <PageTitle title="Create Product"/>
    <div className="create-product-container">
        <h1 className="form-title">Create Product</h1>
        <form  className="product-form" encType='multipart/form-data'>
        <input type="text" className='form-input' placeholder='Enter Product Name' required name='name' />
        <input type="text" className='form-input' placeholder='Enter Product Price' required  name="price"/>
        <input type="text" className='form-input' placeholder='Enter Product Description' required name='description' />
        <select  className="form-select" required name="category">
            <option value="">Choose a Category</option>
            <option value="Mobile" key='1'>Mobile</option>


        </select>
        <input type="text" className='form-input' placeholder='Enter Product Stock' required name='stock'/>
        <div className="file-input-container">
            <input type="file" accept='image/' className="form-input-file" multiple name="image"/>
        </div>
        
        
        </form>
    </div>




    
    <Footer/>
    
    </>
  )
}

export default CreateProduct
