import React from "react";
import ReactDOM from "react-dom/client";
import { pizzaData } from "./data.js";
import "./index.css";
// import ReactDOM from "react-dom";
function Pizza() {
  return (
    <div>
      <img src={pizzaData[0].photoName} alt={pizzaData[0].name} />
      <h3>{pizzaData[0].name}</h3>
      <p>{pizzaData[0].ingredients}</p>
    </div>
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
      <Pizza />
      <Pizza />
      <Pizza />
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
