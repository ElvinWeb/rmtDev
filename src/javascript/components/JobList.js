import {
  RESULTS_PER_PAGE,
  jobListSearchEl,
  jobDetailsContentEl,
  jobListBookmarksEl,
  getData,
  ApiUrls,
  state,
} from "../common.js";
import renderSpinner from "./Spinner.js";
import renderJobDetails from "./JobDetails.js";
import renderError from "./Error.js";

const renderJobList = function (whichJobList = "search") {
  // determine correct selector for job list (search results list or bookmarks list)
  const jobListEl =
    whichJobList === "search" ? jobListSearchEl : jobListBookmarksEl;

  // remove previous job items
  jobListEl.innerHTML = "";

  // determine the job items that should be rendered
  let jobItems = [];
  if (whichJobList === "search") {
    jobItems = state.searchJobItems.slice(
      state.currentPage * RESULTS_PER_PAGE - RESULTS_PER_PAGE,
      state.currentPage * RESULTS_PER_PAGE
    );
  } else if (whichJobList === "bookmarks") {
    jobItems = state.bookmarkJobItems;
  }

  // display job items
  jobItems.forEach((jobItem) => {
    const newJobItemHTML = `
                <li class="job-item ${
                  state.activeJobItem.id === jobItem.id
                    ? "job-item--active"
                    : ""
                }">
                    <a class="job-item__link" href="${jobItem.id}">
                        <div class="job-item__badge">${
                          jobItem.badgeLetters
                        }</div>
                        <div class="job-item__middle">
                            <h3 class="third-heading">${jobItem.title}</h3>
                            <p class="job-item__company">${jobItem.company}</p>
                            <div class="job-item__extras">
                                <p class="job-item__extra"><i class="fa-solid fa-clock job-item__extra-icon"></i> ${
                                  jobItem.duration
                                }</p>
                                <p class="job-item__extra"><i class="fa-solid fa-money-bill job-item__extra-icon"></i> ${
                                  jobItem.salary
                                }</p>
                                <p class="job-item__extra"><i class="fa-solid fa-location-dot job-item__extra-icon"></i> ${
                                  jobItem.location
                                }</p>
                            </div>
                        </div>
                        <div class="job-item__right">
                            <i class="fa-solid fa-bookmark job-item__bookmark-icon"></i>
                            <time class="job-item__time">${
                              jobItem.daysAgo
                            }d</time>
                        </div>
                    </a>
                </li>
            `;

  jobListEl.insertAdjacentHTML("beforeend", newJobItemHTML);
  });
};

const clickHandler = async function (event) {
  // prevent default behavior (navigation)
  event.preventDefault();

  // get clicked job item element
  const jobItemEl = event.target.closest(".job-item");

  // remove the active class from previously active job item
  document
    .querySelector(".job-item--active")
    ?.classList.remove("job-item--active");

  // add active class
  jobItemEl.classList.add("job-item--active");

  // empty the job details section
  jobDetailsContentEl.innerHTML = "";

  // render spinner
  renderSpinner("job-details");

  // get the id
  const id = jobItemEl.children[0].getAttribute("href");

  // update state
  state.activeJobItem = state.searchJobItems.find(
    (jobItem) => jobItem.id === Number(id)
  );

  // add id to url
  history.pushState(null, "", `/#${id}`);

  try {
    // fetch job item data
    const data = await getData(ApiUrls.getById(id));

    // extract job item
    const { jobItem } = data;

    // remove spinner
    renderSpinner("job-details");

    // render job details
    renderJobDetails(jobItem);
  } catch (err) {
    renderError(err.message);
    renderSpinner("search");
  }
};

jobListSearchEl.addEventListener("click", clickHandler);

export default renderJobList;
