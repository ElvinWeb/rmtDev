import { state, sortingBtnRecentEl, sortingBtnSalaryEl } from "../common.js";

// get data from local storage
const storedJobItems = localStorage.getItem("bookmarkJobItems");
if (storedJobItems) {
  state.bookmarkJobItems = JSON.parse(storedJobItems);
}