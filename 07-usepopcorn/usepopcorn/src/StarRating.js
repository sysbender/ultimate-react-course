import { useState } from "react";
import PropTypes from "prop-types";
const containerSytle = {
  display: "flex",
  alignItems: "center",
  gap: "16px",
};

const starContainerStyle = {
  display: "flex",
};

StarRating.propTypes = {
  maxRating: PropTypes.number,
  color: PropTypes.string,
  cbOnSetRating: PropTypes.func,
  messages: PropTypes.array,
};
export default function StarRating({
  maxRating = 5,
  color = "#fcc419",
  size = 48,
  className = "",
  messages = [],
  defaultRating = 0,
  cbOnSetRating,
}) {
  const [rating, setRating] = useState(defaultRating);
  const [tempRating, setTempRating] = useState(0);

  const textStyle = {
    lineHeight: "1",
    margin: "0",
    color,
    fontSize: `${size / 1.5}px`,
  };

  function handleRating(rating) {
    console.log(` setRating = ${rating}`);
    setRating(rating);
    cbOnSetRating(rating);
  }

  function handleHoverIn(rating) {
    setTempRating(rating);
    console.log(`hover in = ${rating}`);
  }

  function handleHoverOut(rating) {
    setTempRating(0);
    console.log(`hover out = ${rating}`);
  }

  function getRatingResult() {
    const ratingNum = tempRating ? tempRating : rating;
    if (messages.length === maxRating) {
      return ratingNum ? messages[ratingNum - 1] : "";
    } else {
      return ratingNum ? ratingNum : "";
    }
  }
  return (
    <div style={containerSytle} className={className}>
      <div style={starContainerStyle}>
        {Array.from({ length: maxRating }, (_, i) => {
          return (
            <Star
              key={i}
              full={tempRating ? i < tempRating : i < rating}
              handleClick={() => handleRating(i + 1)}
              handleHoverIn={() => handleHoverIn(i + 1)}
              handleHoverOut={() => handleHoverOut(i + 1)}
              size={size}
              color={color}
            />
          );
        })}
      </div>
      <p style={textStyle}> {getRatingResult()}</p>
    </div>
  );
}

function Star({
  handleClick,
  handleHoverIn,
  handleHoverOut,
  size = 48,
  color,
  full,
}) {
  const starStyle = {
    width: `${size}px`,
    Height: `${size}px`,
    display: "block",
    cursor: "pointer",
  };

  return (
    <span
      role="button"
      style={starStyle}
      onClick={handleClick}
      onMouseEnter={handleHoverIn}
      onMouseLeave={handleHoverOut}
    >
      {full ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill={color}
          stroke={color}
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke={color}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="{2}"
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
          />
        </svg>
      )}
    </span>
  );
}
