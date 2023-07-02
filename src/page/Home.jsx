import { useEffect, useState } from "react";
import useStore from "../store/store.js";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Load from "../components/Load.jsx";
import { IoMdArrowRoundUp } from "react-icons/io";

// 홈 컴포넌트
function Home() {
  const stores = useStore((state) => state);
  const [ref, inView] = useInView();
  const [loading, setLoading] = useState(false);
  const [topBtn, setTopBtn] = useState(false);

  // 처음 불러오기
  useEffect(() => {
    stores.fetchSearchReset();
    if (stores.pageStart == true) {
      stores.fetchData();
    }

    window.addEventListener("scrollend", () => {
      console.log(window.scrollY);
      window.scrollY > 100 ? setTopBtn(true) : setTopBtn(false);
    });
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
        <AnimatePresence>
          {topBtn && (
            <motion.button
              className="up-btn"
              onClick={() => {
                window.scrollTo(0, 0);
              }}
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 0 }}
              whileHover={{
                y: [0, 5],
                transition: { repeat: Infinity, repeatType: "mirror" },
              }}
            >
              <span className="blind">위로 올라가기</span>
              <IoMdArrowRoundUp />
            </motion.button>
          )}
        </AnimatePresence>
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
  // 이미지가 없을 경우 임시 이미지로 대처
  const img = data.poster_path
    ? `https://image.tmdb.org/t/p/w500/${data.poster_path}`
    : `${import.meta.env.BASE_URL}dummy_poster.jpg`;

  // 값이 없을 경우 데이터 없음 표시
  const dataCheck = (e) => {
    return e !== "" ? e : "No data";
  };

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
          <img src={img} alt={dataCheck(data.title)} />
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
                  <p> {dataCheck(data.overview)}</p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: "-100%" }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: "-100%" }}
                  transition={{ duration: 0.3, ease: "easeIn" }}
                  className="movie-list-item__wrap"
                />
              </>
            )}
          </AnimatePresence>
        </div>
        <div className="movie-list-item__title">
          <p>{dataCheck(data.title)}</p>
          <p>{dataCheck(data.original_title)}</p>
          <p>{dataCheck(data.release_date)}</p>
        </div>
      </Link>
    </motion.div>
  );
}

export default Home;
