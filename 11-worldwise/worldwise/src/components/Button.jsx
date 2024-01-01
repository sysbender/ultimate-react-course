import styles from "./Button.module.css";
/* eslint-disable react/prop-types */ // TODO: upgrade to latest eslint tooling
function Button({ children, onClick, type }) {
  // const typeClassName =
  return (
    <button className={`${styles.btn} ${styles[type]} }`} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
