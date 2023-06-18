import multer from "multer";
import fs from "fs"
import pizzmodel from "../model/pizza.model"

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (!fs.existsSync("uploadData/pizza")) {
            fs.mkdirSync("uploadData/pizza")
        }
        cb(null, './uploadData/pizza')
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

export const addPizza = async (req, res) => {
    try {
        const uploaddata = upload.single("image");
        uploaddata(req, res, async function (err) {
            if (err) {
                return res.status(400).json({
                    message: err
                })
            }
            const { name, small, medium, large, category, description, array } = req.body;
            const image = req.file.filename;

            const pizzaData = new pizzmodel({
                name: name,
                prices: {
                    small,
                    medium,
                    large
                },
                category: category,
                description: description,
                image: image,
                varients: array,

            })
            await pizzaData.save()

            if (pizzaData) {
                res.status(200).json({
                    pizza: pizzaData,
                    message: "pizza added",
                })
            }
            else {
                res.status(400).json({
                    message: "something went wrong"
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

export const getAllPizza = async (req, res) => {
    try {
        const { name, category } = req.query;
        let datas = []
        if (name) {
            datas = await pizzmodel.find({
                $or: [{ name: { $regex: `.*${name}.*`, $options: "i" } },
                ]
            })
        }
        else if (category) {
            datas = await pizzmodel.find({
                $or: [{ category: category },
                ]
            })
        }

        else {
            datas = await pizzmodel.find()
        }

        // let datas = await pizzmodel.find()
        if (datas) {
            res.status(200).json({
                pizza: datas,
                message: "pizza found",
            })
        }
        else {
            res.status(400).json({
                message: "something went wrong"
            })
        }
    }
    catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}

export const deletePizza = async (req, res) => {
    try {
        let ids = req.params.id
        let pizzaData = await pizzmodel.findOne({ _id: ids })
        console.log(pizzaData)
        fs.unlink("./uploadData/pizza/" + pizzaData.image, async function (err) {
            if (err) {
                return res.status(400).json({ message: err })
            }
            console.log('Deleted succ');
            const data = await pizzmodel.deleteOne({ _id: ids })
            if (data) {
                res.status(200).json({
                    data: data,
                    pizza: pizzaData,
                    message: "successfully deleted"
                })
            }
            else {
                res.status(400).json({
                    message: "something went wrong"
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


export const getsinglePizza = async (req, res) => {
    try {
        const singleBurger = await pizzmodel.find({ _id: req.params.id });
        if (singleBurger) {
            res.status(200).json({
                singledata: singleBurger,
                message: "successfully fetched"
            })
        }
        else {
            res.status(400).json({
                message: "something went wrong"
            })
        }
    }
    catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}

export const updateBurger = async (req, res) => {
    try {
        let burgerId = req.params.id
        const uploadData = upload.single('image');
        uploadData(req, res, async function (err) {
            if (err) {
                return res.status(400).json({ message: err })
            };
            const { name, small, medium, large, category, description, array } = req.body;

            const userdata = await pizzmodel.findOne({ _id: burgerId });

            let image = userdata.image

            if (req.file) {
                image = req.file.filename
                fs.unlink("./uploadData/pizza/" + userdata.image, function (err) {
                    if (err) {
                        return res.status(400).json({ message: err })
                    }
                    console.log('Deleted succ')
                })
            }
            const dataupdate = await pizzmodel.updateOne({ _id: burgerId },
                {
                    $set: {
                        name: name,
                        prices: {
                            small,
                            medium,
                            large
                        },
                        category: category,
                        description: description,
                        image: image,
                        varients: array,
                    }
                }
            )
            if (dataupdate) {
                return res.status(200).json({
                    update: dataupdate,
                    message: 'Updated Successfully'
                })
            }
            else {
                return res.status(400).json({
                    message: "something went wrong"
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
