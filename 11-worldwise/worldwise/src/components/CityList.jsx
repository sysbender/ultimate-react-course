import Spinner from "./Spinner";
import styles from "./CityList.module.css";
import CityItem from "./CityItem";
import Message from "./Message";
/* eslint-disable react/prop-types */ // TODO: upgrade to latest eslint tooling
function CityList({ cities, isLoading }) {
  console.log("in citylist========== , isloading=", isLoading);
  console.log(cities);
  if (isLoading) {
    return <Spinner />;
  }

  if (!cities.length) {
    return <Message message="Add your first city by clicking on the map!" />;
  }
  return (
    <div className={styles.city}>
      <h3>city2 </h3>
      {cities.map((city) => (
        <CityItem city={city} key={city.cityName} />
      ))}
    </div>
  );
}

export default CityList;
