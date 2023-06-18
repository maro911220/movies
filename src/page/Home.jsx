/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import useStore from "../store/store.js";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Load from "../components/Load.jsx";

// 홈 컴포넌트
function Home() {
  const stores = useStore((state) => state);
  const [ref, inView] = useInView();
  const [loading, setLoading] = useState(false);

  // 처음 불러오기
  useEffect(() => {
    stores.fetchSearchReset();
    if (stores.pageStart == true) {
      stores.fetchData();
    }
  }, []);

  // 스크롤 옵저버
  useEffect(() => {
    if (!stores.lastCheck) {
      if (inView && !loading) {
        setLoading(true);
        setTimeout(() => {
          stores.fetchData();
          setTimeout(() => {
            setLoading(false);
          }, 500);
        }, 1000);
      }
    }
  }, [inView, loading]);

  const backDrop = {
    background: `url(https://image.tmdb.org/t/p/original/${stores.homeImg}) center center /cover no-repeat`,
  };

  return (
    <>
      {/* 처음 데이터 불러오기전 로딩 */}
      <AnimatePresence>
        {stores.pageStart && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="loading-first"
          >
            <Load />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 홈 메인 검색 영역 */}
      <div className="movie-home" style={backDrop}>
        <div className="movie-home-inputbox">
          <input
            type="text"
            placeholder="Please enter the movie title"
            onInput={(e) => {
              stores.fetchSearchData(e.target.value);
            }}
          />
          {stores.notFind ? (
            <div className="not-find">No search results found.</div>
          ) : null}
        </div>
      </div>

      {/* 영화 리스트 */}
      <div className="movie-list">
        {!stores.movieSearch
          ? stores.movieData.map((a, index) => {
              return <List data={a} key={index} listRef={ref} />;
            })
          : stores.movieDataSearch.map((a, index) => {
              return <List data={a} key={index} listRef={null} />;
            })}
      </div>

      {/* 로딩중 */}
      {loading && (
        <div className="loading">
          <Load />
        </div>
      )}

      {/* 마지막 항목 */}
      {stores.lastCheck && (
        <div className="loading-last">
          <p>Item does not exist.</p>
        </div>
      )}
    </>
  );
}

// 리스트 컴포넌트
function List({ data, listRef }) {
  let img, date;
  data.poster_path != null
    ? (img = `https://image.tmdb.org/t/p/w500/${data.poster_path}`)
    : (img = `https://cdn.pixabay.com/photo/2016/11/21/17/33/body-1846668_1280.jpg`);

  data.release_date != "" ? (date = data.release_date) : (date = `???`);

  const [hover, setHover] = useState(false);
  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="movie-list-item"
      ref={listRef}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Link to={`/sub/${data.id}`}>
        <div className="movie-list-item__img">
          <motion.img
            animate={{ scale: hover ? 1.05 : 1 }}
            transition={{ duration: 0.5 }}
            src={img}
            alt={data.title}
          />
          <AnimatePresence>
            {hover && (
              <>
                <motion.div
                  className="movie-list-item__detail"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, zIndex: 2 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeIn", delay: 0.2 }}
                >
                  <p> {data.overview}</p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: "-100%" }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: "-100%" }}
                  transition={{ duration: 0.3, ease: "easeIn" }}
                  className="movie-list-item__wrap"
                />
              </>
            )}
          </AnimatePresence>
        </div>
        <div className="movie-list-item__title">
          <p>{data.title}</p>
          <p>{data.original_title}</p>
          <p>{date}</p>
        </div>
      </Link>
    </motion.div>
  );
}

export default Home;
