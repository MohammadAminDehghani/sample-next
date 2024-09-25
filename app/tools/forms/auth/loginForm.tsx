"use client"

import InnerLoginForm from "@/app/tools/components/auth/innerLoginForm";
import { LoginFormValuesInterface } from "@/app/tools/contracts/auth";
import validationErrors from "@/app/tools/exceptions/validationErrors";
import callApi from "@/app/tools/helpers/callApi";
import { withFormik } from "formik";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import Router from "next/router";
import * as yup from 'yup';
import { updateUser } from "../../store/auth";
import { useAppDispatch } from "../../hooks";
import { toast } from "react-toastify";
import { storeLoginToken } from "../../helpers/auth";
import { UserType } from "../../models/user";

const loginFormValidationSchema = yup.object({
    email: yup.string().email('Must be a valid email').required('Email is required'),
    password: yup.string().min(8, 'min lentgh of pass is 8 char').required('Password is required'),
});

interface LoginFormProps {
    setCookie: any,
    email?: string,
    password?: string,
    setVerifyToken : (token:string) => void,
    setUser : (user:UserType) => void,
    clearVerifyToken : () => void,
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
            console.log('result', res);
            if (res.status === 200) {
                // props.setCookie('login-token', res.data.token, {
                //     path: '/',
                //     maxAge: 60 * 60 * 24,
                //     domain: 'localhost',
                //     sameSite: 'lax'
                // });
                // Router.push('/');

                // console.log('res?.data', res?.data);
                // localStorage.setItem('login-token', res.data.token);
                // localStorage.setItem('user', res?.data?.user);
                // localStorage.setItem('email', res?.data?.user?.email);


                toast.success('You Logged in successfully');
                //storeLoginToken(res.data.token);
                
                
                props.setUser(res?.data?.user);
                props.clearVerifyToken();
                props.setVerifyToken(res?.data?.token);
                localStorage.setItem('login-token', res.data.token);
                props.router.push('/admin');
                // const dispatch = useAppDispatch();
                // dispatch(updateUser(res?.data?.user));
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