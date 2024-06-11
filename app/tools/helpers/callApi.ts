import axios, { AxiosInstance } from "axios";
import validationErrors from "@/app/tools/exceptions/validationErrors";
//import { redirectTo } from "./functions";
import { handleError } from "@/app/tools/utils/errorHandler";
// import { useError } from "@/app/errorContext";
// import { useRouter } from "next/navigation";
//import { useRouter } from "next/router";
//import { NextRouter } from "next/router";
import { useRouter } from 'next/navigation';

const callApi = (): AxiosInstance => {
  //const router = useRouter();
  //const { handleError } = useError();
  //const nextRouterInstance = nextRouter();

  const axiosInstance = axios.create({
    baseURL: "http://localhost:3001/api",
    withCredentials: true, // Allow sending cookies with requests
  });

  axiosInstance.interceptors.request.use(
    (config) => {
      config.withCredentials = true;

      const token = localStorage.getItem("login-token");
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }

      return config;
    },
    (err) => {
      throw err;
    }
  );

  axiosInstance.interceptors.response.use(
    (res) => {
      // manage validation
      // reform data
      // send message
      return res;
    },
    (err) => {
      const error = err?.response;
      // if (res) {
      //     console.log('error:callApi', res)

      //     // if (res.status === 403) {
      //     //     router.push('auth/login'); here is good?
      //     // }

      //     if (res.status === 422 || res.status === 401) {
      //         throw new validationErrors(res.data.errors)
      //     }
      // }

      if (error) {
        console.log("error:callApi", error);
        //handleError(error, router);
      } else {
        console.error("An unknown error occurred", error);
      }

      throw err;
    }
  );

  return axiosInstance;
};

export default callApi;
