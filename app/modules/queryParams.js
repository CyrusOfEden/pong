export default function queryParams(qs) {
  let parts = (qs || document.location.search).replace(/(^\?)/, "").split("&");
  let params = {};
  for (let part of parts) {
    let [key, value] = part.split("=");
    params[key] = value;
  }
  return params;
}
