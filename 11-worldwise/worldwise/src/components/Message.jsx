import styles from "./Message.module.css";
/* eslint-disable react/prop-types */ // TODO: upgrade to latest eslint tooling
function Message({ message }) {
  return (
    <p className={styles.message}>
      <span role="img">👋</span> {message}
    </p>
  );
}

export default Message;
