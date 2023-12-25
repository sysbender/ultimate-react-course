import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export default function App() {
  const [friendsList, setFriendsList] = useState(initialFriends);
  const [showAddFriend, setShowAddFriend] = useState(false);

  function handleShowAddFriend(e) {
    setShowAddFriend((v) => !v);
  }
  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList friendsList={friendsList} />

        {showAddFriend && <FormAddFriend />}
        <Button onClick={handleShowAddFriend}>
          {showAddFriend ? "Close" : "Add Friend"}
        </Button>
      </div>
      <FormSplitBill />
    </div>
  );
}
function Message({ friend }) {
  if (friend.balance > 0) {
    return (
      <p style={{ color: "green" }}>
        {friend.name} owns you {friend.balance} $
      </p>
    );
  }

  if (friend.balance === 0) {
    return <p>You and {friend.name} are even</p>;
  }

  if (friend.balance < 0) {
    return (
      <p style={{ color: "red" }}>
        You own {friend.name} {Math.abs(friend.balance)} $
      </p>
    );
  }
}

function Button({ onClick, children }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}
function Friend({ friend }) {
  return (
    <li>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      <Message friend={friend} />

      <Button>Select</Button>
    </li>
  );
}

function FriendsList({ friendsList }) {
  console.log(friendsList);
  return (
    <ul>
      list
      {friendsList.map((friend) => {
        return <Friend friend={friend} key={friend.id} />;
      })}
    </ul>
  );
}

function FormAddFriend() {
  return (
    <form className="form-add-friend">
      <label>Friend name</label>
      <input type="text" />
      <label>Image URL</label>
      <input type="text" />
      <Button>Add</Button>
    </form>
  );
}

function FormSplitBill() {
  const [billValue, setBillValue] = useState(0);
  const [yourExpense, setYourExpense] = useState(0);
  const [whoPay, setWhoPay] = useState("you");

  const friendExpense = billValue - yourExpense;
  return (
    <form className="form-split-bill">
      <h2>Split Bill With friend</h2>
      <label>Bill value</label>
      <input
        type="text"
        value={billValue}
        onChange={(e) => {
          setBillValue(e.target.value);
        }}
      />
      <label>Your expense</label>
      <input
        type="text"
        value={yourExpense}
        onChange={(e) => {
          setYourExpense(e.target.value);
        }}
      />
      <label>Friend's expense</label>

      <input type="text" value={friendExpense} disabled />
      <label>Who is paying the bill</label>
      <select
        onChange={(e) => {
          console.log(e.target.value);
        }}
      >
        <option value={"you"}>You</option>
        <option value={"friend"}>Friend</option>
      </select>
    </form>
  );
}
