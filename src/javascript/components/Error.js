import { errorTextEl, errorEl, ERROR_DISPLAY_TIME } from "../common.js";
// rendering an error modal with a message
const renderError = function (message = "Something went wrong") {
  errorTextEl.textContent = message;
  errorEl.classList.add("error--visible");
  setTimeout(() => {
    errorEl.classList.remove("error--visible");
  }, ERROR_DISPLAY_TIME);
};
export default renderError;
