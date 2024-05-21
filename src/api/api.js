import axios from "axios";

const getBaseUrl = () => {
  if (window.location.host === "localhost:3000") {
    return "http://localhost:8000";
  }
};

const api = axios.create({
  baseURL: getBaseUrl(),
  "Content-Encoding": "gzip",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => configure(config),
  (error) => Promise.reject(error)
);

api.interceptors.response.use(function (response) {
  if (response.headers["x-version"] > process.env.VERSION) {
    window.location.reload();
  }
  return response; // continue with response
});
const configure = (config) => {
  const firstName = localStorage.getItem("firstName");
  const lastName = localStorage.getItem("lastName");
  const tid = localStorage.getItem("tid");
  const uid = localStorage.getItem("uid");
  const _userId = localStorage.getItem("_userId");
  if (tid != null) {
    config.headers.Authorization = tid;
  }
  if (config.method === "get") {
    config.headers["Content-Type"] = "application/x-www-form-urlencoded";
  }
  config.headers["firstName"] = firstName;
  config.headers["lastName"] = lastName;
  config.headers["_userId"] = _userId;
  config.headers["uid"] = uid;
  return config;
};

export default api;
