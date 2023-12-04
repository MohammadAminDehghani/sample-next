import 'bootstrap/dist/css/bootstrap.min.css';
import RegisterFormPhone from '@/app/forms/auth/registerFormPhone';
import { NextPageWithLayout } from '../_app';
import GuestLayout from '@/app/components/guestLayout';

const Register: NextPageWithLayout = () => {
    return (
        <div className="mt-5 vh-100 d-flex flex-column justify-content-center align-items-center">
            <div className='w-50 mb-4'>
                <h2>Register page!</h2>
            </div>
            {/* <RegisterForm /> */}
            <RegisterFormPhone />
        </div>
    );
};

Register.getLayout = (page) => <GuestLayout>{page}</GuestLayout>

export default Register;