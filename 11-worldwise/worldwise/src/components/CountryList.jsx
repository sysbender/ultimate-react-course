import Spinner from "./Spinner";
import styles from "./CountryList.module.css";
import CountryItem from "./CountryItem";
import Message from "./Message";
/* eslint-disable react/prop-types */ // TODO: upgrade to latest eslint tooling
function CountryList({ cities, isLoading }) {
  //   const countrySet = new Set();
  //   const countries = [];
  //   cities.forEach((city) => {
  //     if (!countrySet.has(city.country)) {
  //       countrySet.add(city.country);
  //       countries.push({ country: city.country, emoji: city.emoji });
  //     }
  //   });

  const countries = cities.reduce((countryArr, currentCity, index) => {
    if (
      !countryArr
        .map((country) => country.country)
        .includes(currentCity.country)
    ) {
      return [
        ...countryArr,
        {
          country: currentCity.country,
          emoji: currentCity.emoji,
        },
      ];
    } else {
      return [...countryArr];
    }
  }, []);

  console.log("in citylist========== , isloading=", isLoading);
  console.log(countries);
  if (isLoading) {
    return <Spinner />;
  }

  if (!countries.length) {
    return <Message message="Add your first city by clicking on the map!" />;
  }
  return (
    <ul className={styles.countryList}>
      <h3>Countries </h3>
      {countries.map((country) => (
        <CountryItem country={country} key={country.country} />
      ))}
    </ul>
  );
}

export default CountryList;
