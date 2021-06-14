import React, { useEffect } from "react";
import { Provider } from "react-redux";
import store from "../stores/";
import Header from "../header/";
import ItemList from "./itemList"

const Items = () => {
  useEffect(() => {
    console.log("sales");
  },[]);

    return (
    <Provider store={store}>
      <Header />
      <ItemList />
    </Provider>
  );
}

export default Items;
