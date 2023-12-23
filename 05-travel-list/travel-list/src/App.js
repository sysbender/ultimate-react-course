import { useState } from "react";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
];

export default function App() {
  const [items, setItems] = useState([]);

  function handleNewItem(item) {
    setItems((items) => {
      console.log(" add item ==========", item);
      return [...items, item];
    });
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItem={handleNewItem} />
      <PackingList items={items} />
      <Stats />
    </div>
  );
}

function Item({ item }) {
  return (
    <li>
      <input type="checkbox" id={item.id}></input>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}{" "}
      </span>
      <button>❌</button>
    </li>
  );
}
function Logo() {
  return <h1>🌴Far Away💼</h1>;
}

function Form({ onAddItem }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);
  function handleSubmission(e) {
    e.preventDefault();
    if (!description) return;

    const newItem = { description, id: Date.now(), quantity, packed: false };
    console.log("submitted new item=========", newItem);
    onAddItem(newItem);

    setDescription("");
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmission}>
      <h3>What do you need for your trip?</h3>
      <select
        value={quantity}
        onChange={(e) => {
          setQuantity(Number(e.target.value));
        }}
      >
        {Array.from(Array(20).keys())
          .map((i) => i + 1)
          .map((v) => (
            <option value={v} key={v}>
              {v}
            </option>
          ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => {
          console.log(e.target);
          setDescription(e.target.value);
        }}
      />
      <button onClick={handleSubmission}>Add</button>
    </form>
  );
}
function PackingList({ items }) {
  console.log("===========packingList", items);
  return (
    <div className="list">
      <ul>
        {items.map((i) => (
          <Item item={i} key={i.id} />
        ))}
      </ul>
    </div>
  );
}
function Stats() {
  return (
    <footer className="stats">
      <em>You have X items on your list, and you already packed Y(y%)</em>
    </footer>
  );
}
