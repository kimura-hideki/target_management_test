import React, { useEffect } from "react";
import { Provider } from "react-redux";
import store from "../stores/";
import Header from "../header/";
import Tile from "./tile";

const Sales = () => {
  useEffect(() => {
    console.log("sales");
  },[]);

    return (
    <Provider store={store}>
      <Header />
      <Tile />
    </Provider>
  );
}

export default Sales;
