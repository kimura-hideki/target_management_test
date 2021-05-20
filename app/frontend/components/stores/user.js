import { createSlice } from "@reduxjs/toolkit";

// Stateの初期状態
const initialState = {
    name: 'name',
    userID: 'userID',
    password: 'password'
};

const slice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setName: (state, action) => {
          return Object.assign({}, state, {name: action.payload })
        },
        clearName: state => {
          return Object.assign({}, state, { name: "" })
        },
        setUserID: (state, action) => {
            return Object.assign({}, state, {userID: action.payload })
        },
        clearUserID: state => {
            return Object.assign({}, state, { userID: "" })
        },
        setPassword: (state, action) => {
            return Object.assign({}, state, {password: action.payload })
        },
        clearPassword: state => {
            return Object.assign({}, state, { password: "" })
        },
        clearAll: state => {
            return Object.assign({}, state, { name: "name", userID: "", password: "" })
        },
    }
});

// Reducerをエクスポートする
export default slice.reducer;

// Action Creatorsをエクスポートする
export const { setName, clearName, setUserID, clearUserID, setPassword, clearPassword, clearAll } = slice.actions;