import { useState, useEffect, createContext, useContext } from "react";

const CitiesContext = createContext();

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(function () {
    async function fetchCities() {
      setIsLoading(true);
      const url = "http://localhost:8000/cities";

      try {
        const res = await fetch(url);
        const data = await res.json();
        setCities(data);
        console.log("data=", data.length);
      } catch (err) {
        console.error(" Error = ", err.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchCities();
  }, []);

  return (
    <CitiesContext.Provider value={{ cities, isLoading }}>
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  console.log("context=", context);
  if (context === undefined) {
    throw new Error("CitiesContext was used outside of the CitiesProvider!");
  }
  return context; //value
}

export { CitiesProvider, useCities };
