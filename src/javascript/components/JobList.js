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
  const jobListEl = whichJobList === "search" ? jobListSearchEl : jobListBookmarksEl;
  jobListEl.innerHTML = "";

  const jobItems = whichJobList === "search" 
    ? state.searchJobItems.slice(
        (state.currentPage - 1) * RESULTS_PER_PAGE,
        state.currentPage * RESULTS_PER_PAGE
      )
    : state.bookmarkJobItems;

  const jobItemsHTML = jobItems.map((jobItem) => `
    <li class="job-item${state.activeJobItem.id === jobItem.id ? " job-item--active" : ""}">
      <a class="job-item__link" href="${jobItem.id}">
        <div class="job-item__badge">${jobItem.badgeLetters}</div>
        <div class="job-item__middle">
          <h3 class="third-heading">${jobItem.title}</h3>
          <p class="job-item__company">${jobItem.company}</p>
          <div class="job-item__extras">
            <p class="job-item__extra"><i class="fa-solid fa-clock job-item__extra-icon"></i> ${jobItem.duration}</p>
            <p class="job-item__extra"><i class="fa-solid fa-money-bill job-item__extra-icon"></i> ${jobItem.salary}</p>
            <p class="job-item__extra"><i class="fa-solid fa-location-dot job-item__extra-icon"></i> ${jobItem.location}</p>
          </div>
        </div>
        <div class="job-item__right">
          <i class="fa-solid fa-bookmark job-item__bookmark-icon${
            state.bookmarkJobItems.some(bookmark => bookmark.id === jobItem.id) 
              ? " job-item__bookmark-icon--bookmarked" 
              : ""
          }"></i>
          <time class="job-item__time">${jobItem.daysAgo}d</time>
        </div>
      </a>
    </li>
  `).join("");

  jobListEl.insertAdjacentHTML("beforeend", jobItemsHTML);
};

const clickHandler = async function (event) {
  event.preventDefault();

  const jobItemEl = event.target.closest(".job-item");
  if (!jobItemEl) return;

  const id = jobItemEl.querySelector(".job-item__link").getAttribute("href");
  if (!id) return;

  document.querySelectorAll(".job-item--active")
    .forEach(job => job.classList.remove("job-item--active"));

  jobDetailsContentEl.innerHTML = "";
  renderSpinner("job-details");

  const allJobItems = [...state.searchJobItems, ...state.bookmarkJobItems];
  state.activeJobItem = allJobItems.find(job => job.id === Number(id));
  
  renderJobList();
  history.pushState(null, "", `/#${id}`);

  try {
    const { jobItem } = await getData(ApiUrls.getById(id));
    renderSpinner("job-details");
    renderJobDetails(jobItem);
  } catch {
    renderSpinner("job-details");
    renderError("Something went wrong while fetching job details");
  }
};

jobListSearchEl.addEventListener("click", clickHandler);
jobListBookmarksEl.addEventListener("click", clickHandler);

export default renderJobList;
