import cart from "../model/cart.model"
import Product from "../model/pizza.model";
import cartModel from "../model/cart.model";


export const addcart = async (req, res) => {
    try {
        console.log(req.body)
        const { productID, userID, variants, quantity } = req.body;
        console.log(quantity)
        const usercartexist = await cart.findOne({ $and: [{ productID: productID }, { userID: userID }, { variants: variants }] });
        console.log(usercartexist)

        const productData = await Product.findOne({ _id: productID });
        console.log(productData)

        if (usercartexist !== null) {
            console.log('ok')
            console.log(variants)
            console.log(usercartexist.variants)
            if (usercartexist.variants == variants) {
                console.log('ok1')
                let d = usercartexist.variants;
                let ds = productData.prices[0][d]
                usercartexist.quantity += quantity;
                usercartexist.price = usercartexist.quantity * ds
                await usercartexist.save();

                if (usercartexist) {
                    res.status(202).json({
                        cart: usercartexist,
                        message: "data updated"

                    })
                } else {
                    res.status(400).json({ message: "something went wrong" })
                }
            }
            // else {
            //     console.log('ok21')

            //     const add = new cart({
            //         ...req.body
            //     })
            //     const save = add.save()

            //     if (save) {
            //         return res.status(201).json({
            //             cart: add,
            //             message: "successfully updated"
            //         })
            //     } else {
            //         return res.status(400).json({
            //             message: "something went wrong"
            //         })
            //     }
            // }

        }
        else {
            console.log('ok22')

            const add = new cart({
                ...req.body
            })
            const save = add.save()

            if (save) {
                return res.status(201).json({
                    cart: add,
                    message: "successfully updated"
                })
            } else {
                return res.status(400).json({
                    message: "something went wrong"
                })
            }
        }
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}
export const deletedata = async (req, res) => {
    try {
        const del = await cart.deleteOne({ _id: req.params.id })
        if (del) {
            return res.status(201).json({
                user: del,
                message: "successfully deleted"
            })
        } else {
            return res.status(400).json({
                message: "something went wrong"
            })
        }
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}

export const getCartData = async (req, res) => {
    try {
        const data = await cart.find({ userID: req.params.userID })
        // console.log(data)
        if (data) {
            return res.status(200).json({
                cart: data,
                message: "successfully fetched"
            })
        } else {
            return res.status(400).json({
                message: "something went wrong"
            })
        }
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}

export const incquantity = async (req, res) => {
    try {
        const { productID, userID } = req.body;
        console.log(productID, userID)
        const usercartexist = await cart.findOne({ $and: [{ _id: productID }, { userID: userID }] })
        console.log(usercartexist)
        let d = usercartexist.variants;
        // console.log(d)
        const productData = await Product.findOne({ _id: usercartexist.productID });
        // console.log(productData)
        let ds = productData.prices[0][d]
        // console.log(ds)
        if (usercartexist) {
            usercartexist.quantity++;
            usercartexist.price = usercartexist.quantity * ds
            await usercartexist.save();

            if (usercartexist) {
                return res.status(201).json({
                    cart: usercartexist,
                    message: 'updated quantity'
                })
            }
            else {
                return res.status(201).json({
                    message: 'data not deleted'
                })
            }
        }
        else {
            return res.status(201).json({
                message: 'data not found'
            })
        }
    }
    catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}


export const decquantity = async (req, res) => {
    try {
        let del
        const { productID, userID } = req.body;
        console.log(productID, userID)
        const usercartexist = await cart.findOne({ $and: [{ _id: productID }, { userID: userID }] })
        console.log(usercartexist)
        let d = usercartexist.variants;
        const productData = await Product.findOne({ _id: usercartexist.productID });
        console.log(productData)
        let ds = productData.prices[0][d]
        console.log(ds)

        // usercartexist ?
        //     // del = await cart.updateOne({ userID: userID }, { $inc: { quantity: -1, price: -ds } }) : null
        //     del = await cart.updateOne({ $and: [{ _id: productID }, { userID: userID }] }, { $inc: { quantity: -1, price: -ds } }) : null

        // console.log(del)
        // await cart.deleteOne({ $and: [{ userID: userID }, { quantity: { $lt: 1 } }] })


        //     return res.status(201).json({
        //         cart: usercartexist,
        //         message: 'quantity decrease'
        //     })

        if (usercartexist) {
            usercartexist.quantity--;
            usercartexist.price = usercartexist.quantity * ds
            await usercartexist.save();

            await cart.deleteOne({ $and: [{ userID: userID }, { quantity: { $lt: 1 } }] })

            if (usercartexist) {
                return res.status(201).json({
                    cart: usercartexist,
                    message: 'decrease quantity'
                })
            }
            else {
                return res.status(201).json({
                    message: 'data not deleted'
                })
            }
        }


    }
    catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}

export const getAllCarts = async (req, res) => {
    try {
        const cartData = await cart.find()
        if (cartData.length == 0) {
            res.status(400).json({
                message: "No data found"
            });
        }
        else {
            res.status(200).json({
                carts: cartData,
                total: cartData.length,
                message: "fetched"
            })
        }
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}




// export const updateCart = async (req, res) => {
//     try {
//         const { message, data } = req.body
//         console.log(message, data)
//         let update;

//         console.log(message, data)
//         if (message == "increment") {
//             update = await cart.updateOne({ _id: req.params.id }, { $inc: { quantity: +1, price: +data.price } })
//         }
//         if (message == "decrement") {
//             update = await cart.updateOne({ _id: req.params.id }, { $inc: { quantity: -1, price: -data.price } })
//         }

//         if (update) {
//             return res.status(201).json({
//                 cart: update,
//                 message: "successfully updated"
//             })
//         } else {
//             return res.status(400).json({
//                 message: "something went wrong"
//             })
//         }


//     } catch (err) {
//         res.status(500).json({
//             message: err.message
//         })
//     }
// }

// export const getCartData = async (req, res) => {
//     try {
//         const userID = req.params.userID;
//         const userCart = await cart.find({ userID: userID });
//         let totalquantity = 0;
//         let totalprice = 0
//         userCart.map((ele) => {
//             totalprice += ele.price;
//             totalquantity += ele.quantity
//         })
//         if (userCart) {
//             return res.status(200).json({
//                 UserCart: {
//                     Products: userCart,
//                     totalAmount: totalprice,
//                     totoalproducts: totalquantity
//                 },
//                 message: 'Cart successfully retrieved'
//             })
//         }
//         else {
//             res.status(400).json({
//                 message: "data not added"
//             })
//         }
//     }
//     catch (error) {
//         res.status(500).json({
//             message: `Something went wrong: ${error.message}`
//         })
//     }
// }




// export const addcart = async (req, res) => {
//     try {
//         const { productID, userID } = req.body;
//         let cartdata;
//         const usercart = await cart.findOne({ userID: userID })
//         const product = await Product.findOne({ _id: productID });
//         if (!product) {
//             return res.status(404).json({ message: "item not found" });
//         }
//         // if cart already exist for user
//         if (usercart) {
//             let indexfound = usercart.product.findIndex((v) => {
//                 return v.id == productID
//             })
//             // check if product exists or not
//             if (indexfound !== -1) {
//                 usercart.product[indexfound].quantity++
//                 usercart.product[indexfound].price += product.price
//                 usercart.save();
//                 return res.status(200).json({ sussfull: 'updated' });
//             }
//             else {
//                 usercart.product.push({
//                     id: product._id,
//                     title: product.title,
//                     image: product.image,
//                     price: product.price,
//                     quantity: 1
//                 })
//                 usercart.save();
//             }
//         }


//         // if cart not exist
//         else {
//             cartdata = new cart({
//                 product: [{
//                     id: product._id,
//                     title: product.title,
//                     image: product.image,
//                     price: product.price,
//                     quantity: 1
//                 }],
//                 userID: userID
//             })
//         }
//         await cartdata.save()
//         if (cartdata) {
//             res.status(201).json({
//                 cart: cartdata
//             })
//         }
//         else {
//             res.status(400).json({
//                 cart: "data not added"
//             })
//         }
//     }
//     catch (err) {
//         res.status(500).json({
//             message: err.message
//         })
//     }
// }
// export const deletedata = async (req, res) => {
//     try {
//         const { productID, userID } = req.body;
//         let dle;
//         let cartproduct;
//         if (productID) {
//             cartproduct = await cart.findOne({ userID: userID });
//             const itemIndex = cartproduct.product.findIndex((item) => {
//                 return item.id == productID
//             });
//             if (itemIndex > -1) {
//                 cartproduct.product.splice(itemIndex, 1);
//             }
//             dle = await cartproduct.save()
//         }
//         if (!productID) {
//             dle = await cart.deleteOne({ userID: userID })
//         }

//         if (cartproduct.product.length == 0) {
//             dle = await cart.deleteOne({ userID: userID });
//         }

//         if (dle) {
//             res.status(201).json({
//                 Cart: dle,
//                 message: "data deleted"
//             })
//         }
//         else {
//             res.status(400).json({
//                 message: "data not deleted"
//             })
//         }
//     }
//     catch (err) {
//         res.status(500).json({
//             message: `Something went wrong: ${err.message}`
//         })
//     }
// }

// export const getCartData = async (req, res) => {
//     try {
//         const userID = req.params.userID;
//         const data = await cart.findOne({ userID: userID });
//         console.log(data)
//         let totalquantity = 0;

//         let totalp = data.product.reduce((acc, current) => {
//             return acc + current.price
//         }, 0)
//         data.product.forEach((ele) => {
//             totalquantity += ele.quantity
//         })
//         if (data) {
//             return res.status(200).json({
//                 UserCart: {
//                     cart: data,
//                     totalAmount: totalp,
//                     totoalproducts: totalquantity
//                 },
//                 message: 'Cart successfully retrieved'
//             })
//         }
//         else {
//             res.status(400).json({
//                 message: "data not added"
//             })
//         }
//     }
//     catch (error) {
//         res.status(500).json({
//             message: `Something went wrong: ${error.message}`
//         })
//     }
// }


// export const updatecart = async (req, res) => {
//     try {
//         const { productID, userID } = req.body;
//         let usercart = await cart.findOne({ userID: userID });
//         const product = await Product.findOne({ _id: productID });
//         if (usercart) {
//             let indexfound = usercart.product.findIndex((v) => {
//                 return v.id == productID
//             })
//             console.log(indexfound)

//             if (indexfound !== -1) {
//                 usercart.product[indexfound].quantity += 1
//                 usercart.product[indexfound].price += product.price
//             }

//             let data = await usercart.save()

//             if (data) {
//                 res.status(201).json({
//                     Cart: data,
//                     message: "data updated"
//                 })
//             }
//             else {
//                 res.status(400).json({
//                     message: "data not deleted"
//                 })
//             }
//         }

//     }
//     catch (err) {
//         res.status(500).json({
//             message: `Something went wrong: ${err.message}`
//         })
//     }
// }

// export const deccart = async (req, res) => {
//     try {
//         const { productID, userID } = req.body;
//         let usercart = await cart.findOne({ userID: userID });
//         const product = await Product.findOne({ _id: productID });
//         let del;
//         if (usercart) {
//             let indexfound = usercart.product.findIndex((v) => {
//                 return v.id == productID
//             })
//             console.log(indexfound)
//             if (indexfound !== -1) {
//                 usercart.product[indexfound].quantity -= 1
//                 usercart.product[indexfound].price -= product.price
//             }

//             if (usercart.product[indexfound].quantity < 1) {
//                 usercart.product.splice(indexfound, 1);
//             }

//             del = await usercart.save()

//             if (usercart.product.length == 0) {
//                 dle = await usercart.deleteOne({ userID: userID });
//             }
//         }

//         if (del) {
//             res.status(201).json({
//                 Cart: del,
//                 message: "data updated"
//             })
//         }
//         else {
//             res.status(400).json({
//                 message: "data not deleted"
//             })
//         }
//     }
//     catch (err) {
//         res.status(500).json({
//             message: `Something went wrong: ${err.message}`
//         })
//     }
// }


// export const addcart = async (req, res) => {
//     try {
//         const { productID, userID } = req.body;
//         let cartdata;
//         const productdetails = await cart.findOne({ userID: userID })
//         const product = await Product.findOne({ _id: productID });
//         if (productdetails) {
//             let indexfound = productdetails.product.findIndex((v) => {
//                 return v.id == productID
//             })
//             if (indexfound !== -1) {
//                 productdetails.product[indexfound].quantity++
//                 productdetails.product[indexfound].price += product.price
//             }
//             else {
//                 productdetails.product.push({
//                     id: product._id,
//                     title: product.title,
//                     image: product.image,
//                     price: product.price,
//                     quantity: 1
//                 })
//             }
//             cartdata = await new cart({
//                 product: productdetails.product,
//                 userID: userID
//             })
//             await cart.deleteOne({ userID: userID })
//         }
//         else {
//             cartdata = new cart({
//                 product: [{
//                     id: product._id,
//                     title: product.title,
//                     image: product.image,
//                     price: product.price,
//                     quantity: 1
//                 }],
//                 userID: userID
//             })
//         }
//         cartdata.save()
//         if (cartdata) {
//             res.status(201).json({
//                 cart: cartdata
//             })
//         }
//         else {
//             res.status(400).json({
//                 cart: "data not added"
//             })
//         }
//     }
//     catch (err) {
//         res.status(500).json({
//             message: err.message
//         })
//     }
// }


// export const getCartData = async (req, res) => {
//     try {
//         const userID = req.params.userID;
//         const data = await cart.findOne({ userID: userID });
//         let totalquantity = 0;

//         let totalp = data.product.reduce((acc, current) => {
//             return acc + current.price
//         }, 0)
//         data.product.forEach((ele) => {
//             totalquantity += ele.quantity
//         })
//         if (data) {
//             res.status(200).json({
//                 UserCart: {
//                     cart: data,
//                     totalAmount: totalp,
//                     totoalproducts: totalquantity
//                 },
//                 message: 'Cart successfully retrieved'
//             })
//         }
//         else {
//             res.status(400).json({
//                 message: "data not added"
//             })
//         }
//     }
//     catch (error) {
//         res.status(500).json({
//             message: `Something went wrong: ${error.message}`
//         })
//     }
// }


// export const deletedata = async (req, res) => {
//     try {
//         const { productID, userID } = req.query;
//         let dle;
//         let cartproduct;
//         let addcart
//         if (!productID) {
//             dle = await cart.deleteOne({ userID: userID })
//         }
//         else {
//             cartproduct = await cart.findOne({ userID: userID });

//             cartproduct.product.forEach(async (v) => {
//                 if (v.id == productID) {
//                     cartproduct.product.splice(cartproduct.product.indexOf(v), 1)
//                 }
//             })
//             dle = await cart.deleteOne({ userID: userID });

//             addcart = new cart({
//                 product: cartproduct.product,
//                 userID: userID
//             })
//             await addcart.save()
//             if (cartproduct.product.length == 0) {
//                 dle = await cart.deleteOne({ userID: userID });
//             }
//         }
//         if (dle) {
//             res.status(201).json({
//                 Cart: dle,
//                 message: "data deleted"
//             })
//         }
//         else {
//             res.status(400).json({
//                 message: "data not deleted"
//             })
//         }
//     }
//     catch (err) {
//         res.status(500).json({
//             message: `Something went wrong: ${err.message}`
//         })
//     }
// }


// export const updatecart = async (req, res) => {
//     try {
//         const { productID, userID } = req.body;
//         let usercart = await cart.findOne({ userID: userID });
//         const product = await Product.findOne({ _id: productID });
//         if (usercart) {
//             let indexfound = usercart.product.findIndex((v) => {
//                 return v.id == productID
//             })
//             console.log(indexfound)

//             if (indexfound !== -1) {
//                 usercart.product[indexfound].quantity += 1
//                 usercart.product[indexfound].price += product.price
//             }

//             let cartdata = await new cart({
//                 product: usercart.product,
//                 userID: userID
//             })
//             await cartdata.save()
//             await cart.deleteOne({ userID: userID })


//             if (cartdata) {
//                 res.status(201).json({
//                     Cart: cartdata,
//                     message: "data updated"
//                 })
//             }
//             else {
//                 res.status(400).json({
//                     message: "data not deleted"
//                 })
//             }
//         }

//     }
//     catch (err) {
//         res.status(500).json({
//             message: `Something went wrong: ${err.message}`
//         })
//     }
// }



// export const deccart = async (req, res) => {
//     try {
//         const { productID, userID } = req.body;
//         let usercart = await cart.findOne({ userID: userID });
//         const product = await Product.findOne({ _id: productID });
//         let del;
//         if (usercart) {
//             let indexfound = usercart.product.findIndex((v) => {
//                 return v.id == productID
//             })
//             console.log(indexfound)
//             if (indexfound !== -1) {
//                 usercart.product[indexfound].quantity -= 1
//                 usercart.product[indexfound].price -= product.price
//             }
//             if (usercart.product[indexfound].quantity < 1) {
//                 usercart.product.forEach(async (v) => {
//                     if (v.id == productID) {
//                         usercart.product.splice(usercart.product.indexOf(v), 1)
//                     }
//                 })
//             }

//             let cartdata = await new cart({
//                 product: usercart.product,
//                 userID: userID
//             })
//             await cartdata.save()
//             console.log(cartdata)

//             del = await cart.deleteOne({ userID: userID });

//             if (usercart.product.length == 0) {
//                 del = await cart.deleteOne({ userID: userID });
//             }
//         }
//         if (del) {
//             res.status(201).json({
//                 Cart: del,
//                 message: "data updated"
//             })
//         }
//         else {
//             res.status(400).json({
//                 message: "data not deleted"
//             })
//         }
//     }
//     catch (err) {
//         res.status(500).json({
//             message: `Something went wrong: ${err.message}`
//         })
//     }
// }



// export const addcart = async (req, res) => {
//     try {
//         const { productID, userID } = req.body;
//         const datas = await cart.findOne({ userID: userID });
//         const product = await Product.findOne({ _id: productID });
//         let cartdata;
//         let unique;
//         if (datas) {
//             datas.product.forEach((ele) => {
//                 if (ele.id == productID) {
//                     ele.quantity++;
//                     ele.price += product.price
//                 }
//                 else {
//                     datas.product.push({
//                         id: product._id,
//                         title: product.title,
//                         image: product.image,
//                         price: product.price,
//                         quantity: 1
//                     })
//                 }
//             })
//             console.log(datas.product)
//             unique = datas.product.filter((obj, index) =>
//                 datas.product.findIndex((item) => item.id === obj.id) === index
//             )
//             console.log(unique)
//             cartdata = await new cart({
//                 product: unique,
//                 userID: userID
//             })
//             await cart.deleteOne({ userID: userID })
//         }
//         else {
//             cartdata = new cart({
//                 product: [{
//                     id: product._id,
//                     title: product.title,
//                     image: product.image,
//                     price: product.price,
//                     quantity: 1
//                 }],
//                 userID: userID
//             })
//         }
//         cartdata.save()
//         if (cartdata) {
//             res.status(201).json({
//                 Cart: cartdata,
//                 message: "data added"
//             })
//         }
//         else {
//             res.status(400).json({
//                 message: "data not added"
//             })
//         }
//     }
//     catch (err) {
//         res.status(500).json({
//             message: err.message
//         })
//     }
// }