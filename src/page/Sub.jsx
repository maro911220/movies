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

  //이미지 없을 경우 처리
  const img = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
    : `${import.meta.env.BASE_URL}dummy_poster.jpg`;

  const imgBack = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`
    : `${import.meta.env.BASE_URL}dummy_bg.jpg`;

  // 데이터 없을 경우 처리
  const dataCheck = (e) => {
    if (Array.isArray(e)) return e !== null ? e : [];
    else return e !== "" ? e : "";
  };

  // 슬라이드 이미지 확대
  const imgOn = (e) => {
    setPop(true);
    setPopImg(`https://image.tmdb.org/t/p/w1280/${e}`);
  };

  // 슬라이드 이미지 확대 닫기
  const imgOff = () => {
    setPop(false);
    swiper.slideTo(slideNum + 1);
  };

  // 불러오기전 이전 데이터 리셋
  useEffect(() => {
    stores.fetchDetailReset();
  }, []);

  // 데이터 불러오기
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
                  src={img}
                  alt={dataCheck(movie.title)}
                />
                <div className="movie-detail-top__box">
                  <div>
                    <h3 className="movie-detail-text__title">
                      {dataCheck(movie.title)}
                    </h3>
                    <p className="movie-detail-text__original">
                      {" "}
                      {dataCheck(movie.original_title)}
                    </p>
                  </div>
                  <div>
                    <div className="movie-detail-top__sub">
                      <h4 className="movie-detail-text__sub">평점 :</h4>
                      <p>{dataCheck(movie.vote_average)}</p>
                    </div>
                    <div className="movie-detail-top__sub">
                      <h4 className="movie-detail-text__sub">개봉 :</h4>
                      <p>{dataCheck(movie.release_date)}</p>
                    </div>
                    <div className="movie-detail-top__sub">
                      <h4 className="movie-detail-text__sub">장르 :</h4>
                      {dataCheck(movie.genres).map((a) => {
                        return <p key={a.id}>{a.name}</p>;
                      })}
                    </div>

                    <div className="movie-detail-top__sub">
                      <h4 className="movie-detail-text__sub">제작사 :</h4>
                      {dataCheck(movie.production_companies).map((a) => {
                        return <p key={a.id}>{a.name} </p>;
                      })}
                    </div>
                  </div>
                </div>
              </div>
              {/* middle detail */}
              <div className="movie-detail-text">
                <h4 className="movie-detail-text__tagline">
                  {dataCheck(movie.tagline)}
                </h4>
                <p className="movie-detail-text__overview">
                  {dataCheck(movie.overview)}
                </p>
              </div>
              {/* foot swiper */}
              <Swiper
                className="mySwiper"
                loop={1}
                speed={10000}
                spaceBetween={10}
                slidesPerView={"auto"}
                freeMode={true}
                touchRatio={0}
                modules={[Autoplay, FreeMode]}
                onSwiper={(swiper) => setSwiper(swiper)}
                onSlideChange={(e) => {
                  setSlideNum(e.realIndex);
                }}
                autoplay={{ delay: 1, disableOnInteraction: false }}
              >
                {dataCheck(stores.movieDetailImg).map((a, index) => {
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
              src={imgBack}
              alt={dataCheck(movie.title)}
            />
          </motion.div>
        )}
      </div>
    </>
  );
}

export default Sub;
