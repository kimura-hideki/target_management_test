import React, { useEffect } from "react";
import { Provider } from "react-redux";
import store from "../stores/";
import MenuForm from "./MenuForm";
import Header from "../header/";

const Menu = () => {
  useEffect(() => {
    console.log("menu");
  },[]);

  return (
    <Provider store={store}>
      <Header />
      <MenuForm />
    </Provider>
  );
}

export default Menu;
