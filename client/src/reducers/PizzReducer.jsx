import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchAllPizza = createAsyncThunk('showAllPizza', async (name) => {
    try {
        const response = await fetch('http://localhost:9300/get-all-burgers');
        const data = await response.json();
        console.log(data)
        return data.pizza;
    }
    catch (err) {
        console.log(err)
    }
});

export const addPizza = createAsyncThunk('burger/add', async (thunkAPI) => {
    console.log(thunkAPI)
    const data = await axios.post("http://localhost:9300/add-burger", thunkAPI, { withCredentials: true })
    return data.data.pizza
}
)
export const deletePizza = createAsyncThunk("deletePizza", async (id, { rejectWithValue }) => {
    const response = await axios.delete(`http://localhost:9300/delete-burger/${id}`, { withCredentials: true });
    try {
        const result = await response.data;
        return result.pizza;
    } catch (error) {
        return rejectWithValue(error);
    }
})


export const updatePizza = createAsyncThunk('burger/upd', async (thunkAPI) => {
    console.log(thunkAPI)
    const data = await axios.put('http://localhost:9300/update-burger/' + thunkAPI.id, thunkAPI.data, { withCredentials: true })
    return thunkAPI
}
)
export const singlePizza = createAsyncThunk('singlePizza', async (id) => {
    console.log(id)
    const response = await fetch(`http://localhost:9300/get-burger-by-id/${id}`,
        {
            method: 'GET',
            mode: 'cors',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        }
    );
    try {
        const result = await response.json();
        return result.singledata;
    } catch (error) {
        console.log(err)
    }
});


const pizzaSlice = createSlice({
    name: 'pizza',
    initialState: {
        allPizzas: [],
        singlePizzas: [],
        loading: false,
        error: null,
        searchData: [],
    },
    reducers: {
        searchInfo: (state, action) => {
            console.log(action.payload);
            state.searchData = action.payload;
        },
    },
    // extraReducers: (builder) => {
    //     builder
    //         .addCase(fetchAllPizza.pending, (state) => {
    //             state.loading == true
    //         })
    //         .addCase(fetchAllPizza.fulfilled, (state, action) => {
    //             state.loading = false;
    //             state.allPizzas = action.payload;
    //             state.searchData = action.payload
    //         })
    //         .addCase(fetchAllPizza.rejected, (state, action) => {
    //             state.loading = false;
    //             state.error = action.payload.message;
    //         })
    //         .addCase(addPizza.pending, (state) => {
    //             state.loading = true;
    //         })
    //         .addCase(addPizza.fulfilled, (state, action) => {
    //             console.log(action.payload)
    //             state.loading = false;
    //             state.allPizzas.push(action.payload);
    //         })
    //         .addCase(addPizza.rejected, (state, action) => {
    //             state.loading = false;
    //             state.error = action.error.message;
    //         })
    //         .addCase(deletePizza.pending, (state) => {
    //             state.loading = true;
    //         })
    //         .addCase(deletePizza.fulfilled, (state, action) => {
    //             console.log(action.payload)
    //             state.loading = false;
    //             const { _id } = action.payload
    //             if (_id) {
    //                 state.allPizzas = state.allPizzas.filter((ele) => ele._id !== _id);
    //             }
    //         })
    //         .addCase(deletePizza.rejected, (state, action) => {
    //             state.loading = false;
    //             state.error = action.payload;
    //         })
    //         .addCase(updatePizza.pending, (state) => {
    //             state.loading = true;
    //         })
    //         .addCase(updatePizza.fulfilled, (state, action) => {
    //             console.log(action.payload)
    //             state.loading = false;
    //             const { _id } = action.payload;
    //             state.allPizzas = state.allPizzas.map((ele) =>
    //                 ele._id === _id ? action.payload : ele
    //             );
    //         })
    //         .addCase(updatePizza.rejected, (state, action) => {
    //             state.loading = false;
    //             state.error = action.payload.message;
    //         })
    //         .addCase(singlePizza.pending, (state) => {
    //             state.loading = true;
    //         })
    //         .addCase(singlePizza.fulfilled, (state, action) => {
    //             console.log(action.payload)
    //             state.loading = false;
    //             state.singlePizzas = action.payload;
    //         })
    //         .addCase(singlePizza.rejected, (state, action) => {
    //             state.loading = false;
    //             state.error = action.payload.message;
    //         })
    // }
    extraReducers: {
        [fetchAllPizza.pending]: (state) => {
            state.loading = true;
        },
        [fetchAllPizza.fulfilled]: (state, action) => {
            state.loading = false;
            state.allPizzas = action.payload;
            state.searchData = action.payload
        },
        [fetchAllPizza.rejected]: (state, action) => {
            console.log(state.error)
            state.loading = false;
            state.error = action.payload.message;
        },
        [addPizza.pending]: (state) => {
            state.loading = true;
        },
        [addPizza.fulfilled]: (state, action) => {
            console.log(action.payload)
            state.loading = false;
            state.allPizzas.push(action.payload);
        },
        [addPizza.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        [deletePizza.pending]: (state) => {
            state.loading = true;
        },
        [deletePizza.fulfilled]: (state, action) => {
            console.log(action.payload)
            state.loading = false;
            const { _id } = action.payload
            if (_id) {
                state.allPizzas = state.allPizzas.filter((ele) => ele._id !== _id);
            }
        },
        [deletePizza.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        [updatePizza.pending]: (state) => {
            state.loading = true;
        },
        [updatePizza.fulfilled]: (state, action) => {
            console.log(action.payload)
            state.loading = false;
            const { _id } = action.payload;

            state.allPizzas = state.allPizzas.map((ele) =>
                ele._id === _id ? action.payload : ele
            );
        },
        [updatePizza.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        [singlePizza.pending]: (state) => {
            state.loading = true;
        },
        [singlePizza.fulfilled]: (state, action) => {
            console.log(action.payload)
            state.loading = false;
            state.singlePizzas = action.payload;
        },
        [singlePizza.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

    }

})

export default pizzaSlice.reducer
export const { searchInfo } = pizzaSlice.actions;
