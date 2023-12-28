import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import StarRating from "./StarRating";
import { useState } from "react";

function MyMovieRating() {
  const [myMovieRating, setMyMovieRating] = useState(0);

  return (
    <div>
      <StarRating cbOnSetRating={setMyMovieRating} />
      <p> I rated this movie for {myMovieRating} stars</p>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <App />
  // {/* <StarRating
  //   maxRating={5}
  //   messages={["Terrible", "Bad", "Okay", "Good", "Amazing"]}
  //   defaultRating={3}
  // />
  // <StarRating maxRating={10} color={"red"} size={24} className={"test"} />
  // <MyMovieRating /> */}
  // </React.StrictMode>
);
