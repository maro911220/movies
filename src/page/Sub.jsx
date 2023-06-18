/* eslint-disable react-hooks/exhaustive-deps */
import { useParams } from "react-router-dom";
import useStore from "../store/store";
import { useEffect } from "react";
import { motion } from "framer-motion";
function Sub() {
  let { id } = useParams();
  const stores = useStore((state) => state);
  const movie = useStore((state) => state.movieDetail);

  useEffect(() => {
    stores.fetchDetailReset();
  }, []);
  useEffect(() => {
    stores.fetchDetail(id);
    console.log(movie);
  }, []);
  return (
    <>
      <div className="movie-dummy">
        {stores.movieDetailCheck && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="movie-detail"
          >
            <motion.div
              initial={{
                opacity: 0,
                x: "-10%",
              }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="movie-detail-box"
            >
              <img
                className="movie-detail-poster"
                src={`https://image.tmdb.org/t/p/w1280/${movie.poster_path}`}
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
            </motion.div>
            <img
              className="movie-detail-bg"
              src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
              alt={movie.title}
            />
          </motion.div>
        )}
      </div>
    </>
  );
}

export default Sub;
