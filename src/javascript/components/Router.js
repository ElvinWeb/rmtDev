import { jobDetailsContentEl, getData, ApiUrls, state } from "../common.js";
import renderSpinner from "./Spinner.js";
import renderJobDetails from "./JobDetails.js";

const loadHashChangeHandler = async function () {
  // get id from url
  const id = window.location.hash.substring(1);

  if (id) {
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

      // remove spinner
      renderSpinner("job-details");

      // render job details
      renderJobDetails(jobItem);
    } catch (error) {
      renderError(error.message);
      renderSpinner("job-details");
    }
  }
};

window.addEventListener("DOMContentLoaded", loadHashChangeHandler);
window.addEventListener("hashchange", loadHashChangeHandler);
