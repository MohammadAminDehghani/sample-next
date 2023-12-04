import axios from "axios";
import validationErrors from "../exceptions/validationErrors";


const callApi = () => {
    const axiosInstance = axios.create({
        baseURL: 'http://localhost:5000/api'
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
                if (res.status === 422) {
                    throw new validationErrors(res.data.errors)
                }
            }

            throw err;


        }
    )

    return axiosInstance;
}

export default callApi;