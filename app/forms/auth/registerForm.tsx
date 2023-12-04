import InnerRegisterForm from "@/app/components/auth/innerRegisterForm";
import { RegisterFormValuesInterface } from "@/app/contracts/auth";
import callApi from "@/app/helpers/callApi";
import { withFormik } from "formik";
import Router from "next/router";
import * as yup from 'yup';



const registerFormValidationSchema = yup.object({
    name: yup.string().trim().required('Name is required'),
    email: yup.string().email('Must be a valid email').required('Email is required'),
    password: yup.string().min(8, 'min lentgh of pass is 8 char').required('Password is required'),
});

interface RegisterFormProps {
    name?: string,
    email?: string,
    password?: string,
}

const RegisterForm = withFormik<RegisterFormProps, RegisterFormValuesInterface>({

    mapPropsToValues: (props) => ({
        name: props.name ?? '',
        email: props.email ?? '',
        password: props.password ?? '',
    }),

    validationSchema: registerFormValidationSchema,

    handleSubmit: async (values) => {

        const res = await callApi().post('/auth/register', values);

        if (res.status === 201) {
            Router.push('/auth/login');
        }
        
    }
})(InnerRegisterForm)

export default RegisterForm;