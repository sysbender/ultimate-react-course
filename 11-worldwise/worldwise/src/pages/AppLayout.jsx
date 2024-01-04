import Map from "../components/Map";
import SideBar from "../components/SideBar";
import styles from "./AppLayout.module.css";
import User from "../components/User";
import ProtectedRoute from "./ProtectedRoute";
function AppLayout() {
  return (
    <ProtectedRoute>
      <div className={styles.app}>
        <SideBar />
        <User />
        <Map />
      </div>
    </ProtectedRoute>
  );
}

export default AppLayout;
