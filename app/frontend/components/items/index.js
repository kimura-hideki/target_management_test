import React, { useEffect } from "react";
import { Provider } from "react-redux";
import store from "../stores/";
import Header from "../header/";
import ItemSearchForm from "./itemSearchForm"

const Items = () => {
  useEffect(() => {
    console.log("sales");
  },[]);

    return (
    <Provider store={store}>
      <Header />
      <ItemSearchForm />
    </Provider>
  );
}

export default Items;
