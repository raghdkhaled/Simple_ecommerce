import http from "./httpService";
import config from "../config.json";

const apiEndpoint = config.apiUrl + "/products";
function productUrl(id) {
  return apiEndpoint + "/" + id;
}
function productImageUrl(id) {
  return config.apiUrl + "/products_images/" + id;
}

export function getProducts() {
  return http.get(apiEndpoint);
}
export function getProduct(id) {
  return http.get(productUrl(id));
}
export function getProductImages(id) {
  return http.get(productImageUrl(id));
}
