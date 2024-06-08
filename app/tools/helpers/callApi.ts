import axios from "axios";
import validationErrors from "@/app/tools/exceptions/validationErrors";
//import { useRouter } from "next/navigation";
//import { useRouter } from "next/router";


const callApi = () => {
    //const router = useRouter();
    const axiosInstance = axios.create({
        baseURL: 'http://localhost:3001/api',
        withCredentials: true, // Allow sending cookies with requests
    })

    axiosInstance.interceptors.request.use(
        (config) => {
            config.withCredentials = true;

            const token = localStorage.getItem('login-token');
            if (token) {
              config.headers['Authorization'] = `Bearer ${token}`;
            }

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
            // if (res) {
            //     console.log('error:callApi', res)

            //     // if (res.status === 403) {
            //     //     router.push('auth/login'); here is good?
            //     // }

            //     if (res.status === 422 || res.status === 401) {
            //         throw new validationErrors(res.data.errors)
            //     }
            // }


            if (res) {
                console.log('error:callApi', res);

                // Handle specific status codes
                switch (res.status) {
                    case 400:
                        console.error('Bad Request', res.data);
                        break;
                    case 401:
                        console.error('Unauthorized', res.data);
                        //router.push('/auth/login'); // Redirect to login page
                        break;
                    case 403:
                        console.error('Forbidden', res.data);
                        throw new validationErrors(res.data.errors);
                    case 422:
                        throw new validationErrors(res.data.errors);
                    case 500:
                        console.error('Internal Server Error', res.data);
                        break;
                    default:
                        console.error('An error occurred', res.data);
                }
            } else {
                console.error('An unknown error occurred', err);
            }



            throw err;
        }
    )

    return axiosInstance;
}

export default callApi;