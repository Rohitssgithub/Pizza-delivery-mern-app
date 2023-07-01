import user from "../model/user.model";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken"
import multer from "multer";
import fs from "fs"
import cart from "../model/cart.model";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (!fs.existsSync("uploadData/userimage")) {
            fs.mkdirSync("uploadData/userimage")
        }
        cb(null, './uploadData/userimage')
    },
    filename: function (req, file, cb) {
        const name = file.originalname;
        const extrarr = name.split('.');
        const ext = extrarr[extrarr.length - 1];
        extrarr.pop();
        const suff = Date.now();
        cb(null, extrarr + "-" + suff + "." + ext)
    }
})
const upload = multer({ storage: storage })



// add new user 
export const signup = async (req, res) => {
    try {
        const uploaddata = upload.single("image");
        uploaddata(req, res, async function (err) {
            if (err) {
                return res.status(400).json({
                    message: err
                })
            }
            const { username, age, gender, email, password, confirmPassword, isAdmin, contact } = req.body;
            let existUser = await user.findOne({ email: email });
            if (existUser) {
                let userimage = req.file.filename
                if (req.file) {
                    fs.unlinkSync(`uploadData/userimage/${userimage}`)
                }
                return res.status(400).json({
                    message: 'User already exists'
                })
            }
            if (password !== confirmPassword) {
                let userimage = req.file.filename
                if (req.file) {
                    fs.unlinkSync(`uploadData/userimage/${userimage}`)
                }
                return res.status(400).json({
                    message: 'Password not matching'
                })
            }
            else {
                const image = req.file.filename;
                console.log(image);
                const hashPassword = await bcrypt.hashSync(password, 10);
                const userdata = new user({
                    username: username,
                    age: age,
                    gender: gender,
                    email: email,
                    password: hashPassword,
                    isAdmin: isAdmin,
                    contact: contact,
                    image: image
                })
                await userdata.save()

                if (userdata) {
                    res.status(200).json({
                        users: userdata,
                        message: "user Register",
                    })
                }
                else {
                    res.status(400).json({
                        message: "something went wrong"
                    })
                }
            }
        })
    }
    catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}


// login user 
export const loginuser = async (req, res) => {
    try {
        const { email, password, confirmPassword } = req.body;
        const existuser = await user.findOne({ email: email })
        if (!email || !password || !confirmPassword) {
            return res.status(400).json({
                message: "please enter the details",
            })
        }
        if (!existuser) {
            return res.status(400).json({
                message: "user not found",
            })
        }
        if (password !== confirmPassword) {
            return res.status(400).json({
                message: "Password and Confirmpass not matching",
            })
        }
        let matchpass = await bcrypt.compare(password, existuser.password);
        if (matchpass) {
            let token = await existuser.generateAuthToekn()
            res.cookie("jwt", token, {
                httpOnly: true,
            })
            console.log('tpken ' + token)
            // const token = jwt.sign({ _id: existuser._id, email: existuser.email }, 'test', { expiresIn: '1h' })
            // res.cookie("jwt", token, {
            //     httpOnly: true,
            // })
            return res.status(200).json({
                token: token,
                user: existuser,
                message: "login",
            })
        }
        else {
            return res.status(400).json({
                user_cart: existuser,
                message: "invalid"
            })
        }
    }
    catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}



// update user after login 
export const updateProfile = async (req, res) => {
    try {
        const uploadData = upload.single('image');
        uploadData(req, res, async function (err) {
            if (err) {
                return res.status(400).json({ message: err })
            };
            let ids = req.params.id
            const { username, age, gender, email, password, isAdmin, contact } = req.body;
            const userdata = await user.findOne({ _id: ids });
            // console.log(userData)
            let image = userdata.image
            if (req.file) {
                image = req.file.filename
                fs.unlink("./uploadData/userimage/" + userdata.image, function (err) {
                    if (err) {
                        return res.status(400).json({ message: err })
                    }
                    console.log('Deleted succ')
                })
            }
            let hashPassword;
            if (password) {
                hashPassword = bcrypt.hashSync(password, 10)
            }
            const dataupdate = await user.updateOne({ _id: ids },
                {
                    $set: {
                        username: username,
                        age: age,
                        gender: gender,
                        email: email,
                        password: hashPassword,
                        isAdmin: isAdmin,
                        contact: contact,
                        image: image
                    }
                }
            )
            if (dataupdate) {
                return res.status(200).json({
                    data: dataupdate,
                    message: 'Updated Successfully'
                })
            }
            else {
                return res.status(400).json({
                    message: 'not updated'
                })
            }
        })
    }
    catch (err) {
        res.status(500).json({
            message: err.message
        })
    }

}


// delete user after login 
export const deleteProfile = async (req, res) => {
    try {
        const ids = req.params.id

        let userdata = await user.findOne({ _id: ids })
        console.log(userdata)

        fs.unlink("./uploadData/userimage/" + userdata.image, async function (err) {
            if (err) {
                return res.status(400).json({ message: err })
            }
            console.log('Deleted succ')
            await cart.deleteMany({ userID: ids })

            const data = await user.deleteOne({ _id: ids })

            if (data) {
                // res.clearCookie('jwt', { path: '/' })
                res.status(200).json({
                    // data: data,
                    user: userdata,
                    message: "user deleted"
                })
            }
            else {
                res.status(400).json({
                    message: "data not updated"
                })
            }
        })
    }
    catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}


// get all users 
export const getAllUsers = async (req, res) => {
    try {
        const userData = await user.find({ isAdmin: false }).select('-password').sort({ _id: -1 })
        if (userData) {
            res.status(200).json({
                data: userData,
                message: "all users on website",
            })
        }
        else {
            res.status(400).json({
                message: "user not found"
            })
        }
    }
    catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}

export const userData = async (req, res) => {
    try {
        const userData = await user.find({ _id: req.params.id })
        console.log(userData)
        if (userData) {
            res.status(200).json({
                user: userData,
                message: "user found",
            })
        }
        else {
            res.status(400).json({
                message: "user not found"
            })
        }
    }
    catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}