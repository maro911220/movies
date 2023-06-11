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
    // 불러올때 마다 다음페이지 적용
    pageNum++;
    // 무비리스트 불러오기
    await axios
      .get(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=ko&page=${pageNum}`
      )
      .then((res) => {
        data = res.data.results;
      });
    // 결과가 없을 때 체크
    if (data.length == 0) set(() => ({ lastCheck: true }));
    // 무비리스트 뿌리기
    set((state) => ({ movieData: [...state.movieData, ...data] }));
    // 처음 불러올때 메인 배경 이미지 불러오기 && 이미지 로딩 여유두기
    pageNum == 1 && set(() => ({ homeImg: data[0].backdrop_path }));
    setTimeout(() => {
      pageNum == 1 && set(() => ({ pageStart: false }));
    }, 1500);
  },

  // 상세페이지
  async fetchDetail(e) {
    // 페이지 아이디 받아와서 상세 페이지 불러오기
    await axios
      .get(
        `https://api.themoviedb.org/3/movie/${e}?api_key=${apiKey}&language=ko`
      )
      .then((res) => {
        dataDetail = res.data;
      });
    // 상세 페이지 뿌리기
    set(() => ({ movieDetail: dataDetail }));
  },

  // 상세페이지 리셋
  fetchDetailReset() {
    set(() => ({ movieDetail: [] }));
  },

  // 검색하기
  async fetchSearchData(e) {
    let seraching, find;
    // 검색중인지 체크
    e == "" ? (seraching = false) : (seraching = true);
    set(() => ({ movieSearch: seraching }));
    // 검색 결과 불러오기
    await axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${e}&language=ko&page=1`
      )
      .then((res) => {
        dataSearch = res.data.results;
      });

    // 검색 값이 있는지 확인
    if (seraching == false) find = false;
    else dataSearch.length == 0 ? (find = true) : (find = false);
    set(() => ({ notFind: find }));
    // 무비 리스트 뿌리기
    set(() => ({ movieDataSearch: dataSearch }));
  },
}));

export default useStore;
