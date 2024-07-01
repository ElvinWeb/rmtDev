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
  // prevent default behavior
  event.preventDefault();

  // get search text
  const searchText = searchInputEl.value;

  // validation (regular expression example)
  const forbiddenPattern = /[\d,;!@$%^&*()_+\=\[\]{}|\\:";'<>?,/]/;
  const patternMatch = forbiddenPattern.test(searchText);
  if (patternMatch) {
    renderError("You searched query is not allowed!");
    return;
  }

  // blur input
  searchInputEl.blur();

  // remove previous job items
  jobListSearchEl.innerHTML = "";

  // render spinner
  renderSpinner("search");

  try {
    // fetch search results
    const data = await getData(ApiUrls.getBySearch(searchText));

    // extract job items
    const { jobItems } = data;

    // update state
    state.searchJobItems = jobItems;
    state.currentPage = 1;

    // remove spinner
    renderSpinner("search");

    // render number of results
    numberEl.textContent = jobItems.length;

    // reset pagination buttons
    renderPaginationButtons();

    // render job items in search job list
    renderJobList();
  } catch (err) {
    renderError("No job found for your query!");
    renderSpinner("search");
  }
};

searchFormEl.addEventListener("submit", submitHandler);
