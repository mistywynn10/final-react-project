import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import "./Movies.css";

const movieIds = [
  "tt0133093", // The Matrix
  "tt0111161", // The Shawshank Redemption
  "tt0468569", // The Dark Knight
  "tt1375666", // Inception
  "tt0109830", // Forrest Gump
  "tt0120737", // The Lord of the Rings
  "tt0816692", // Interstellar
  "tt0110912", // Pulp Fiction
  "tt0137523", // Fight Club
  "tt0167260", // Return of the King
  "tt4154796", // Avengers: Endgame
  "tt7286456", // Joker
  "tt1745960", // Top Gun: Maverick
  "tt0088763", // Back to the Future
  "tt0361748", // Inglourious Basterds
  "tt0120815", // Saving Private Ryan
  "tt1345836", // The Dark Knight Rises
  "tt0114369", // Se7en
];

const Movies = () => {
  const [searchParams] = useSearchParams();

  const search = searchParams.get("search");

  const navigate = useNavigate();

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
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

    async function fetchRandomMovies() {
      try {
        setLoading(true);
        setError("");

        const shuffledMovies = [...movieIds]
          .sort(() => Math.random() - 0.5)
          .slice(0, 6);

        const requests = shuffledMovies.map((id) =>
          axios.get(`https://www.omdbapi.com/?apikey=b90158f5&i=${id}`),
        );

        const responses = await Promise.all(requests);

        const randomMovies = responses.map((response) => response.data);

        setMovies(randomMovies);
      } catch (error) {
        console.error(error);
        setMovies([]);
        setError("Something went wrong while loading movies.");
      } finally {
        setLoading(false);
      }
    }

    if (search) {
      fetchMovies();
    } else {
      fetchRandomMovies();
    }
  }, [search]);

  return (
    <>
      <Navbar />

      <main className="movies">
        <h1>{search ? "Search Results" : "Featured Movies"}</h1>
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
                  <img
                    className="movie-card__img"
                    src={movie.Poster}
                    alt={movie.Title}
                  />
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
