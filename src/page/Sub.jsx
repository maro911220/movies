import { useParams } from "react-router-dom";
import useStore from "../store/store";
import { useEffect } from "react";
function Sub() {
  let { id } = useParams();
  const stores = useStore((state) => state);

  useEffect(() => {
    stores.fetchDetail(id);
    return () => {
      stores.fetchDetailReset();
    };
  }, []);
  return (
    <>
      <div>{stores.movieDetail.title}</div>
    </>
  );
}

export default Sub;
