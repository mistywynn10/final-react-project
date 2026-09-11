import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import "./Movies.css";

const Movies = () => {
  const [searchParams] = useSearchParams();

  const search = searchParams.get("search");

  const navigate = useNavigate();

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchMovies = async () => {
    try {
      setLoading(true);
      setError("");

      const { data } = await axios.get(
        `https://www.omdbapi.com/?apikey=b90158f5&s=${encodeURIComponent(search)}`,
      );

      if (data.Response === "True") {
        setMovies(data.Search.slice(0, 6));
      } else {
        setMovies([]);
        setError(data.Error);
      }
    } catch (error) {
      console.error(error);
      setError("Something went wrong while searching for movies.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (search) {
      fetchMovies();
    }
  }, [search]);

  return (
    <>
      <Navbar />

      <main className="movies">
        <h1>Search Results</h1>
        {search && (
          <p className="movies__search-text">Showing results for "{search}"</p>
        )}
        {loading && <div className="spinner"></div>}
        {error && <p className="movies__error">{error}</p>}
        {!loading && !error && (
          <div className="movies__grid">
            {movies.map((movie) => (
              <div
                className="movie-card"
                key={movie.imdbID}
                onClick={() => navigate(`/movie/${movie.imdbID}`)}
              >
                {movie.Poster !== "N/A" ? (
                  <img className="movie-card__img" src={movie.Poster} alt={movie.Title} />
                ) : (
                  <div className="movie-info__no-poster">
                    No Poster Available
                  </div>
                )}

                <h3 className="movie__title">{movie.Title}</h3>

                <p className="movie__year">{movie.Year}</p>
              </div>
            ))}
          </div>
        )}
      </main>
    </>
  );
};

export default Movies;
