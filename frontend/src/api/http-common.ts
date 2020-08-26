import axios from "axios";

export const imageURL = "http://13.124.102.51:8080/images/";
export default axios.create({
  // http://13.124.102.51:8080/swagger-ui.html#/user-controller/joinUsingPOST
  // baseURL: "http://211.46.225.84:8080/api/",
  baseURL: "http://13.124.102.51:8080/api/",
  headers: {
    "Content-type": "application/json",
    accept: "*/*"
  }
});
