import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const registration = createAsyncThunk("addUser", async (formData, { rejectWithValue }) => {
    console.log(formData)
    // const response = await fetch("http://localhost:9300/user/signup",
    //     {
    //         method: "POST",
    //         mode: 'cors',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(formData),
    //     }
    // );
    // try {
    //     const result = await response.json();
    //     console.log(result)
    //     return result.users;
    // } catch (error) {
    //     return rejectWithValue(error);
    // }

    try {
        const data = await axios.post('http://localhost:9300/user/signup', formData);
        return data
    } catch (error) {
        return rejectWithValue(error);
    }
}
);

export const fetchAllUsers = createAsyncThunk('showUser', async () => {
    const response = await fetch("http://localhost:9300/all/users",
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
        // console.log(result.data)
        return result.data;
    } catch (error) {
        console.log(err)
    }
});



export const userLogin = createAsyncThunk("userLogin", async (data, { rejectWithValue }) => {
    console.log(data)
    const res = await fetch("http://localhost:9300/user/login",
        {
            credentials: 'include',
            method: "POST",
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(data),
        }
    );
    try {
        const result = await res.json();
        // console.log(result)
        if (res.status === 400) {
            alert(result.message)
        }
        else {
            window.location.href = "/"
            return result.user;
        }
    }
    catch (error) {
        return rejectWithValue(error);
    }
}
);
export const userLogOut = createAsyncThunk("userLogout", async () => {
    const response = await fetch("http://localhost:9300/logout/user",
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
        window.location.href = "/"
        const result = await response.json();
        // console.log(result)
        return result;
    } catch (error) {
        console.log(err)
    }
}
);

// export const updateUser = createAsyncThunk("updateUser", async (data, { rejectWithValue }) => {
//     console.log("updated data", data);
//     const response = await fetch(
//         `http://localhost:9300/update/profile/${data._id}`,
//         {
//             method: "PUT",
//             mode: 'cors',
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             credentials: 'include',
//             body: JSON.stringify(data),
//         }
//     );
//     try {
//         const result = await response.json();
//         console.log(result)
//         return result;
//     } catch (error) {
//         return rejectWithValue(error);
//     }
// }
// );
export const updateUser = createAsyncThunk('updateUser', async (thunkAPI) => {
    console.log(thunkAPI)
    const data = await axios.put('http://localhost:9300/update/profile/' + thunkAPI.id, thunkAPI.data, { withCredentials: true })
    return thunkAPI
}
)

export const deleteuser = createAsyncThunk("deleteuser", async (id, { rejectWithValue }) => {
    console.log(id)
    const response = await fetch(`http://localhost:9300/delete/profile/${id}`,
        {
            method: "DELETE",
            mode: 'cors',
            headers: {
                "Content-Type": "application/json",
            },
            credentials: 'include',
        }
    );
    try {
        const result = await response.json();
        console.log(result.user)
        return result.user;
    } catch (error) {
        return rejectWithValue(error);
    }
}
);

export const fetchsingleUser = createAsyncThunk('singleUser', async (id) => {
    console.log(id)
    const response = await fetch(`http://localhost:9300/get/user/${id}`,
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
        // console.log(result.user)
        return result.user;
    } catch (error) {
        console.log(err)
    }
});

export const fetchLoginUser = createAsyncThunk('fetchLoginUser', async (id) => {
    const response = await fetch('http://localhost:9300/about',
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
        // console.log(result.user)
        return result;
    } catch (error) {
        console.log(err)
    }
});

const userReducer = createSlice({
    name: 'users',
    initialState: {
        allusers: [],
        loginUser: {},
        currentUser: [],
        loading: false,
        error: null,
        loginstatus: "",
        updatestatus: "",
        searchData: []
    },
    reducers: {
        searchUser: (state, action) => {
            // console.log(action.payload);
            state.searchData = action.payload;
            // state.allusers = state.allusers.filter((ele) => {
            //     return ele.username.toLowerCase().includes(action.payload)
            // })
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllUsers.pending, (state) => {
                state.loading == true
            })
            .addCase(fetchAllUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.allusers = action.payload;
            })
            .addCase(fetchAllUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            })
            .addCase(registration.pending, (state) => {
                state.loading = true;
            })
            .addCase(registration.fulfilled, (state, action) => {
                // console.log(action.payload)
                state.loading = false;
                state.allusers.push(action.payload);
            })
            .addCase(registration.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(userLogin.pending, (state) => {
                state.loading = true;
            })
            .addCase(userLogin.fulfilled, (state, action) => {
                // console.log(action.payload)
                state.loading = false;
                if (action.payload.message == "unauthorized") {
                    state.currentUser = {}

                } else {
                    state.currentUser = action.payload
                }
            })
            .addCase(userLogin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(userLogOut.pending, (state) => {
                state.loading = true;
            })
            .addCase(userLogOut.fulfilled, (state, action) => {
                // console.log(action.payload)
                state.loading = false;
                // state.currentUser = []
            })
            .addCase(userLogOut.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            })
            .addCase(updateUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                // console.log(action.payload)
                state.loading = false;
                const { _id } = action.payload;
                state.allusers = state.allusers.map((ele) =>
                    ele._id === _id ? action.payload : ele
                );
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            })
            .addCase(deleteuser.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteuser.fulfilled, (state, action) => {
                // console.log(action.payload)
                state.loading = false;
                const { _id } = action.payload
                if (_id) {
                    state.allusers = state.allusers.filter((ele) => ele._id !== _id);
                }
            })
            .addCase(deleteuser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            })
            .addCase(fetchsingleUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchsingleUser.fulfilled, (state, action) => {
                // console.log(action.payload)
                state.loading = false;
                state.currentUser = action.payload;
            })
            .addCase(fetchsingleUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            })
            .addCase(fetchLoginUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchLoginUser.fulfilled, (state, action) => {
                // console.log(action.payload)
                state.loginstatus = action.payload.status
                if (action.payload.message == "unauthorized") {
                    state.loginUser = ''
                }
                else {
                    state.loading = false;
                    state.loginUser = action.payload.user;
                }
            })
            .addCase(fetchLoginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            })

    }

    // extraReducers: {
    //     [fetchAllUsers.pending]: (state) => {
    //         state.loading = true;
    //     },
    //     [fetchAllUsers.fulfilled]: (state, action) => {
    //         state.loading = false;
    //         state.allusers = action.payload;
    //     },
    //     [fetchAllUsers.rejected]: (state, action) => {
    //         state.loading = false;
    //         state.error = action.payload;
    //     },
    //     [registration.pending]: (state) => {
    //         state.loading = true;
    //     },
    //     [registration.fulfilled]: (state, action) => {
    //         // console.log(action.payload)
    //         state.loading = false;
    //         state.allusers.push(action.payload);
    //     },
    //     [registration.rejected]: (state, action) => {
    //         state.loading = false;
    //         state.error = action.payload;
    //     },
    //     [userLogin.pending]: (state) => {
    //         state.loading = true;
    //     },
    //     [userLogin.fulfilled]: (state, action) => {
    //         // console.log(action.payload)
    //         state.loading = false;
    //         if (action.payload.message == "unauthorized") {
    //             state.currentUser = {}

    //         } else {
    //             state.currentUser = action.payload
    //         }
    //         // state.currentUser = action.payload
    //     },
    //     [userLogin.rejected]: (state, action) => {
    //         state.loading = false;
    //         state.error = action.payload;
    //     },
    //     [userLogOut.pending]: (state) => {
    //         state.loading = true;
    //     },
    //     [userLogOut.fulfilled]: (state, action) => {
    //         // console.log(action.payload)
    //         state.loading = false;
    //         // state.currentUser = []
    //     },
    //     [userLogOut.rejected]: (state, action) => {
    //         state.loading = false;
    //         state.error = action.payload;
    //     },
    //     [updateUser.pending]: (state) => {
    //         state.loading = true;
    //     },
    //     [updateUser.fulfilled]: (state, action) => {
    //         // console.log(action.payload)
    //         state.loading = false;
    //         const { _id } = action.payload;
    //         state.allusers = state.allusers.map((ele) =>
    //             ele._id === _id ? action.payload : ele
    //         );
    //     },
    //     [updateUser.rejected]: (state, action) => {
    //         state.loading = false;
    //         state.error = action.payload;
    //     },
    //     [deleteuser.pending]: (state) => {
    //         state.loading = true;
    //     },
    //     [deleteuser.fulfilled]: (state, action) => {
    //         // console.log(action.payload)
    //         state.loading = false;
    //         const { _id } = action.payload
    //         if (_id) {
    //             state.allusers = state.allusers.filter((ele) => ele._id !== _id);
    //         }
    //     },
    //     [deleteuser.rejected]: (state, action) => {
    //         state.loading = false;
    //         state.error = action.payload;
    //     },
    //     [fetchsingleUser.pending]: (state) => {
    //         state.loading = true;
    //     },
    //     [fetchsingleUser.fulfilled]: (state, action) => {
    //         // console.log(action.payload)
    //         state.loading = false;
    //         state.currentUser = action.payload;
    //     },
    //     [fetchsingleUser.rejected]: (state, action) => {
    //         state.loading = false;
    //         state.error = action.payload;
    //     },
    //     [fetchLoginUser.pending]: (state) => {
    //         state.loading = true;
    //     },
    //     [fetchLoginUser.fulfilled]: (state, action) => {
    //         // console.log(action.payload)
    //         state.loginstatus = action.payload.status
    //         if (action.payload.message == "unauthorized") {
    //             state.loginUser = ''
    //         }
    //         else {
    //             state.loading = false;
    //             state.loginUser = action.payload.user;
    //         }

    //     },
    //     [fetchLoginUser.rejected]: (state, action) => {
    //         state.loading = false;
    //         state.error = action.payload;
    //     },
    // }
})

export default userReducer.reducer

export const { searchUser } = userReducer.actions;
