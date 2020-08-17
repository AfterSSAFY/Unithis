import axios from "axios";

export default axios.create({
  baseURL: "http://211.46.225.84:8080/api/",
  headers: {
    "Content-type": "application/json",
    accept: "*/*"
  }
});
