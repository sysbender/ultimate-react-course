// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useState, useEffect } from "react";

import Button from "./Button";
import styles from "./Form.module.css";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import BackButton from "./BackButton";
import { useUrlPosition } from "../hooks/useUrlPosition";
import Spinner from "./Spinner";
import Message from "./Message";
import { useCities } from "../contexts/CitiesContext";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const { createCity, isLoading } = useCities();
  const [lat, lng] = useUrlPosition();
  const [cityName, setCityName] = useState("");
  const [countryName, setCountryName] = useState("");
  const [emoji, setEmoji] = useState("");

  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [isLoadingGeoCoding, setIsLoadingGeoCoding] = useState(false);
  const navigate = useNavigate();
  const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`;
  useEffect(
    function () {
      async function fetchDataFrom(url) {
        setIsLoadingGeoCoding(true);
        try {
          const res = await fetch(url);
          const data = await res.json();
          setCityName(data.city || data.locality || "");
          setCountryName(data.countryName || "");
          setEmoji(convertToEmoji(data.countryCode));
          console.log("fetch geo coding !!!!!!!!!!!!!!!!!=", data);
        } catch (err) {
          console.log(err.message);
          throw new Error("failed fetch GeoCoding");
        } finally {
          setIsLoadingGeoCoding(false);
        }
      }
      if (!lat || !lng) {
        return;
      }

      fetchDataFrom(url);
    },
    [url]
  );

  async function handleAddCity(e) {
    e.preventDefault();

    if (date && cityName) {
      const newCity = {
        cityName,
        country: countryName,
        emoji,
        date,
        notes,
        position: { lat, lng },
      };
      await createCity(newCity);
      navigate("/app/cities");
      console.log("++++++++++++++++++++++ create city", newCity);
    }
  }
  if (isLoadingGeoCoding) return <Spinner />;
  if (!lat || !lng) return <Message message="Start by clicking a city " />;

  return (
    <form
      className={`${styles.form} ${isLoading ? styles.loading : ""} `}
      onSubmit={handleAddCity}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <ReactDatePicker
          id="date"
          onChange={(date) => setDate(date)}
          selected={date}
          dateFormat="dd/MM/yyyy"
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button
          type="primary"
          onClick={(e) => {
            e.preventDefault();
            handleAddCity(e);
            console.log("primary button clicked");
          }}
        >
          Add
        </Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
