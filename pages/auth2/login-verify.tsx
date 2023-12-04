// next
import { useEffect } from "react";

//pakages
import { useCookies } from 'react-cookie';

// my imports
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginFormVerifyPhone from '@/app/forms/auth/loginFormVerifyPhone';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { selectPhoneVerifyToken, updatePhoneVerifyToken } from '@/app/store/auth';
import Router from 'next/router';
import { NextPageWithLayout } from '../_app';
import GuestLayout from '@/app/components/guestLayout';

const LoginVerify: NextPageWithLayout = () => {

     const [cookies, setCookie, removeCookie] = useCookies(['login-token']);
    // const token = cookies['login-token']

    const dispatch = useAppDispatch();
    const token = useAppSelector(selectPhoneVerifyToken);

    const clearPhoneVerifyToken = ()=>{
        dispatch(updatePhoneVerifyToken(undefined))
    }

    useEffect(() => {

        Router.beforePopState(({url, as, options})=>{
            clearPhoneVerifyToken();
            return true;
        })

        if (token === undefined) {
            Router.push('/auth/login');
        }
        
    }, [token])



    return (
        <div className="mt-5 vh-100 d-flex flex-column justify-content-center align-items-center">
            <div className='w-50 mb-4'>
                <h2>Verify your phone number!</h2>
            </div>
            {/* <LoginForm setCookie={setCookie} /> */}
            {/* <LoginFormVerifyPhone setCookie={setCookie} token={token} /> */}
            <LoginFormVerifyPhone token={token} setCookie={setCookie} clearToken={clearPhoneVerifyToken} />
        </div>
    );
};

LoginVerify.getLayout = (page) => <GuestLayout>{page}</GuestLayout>

export default LoginVerify;