import axios from "axios";

export const baseURL = "http://localhost:8080/api";
//export const baseURL = 'http://ec2-3-95-176-91.compute-1.amazonaws.com'
axios.defaults.withCredentials = true;

export const axiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 300000,
  withCredentials: true,
});
