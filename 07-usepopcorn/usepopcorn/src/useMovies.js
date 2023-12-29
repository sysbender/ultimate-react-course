import { useState, useEffect } from "react";

function useMovies(query) {
  const apiKey = "9770abc5";
  const [movies, setMovies] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(
    function () {
      const abortController = new AbortController();
      const signal = abortController.signal;

      if (query.length < 3) {
        setMovies([]);
        setErrorMsg("");

        return;
      }
      setIsLoading(true);
      setErrorMsg("");

      async function fetchMovie() {
        const url = `http://www.omdbapi.com/?apikey=${apiKey}&s=${query}`;
        try {
          const res = await fetch(url, { signal });
          if (!res.ok)
            throw new Error("Fetch failed, check internet connection");

          const data = await res.json();
          // console.log(data.Search);
          // console.log(errorMsg);
          if (data.Response === "False") throw new Error("Movie not found");
          setMovies(data.Search);
        } catch (err) {
          if (err.name !== "AbortError") {
            setErrorMsg(err.message);
          } else {
            console.log(" aborted fetch... ... ");
          }
        } finally {
          setIsLoading(false);
        }
      }
      //handleCloseMovieDetails();
      fetchMovie();
      return () => {
        abortController.abort();
      };
    },
    [query]
  );

  return { movies, isLoading, errorMsg };
}

export { useMovies };
