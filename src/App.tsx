import React from "react";
import "@fontsource/roboto/500.css";
import "./App.scss";
import RouteApp from "./components/Route";
import { Provider } from "react-redux";
import { store } from "./store/index";


function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <RouteApp />
      </Provider>
    </div>
  );
}

export default App;
