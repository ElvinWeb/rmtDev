import {
  FADE_ANIMATION_SEC,
  fadeIntroEl,
  searchFormEl,
  containerEl,
  headerTopEl,
} from "../common.js";

const setIntroAnimation = function () {
  headerTopEl.classList.add("header-intro");
  searchFormEl.classList.add("search-intro");
  containerEl.classList.add("container-intro");
};
const setIntroFadeAnimation = function () {
  document.body.style.overflow = "hidden";

  setTimeout(() => {
    fadeIntroEl.classList.add("close");
    document.body.style.overflow = "initial";
    setIntroAnimation();
  }, FADE_ANIMATION_SEC);
};

window.addEventListener("DOMContentLoaded", setIntroFadeAnimation);
