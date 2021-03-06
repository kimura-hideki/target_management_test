// エントリポイント
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";

// Page components
import Login from "./components/login"
import Menu from "./components/memu"
import Sales from "./components/sales"
import Items from "./components/items"
import ItemForm from "./components/itemForm"

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/menu" component={Menu} />
        <Route exact path="/sales" component={Sales} />
        <switch>
          <Route exact path="/items/new" component={ItemForm} />
          <Route exact path="/items/:id(\d+)" component={ItemForm} />
          <Route exact path="/items" component={Items} />
        </switch>
      </Switch>
    </BrowserRouter>
  );
}

// このDOMに差し込みます
const app = document.getElementById('app');
ReactDOM.render(<App />, app);
