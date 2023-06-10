/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import useStore from "../store/store.js";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
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
    if (inView && !loading) {
      console.log("실행중이니..?");
      setLoading(true);
      setTimeout(() => {
        stores.fetchData();
        setTimeout(() => {
          setLoading(false);
        }, 300);
      }, 1000);
    }
  }, [inView, loading]);

  const backDrop = {
    background: `url(https://image.tmdb.org/t/p/original/${stores.homeImg}) center center /cover no-repeat`,
  };

  return (
    <>
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

      {loading && <div className="loading">loding</div>}
    </>
  );
}

function List({ data, listRef }) {
  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1 }}
      className="movie-list-item"
      ref={listRef}
    >
      <Link to={`/sub/${data.id}`}>
        <div className="movie-list-item__img">
          <img
            src={`https://image.tmdb.org/t/p/w500/${data.poster_path}`}
            alt={data.title}
          />
        </div>
        <div className="movie-list-item__title">
          <div>
            <p>{data.title}</p>
            <p>{data.original_title}</p>
          </div>
          <p>{data.release_date}</p>
        </div>
        <div className="movie-list-item__detail">
          <p>{data.overview}</p>
        </div>
      </Link>
    </motion.div>
  );
}

export default Home;
