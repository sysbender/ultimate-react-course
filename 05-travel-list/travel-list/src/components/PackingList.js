import { useState } from "react";
import { Item } from "./Item";

export function PackingList({ items, onDeleteItem, onToggleItem }) {
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
        <button
          onClick={() => {
            if (items.length === 0) return;
            const confirmed = window.confirm("Delete all");
            if (!confirmed) return;
            items.forEach((item) => {
              onDeleteItem(item.id);
              console.log("clear list !!!!!!!!!!!!!!!", item.description);
            });
          }}
        >
          Clear List
        </button>
      </div>
    </div>
  );
}
