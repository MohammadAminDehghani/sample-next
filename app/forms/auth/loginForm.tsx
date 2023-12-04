import InnerLoginForm from "@/app/components/auth/innerLoginForm";
import { LoginFormValuesInterface } from "@/app/contracts/auth";
import validationErrors from "@/app/exceptions/validationErrors";
import callApi from "@/app/helpers/callApi";
import { withFormik } from "formik";
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
}

const LoginForm = withFormik<LoginFormProps, LoginFormValuesInterface>({
    mapPropsToValues: (props) => ({
        email: props.email ?? '',
        password: props.password ?? '',
    }),
    validationSchema: loginFormValidationSchema,
    handleSubmit: async (values, { props, setFieldError }) => {

        try {

            const res = await callApi().post('/auth/login', values);
            if (res.status === 200) {
                props.setCookie('login-token', res.data.token, {
                    path: '/',
                    maxAge: 60 * 60 * 24,
                    domain: 'localhost',
                    sameSite: 'lax'
                });
                Router.push('/');
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