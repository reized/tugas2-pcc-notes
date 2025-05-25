import axios from "axios";

const instance = axios.create({
    baseURL: "https://demo-298647753913.us-central1.run.app",
    withCredentials: true,
});

export default instance;
