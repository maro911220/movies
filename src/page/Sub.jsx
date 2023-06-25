/* eslint-disable react-hooks/exhaustive-deps */
import { useParams } from "react-router-dom";
import useStore from "../store/store";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper";
import "swiper/css";

function Sub() {
  let { id } = useParams();
  const stores = useStore((state) => state);
  const movie = useStore((state) => state.movieDetail);
  const [pop, setPop] = useState(false);
  const [popImg, setPopImg] = useState();
  const [swiper, setSwiper] = useState();
  const [slideNum, setSlideNum] = useState(0);

  const imgOn = (e) => {
    setPop(true);
    setPopImg(`https://image.tmdb.org/t/p/w1280/${e}`);
  };

  const imgOff = () => {
    setPop(false);
    swiper.slideTo(slideNum + 1);
  };

  useEffect(() => {
    stores.fetchDetailReset();
  }, []);

  useEffect(() => {
    stores.fetchDetail(id);
    stores.fetchDetailImg(id);
  }, []);

  return (
    <>
      {/* 팝업 이미지 */}
      <AnimatePresence>
        {pop && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pop-img"
            onClick={() => {
              imgOff();
            }}
          >
            <img src={popImg} alt="zoomImg" />
          </motion.div>
        )}
      </AnimatePresence>
      {/* 영화 상세 */}
      <div className="movie-dummy">
        <h2 className="blind">컨텐츠</h2>
        {stores.movieDetailCheck && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="movie-detail"
          >
            {/* 영화 정보 박스 */}
            <motion.div
              initial={{
                opacity: 0,
                y: "5%",
              }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="movie-detail-box"
            >
              {/* top title */}
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
              {/* middle detail */}
              <div className="movie-detail-text">
                <h4 className="movie-detail-text__tagline">{movie.tagline}</h4>
                <p className="movie-detail-text__overview">{movie.overview}</p>
              </div>
              {/* foot swiper */}
              <Swiper
                className="mySwiper"
                loop={1}
                speed={10000}
                spaceBetween={10}
                slidesPerView={"auto"}
                freeMode={true}
                modules={[Autoplay, FreeMode]}
                onSwiper={(swiper) => setSwiper(swiper)}
                onSlideChange={(e) => {
                  setSlideNum(e.realIndex);
                }}
                autoplay={{ delay: 1, disableOnInteraction: false }}
              >
                {stores.movieDetailImg.map((a, index) => {
                  return (
                    <SwiperSlide key={index}>
                      <img
                        onClick={() => {
                          imgOn(a.file_path);
                        }}
                        alt="sample"
                        src={`https://image.tmdb.org/t/p/w500/${a.file_path}`}
                      />
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </motion.div>
            {/* 배경이미지 */}
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
