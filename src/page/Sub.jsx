/* eslint-disable react-hooks/exhaustive-deps */
import { useParams } from "react-router-dom";
import useStore from "../store/store";
import { useEffect } from "react";
function Sub() {
  let { id } = useParams();
  const stores = useStore((state) => state);
  const movie = useStore((state) => state.movieDetail);

  useEffect(() => {
    stores.fetchDetailReset();
  }, []);
  useEffect(() => {
    stores.fetchDetail(id);
  }, []);
  return (
    <>
      {stores.movieDetailCheck && (
        <div className="movie-detail">
          <div className="movie-detail-box">
            <img
              className="movie-detail-poster"
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.title}
            />
            <div className="movie-detail-text">
              <p className="movie-detail-text__title">{movie.title}</p>
              <p className="movie-detail-text__original">
                {movie.original_title}
              </p>
              <p className="movie-detail-text__date">{movie.release_date}</p>
              <p className="movie-detail-text__tagline">{movie.tagline}</p>
              <p className="movie-detail-text__overview">{movie.overview}</p>
            </div>
          </div>
          <img
            className="movie-detail-bg"
            src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
            alt={movie.title}
          />
        </div>
      )}
    </>
  );
}

export default Sub;
