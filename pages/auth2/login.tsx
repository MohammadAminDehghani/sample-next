// next
import { NextPageWithLayout } from '../_app';

//pakages
import { useCookies } from 'react-cookie';

// my imports
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginFormPhone from '@/app/forms/auth/loginFormPhone';
import { useAppDispatch } from '@/app/hooks';
import { updatePhoneVerifyToken } from '@/app/store/auth';
import GuestLayout from '@/app/components/guestLayout';


const Login: NextPageWithLayout = () => {

    const [cookies, setCookie, removeCookie] = useCookies(['login-token']);

    const dispatch = useAppDispatch();

    const setPhoneVerifyToken = (token: string) => {
        dispatch(updatePhoneVerifyToken(token));
    }

    return (
        <div className="mt-5 vh-100 d-flex flex-column justify-content-center align-items-center">
            <div className='w-50 mb-4'>
                <h2>Login page!</h2>
            </div>
            {/* <LoginForm setCookie={setCookie} /> */}
            <LoginFormPhone setToken={setPhoneVerifyToken} setCookie={setCookie} />
        </div>
    );
};


Login.getLayout = (page) => <GuestLayout>{page}</GuestLayout>

export default Login;