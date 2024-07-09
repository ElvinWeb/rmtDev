import { spinnerSearchEl, spinnerJobDetailsEl } from "../common.js";
// toggle the visibility of a spinner element
const renderSpinner = function (whichSpinner) {
  const spinnerEl =
    whichSpinner === "search" ? spinnerSearchEl : spinnerJobDetailsEl;
  spinnerEl.classList.toggle("spinner--visible");
};
export default renderSpinner;
