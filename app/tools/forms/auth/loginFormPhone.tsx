"use client"

import InnerLoginFormPhone from "@/app/tools/components/auth/innerLoginFormPhone";
import { LoginFormValuesInterfacePhone } from "@/app/tools/contracts/auth";
import validationErrors from "@/app/tools/exceptions/validationErrors";
import callApi from "@/app/tools/helpers/callApi";
import { withFormik } from "formik";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import * as yup from 'yup';

const phoneRegExp = /^09(1[0-9]|3[1-9])-?[0-9]{3}-?[0-9]{4}$/
const loginFormValidationSchema = yup.object({
    phone: yup.string().matches(phoneRegExp, 'Phone number is not valid').required('Phone is required'),
    password: yup.string().min(8, 'min lentgh of pass is 8 char').required('Password is required'),
});

interface LoginFormProps {
    setCookie: any,
    phone?: string,
    password?: string,
    setToken : (token:string) => void,
    router: AppRouterInstance
}

const LoginFormPhone = withFormik<LoginFormProps, LoginFormValuesInterfacePhone>({
    mapPropsToValues: (props) => ({
        phone: props.phone ?? '',
        password: props.password ?? '',
    }),
    validationSchema: loginFormValidationSchema,
    handleSubmit: async (values, { props, setFieldError }) => {

        try {

            const res = await callApi().post('/auth/login', values);

            if (res.status === 200) {
                // props.setCookie('login-token', res.data.token, {
                //     path: '/',
                //     maxAge: 60 * 60 * 24,
                //     domain: 'localhost',
                //     sameSite: 'lax'
                // });
                // Router.push({ pathname: '/auth/login-verify', query: { phone: values.phone } });
                
                localStorage.setItem('login-token', res.data.token);
                localStorage.setItem('phone', values.phone);
                props.router.push('/auth/login-verify');


                props.setToken(res.data.token);
            }

            // if (res.status === 400) {
            //     console.log('error 400');
            //     props.router.push('/auth/login');
            // }

        } catch (error) {
            if (error instanceof validationErrors) {
                Object.entries(error.messages).forEach(
                    ([key, value]) => setFieldError(key, value as string)
                )
            }
        }

    }
})(InnerLoginFormPhone)

export default LoginFormPhone;