/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import useStore from "../store/store.js";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";
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
        <input
          type="text"
          onInput={(e) => {
            stores.fetchSearchData(e.target.value);
          }}
        />
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
      {loading ? <div className="loading">로딩중입니당</div> : null}
    </>
  );
}

function List({ data, listRef }) {
  return (
    <Link className="movie-list-item" to={`/sub/${data.id}`} ref={listRef}>
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
  );
}

export default Home;
