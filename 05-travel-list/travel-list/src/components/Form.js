import { useState } from "react";

export function Form({ onAddItem }) {
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
