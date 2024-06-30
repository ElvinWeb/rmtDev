// CONSTANTS
const API_URL = "https://bytegrad.com/course-assets/js/2/api";
const DEFAULT_DISPLAY_TIME = 4000;
const RESULTS_PER_PAGE = 7;
// STATE
const state = {
  searchJobItems: [],
  activeJobItem: {},
  currentPage: 1,
};
// SELECTORS
const bookmarksBtnEl = document.querySelector(".bookmarks-btn");
const errorEl = document.querySelector(".error");
const errorTextEl = document.querySelector(".error__text");
const jobDetailsEl = document.querySelector(".job-details");
const jobDetailsContentEl = document.querySelector(".job-details__content");
const jobListBookmarksEl = document.querySelector(".job-list--bookmarks");
const jobListSearchEl = document.querySelector(".job-list--search");
const numberEl = document.querySelector(".count__number");
const paginationEl = document.querySelector(".pagination");
const paginationBtnNextEl = document.querySelector(".pagination__button--next");
const paginationBtnBackEl = document.querySelector(".pagination__button--back");
const paginationNumberNextEl = document.querySelector(
  ".pagination__number--next"
);
const paginationNumberBackEl = document.querySelector(
  ".pagination__number--back"
);
const searchFormEl = document.querySelector(".search");
const searchInputEl = document.querySelector(".search__input");
const sortingEl = document.querySelector(".sorting");
const sortingBtnSalaryEl = document.querySelector(".sorting__button--salary");
const sortingBtnRecentEl = document.querySelector(".sorting__button--recent");
const spinnerSearchEl = document.querySelector(".spinner--search");
const spinnerJobDetailsEl = document.querySelector(".spinner--job-details");
// UTILITY OBJECTS
const devImages = [
  "/src/Images/dev-1.jpg",
  "/src/Images/dev-2.jpg",
  "/src/Images/dev-3.jpg",
  "/src/Images/dev-4.jpg",
  "/src/Images/dev-5.jpg",
  "/src/Images/dev-8.jpg",
  "/src/Images/dev-9.jpg",
  "/src/Images/dev-10.jpg",
];
const ApiUrls = {
  getBySearch(searchValue) {
    return `${API_URL}/jobs?search=${searchValue}`;
  },
  getById(id) {
    return `${API_URL}/jobs/${id}`;
  },
};
// HELPER / UTILITY FUNCTIONS
const getData = async (completeURL) => {
  const response = await fetch(completeURL);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.description);
  }

  return data;
};
function getRandomNumber() {
  return Math.floor(Math.random() * 8);
}

export {
  bookmarksBtnEl,
  errorEl,
  errorTextEl,
  jobDetailsContentEl,
  jobDetailsEl,
  jobListBookmarksEl,
  jobListSearchEl,
  numberEl,
  paginationEl,
  paginationBtnBackEl,
  paginationBtnNextEl,
  paginationNumberBackEl,
  paginationNumberNextEl,
  searchFormEl,
  searchInputEl,
  sortingEl,
  sortingBtnRecentEl,
  sortingBtnSalaryEl,
  spinnerSearchEl,
  spinnerJobDetailsEl,
  state,
  ApiUrls,
  devImages,
  getData,
  getRandomNumber,
  API_URL,
  DEFAULT_DISPLAY_TIME,
  RESULTS_PER_PAGE,
};
