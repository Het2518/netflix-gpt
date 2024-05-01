import {createSlice} from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: { user: null }, // <-- set initialState to an object with user: null
    reducers: {
        addUser: (state, action) => ({ ...state, user: action.payload }),
        removeUser: (state, action) => ({ ...state, user: null })
    }
})

export const {addUser, removeUser} = userSlice.actions;
export default userSlice.reducer;