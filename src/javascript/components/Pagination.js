import {
  RESULTS_PER_PAGE,
  paginationEl,
  paginationNumberNextEl,
  paginationNumberBackEl,
  paginationBtnNextEl,
  paginationBtnBackEl,
  state,
} from "../common.js";
import renderJobList from "./JobList.js";

const renderPaginationButtons = function () {
  // Toggle back button visibility based on current page
  paginationBtnBackEl.classList.toggle(
    "pagination__button--hidden", 
    state.currentPage < 2
  );

  // Toggle next button visibility based on remaining items
  const remainingItems = state.searchJobItems.length - state.currentPage * RESULTS_PER_PAGE;
  paginationBtnNextEl.classList.toggle(
    "pagination__button--hidden",
    remainingItems <= 0
  );

  // Update page numbers
  paginationNumberNextEl.textContent = state.currentPage + 1;
  paginationNumberBackEl.textContent = state.currentPage - 1;

  // Unfocus buttons
  [paginationBtnNextEl, paginationBtnBackEl].forEach(btn => btn.blur());
};

const clickHandler = (event) => {
  const clickedButtonEl = event.target.closest(".pagination__button");
  if (!clickedButtonEl) return;

  // Update current page based on button clicked
  state.currentPage += clickedButtonEl.className.includes("--next") ? 1 : -1;

  renderPaginationButtons();
  renderJobList();
};

paginationEl.addEventListener("click", clickHandler);

export default renderPaginationButtons;
