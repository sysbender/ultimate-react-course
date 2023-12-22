import React from "react";
import ReactDOM from "react-dom/client";
import { pizzaData } from "./data.js";
import "./index.css";
// import ReactDOM from "react-dom";
function Pizza(props) {
  const p = props.pizzaObj;

  return (
    <li className="pizza">
      <img src={p.photoName} alt={p.name} />
      <div>
        <h3>{p.name}</h3>
        <p>{p.ingredients}</p>
        <p> {p.price} </p>
      </div>
    </li>
  );
}

function App() {
  return (
    <div>
      <Header />
      <Menu />
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header className="header">
      <h1>Fast React Pizza Co.</h1>
    </header>
  );
}
function Menu() {
  return (
    <main className="menu">
      <h2>Our Menu</h2>
      <ul className="pizzas">
        {pizzaData.map((pizza) => (
          <Pizza pizzaObj={pizza} key={pizza.name} />
        ))}
      </ul>
    </main>
  );
}
function Footer() {
  return (
    <footer className="footer">
      <p>&copy; 2023 React Pizza. All rights reserved.</p>
    </footer>
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
