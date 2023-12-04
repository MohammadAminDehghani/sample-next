"use client"

import InnerLoginFormVerifyPhone from "@/app/components/auth/innerLoginFormVerifyPhone";
import { LoginFormValuesInterfaceVerifyPhone } from "@/app/contracts/auth";
import validationErrors from "@/app/exceptions/validationErrors";
import { storeLoginToken } from "@/app/helpers/auth";
import callApi from "@/app/helpers/callApi";
import { withFormik } from "formik";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { toast } from "react-toastify";
import * as yup from 'yup';

const phoneRegExp = /^09(1[0-9]|3[1-9])-?[0-9]{3}-?[0-9]{4}$/
const loginFormValidationSchema = yup.object({
    //phone: yup.string().matches(phoneRegExp, 'Phone number is not valid').required('Phone is required'),
    token: yup.string().required('token is required'),
    code: yup.string().required('code is required'),
});

interface LoginFormProps {
    phone?: string,
    token?: string,
    code?: string,
    clearToken : () => void,
    setCookie?: any,
    router: AppRouterInstance
}

const LoginFormVerifyPhone = withFormik<LoginFormProps, LoginFormValuesInterfaceVerifyPhone>({
    
    mapPropsToValues: (props) => ({
        phone: props.phone ?? '',
        token: props.token ?? '',
        code: props.code ?? '',

    }),

    validationSchema: loginFormValidationSchema,

    handleSubmit: async (values, { props, setFieldError }) => {

        // const valuesForSend = {
        //     ...values,
        //     token: props.token,
        //     phone : Router.query.phone
        // }
        const valuesForSend = {
            ...values,
            token: localStorage.getItem('login-token'),
            phone : localStorage.getItem('phone')
        }
         console.log(valuesForSend);
        try {
            
            const res = await callApi().post('/auth/login/verify-phone', valuesForSend);

            if (res.status === 200) {
                
                // props.setCookie('auth-token', res.data.user.token, {
                //     path: '/',
                //     maxAge: 60 * 60 * 24,
                //     domain: 'localhost',
                //     sameSite: 'lax'
                // });
                toast.success('Your Login has been verified');
                console.log(res.data?.user?.token)
                storeLoginToken(res.data?.user?.token); 
                props.clearToken();
                //props.router.push('/panel');
                window.location.href = '/admin/products';
                
            }

        } catch (error) {
            console.log(error);
            if (error instanceof validationErrors) {
                Object.entries(error.messages).forEach(
                    ([key, value]) => setFieldError(key, value as string)
                )
            }
        }

    }
})(InnerLoginFormVerifyPhone)

export default LoginFormVerifyPhone;