"use client"

import InnerLoginForm from "@/app/tools/components/auth/innerLoginForm";
import { LoginFormValuesInterface } from "@/app/tools/contracts/auth";
import validationErrors from "@/app/tools/exceptions/validationErrors";
import callApi from "@/app/tools/helpers/callApi";
import { withFormik } from "formik";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import Router from "next/router";
import * as yup from 'yup';

const loginFormValidationSchema = yup.object({
    email: yup.string().email('Must be a valid email').required('Email is required'),
    password: yup.string().min(8, 'min lentgh of pass is 8 char').required('Password is required'),
});

interface LoginFormProps {
    setCookie: any,
    email?: string,
    password?: string,
    setToken : (token:string) => void,
    router: AppRouterInstance
}

const LoginForm = withFormik<LoginFormProps, LoginFormValuesInterface>({
    mapPropsToValues: (props) => ({
        email: props.email ?? '',
        password: props.password ?? '',
    }),
    validationSchema: loginFormValidationSchema,
    handleSubmit: async (values, { props, setFieldError }) => {

        try {
            console.log('values', values);
            const res = await callApi().post('/auth/login', values);
            console.log('res', res);
            if (res.status === 200) {
                // props.setCookie('login-token', res.data.token, {
                //     path: '/',
                //     maxAge: 60 * 60 * 24,
                //     domain: 'localhost',
                //     sameSite: 'lax'
                // });
                // Router.push('/');

                localStorage.setItem('login-token', res.data.token);
                localStorage.setItem('email', values.email);
                //props.router.push('/auth/login-verify');
                props.router.push('/admin');
            }

        } catch (error) {
            if (error instanceof validationErrors) {
                Object.entries(error.messages).forEach(
                    ([key, value]) => setFieldError(key, value as string)
                )
            }
        }

    }
})(InnerLoginForm)

export default LoginForm;