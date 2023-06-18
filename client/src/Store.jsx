import { configureStore } from "@reduxjs/toolkit";
import pizzaSlice from "./reducers/PizzReducer";
import UserReducer from "./reducers/UserReducer";
import cartSlice from './reducers/CartReducer';
import orderSlice from './reducers/OrderReducer'


const store = configureStore({
    reducer: {
        users: UserReducer,
        pizza: pizzaSlice,
        cart: cartSlice,
        order: orderSlice
    }
})

export default store;