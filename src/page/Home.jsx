/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import useStore from "../store/store.js";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Load from "../components/Load.jsx";
let first = false;
function Home() {
  const stores = useStore((state) => state);
  const [ref, inView] = useInView();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (first == false) {
      stores.fetchData();
      first = true;
    }
  }, []);

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
      <AnimatePresence>
        {!first && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="loading-first"
          >
            <Load />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="movie-home" style={backDrop}>
        <div className="movie-home-inputbox">
          <input
            type="text"
            placeholder="Please enter the movie title you want to find "
            onInput={(e) => {
              stores.fetchSearchData(e.target.value);
            }}
          />
          {stores.notFind ? (
            <div className="not-find">No search results found.</div>
          ) : null}
        </div>
      </div>

      <div className="movie-list">
        {!stores.movieSearch
          ? stores.movieData.map((a) => {
              return <List data={a} key={a.id} listRef={ref} />;
            })
          : stores.movieDataSearch.map((a) => {
              return <List data={a} key={a.id} listRef={null} />;
            })}
      </div>

      {loading && (
        <div className="loading">
          <Load />
        </div>
      )}

      {stores.lastCheck && (
        <div className="loading-last">
          <p>Item does not exist.</p>
        </div>
      )}
    </>
  );
}

function List({ data, listRef }) {
  const [hover, setHover] = useState(false);
  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1 }}
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
            src={`https://image.tmdb.org/t/p/w500/${data.poster_path}`}
            alt={data.title}
          />
          <AnimatePresence>
            {hover && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <p> {data.overview}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="movie-list-item__title">
          <p>{data.title}</p>
          <p>{data.original_title}</p>
          <p>{data.release_date}</p>
        </div>
      </Link>
    </motion.div>
  );
}

export default Home;
