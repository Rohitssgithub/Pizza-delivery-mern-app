import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const createOrder = createAsyncThunk('order/add', async (thunkAPI) => {
    console.log(thunkAPI)
    const data = await axios.post("http://localhost:9300/placeOrder", thunkAPI, { withCredentials: true })
    console.log(data)
}
)
export const getOrder = createAsyncThunk('order/get', async (thunkAPI) => {
    console.log(thunkAPI)
    const data = await fetch(`http://localhost:9300/get-user-orders/${thunkAPI}`, {
        method: "GET",
        mode: 'cors',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
    }
    )
    const res = await data.json()
    console.log(res)
    return res
}
)

export const getAllOrders = createAsyncThunk('showAllPizza', async (name) => {
    try {
        const response = await fetch('http://localhost:9300/get-all-orders');
        const data = await response.json();
        console.log(data)
        return data;
    }
    catch (err) {
        console.log(err)
    }
});
export const deliverOrder = createAsyncThunk('update/order', async (orderId) => {
    try {
        const response = await axios.post('http://localhost:9300/deliver-order', { orderId });
        console.log(response);
        // alert('order delivered')
        // const orders = await axios.get('http://localhost:9300/get-all-orders')
        // console.log(orders)
        // return orders
        return orderId
    }
    catch (error) {
        console.log(error);
    }
});

export const singleOrder = createAsyncThunk('single/order', async (thunkAPI) => {
    console.log(thunkAPI)
    const data = await fetch(`http://localhost:9300/single-order/${thunkAPI}`, {
        method: "GET",
        mode: 'cors',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
    }
    )
    const res = await data.json()
    console.log(res)
    return res.data
}
)

const orderSlice = createSlice({
    name: "cart",
    initialState: {
        allOrders: [],
        orders: [],
        singleOrders: []
    },
    reducers: {
    },
    extraReducers: {
        [createOrder.pending]: (state) => {
            state.loading = true;
        },
        [createOrder.fulfilled]: (state, action) => {
            // console.log(action.payload)
            state.loading = false;
            state.allOrders.push(action.payload);
        },
        [createOrder.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        [getAllOrders.pending]: (state) => {
            state.loading = true;
        },
        [getAllOrders.fulfilled]: (state, action) => {
            state.loading = false;
            if (action.payload.message === "unauthorized") {
                state.allOrders = []
            }
            else {
                state.allOrders = action.payload;
            }
        },
        [getAllOrders.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        [getOrder.pending]: (state) => {
            state.loading = true;
        },
        [getOrder.fulfilled]: (state, action) => {
            state.loading = false;
            if (action.payload.message === "unauthorized") {
                state.orders = []
            }
            else {
                state.orders = action.payload;
            }
        },
        [getOrder.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        [singleOrder.pending]: (state) => {
            state.loading = true;
        },
        [singleOrder.fulfilled]: (state, action) => {
            state.loading = false;
            if (action.payload.message === "unauthorized") {
                state.singleOrders = []
            }
            else {
                state.singleOrders = action.payload;
            }
        },
        [singleOrder.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        [deliverOrder.pending]: (state) => {
            state.loading = true;
        },
        [deliverOrder.fulfilled]: (state, action) => {
            console.log(action.payload)
            // state.loading = false;
            // if (action.payload.message === "unauthorized") {
            //     state.allOrders = []
            // }
            // else {
            //     state.allOrders = action.payload;
            //     // const { _id } = action.payload;
            //     // state.allOrders = state.allOrders.map((ele) =>
            //     // ele._id === _id ? action.payload : ele
            //     // );
            // }
            const stat = state.allOrders.find((ele) => {
                return ele._id == action.payload
            })
            console.log(stat)
            stat.isDelivered = true
        },
        [deliverOrder.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },


    },
});

export default orderSlice.reducer;