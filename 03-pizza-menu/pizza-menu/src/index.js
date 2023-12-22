import React from "react";
import ReactDOM from "react-dom/client";
import { pizzaData } from "./data.js";
// import ReactDOM from "react-dom";
function Pizza() {
  return (
    <div>
      <img src={pizzaData[0].photoName} alt={pizzaData[0].name} />
      <h2>{pizzaData[0].name}</h2>
      <p>{pizzaData[0].ingredients}</p>
    </div>
  );
}

function App() {
  return (
    <div>
      <h1>Hello React!</h1>
      <Pizza />
      <Pizza />
      <Pizza />
    </div>
  );
}

const domRootElement = document.getElementById("root");
const root = ReactDOM.createRoot(domRootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
// before react 18
//React.render(<App />, domRootElement);
