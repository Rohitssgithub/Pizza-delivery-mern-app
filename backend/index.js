import * as dotenv from "dotenv";
dotenv.config()
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
const app = express();
const port = process.env.PORT || 4600;
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./router/pizza.route";
import routers from "./router/user.route";
import routes from "./router/cart.route";
import orderRoute from "./router/order.route";

var corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
    optionsSuccessStatus: 200
}

app.use(cookieParser())
app.use(express.static("./uploadData/userimage"))
app.use(express.static("./uploadData/pizza"))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors(corsOptions))
app.use(router)
app.use(routers)
app.use(routes)
app.use(orderRoute)

mongoose.set('strictQuery', true)
mongoose.connect('mongodb://127.0.0.1:27017/pizzapp')
    .then(() => console.log('Connected!'));

app.listen(port, () => {
    console.log(`server is running ${port}`)
})