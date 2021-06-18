import { createSlice } from "@reduxjs/toolkit";

// Stateの初期状態
const initialState = {
    item_id: 'item_id',
    item_name: 'item_name',
    price: 'price'
};

const slice = createSlice({
    name: "item",
    initialState,
    reducers: {
        setItemID: (state, action) => {
            return Object.assign({}, state, {item_id: action.payload })
        },
        clearItemID: state => {
            return Object.assign({}, state, { item_id: "" })
        },
        setName: (state, action) => {
          return Object.assign({}, state, {item_name: action.payload })
        },
        clearName: state => {
          return Object.assign({}, state, { item_name: "" })
        },
        setPrice: (state, action) => {
            return Object.assign({}, state, {price: action.payload })
        },
        clearPrice: state => {
            return Object.assign({}, state, { price: "" })
        },
        clearAll: state => {
            return Object.assign({}, state, { item_id: "item_id", item_name: "item_name", price: "price" })
        },
    }
});

// Reducerをエクスポートする
export default slice.reducer;

// Action Creatorsをエクスポートする
export const { setName, clearName, setItemID, clearItemID, setPrice, clearPrice, clearAll } = slice.actions;