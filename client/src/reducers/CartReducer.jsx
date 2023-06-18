import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const addcart = createAsyncThunk('cart/add', async (thunkAPI) => {
    const data = await axios.post("http://localhost:9300/add-to-cart", thunkAPI, { withCredentials: true })
    console.log(data.data.cart)
    return thunkAPI
}
)

export const getcart = createAsyncThunk('cart/get', async (thunkAPI) => {
    // console.log(thunkAPI)
    const data = await fetch(`http://localhost:9300/cart/${thunkAPI}`, {
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
    return res
}
)

export const cartDelete = createAsyncThunk(
    'cart/delete',
    async (thunkAPI) => {
        // console.log(thunkAPI)
        const data = await axios.delete("http://localhost:9300/cartDelete/" + thunkAPI._id, { withCredentials: true })
        // console.log(data)
        return thunkAPI

    }
)

export const increaseQuantity = createAsyncThunk('cart/incrase', async (thunkAPI, { rejectWithValue }) => {
    // console.log(thunkAPI)
    const response = await fetch("http://localhost:9300/cart/update/increase",
        {
            method: "PUT",
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(thunkAPI),
        }
    );
    try {
        const result = await response.json();
        // console.log(result)
        return result;
    } catch (error) {
        return rejectWithValue(error);
    }
}
)
export const decreaseQuantity = createAsyncThunk('cart/decrese', async (thunkAPI, { rejectWithValue }) => {
    // console.log(thunkAPI)
    const response = await fetch("http://localhost:9300/cart/update/decrease",
        {
            method: "PUT",
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(thunkAPI),
        }
    );
    try {
        const result = await response.json();
        // console.log(result)
        return result;
    } catch (error) {
        return rejectWithValue(error);
    }
}
)

// export const updatecart = createAsyncThunk('cart/update', async (thunkAPI) => {
//     console.log(thunkAPI)
//     const data = await axios.put("http://localhost:9300/updateCart/" + thunkAPI.data._id, thunkAPI, { withCredentials: true })
//     console.log(data)
//     return thunkAPI
// }
// )

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cartproducts: [],
        quantity: 0,
        total: 0,
        status: '',
    },
    reducers: {
    },
    extraReducers: {
        [getcart.pending]: (state) => {
            state.loading = true;
        },
        [getcart.fulfilled]: (state, action) => {
            // console.log(action.payload.cart)
            state.loading = false;
            if (action.payload.message === "unauthorized") {
                state.cartproducts = []
            }
            else {
                state.cartproducts = action.payload.cart;
                state.total = action.payload.cart.reduce((acc, cr) => acc + Number(cr.price), 0)
                state.quantity = action.payload.cart.reduce((acc, cr) => acc + Number(cr.quantity), 0)
            }
        },
        [getcart.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        [addcart.pending]: (state) => {
            state.loading = true;
        },
        [addcart.fulfilled]: (state, action) => {
            console.log(state.cartproducts)
            console.log(action.payload)
            console.log(state.quantity)
            // state.cartproducts.push(action.payload);
            // state.loading = false;
            // state.cartproducts.map((ele) => {
            //     if (ele._id == action.payload._id) {
            //         return ele.quantity = action.payload.quantity
            //     }
            // })
            state.quantity += action.payload.quantity
            // state.quantity = state.cartproducts.reduce((acc, num) => acc + Number(num.quantity), 0)

            // state.total += Number(action.payload.price)
        },
        [addcart.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        [cartDelete.pending]: (state) => {
            state.loading = true;
        },
        [cartDelete.fulfilled]: (state, action) => {
            // console.log(action.payload)
            state.loading = false;
            state.cartproducts = state.cartproducts.filter((e) => e._id !== action.payload._id)
            state.quantity = state.cartproducts.reduce((acc, cr) => acc + Number(cr.quantity), 0)
            state.total -= Number(action.payload.price)
        },
        [cartDelete.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        [increaseQuantity.pending]: (state) => {
            state.loading = true;
        },
        [increaseQuantity.fulfilled]: (state, action) => {
            console.log(action.payload)
            state.loading = false;
            state.cartproducts.map((ele) => {
                if (ele._id == action.payload.cart._id) {
                    return ele.quantity = action.payload.cart.quantity,
                        ele.price = action.payload.cart.price
                }
            })
            state.total = state.cartproducts.reduce((acc, cr) => {
                // console.log(cr.price)
                return acc + Number(cr.price)
            }, 0)
            state.quantity = state.cartproducts.reduce((acc, cr) => acc + Number(cr.quantity), 0)
        },
        [increaseQuantity.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        [decreaseQuantity.pending]: (state) => {
            state.loading = true;
        },
        [decreaseQuantity.fulfilled]: (state, action) => {
            // console.log(action.payload)
            state.loading = false;
            state.cartproducts.map((ele) => {
                if (ele._id == action.payload.cart._id) {
                    return ele.quantity = action.payload.cart.quantity,
                        ele.price = action.payload.cart.price
                }
            })
            state.total = state.cartproducts.reduce((acc, cr) => {
                console.log(cr.price)
                return acc + Number(cr.price)
            }, 0)
            state.quantity = state.cartproducts.reduce((acc, cr) => acc + Number(cr.quantity), 0)
            state.cartproducts = state.cartproducts.filter((e) => e.quantity >= 1)
        },
        [decreaseQuantity.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        // [updatecart.fulfilled]: (state, action) => {
        //     if (action.payload.message == "increment") {
        //         console.log(action.payload)
        //         state.cartproducts.map((e) => {
        //             if (e._id == action.payload.data._id) {
        //                 return e.quantity += 1,
        //                     e.price += action.payload.data.price
        //             }
        //         })
        //     }
        //     if (action.payload.message == "decrement") {
        //         console.log(state.amount)
        //         state.cartproducts.map((e) => {
        //             if (e._id == action.payload.data._id) {
        //                 return e.quantity -= 1,
        //                     e.price -= action.payload.data.price
        //             }
        //         })
        //     }
        //     state.total = state.cartproducts.reduce((acc, cr) => acc + Number(cr.price), 0)
        // }
    },
});

export default cartSlice.reducer;