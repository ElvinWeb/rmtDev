import {
  searchInputEl,
  searchFormEl,
  jobListSearchEl,
  sortingBtnRecentEl,
  sortingBtnSalaryEl,
  numberEl,
  getData,
  ApiUrls,
  state,
} from "../common.js";
import renderError from "./Error.js";
import renderSpinner from "./Spinner.js";
import renderJobList from "./JobList.js";
import renderPaginationButtons from "./Pagination.js";

const submitHandler = async function (event) {
  event.preventDefault();

  const searchText = searchInputEl.value.trim();

  // Validate search text
  const forbiddenPattern = /[\d,;!@$%^&*()_+\=\[\]{}|\\:";'<>?,/]/;
  if (forbiddenPattern.test(searchText)) {
    renderError("Search query contains invalid characters");
    return;
  }

  // Reset UI state
  searchInputEl.blur();
  searchInputEl.value = "";
  searchInputEl.focus();
  jobListSearchEl.innerHTML = "";
  [sortingBtnRecentEl, sortingBtnSalaryEl].forEach(btn => 
    btn.classList.remove("sorting__button--active")
  );

  renderSpinner("search");

  try {
    const { jobItems } = await getData(ApiUrls.getBySearch(searchText));

    // Update application state
    Object.assign(state, {
      searchJobItems: jobItems,
      currentPage: 1
    });

    renderSpinner("search");
    numberEl.textContent = jobItems.length;
    renderPaginationButtons();
    renderJobList();

  } catch {
    renderError("No job found for your query!");
    renderSpinner("search");
  }
};

searchFormEl.addEventListener("submit", submitHandler);
