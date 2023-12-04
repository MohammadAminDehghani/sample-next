"use client"

import InnerRegisterFormPhone from "@/app/components/auth/innerRegisterFormPhone";
import { RegisterFormValuesInterfacePhone } from "@/app/contracts/auth";
import callApi from "@/app/helpers/callApi";
import { withFormik } from "formik";
import Router from "next/router";
import * as yup from 'yup';

const phoneRegExp = /^09(1[0-9]|3[1-9])-?[0-9]{3}-?[0-9]{4}$/
const registerFormValidationSchema = yup.object({
    name: yup.string().trim().required('Name is required'),
    phone: yup.string().matches(phoneRegExp, 'Phone number is not valid').required('Phone is required'),
    password: yup.string().min(8, 'min lentgh of pass is 8 char').required('Password is required'),
});

interface RegisterFormProps {
    name?: string,
    phone?: string,
    password?: string,
}

const RegisterFormPhone = withFormik<RegisterFormProps, RegisterFormValuesInterfacePhone>({

    mapPropsToValues: (props) => ({
        name: props.name ?? '',
        phone: props.phone ?? '',
        password: props.password ?? '',
    }),

    validationSchema: registerFormValidationSchema,

    handleSubmit: async (values) => {

        const res = await callApi().post('/auth/register', values);
        console.log(res)
        if (res.status === 201) {
            Router.push('/auth/login');
        }
        
    }
})(InnerRegisterFormPhone)

export default RegisterFormPhone;