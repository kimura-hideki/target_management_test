import React from "react";
import LoginForm from "./LoginFrom";
import { Provider } from "react-redux";
import store from "../stores/";
import Header from "../header/";

const Login = () => {

  return (
    <Provider store={store}>
      <main>
        <Header />
        <LoginForm />
      </main>
    </Provider>
  );
}

export default Login;
