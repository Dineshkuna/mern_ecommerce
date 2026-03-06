import React from "react";
import "../AdminStyles/UpdateProduct.css";
import Navbar from "../components/Navbar";
import PageTitle from "../components/PageTitle";
import Footer from "../components/Footer";

function UpdateProduct() {
  return (
    <>
      <Navbar />

      <PageTitle title="Update Product" />
      <div className="update-product-wrapper">
        <h1 className="update-product-title">Update Product</h1>
        <form className="update-product-form" encType="multipart/form-data">
          <label htmlFor="name">Product Name</label>
          <input
            type="text"
            className="update-product-input"
            required
            id="name"
            name="name"
          />

          <label htmlFor="price">Product Price</label>
          <input
            type="number"
            className="update-product-input"
            required
            id="price"
            name="price"
          />

          <label htmlFor="description">Product Description</label>
          <textarea
            type="text"
            className="update-product-textarea"
            required
            id="description"
            name="description"
          />

          <label htmlFor="category">Product category</label>
          <select name="category" id="category"
          className="update-product-select">
            <option value="">Choose a Category</option>
            <option value="Mobile">Mobile</option>
          </select>


          <label htmlFor="stock">Product Stock</label>
          <input
            type="number"
            className="update-product-input"
            required
            id="stock"
            name="stock"
          />


        </form>
      </div>

      <Footer />
    </>
  );
}

export default UpdateProduct;
