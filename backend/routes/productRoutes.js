import express from "express";
import { createProducts, deleteProduct, getAllProducts, getSingleProduct, UpdateProduct } from "../controller/productController.js";
import { verifyUserAuth } from "../middleware/userAuth.js";

const  router = express.Router();

router.route('/products')
.get(verifyUserAuth,getAllProducts)
.post(createProducts);
router.route('/product/:id')
.put(UpdateProduct)
.delete(deleteProduct)
.get(getSingleProduct);






export default router;