import { useSearchParams, useNavigate } from "react-router-dom";
import styles from "./Map.module.css";

function Map() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  return (
    <div
      className={styles.mapContainer}
      onClick={() => {
        navigate("form");
      }}
    >
      <h1>MAP</h1>
      <h2>
        position : {lat}, {lng}
      </h2>
      <button
        onClick={() => {
          setSearchParams({ lat: 22, lng: 33 });
        }}
      >
        set search params
      </button>
    </div>
  );
}

export default Map;
