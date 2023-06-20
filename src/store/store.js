import { create } from "zustand";
import axios from "axios";
const { VITE_SOME_KEY } = import.meta.env;

const apiKey = VITE_SOME_KEY;
let pageNum = 0;

const useStore = create((set) => ({
  pageStart: true,
  movieData: [],
  movieDetail: [],
  movieDataSearch: [],
  movieDetailCheck: false,
  lastCheck: false,
  homeImg: null,
  movieSearch: false,
  notFind: false,
  test: [],

  // 불러오기
  async fetchData() {
    let data = [];
    pageNum += 1;
    await axios
      .get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=ko&page=${pageNum}`
      )
      .then((res) => {
        data = res.data.results;
        if (pageNum == 1) {
          setTimeout(() => {
            set(() => ({ pageStart: false, homeImg: data[0].backdrop_path }));
          }, 1500);
        }
        if (data.length == 0) set(() => ({ lastCheck: true }));
        set((state) => ({ movieData: [...state.movieData, ...data] }));
      })
      .catch((err) => {
        console.log(err);
      });
  },

  // 검색하기
  async fetchSearchData(e) {
    let dataSearch = [];
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

  // 메인 리셋
  fetchSearchReset() {
    set(() => ({ movieSearch: false }));
  },

  // 상세페이지
  async fetchDetail(e) {
    let id;
    let dataDetail = [];
    set(() => ({ movieDetailCheck: false }));
    await axios
      .get(
        `https://api.themoviedb.org/3/movie/${e}?api_key=${apiKey}&language=ko`
      )
      .then((res) => {
        dataDetail = res.data;
        set(() => ({ movieDetail: dataDetail, movieDetailCheck: true }));
        // 콜렉션이 있으면 아이디 가져오기
        if (dataDetail.belongs_to_collection)
          id = dataDetail.belongs_to_collection.id;
      })
      .catch((err) => {
        console.log(err);
      });

    // 상세 아이디 기준으로 콜렉션 추가로 가져오기
    if (id) {
      await axios
        .get(
          `https://api.themoviedb.org/3/collection/${id}?api_key=${apiKey}&language=ko`
        )
        .then((res) => {
          console.log(res);
        });
    }
  },

  // 상세페이지 리셋
  fetchDetailReset() {
    set(() => ({ movieDetail: [] }));
  },
}));

export default useStore;
