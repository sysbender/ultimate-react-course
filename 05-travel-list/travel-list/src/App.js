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

  function handleDeleteItem(id) {
    setItems((currentItems) => {
      return currentItems.filter((item) => item.id !== id);
    });
  }

  function handleToggleItem(id) {
    setItems((currentItems) => {
      return currentItems.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : { ...item }
      );
    });
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItem={handleNewItem} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
      />
      <Stats items={items} />
    </div>
  );
}

function Item({ item, onDeleteItem, onToggleItem }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => {
          onToggleItem(item.id);
        }}
      ></input>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}{" "}
      </span>
      <button
        onClick={() => {
          onDeleteItem(item.id);
        }}
      >
        ❌
      </button>
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
function PackingList({ items, onDeleteItem, onToggleItem }) {
  const [selectedSortBy, setSelectedSortBy] = useState("input");
  const sortedItems = sortItems();
  function sortItems() {
    if (selectedSortBy === "input") {
      return items;
    }

    return items.slice().sort((a, b) => {
      switch (selectedSortBy) {
        case "description":
          return a.description.localeCompare(b.description);
        case "packed":
          console.log("#################### sorted by packed");
          return Number(a.packed) - Number(b.packed);
        default:
          return 0;
      } //switch
    });
  }

  console.log("sorted items=========", sortedItems);
  function handleSelectChange(e) {
    console.log("e.target ========== ");
    console.log(e.target);
    //const selectedOption = e.target.filter((option) => option.selected)[0];
    console.log("e   = ", e);
    setSelectedSortBy(e.target.value);
  }

  console.log("===========packingList", items);
  return (
    <div className="list">
      <ul>
        {sortedItems.map((i) => (
          <Item
            item={i}
            key={i.id}
            onDeleteItem={onDeleteItem}
            onToggleItem={onToggleItem}
          />
        ))}
      </ul>
      <div className="actions">
        <select
          id="mySelect"
          value={selectedSortBy}
          onChange={handleSelectChange}
        >
          <option value="input">sort by input</option>
          <option value="description">sort by description</option>
          <option value="packed">sort by packed</option>
        </select>
      </div>
    </div>
  );
}
function Stats({ items }) {
  if (!items.length) {
    return (
      <footer className="stats">
        <em>Start adding some items to your packing list.</em>
      </footer>
    );
  }
  const itemNum = items.length;
  const packedNum = items.filter((item) => item.packed).length;
  const progress = Math.round((100 * packedNum) / itemNum);
  return (
    <footer className="stats">
      <em>
        {progress === 100
          ? "You got everything. Done"
          : `
        You have ${itemNum} items on your list, and you already packed 
        ${packedNum}( ${progress}%)`}
      </em>
    </footer>
  );
}
