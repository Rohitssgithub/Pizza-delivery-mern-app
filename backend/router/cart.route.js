import express from "express";
import { userauth, verifyTokenAndAdmin } from "../middleware/auth";

const routes = express.Router();

import { addcart, getCartData, getAllCarts, deletedata, decquantity, incquantity, updateCart } from "../controller/Cart.Controller";

routes.post('/add-to-cart', userauth, addcart)
routes.delete('/cartDelete/:id', userauth, deletedata)
routes.get('/cart/:userID', userauth, getCartData)
routes.get('/cart/allusers', verifyTokenAndAdmin, getAllCarts)
routes.put('/cart/update/increase', incquantity)
routes.put('/cart/update/decrease', decquantity)
// routes.put('/updateCart/:id', userauth, updateCart)


export default routes
