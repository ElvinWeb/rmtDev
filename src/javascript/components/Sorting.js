import {
  state,
  sortingEl,
  sortingBtnRecentEl,
  sortingBtnSalaryEl,
} from "../common.js";
import renderJobList from "./JobList.js";
import renderPaginationButtons from "./Pagination.js";

const clickHandler = function (event) {
  // get clicked button element
  const clickedButtonEl = event.target.closest(".sorting__button");

  // stop function if no clicked button element
  if (!clickedButtonEl) return;

  // update state (reset to page 1)
  state.currentPage = 1;

  // check if intention is recent or relevant sorting
  const recent = clickedButtonEl.className.includes("--recent") ? true : false;

  // make sorting button look (in)active
  if (recent) {
    sortingBtnRecentEl.classList.add("sorting__button--active");
    sortingBtnSalaryEl.classList.remove("sorting__button--active");
  } else {
    sortingBtnRecentEl.classList.remove("sorting__button--active");
    sortingBtnSalaryEl.classList.add("sorting__button--active");
  }

  // job items sorted by days and salary properties
  if (recent) {
    state.searchJobItems.sort((a, b) => {
      return a.daysAgo - b.daysAgo;
    });
  } else {
    state.searchJobItems.sort((a, b) => {
      return (
        Number(b.salary.split(",")[0].split("$")[1]) -
        Number(a.salary.split(",")[0].split("$")[1])
      );
    });
  }

  // reset pagination buttons
  renderPaginationButtons();

  // render job items in list
  renderJobList();
};
// event handlers
sortingEl.addEventListener("click", clickHandler);
