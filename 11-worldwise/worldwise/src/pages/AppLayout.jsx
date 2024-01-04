import Map from "../components/Map";
import SideBar from "../components/SideBar";
import styles from "./AppLayout.module.css";
import User from "../components/User";
function AppLayout() {
  return (
    <div className={styles.app}>
      <SideBar />
      <User />
      <Map />
    </div>
  );
}

export default AppLayout;
