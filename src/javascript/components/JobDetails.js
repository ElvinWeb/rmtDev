import { jobDetailsContentEl, getRandomNumber, state } from "../common.js";
import dev_images from "../../Images/*.jpg";

const renderJobDetails = function (jobItem) {
  // Get random image key
  const randomImageKey = Object.keys(dev_images)[getRandomNumber()];

  // Create HTML template with destructured jobItem properties
  const {
    badgeLetters,
    daysAgo,
    id,
    title,
    company,
    description,
    duration,
    salary,
    location,
    qualifications,
    reviews
  } = jobItem;

  const isBookmarked = state.bookmarkJobItems.some(bookmark => bookmark.id === id);
  
  const jobDetailsHTML = `
    <img src="${dev_images[randomImageKey]}" alt="Developer" class="job-details__cover-img">
    <section class="job-info">
        <div class="job-info__left">
            <div class="job-info__badge">${badgeLetters}</div>
            <div class="job-info__below-badge">
                <time class="job-info__time">${daysAgo}d</time>
                <button class="job-info__bookmark-btn">
                    <i class="fa-solid fa-bookmark job-info__bookmark-icon${isBookmarked ? ' job-info__bookmark-icon--bookmarked' : ''}"></i>
                </button>
            </div>
        </div>
        <div class="job-info__right">
            <h2 class="second-heading">${title}</h2>
            <p class="job-info__company">${company}</p>
            <p class="job-info__description">${description}</p>
            <div class="job-info__extras">
                <p class="job-info__extra"><i class="fa-solid fa-clock job-info__extra-icon"></i> ${duration}</p>
                <p class="job-info__extra"><i class="fa-solid fa-money-bill job-info__extra-icon"></i> ${salary}</p>
                <p class="job-info__extra"><i class="fa-solid fa-location-dot job-info__extra-icon"></i> ${location}</p>
            </div>
        </div>
    </section>

    <div class="job-details__other">
        <section class="qualifications">
            <div class="qualifications__left">
                <h4 class="fourth-heading">Qualifications</h4>
                <p class="qualifications__sub-text">Other qualifications may apply</p>
            </div>
            <ul class="qualifications__list">
                ${qualifications.map(text => `<li class="qualifications__item">${text}</li>`).join('')}
            </ul>
        </section>
        
        <section class="reviews">
            <div class="reviews__left">
                <h4 class="fourth-heading">Company reviews</h4>
                <p class="reviews__sub-text">Recent things people are saying</p>
            </div>
            <ul class="reviews__list">
                ${reviews.map(text => `<li class="reviews__item">${text}</li>`).join('')}
            </ul>
        </section>
    </div>

    <footer class="job-details__footer">
        <p class="job-details__footer-text">If possible, please reference that you found the job on <span class="u-bold">rmtDev</span>, we would really appreciate it!</p>
    </footer>
`;

  jobDetailsContentEl.innerHTML = jobDetailsHTML;
};

export default renderJobDetails;
