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

  const [selectedFriend, setSelectedFriend] = useState(initialFriends[0]);
  function updateFriendBalance(amount) {
    setFriendsList((friends) =>
      friends.map((friend) =>
        friend.id === selectedFriend.id
          ? { ...friend, balance: friend.balance + amount }
          : { ...friend }
      )
    );
  }

  function handleSelectFriend(friend) {
    setSelectedFriend((cur) => (cur?.id === friend.id ? null : friend));
    // if (friend === selectedFriend) {
    //   setSelectedFriend(null);
    // } else {
    //   setSelectedFriend(friend);
    // }
    setShowAddFriend(false);
  }
  function handleAddFriend(friend) {
    setFriendsList((friends) => [...friends, friend]);
    setShowAddFriend(false);
  }
  function handleShowAddFriend(e) {
    setShowAddFriend((v) => !v);
  }
  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList
          friendsList={friendsList}
          selectedFriend={selectedFriend}
          handleSelectFriend={handleSelectFriend}
        />

        {showAddFriend && <FormAddFriend handleAddFriend={handleAddFriend} />}
        <Button onClick={handleShowAddFriend}>
          {showAddFriend ? "Close" : "Add Friend"}
        </Button>
      </div>
      {selectedFriend && (
        <FormSplitBill
          selectedFriend={selectedFriend}
          updateFriendBalance={updateFriendBalance}
        />
      )}
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
function Friend({ friend, isSelected, handleSelectFriend }) {
  return (
    <li>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      <Message friend={friend} />

      <Button
        onClick={() => {
          handleSelectFriend(friend);
        }}
      >
        {isSelected ? "Close" : "Select"}
      </Button>
    </li>
  );
}

function FriendsList({ friendsList, selectedFriend, handleSelectFriend }) {
  console.log(friendsList);
  return (
    <ul>
      list
      {friendsList.map((friend) => {
        const isSelected = friend.id === selectedFriend?.id;
        return (
          <Friend
            friend={friend}
            isSelected={isSelected}
            handleSelectFriend={handleSelectFriend}
            key={friend.id}
          />
        );
      })}
    </ul>
  );
}

function FormAddFriend({ handleAddFriend }) {
  const [friendName, setFriendName] = useState("");
  const [imageURL, setImageURL] = useState("");
  const id = Date.now();
  function handleSubmitAddFriend(e) {
    e.preventDefault();
    if (!friendName) return;
    const newFriend = {
      id: id,
      name: friendName,
      image: imageURL ? imageURL : `https://i.pravatar.cc/48?u=${id}`,
      balance: 0,
    };

    handleAddFriend(newFriend);
    console.log("submit add friend", e.target);
    setFriendName("");
    setImageURL("");
    // clear
  }
  return (
    <form className="form-add-friend" onSubmit={handleSubmitAddFriend}>
      <label>Friend name</label>
      <input
        type="text"
        value={friendName}
        onChange={(e) => {
          setFriendName(e.target.value);
        }}
      />
      <label>Image URL</label>
      <input
        type="text"
        value={imageURL}
        onChange={(e) => {
          setImageURL(e.target.value);
        }}
      />
      <Button onClick={handleSubmitAddFriend}>Add</Button>
    </form>
  );
}

function FormSplitBill({ selectedFriend, updateFriendBalance }) {
  const [billValue, setBillValue] = useState(0);
  const [yourExpense, setYourExpense] = useState(0);
  const [whoPay, setWhoPay] = useState("you");

  const friendExpense = billValue - yourExpense;
  function handleUpdateFriendBalance(e) {
    e.preventDefault();
    let amount = 0;
    if (whoPay === "you") {
      amount = friendExpense;
    } else {
      amount = 0 - yourExpense;
    }

    if (amount === 0) return;
    console.log("amout =", amount);

    updateFriendBalance(amount);
    // clear
    setBillValue(0);
    setYourExpense(0);
    setWhoPay("you");
  }

  return (
    <form className="form-split-bill">
      <h2>Split Bill With {selectedFriend.name}</h2>
      <label>Bill value</label>
      <input
        type="text"
        value={billValue}
        onChange={(e) => {
          setBillValue(Number(e.target.value));
        }}
      />
      <label>Your expense</label>
      <input
        type="text"
        value={yourExpense}
        onChange={(e) => {
          setYourExpense(Number(e.target.value));
        }}
      />
      <label>{selectedFriend.name}'s expense</label>

      <input type="text" value={friendExpense} disabled />
      <label>Who is paying the bill</label>
      <select
        value={whoPay}
        onChange={(e) => {
          console.log(e.target.value);
          setWhoPay(e.target.value);
        }}
      >
        <option value={"you"}> You</option>
        <option value={selectedFriend.name}>{selectedFriend.name}</option>
      </select>
      <Button onClick={handleUpdateFriendBalance}>Split bill</Button>
    </form>
  );
}
