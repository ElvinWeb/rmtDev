import {
  FADE_ANIMATION_TIME,
  fadeIntroEl,
  searchFormEl,
  containerEl,
  headerTopEl,
} from "../common.js";
// setting intro animations on specific elements
const setIntroAnimation = function () {
  headerTopEl.classList.add("header-intro");
  searchFormEl.classList.add("search-intro");
  containerEl.classList.add("container-intro");
};
// setting fade intro animation with a delay
const setIntroFadeAnimation = function () {
  document.body.style.overflow = "hidden";
  setTimeout(() => {
    fadeIntroEl.classList.add("close");
    document.body.style.overflow = "initial";
    setIntroAnimation();
  }, FADE_ANIMATION_TIME);
};

window.addEventListener("DOMContentLoaded", setIntroFadeAnimation);
