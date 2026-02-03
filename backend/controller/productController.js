import Product from '../models/productModel.js';
import handleAsyncError from '../middleware/handleAsyncError.js';
import HandleError from '../utils/handleError.js';
import APIFunctionality from '../utils/apiFunctionality.js';


// http://localhost:8000/api/v1/product/6979ea2a11bdf70639b2e1c3?keyword=shirt

// Create Product
export const createProducts = handleAsyncError(async (req, res, next)=>{
    req.body.user = req.user.id;
   
    const product = await Product.create(req.body);
    res.status(201).json({
        success: true,
        product
    })
})

// Get All Products
export const getAllProducts =handleAsyncError(async  (req, res, next)=>{
    const resultsPerPage = 3;

        
    const apiFunctionality = new APIFunctionality(Product.find(), req.query).search().filter();

    const filteredQuery  = apiFunctionality.query.clone();
    const productCount =  await filteredQuery.countDocuments();


    const totalPages = Math.ceil(productCount/resultsPerPage);
    const page = Number(req.query.page) || 1;

    if(page > totalPages && productCount > 0){
        return next( new HandleError("This page does not exist", 404));
    }


    // Apply pagination
    apiFunctionality.pagination(resultsPerPage);
       
    const products =  await apiFunctionality.query;

    if(!products || products.length === 0){
        return next( new HandleError("No products found", 404));
    }
    res.status(200).json({
        success: true,
        products,
        productCount,
        resultsPerPage,
        totalPages,
        currentPage: page
    })
})


// Update Product 
export const UpdateProduct = handleAsyncError(async(req, res, next)=> {
   

    const product = await Product .findByIdAndUpdate(req.params.id, req.body, {
        new:true,
        runValidators:true
    })

     
    if(!product){
        return next( new HandleError("Product not found"), 404);
    }

    res.status(200).json({
        success: true,
        product
    })

})


// Delete Product

export const deleteProduct = handleAsyncError(async(req, res, next)=>{
    const product = await Product .findByIdAndDelete(req.params.id);

    if(!product){
        return next( new HandleError("Product not found"), 500);
    }

    res.status(200).json({
        success: true,
        message:"Product Deleted Successfully"
    })

})


// Accessing single product 
 
export const getSingleProduct = handleAsyncError(async(req, res, next)=>{
    const product = await Product.findById(req.params.id);
    if(!product){
       return next( new HandleError("Product not found"), 500);
    }

    res.status(200).json({
        success: true,
        product
    })
})


// creating and updating review

export const createReviewForProduct = handleAsyncError(async(req, res, next)=>{
    const { rating, comment, productId } = req.body;
    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment
    };
    const product = await Product.findById(productId);
    console.log(product);

    const reviewExists = product.reviews.find((review )=>review.user.toString() === req.user._id.toString());
    if(reviewExists){
        product.reviews.forEach((review)=>{
            if(review.user.toString() === req.user._id.toString()){
                review.comment = comment;
                review.rating = rating;
            }
        });

    } else{
        product.reviews.push(review);
      


    }
      product.numOfReviews = product.reviews.length;

    let sum = 0;
    product.reviews.forEach((review)=>{
      sum += review.rating;
    })
    product.ratings = product.reviews.length>0 ? sum / product.reviews.length : 0;

    await product.save({validateBeforeSave: false});

    res.status(200).json({
        success: true,
        product
    })
        
    


})


// Admin - Getting all products

export const getAdminProducts = handleAsyncError(async(req, res, next)=>{
    const products = await Product.find();

    res.status(200).json({
        success: true,
        products
    })
})