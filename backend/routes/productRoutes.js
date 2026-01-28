import express from "express";
import { createProducts, deleteProduct, getAllProducts, getSingleProduct, UpdateProduct } from "../controller/productController.js";


const  router = express.Router();

router.route('/products')
.get(getAllProducts)
.post(createProducts);
router.route('/product/:id')
.put(UpdateProduct)
.delete(deleteProduct)
.get(getSingleProduct);






export default router;