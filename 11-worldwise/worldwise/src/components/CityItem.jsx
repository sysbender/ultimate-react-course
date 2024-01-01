import styles from "./CityItem.module.css";
/* eslint-disable react/prop-types */ // TODO: upgrade to latest eslint tooling
const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function CityItem({ city }) {
  const { cityName, emoji, date } = city;
  console.log(emoji);
  return (
    <li className={styles.cityItem}>
      <span className={styles.emoji}> {emoji}</span>
      <h3 className={styles.name}>{cityName}</h3>
      <time className={styles.date}> {formatDate(date)} </time>
      <button className={styles.deleteBtn}> &times;</button>
    </li>
  );
}

export default CityItem;
