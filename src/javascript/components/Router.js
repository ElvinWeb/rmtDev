import { jobDetailsContentEl, getData, ApiUrls, state } from "../common.js";
import renderSpinner from "./Spinner.js";
import renderJobDetails from "./JobDetails.js";
import renderError from "./Error.js";
import renderJobList from "./JobList.js";

const loadHashChangeHandler = async function () {
  // get id from url
  const id = window.location.hash.substring(1);

  if (id) {
    // remove the active class from previously active job items
    document
      .querySelectorAll(".job-item--active")
      .forEach((activeJobs) => activeJobs.classList.remove("job-item--active"));

    // remove previous job details content
    jobDetailsContentEl.innerHTML = "";

    // add spinner
    renderSpinner("job-details");

    try {
      // fetch job item data
      const data = await getData(ApiUrls.getById(id));

      // extract job item
      const { jobItem } = data;

      // update state
      state.activeJobItem = jobItem;

      // render search job list
      renderJobList();

      // remove spinner
      renderSpinner("job-details");

      // render job details
      renderJobDetails(jobItem);
    } catch (err) {
      // render error message
      renderError("No job found for your route path!");
      renderSpinner("job-details");
    }
  }
};

window.addEventListener("DOMContentLoaded", loadHashChangeHandler);
window.addEventListener("hashchange", loadHashChangeHandler);
