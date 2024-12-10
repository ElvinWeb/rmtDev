import {
  state,
  sortingEl,
  sortingBtnRecentEl,
  sortingBtnSalaryEl,
} from "../common.js";
import renderJobList from "./JobList.js";
import renderPaginationButtons from "./Pagination.js";

const clickHandler = function (event) {
  const clickedButtonEl = event.target.closest(".sorting__button");
  if (!clickedButtonEl) return;

  state.currentPage = 1;
  
  const isRecentSort = clickedButtonEl.className.includes("--recent");

  // Toggle active classes
  sortingBtnRecentEl.classList.toggle("sorting__button--active", isRecentSort);
  sortingBtnSalaryEl.classList.toggle("sorting__button--active", !isRecentSort);

  // Sort job items
  state.searchJobItems.sort((a, b) => 
    isRecentSort 
      ? a.daysAgo - b.daysAgo
      : extractSalary(b.salary) - extractSalary(a.salary)
  );

  renderPaginationButtons();
  renderJobList();
};

// Helper function to extract salary number
const extractSalary = salary => Number(salary.split(",")[0].slice(1));

sortingEl.addEventListener("click", clickHandler);
