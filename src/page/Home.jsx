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
        }, 200);
      }, 1000);
    }
  }, [inView, loading]);

  return (
    <>
      <input
        type="text"
        onInput={(e) => {
          stores.fetchSearchData(e.target.value);
        }}
      />
      <div className="movie-list">
        {!stores.movieSearch
          ? stores.movieData.map((a) => {
              return <List data={a} key={a.id} listRef={ref} />;
            })
          : null}
      </div>
      <div className="movie-list">
        {stores.movieSearch
          ? stores.movieDataSearch.map((a) => {
              return <List data={a} key={a.id} listRef={null} />;
            })
          : null}
      </div>
      {loading ? <div className="loading">로딩중입니당</div> : null}
    </>
  );
}

function List({ data, listRef }) {
  return (
    <Link className="movie-list-item" to={`/sub/${data.id}`} ref={listRef}>
      {data.title}
    </Link>
  );
}

export default Home;
