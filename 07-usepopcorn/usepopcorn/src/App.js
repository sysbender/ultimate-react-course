import { useState, useEffect } from "react";
import StarRating from "./StarRating";

const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

const apiKey = "9770abc5";

function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}

function Search({ query, setQuery }) {
  // const [query, setQuery] = useState("");
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}

function NumResult({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies.length} </strong> results
    </p>
  );
}
function NavBar({ children }) {
  return <nav className="nav-bar">{children}</nav>;
}
function Movie({ movie, handleSelectMovie }) {
  return (
    <li
      key={movie.imdbID}
      onClick={(e) => {
        handleSelectMovie(movie.imdbID);
      }}
    >
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}
function MovieList({ movies, handleSelectMovie }) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie
          handleSelectMovie={handleSelectMovie}
          movie={movie}
          key={movie.imdbID}
        />
      ))}
    </ul>
  );
}

function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button>

      {isOpen && children}
    </div>
  );
}

function WatchedSummary({ watched }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));

  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating.toFixed(2)}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating.toFixed(2)}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime.toFixed(2)} min</span>
        </p>
      </div>
    </div>
  );
}

function WatchedMovie({ movie }) {
  return (
    <li key={movie.imdbID}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
      </div>
    </li>
  );
}
function WatchedMovieList({ watched }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie movie={movie} key={movie.imdbID} />
      ))}
    </ul>
  );
}

function Main({ children }) {
  return <main className="main">{children}</main>;
}
const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export default function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState(tempWatchedData);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  let tempQuery = "interstellar";
  // query = "jfasjdfkjas";

  // useEffect(function () {
  //   console.log("A");
  // }, []);
  // useEffect(function () {
  //   console.log("B");
  // });
  // console.log("C");
  function getExistingUserRating(id) {
    const found = watched.find((m) => m.imdbID === id);

    console.log("find existing =", found);
    if (!found) return 0;
    return found.userRating;
  }

  function handleAddWatchedMovie(userRating, movieDetails) {
    // imdbID: "tt0088763",
    // Title: "Back to the Future",
    // Year: "1985",
    // Poster:
    //   "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    // runtime: 116,
    // imdbRating: 8.5,
    // userRating: 9,
    if (watched.find((m) => m.imdbID === movieDetails.imdbID)) {
      console.log("Failed to add to watch, already exist");
      return;
    }

    const { imdbID, Title, Year, Poster, imdbRating } = movieDetails;
    const newWatchedMovie = {
      imdbID,
      Title,
      Year,
      Poster,
      imdbRating,
      userRating,
      runtime: Number.parseInt(movieDetails.Runtime),
    };

    console.log(newWatchedMovie);
    setWatched((watchedMovies) => [...watchedMovies, newWatchedMovie]);
  }

  function handleDeleteWatchedMovie(id) {
    console.log("deleting====", id);
    setWatched((oldWatched) =>
      oldWatched.filter((movie) => movie.imdbID !== id)
    );
  }

  function handleSelectMovie(id) {
    setSelectedId((currentId) => (currentId === id ? null : id));
  }

  function handleCloseMovieDetails() {
    setSelectedId(null);
  }

  const url = `http://www.omdbapi.com/?apikey=${apiKey}&s=${query}`;

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
      fetchMovie();
      return () => {
        abortController.abort();
      };
    },
    [query]
  );

  return (
    <>
      <NavBar>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <NumResult movies={movies} />
      </NavBar>
      <Main>
        <Box>
          {isLoading && <Loader />}
          {errorMsg !== "" && <ErrorMessage> {errorMsg}</ErrorMessage>}
          {!isLoading && !errorMsg && (
            <MovieList handleSelectMovie={handleSelectMovie} movies={movies} />
          )}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetails
              handleCloseMovieDetails={handleCloseMovieDetails}
              handleAddWatchedMovie={handleAddWatchedMovie}
              handleDeleteWatchedMovie={handleDeleteWatchedMovie}
              getExistingUserRating={getExistingUserRating}
              selectedId={selectedId}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMovieList watched={watched} />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

function Loader() {
  return <p className="loader"> Loading</p>;
}

function ErrorMessage({ children }) {
  return <p className="error"> {children}</p>;
}

function MovieDetails({
  selectedId,
  handleCloseMovieDetails,
  handleAddWatchedMovie,
  handleDeleteWatchedMovie,
  getExistingUserRating,
}) {
  const [movieDetails, setMovieDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState(null);
  const [userExistingRating, setUserExsitingRating] = useState(null);

  async function fetchMovieDetails() {
    setIsLoading(true);
    try {
      const url = `http://www.omdbapi.com/?i=${selectedId}&apikey=${apiKey}`;
      const res = await fetch(url);
      const data = await res.json();
      setMovieDetails(data); //setData here
    } catch (e) {
      console.log("Failed to fetch movie detail :", e.message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(
    function () {
      if (!selectedId) return;
      fetchMovieDetails();
    },
    [selectedId]
  );

  useEffect(
    function () {
      const existRating = getExistingUserRating(selectedId);

      setUserExsitingRating(existRating);
      console.log("exisiting rating ===", existRating);
    },
    [selectedId]
  );

  useEffect(
    function () {
      document.title = movieDetails.Title;
      return () => {
        document.title = "usePopcorn";
      };
    },
    [movieDetails]
  );

  if (isLoading) {
    return <Loader />;
  }

  return (
    movieDetails && (
      <div className="details">
        <header>
          <button className="btn-back" onClick={handleCloseMovieDetails}>
            &larr;
          </button>
          <img src={movieDetails.Poster} alt={movieDetails.Title} />
          <div className="details-overview">
            <h2>{movieDetails.Title}</h2>
            <p>
              {movieDetails.Released} &bull; {movieDetails.Runtime}
            </p>
            <p>{movieDetails.Genre}</p>
            <p>
              <span>⭐</span> {movieDetails.imdbRating} IMDB Rating
            </p>
          </div>
        </header>

        <section>
          <div className="rating">
            <StarRating
              maxRating={10}
              size={24}
              defaultRating={userExistingRating}
              cbOnSetRating={(r) => setUserRating(r)}
            />
          </div>
          {!userExistingRating ? (
            <button
              className="btn-add"
              onClick={() => {
                handleAddWatchedMovie(userRating, movieDetails);

                handleCloseMovieDetails();
              }}
            >
              Add to watched list
            </button>
          ) : (
            <button
              className="btn-delete"
              onClick={() => {
                handleDeleteWatchedMovie(movieDetails.imdbID);
                handleCloseMovieDetails();
              }}
            >
              X
            </button>
          )}
          <p>
            <em>{movieDetails.Plot}</em>
          </p>
          <p>Starring {movieDetails.Actors}</p>
          <p>Directed by {movieDetails.Director}</p>
        </section>
      </div>
    )
  );
}
