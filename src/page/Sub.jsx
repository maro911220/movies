/* eslint-disable react-hooks/exhaustive-deps */
import { useParams } from "react-router-dom";
import useStore from "../store/store";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper";
import "swiper/css";

function Sub() {
  let { id } = useParams();
  const stores = useStore((state) => state);
  const movie = useStore((state) => state.movieDetail);

  useEffect(() => {
    stores.fetchDetailReset();
  }, []);

  useEffect(() => {
    stores.fetchDetail(id);
    stores.fetchDetailImg(id);
    console.log(movie);
  }, []);

  return (
    <>
      <div className="movie-dummy">
        <h2 className="blind">컨텐츠</h2>
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
              <div className="movie-detail-top">
                <img
                  className="movie-detail-poster"
                  src={`https://image.tmdb.org/t/p/w1280/${movie.poster_path}`}
                  alt={movie.title}
                />
                <div className="movie-detail-top__box">
                  <div>
                    <h3 className="movie-detail-text__title">{movie.title}</h3>
                    <p className="movie-detail-text__original">
                      {movie.original_title}
                    </p>
                  </div>
                  <div>
                    <div className="movie-detail-top__sub">
                      <h4 className="movie-detail-text__sub">평점 :</h4>
                      <p>{movie.vote_average}</p>
                    </div>
                    <div className="movie-detail-top__sub">
                      <h4 className="movie-detail-text__sub">개봉 :</h4>
                      <p>{movie.release_date}</p>
                    </div>
                    <div className="movie-detail-top__sub">
                      <h4 className="movie-detail-text__sub">장르 :</h4>
                      {movie.genres.map((a) => {
                        return <p key={a.id}>{a.name}</p>;
                      })}
                    </div>

                    <div className="movie-detail-top__sub">
                      <h4 className="movie-detail-text__sub">제작사 :</h4>
                      {movie.production_companies.map((a) => {
                        return <p key={a.id}>{a.name} </p>;
                      })}
                    </div>
                  </div>
                </div>
              </div>

              <div className="movie-detail-text">
                <h4 className="movie-detail-text__tagline">{movie.tagline}</h4>
                <p className="movie-detail-text__overview">{movie.overview}</p>
              </div>

              <Swiper
                className="mySwiper"
                loop={1}
                speed={5000}
                freeMode={true}
                spaceBetween={10}
                slidesPerView={6}
                autoplay={{ delay: 1, disableOnInteraction: false }}
                modules={[Autoplay, FreeMode]}
              >
                {stores.movieDetailImg.map((a, index) => {
                  return (
                    <SwiperSlide key={index}>
                      <img
                        alt="sample"
                        src={`https://image.tmdb.org/t/p/w500/${a.file_path}`}
                      />
                    </SwiperSlide>
                  );
                })}
              </Swiper>
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
