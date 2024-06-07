import axios from "axios";
import validationErrors from "@/app/tools/exceptions/validationErrors";

const callApi = () => {
    const axiosInstance = axios.create({
        baseURL: 'http://localhost:3001/api',
        withCredentials: true, // Allow sending cookies with requests
    })

    axiosInstance.interceptors.request.use(
        (config) => {
            config.withCredentials = true;
            return config;
        },
        err => { throw err; }
    )

    axiosInstance.interceptors.response.use(
        
        (res) => {
            // manage validation
            // reform data
            // send message
            return res;
        },
        err => {
            const res = err?.response
            if (res) {
                console.log('error:callApi', res)
                if (res.status === 422 || res.status === 401) {
                    throw new validationErrors(res.data.errors)
                }
            }

            throw err;


        }
    )

    return axiosInstance;
}

export default callApi;