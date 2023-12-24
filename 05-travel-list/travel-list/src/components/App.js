import { useState } from "react";
import { Stats } from "./Stats";
import { PackingList } from "./PackingList";
import { Logo } from "./Logo";
import { Form } from "./Form";

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
