import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./MovieInfo.css";

const MovieInfo = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  async function fetchMovie() {
    try {
      const { data } = await axios.get(
        `https://www.omdbapi.com/?apikey=b90158f5&i=${id}&plot=full`,
      );

      setMovie(data);
    } catch (error) {
      console.error("Error fetching movie:", error);
    } finally {
      setLoading(false);
    }
  }
    fetchMovie();
  }, [id]);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="movie-info">
      <button onClick={() => navigate(-1)}>← Back</button>

      <div className="movie-info__container">
        <div className="movie-info__poster">
          {movie.Poster !== "N/A" ? (
            <img src={movie.Poster} alt={movie.Title} />
          ) : (
            <div className="movie-info__no-poster">No Poster Available</div>
          )}
        </div>

        <div className="movie-info__content">
          <h1>{movie.Title}</h1>

          <p>
            <strong>Year:</strong> {movie.Year}
          </p>

          <p>
            <strong>Rated:</strong> {movie.Rated}
          </p>

          <p>
            <strong>Runtime:</strong> {movie.Runtime}
          </p>

          <p>
            <strong>Genre:</strong> {movie.Genre}
          </p>

          <p>
            <strong>Director:</strong> {movie.Director}
          </p>

          <p>
            <strong>Actors:</strong> {movie.Actors}
          </p>

          <p>
            <strong>IMDb Rating:</strong> {movie.imdbRating}
          </p>

          <p className="movie-info__plot">
            <strong>Plot:</strong> {movie.Plot}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MovieInfo;
