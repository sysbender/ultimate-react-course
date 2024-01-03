import {
  useState,
  useEffect,
  createContext,
  useContext,
  useReducer,
} from "react";

const CitiesContext = createContext();

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "rejected":
      return { ...state, error: action.payload };

    case "cities/loaded":
      return { ...state, isLoading: false, cities: action.payload };

    case "city/selected":
      return { ...state, isLoading: false, currentCity: action.payload };
    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        currentCity: {},
        cities: state.cities.filter((city) => city.id !== action.payload),
      };

    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };

    default:
      throw new Error("Action type not valid");
  }
}
function CitiesProvider({ children }) {
  // const [cities, setCities] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [currentCity, setCurrentCity] = useState({});

  const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  async function getCity(id) {
    if (Number(id) === currentCity.id) {
      return;
    }
    dispatch({ type: "loading" });
    const url = `http://localhost:8000/cities/${id}`;

    try {
      const res = await fetch(url);
      const data = await res.json();
      console.log("set current city data=", data);
      dispatch({ type: "city/selected", payload: data });
    } catch (err) {
      console.error(" Error = ", err.message);
      dispatch({ type: "rejected", payload: err.message });
    }
  }

  async function createCity(city) {
    dispatch({ type: "loading" });
    const url = `http://localhost:8000/cities`;

    try {
      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify(city),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      dispatch({ type: "city/created", payload: city });
    } catch (err) {
      console.error(" Error = ", err.message);
      dispatch({ type: "reject", error: err.message });
    }
  }

  async function deleteCity(id) {
    dispatch({ type: "loading" });
    const url = `http://localhost:8000/cities/${id}`;

    try {
      await fetch(url, {
        method: "DELETE",
      });

      dispatch({ type: "city/deleted", payload: id });
    } catch (err) {
      console.error(" Error = ", err.message);
      dispatch({ type: "reject", error: err.message });
    }
  }

  function setCurrentCity(city) {
    dispatch({ type: "city/selected", payload: city });
  }

  useEffect(function () {
    async function fetchCities() {
      dispatch({ type: "loading" });
      const url = "http://localhost:8000/cities";

      try {
        const res = await fetch(url);
        const data = await res.json();

        dispatch({ type: "cities/loaded", payload: data });
        console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$data=", data.length);
      } catch (err) {
        console.error(" Error = ", err.message);
      }
    }
    fetchCities();
  }, []);

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        getCity,
        currentCity,
        setCurrentCity,
        createCity,
        deleteCity,
        error,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}
// custom hook for using context
function useCities() {
  const context = useContext(CitiesContext);
  console.log("context=", context);
  if (context === undefined) {
    throw new Error("CitiesContext was used outside of the CitiesProvider!");
  }
  return context; //value
}

export { CitiesProvider, useCities };
