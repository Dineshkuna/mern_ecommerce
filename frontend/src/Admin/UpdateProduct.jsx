import React, { useEffect, useState } from "react";
import "../AdminStyles/UpdateProduct.css";
import Navbar from "../components/Navbar";
import PageTitle from "../components/PageTitle";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductDetails } from "../features/products/productSlice";

function UpdateProduct() {
  const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [stock, setStock] = useState("");
    const [oldImage, setOldImage] = useState([]);
    const [imagePreview, setImagePreview] = useState([]);

    const {product} = useSelector(state =>state.product)
    console.log(product);
    
    const dispatch = useDispatch();

    const {updateId} = useParams();

    

    const categories = ["mobile", "fruits", "laptop", "shirt", "shoes", "pants","glass","watch", "cookies","socks","bag", "mouse", "headphone", "jacket", "tops", "ring", "bangle", "bucket", "pomegranate"];

    useEffect(()=>{
      dispatch(getProductDetails(updateId))

    },[dispatch,updateId])

    useEffect(()=>{
      if(product){
        setName(product.name)
        setPrice(product.price)
        setDescription(product.description)
        setCategory(product.category)
        setStock(product.stock)
        setOldImage(product.product.image)
        
      }


    },[])


    const handleImageChange = (e) => {
      
      const files = Array.from(e.target.files);

  setImage([]);
  setImagePreview([]);

  files.forEach((file) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setImagePreview((old) => [...old, reader.result]);
        setImage((old) => [...old, reader.result]);
      }
    };

    reader.readAsDataURL(file);

    
    
  })
}

const updateProductSubmit = (e) => {
  e.preventDefault();
  const myForm = new FormData();
      myForm.set("name", name);
      myForm.set("price", price);
      myForm.set("description", description);
      myForm.set("category", category);
      myForm.set("stock", stock);
      image.forEach((img) => {
        myForm.append("image", img, img.name);
      })
      

}

    

  return (
    <>
      <Navbar />

      <PageTitle title="Update Product" />
      <div className="update-product-wrapper">
        <h1 className="update-product-title">Update Product</h1>
        <form className="update-product-form" encType="multipart/form-data" onSubmit={updateProductSubmit}>
          <label htmlFor="name">Product Name</label>
          <input
            type="text"
            className="update-product-input"
            required
            id="name"
            name="name"
            value={name}
            onChange={(e) =>setName(e.target.value)}
          />

          <label htmlFor="price">Product Price</label>
          <input
            type="number"
            className="update-product-input"
            required
            id="price"
            name="price"
            value={price}
            onChange={(e) =>setPrice(e.target.value)}
          />

          <label htmlFor="description">Product Description</label>
          <textarea
            type="text"
            className="update-product-textarea"
            required
            id="description"
            name="description"
            value={description}
            onChange={(e) =>setDescription(e.target.value)}
            
          />

          <label htmlFor="category">Product category</label>
          <select name="category" id="category"
          className="update-product-select"
          value={category}
            onChange={(e) =>setCategory(e.target.value)}
          >
            <option value="">Choose a Category</option>
            {categories.map((item) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
          </select>


          <label htmlFor="stock">Product Stock</label>
          <input
            type="number"
            className="update-product-input"
            required
            id="stock"
            name="stock"
            value={stock}
            onChange={(e) =>setStock(e.target.value)}
          />
          <label htmlFor="image">Product Image</label>
          <div className="update-product-file-wrapper">
            <input type="file" accept="image/" name="image" multiple className="update-product-file-input" onChange={handleImageChange}/>
          </div>
          <div className="update-product-preview-wrapper">
            {imagePreview.map((img, index) =>(<img src={img} alt="Product Preview" key={index}
            className="update-product-preview-image"
            />))}
          </div>
          <div className="update-product-old-images-wrapper">
            {oldImage.map((img, index)=>(<img src={img.url} alt="Old Product Preview" key={index} className="update-product-old-image"/>))}
          </div>
          <button className="update-product-submit-btn">
            Update
          </button>


        </form>
      </div>

      <Footer />
    </>
  );
}

export default UpdateProduct;
