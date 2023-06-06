import { create } from "zustand";
import axios from "axios";

const apiKey = "a1c341dcea4317b29e742a9114cb353f";
let pageNum = 0;
let data = [];
let dataSearch = [];
let dataDetail = [];

const useStore = create((set) => ({
  movieData: [],
  movieDetail: [],
  movieDataSearch: [],
  movieSearch: false,
  // 불러오기
  async fetchData() {
    pageNum++;
    await axios
      .get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=ko&page=${pageNum}`
      )
      .then((res) => {
        data = res.data.results;
      });
    set((state) => ({ movieData: [...state.movieData, ...data] }));
  },
  // 상세페이지
  async fetchDetail(e) {
    await axios
      .get(
        `https://api.themoviedb.org/3/movie/${e}?api_key=${apiKey}&language=ko`
      )
      .then((res) => {
        dataDetail = res.data;
      });
    set(() => ({ movieDetail: dataDetail }));
  },
  // 상세페이지 리셋
  fetchDetailReset() {
    set(() => ({ movieDetail: [] }));
  },
  // 검색하기
  async fetchSearchData(e) {
    let seraching;
    e == "" ? (seraching = false) : (seraching = true);
    set(() => ({ movieSearch: seraching }));
    await axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${e}&language=ko&page=1`
      )
      .then((res) => {
        dataSearch = res.data.results;
      });
    set(() => ({ movieDataSearch: dataSearch }));
  },
}));

export default useStore;
