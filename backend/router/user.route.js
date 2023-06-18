import express from "express";
const router = express.Router();
import { userauth, verifyTokenAndAdmin, verifyTokenAndAuthorization } from "../middleware/auth"

import { signup, loginuser, updateProfile, deleteProfile, getAllUsers, userData } from "../controller/user.controller"

router.post("/user/signup", signup)
router.post("/user/login", loginuser)
// router.get('/about', userauth, (req, res) => {
//     res.send(req.rootuser)
// })
router.get("/about", userauth, (req, res) => {
    try {
        return res.status(200).json({
            user: req.rootuser,
            status: "logged in"
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }
})

router.get('/logout/user', userauth, (req, res) => {
    res.clearCookie('jwt', { path: '/' })
    res.status(200).send('user logout')
})
// router.get('/all/users', userauth, getAllUsers)
router.get('/all/users', verifyTokenAndAdmin, getAllUsers)

router.get('/get/user/:id', userData)

router.put('/update/profile/:id', updateProfile)
router.delete('/delete/profile/:id', verifyTokenAndAuthorization, deleteProfile)

export default router


