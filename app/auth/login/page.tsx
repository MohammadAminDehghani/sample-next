"use client"

//pakages
import { useCookies } from 'react-cookie';

// my imports
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginFormPhone from '@/app/tools/forms/auth/loginFormPhone';
import LoginForm from '@/app/tools/forms/auth/loginForm';
import { useAppDispatch } from '@/app/tools/hooks';
import { updatePhoneVerifyToken, updateVerifyToken } from '@/app/tools/store/auth';
import { useRouter } from 'next/navigation';

const Login = () => {

    const router = useRouter();

    const [cookies, setCookie, removeCookie] = useCookies(['login-token']);

    const dispatch = useAppDispatch();

    const setVerifyToken = (token: string) => {
        dispatch(updateVerifyToken(token));
    }

    return (
        <div className="mt-5 vh-100 d-flex flex-column justify-content-center align-items-center">
            <div className='w-50 mb-4'>
                <h2>Login page!</h2>
            </div>
            <LoginForm setToken={setVerifyToken} setCookie={setCookie} router={router}  />
            {/* <LoginFormPhone setToken={setPhoneVerifyToken} setCookie={setCookie} router={router} /> */}
        </div>
    );
};

export default Login;