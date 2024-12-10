import { jobDetailsContentEl, getData, ApiUrls, state } from "../common.js";
import renderSpinner from "./Spinner.js";
import renderJobDetails from "./JobDetails.js";
import renderError from "./Error.js";
import renderJobList from "./JobList.js";

const loadHashChangeHandler = async function () {
  const id = window.location.hash.slice(1);
  
  if (!id) return;

  // Reset UI state
  document
    .querySelectorAll('.job-item--active')
    .forEach(job => job.classList.remove('job-item--active'));
  jobDetailsContentEl.innerHTML = '';
  renderSpinner('job-details');

  try {
    const { jobItem } = await getData(ApiUrls.getById(id));
    
    // Update state and UI
    state.activeJobItem = jobItem;
    renderJobList();
    renderSpinner('job-details');
    renderJobDetails(jobItem);

  } catch {
    renderError('No job found for your route path!');
    renderSpinner('job-details');
  }
};

['DOMContentLoaded', 'hashchange'].forEach(event => 
  window.addEventListener(event, loadHashChangeHandler)
);
