import express from "express";
const router = express.Router();
import { verifyTokenAndAdmin } from "../middleware/auth";

import {
    addPizza, getAllPizza, getsinglePizza, deletePizza, updateBurger
} from "../controller/pizza.controller"

router.post("/add-burger", verifyTokenAndAdmin, addPizza)
router.get("/get-all-burgers", getAllPizza)
router.get("/get-burger-by-id/:id", verifyTokenAndAdmin, getsinglePizza)
router.delete("/delete-burger/:id", verifyTokenAndAdmin, deletePizza)
router.put("/update-burger/:id", verifyTokenAndAdmin, updateBurger)

export default router

