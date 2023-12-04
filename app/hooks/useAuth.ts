import useSWR from "swr";
import Cookies from "universal-cookie";
import callApi from "../helpers/callApi";
import { useDispatch } from "react-redux";
import { updateUser } from "../store/auth";
import User from "../models/user";



const useAuth = () => {

    //const dispatch = useDispatch();

    const Cookie = new Cookies();

    const { data, error } =  useSWR('user_me', ()=>{

        // return callApi().get('/user',{
        //     headers : {
        //         authorization : Cookie.get('auth_token')
        //     }
        // })

        return callApi().get('/user')
    });
    

    //dispatch(updateUser(data?.data?.user))

    return { user : data?.data?.user , error, loading: !data && !error}
}


export default useAuth;