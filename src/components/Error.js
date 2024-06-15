import { errorTextEl, errorEl, DEFAULT_DISPLAY_TIME } from "../common.js";

const renderError = function (message) {
  errorTextEl.textContent = message;
  errorEl.classList.add("error--visible");
  setTimeout(() => {
    errorEl.classList.remove("error--visible");
  }, DEFAULT_DISPLAY_TIME);
};
export default renderError;
