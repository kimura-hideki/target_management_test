import React, { useEffect } from "react";
import { Provider } from "react-redux";
import store from "../stores/";
import Header from "../header/";
import ItemForm from "./itemForm"

const ItemForms = () => {
  useEffect(() => {
    console.log("sales");
  },[]);

    return (
    <Provider store={store}>
      <Header />
      <ItemForm />
    </Provider>
  );
}

export default ItemForms;
