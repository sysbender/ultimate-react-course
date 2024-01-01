import styles from "./CountryItem.module.css";
/* eslint-disable react/prop-types */ // TODO: upgrade to latest eslint tooling
function CountryItem({ country }) {
  return (
    <li className={styles.countryItem}>
      <span>{country.emoji}</span>
      <span>{country.country}</span>
    </li>
  );
}

export default CountryItem;
