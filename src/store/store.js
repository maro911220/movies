import { create } from "zustand";
import axios from "axios";

const apiKey = "a1c341dcea4317b29e742a9114cb353f";
let pageNum = 0;
let data = [];
let dataSearch = [];
let dataDetail = [];

const useStore = create((set) => ({
  pageStart: true,
  movieData: [],
  movieDetail: [],
  movieDataSearch: [],
  lastCheck: false,
  homeImg: null,
  movieSearch: false,
  notFind: false,

  // 불러오기
  async fetchData() {
    pageNum++;
    await axios
      .get(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=ko&page=${pageNum}`
      )
      .then((res) => {
        data = res.data.results;
      })
      .catch((err) => {
        console.log(err);
      });

    setTimeout(() => {
      pageNum == 1 &&
        set(() => ({ pageStart: false, homeImg: data[0].backdrop_path }));
    }, 1500);

    if (data.length == 0) set(() => ({ lastCheck: true }));
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
      })
      .catch((err) => {
        console.log(err);
      });
    set(() => ({ movieDetail: dataDetail }));
  },

  // 상세페이지 리셋
  fetchDetailReset() {
    set(() => ({ movieDetail: [] }));
  },

  // 검색하기
  async fetchSearchData(e) {
    await axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${e}&language=ko&page=1`
      )
      .then((res) => {
        dataSearch = res.data.results;
      })
      .catch((err) => {
        console.log(err);
      });

    let seraching, find;
    e == "" ? (seraching = false) : (seraching = true);
    if (seraching == false) find = false;
    else dataSearch.length == 0 ? (find = true) : (find = false);
    set(() => ({
      movieSearch: seraching,
      notFind: find,
      movieDataSearch: dataSearch,
    }));
  },
}));

export default useStore;
