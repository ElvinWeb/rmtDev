import {
  FADE_ANIMATION_TIME,
  fadeIntroEl,
  searchFormEl,
  containerEl,
  headerTopEl,
} from "../common.js";
const setIntroAnimation = () => {
  const introClasses = [
    [headerTopEl, "header-intro"],
    [searchFormEl, "search-intro"],
    [containerEl, "container-intro"]
  ];
  introClasses.forEach(([element, className]) => element.classList.add(className));
};

const setIntroFadeAnimation = () => {
  const body = document.body;
  body.style.overflow = "hidden";
  
  setTimeout(() => {
    fadeIntroEl.classList.add("close");
    body.style.overflow = "initial";
    setIntroAnimation();
  }, FADE_ANIMATION_TIME);
};

window.addEventListener("DOMContentLoaded", setIntroFadeAnimation);
