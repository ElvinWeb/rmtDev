import {
  searchInputEl,
  searchFormEl,
  jobListSearchEl,
  numberEl,
  API_URL,
} from "../common.js";
import renderError from "./Error.js";
import renderSpinner from "./Spinner.js";
import renderJobList from "./Joblist.js";

const submitHandler = (event) => {
  // prevent default behavior
  event.preventDefault();

  // get search text
  const searchText = searchInputEl.value;

  // validation (regular expression example)
  const forbiddenPattern = /[0-9]/;
  const patternMatch = forbiddenPattern.test(searchText);

  if (patternMatch) {
    renderError("You search query is not allowed");
  } else {
    // blur input
    searchInputEl.blur();

    // remove previous job items
    jobListSearchEl.innerHTML = "";

    // render spinner
    renderSpinner("search");

    // fetch search results
    fetch(`${API_URL}/jobs?search=${searchText}`)
      .then((response) => {
        if (!response.ok) {
          console.log("Something went wrong");
          return;
        }

        return response.json();
      })
      .then((data) => {
        // extract job items
        const { jobItems } = data;

        // remove spinner
        renderSpinner("search");

        // render number of results
        numberEl.textContent = jobItems.length;

        // render job items in search job list
        renderJobList(jobItems);
      })
      .catch((error) => console.log(error));
  }
};

searchFormEl.addEventListener("submit", submitHandler);
