import { loading } from "./temlates";

function show(el, display) {
  el.style.display = display;
  el.classList.add("visible");
}

function hide(el) {
  el.style.display = "none";
  el.classList.remove("visible");
}

function createLoading(parent) {
  parent.insertAdjacentHTML("afterbegin", loading);
}

function destroyLoading(parent) {
  parent.querySelector(".loading").remove();
}

function saveToLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getFromLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
export { show, hide, createLoading, destroyLoading , saveToLocalStorage ,getFromLocalStorage };
