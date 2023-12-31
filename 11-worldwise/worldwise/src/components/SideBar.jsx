import Logo from "./Logo";
import AppNav from "./AppNav";
import styles from "./SideBar.module.css";
function SideBar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />
      <p> list of cities</p>
      <footer className={styles.footer}>
        <p className={styles.copyright}>
          &copy; Copyright {new Date().getFullYear()} bby WorldWise Inc.
        </p>
      </footer>
    </div>
  );
}

export default SideBar;
