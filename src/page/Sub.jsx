/* eslint-disable react-hooks/exhaustive-deps */
import { useParams } from "react-router-dom";
import useStore from "../store/store";
import { useEffect } from "react";
function Sub() {
  let { id } = useParams();
  const stores = useStore((state) => state);

  useEffect(() => {
    stores.fetchDetail(id);
  }, []);
  return (
    <>
      <div>
        <div>{stores.movieDetail.title}</div>
        <p>Hello??</p>
      </div>
    </>
  );
}

export default Sub;
