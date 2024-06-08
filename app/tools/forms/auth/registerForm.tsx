"use client";

import InnerRegisterForm from "@/app/tools/components/auth/innerRegisterForm";
import { RegisterFormValuesInterface } from "@/app/tools/contracts/auth";
import callApi from "@/app/tools/helpers/callApi";
import { withFormik } from "formik";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import Router from "next/router";
import * as yup from "yup";
import validationErrors from "../../exceptions/validationErrors";

const registerFormValidationSchema = yup.object({
  name: yup.string().trim().required("Name is required"),
  email: yup
    .string()
    .email("Must be a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "min lentgh of pass is 8 char")
    .required("Password is required"),
});

interface RegisterFormProps {
  name?: string;
  email?: string;
  password?: string;
  router?: AppRouterInstance;
}

const RegisterForm = withFormik<RegisterFormProps, RegisterFormValuesInterface>(
  {
    mapPropsToValues: (props) => ({
      name: props.name ?? "",
      email: props.email ?? "",
      password: props.password ?? "",
    }),

    validationSchema: registerFormValidationSchema,

    handleSubmit: async (values, { props, setFieldError }) => {
      try {
        const res = await callApi().post("/auth/register", values);
        console.log(res);
        if (res.status === 200 || res.status === 201) {
          props?.router?.push("/auth/login");
        }
      } catch (error) {
        if (error instanceof validationErrors) {
          Object.entries(error.messages).forEach(([key, value]) =>
            setFieldError(key, value as string)
          );
          return;
        }
      }
    },
  }
)(InnerRegisterForm);

export default RegisterForm;
