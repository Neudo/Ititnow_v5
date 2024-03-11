import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: false,
}

export const checkUser = createSlice({
    name: 'checkUser',
    initialState,
    reducers: {
        userLoggedIn: (state, action) => {
            state.value = action.payload
        }
    }
})

console.log(checkUser.actions.userLoggedIn())
export const { userLoggedIn } = checkUser.actions
export default checkUser.reducer
