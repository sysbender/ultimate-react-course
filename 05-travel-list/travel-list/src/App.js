const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
];

export default function App() {
  return (
    <div className="app">
      <Logo />
      <Form />
      <PackingList />
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
function Form() {
  function handleSubmission(e) {
    e.preventDefault();
    console.log("submitted");
  }

  return (
    <form className="add-form" onSubmit={handleSubmission}>
      <h3>What do you need for your trip?</h3>
      <select>
        {Array.from(Array(20).keys())
          .map((i) => i + 1)
          .map((v) => (
            <option value={v} key={v}>
              {v}
            </option>
          ))}
      </select>
      <input type="text" placeholder="Item..." />
      <button>Add</button>
    </form>
  );
}
function PackingList() {
  return (
    <div className="list">
      <ul>
        {initialItems.map((i) => (
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
