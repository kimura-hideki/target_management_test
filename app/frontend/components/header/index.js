import React, { useEffect } from "react";
import { Provider } from "react-redux";
import store from "../stores/";
import HeaderContents from "./HeaderContents";

const Header = () => {
  useEffect(() => {
    console.log("test");
  },[]);

  return (
    <Provider store={store}>
        <HeaderContents />
    </Provider>
  );
}

export default Header;
