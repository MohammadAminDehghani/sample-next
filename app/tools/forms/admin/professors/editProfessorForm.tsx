'use client'

import { EditProfessorInterface } from "@/app/tools/contracts/admin/professors";
import validationErrors from "@/app/tools/exceptions/validationErrors";
import { UpdateProfessor } from "@/app/tools/services/db/professor";
import { withFormik } from "formik";
import * as yup from 'yup';
import { toast } from 'react-toastify';
import Professor from "@/app/tools/models/professor";
import InnerEditProfessorForm from "@/app/tools/components/admin/professors/innerEditProfessorForm";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { Dispatch } from "react";
import { SetStateAction } from "react";
import { KeyedMutator } from "swr";

const FormValidationSchema = yup.object({
    name: yup.string().min(2).max(255).required('name is required'),
    description: yup.string().min(0).max(6000),
});

interface FormProps {
    id: number,
    professor : Professor | undefined,
    setEditableProfessor : Dispatch<SetStateAction<Professor|undefined>> ,
    setShowCreateProfessor : Dispatch<SetStateAction<boolean>> ,
    professorsMutate: KeyedMutator<{
        professors: any;
        total_page?: any;
      }>;
    router: AppRouterInstance
}

const EditProfessorForm = withFormik<FormProps, EditProfessorInterface>({
    //TODO check
    // mapPropsToValues: (props) => ({
    //     id: props?.professor?.id,
    //     first_name: props?.professor?.first_name ?? '',
    //     last_name: props?.professor?.last_name ?? '',
    //     affiliation: props?.professor?.affiliation ?? '',
    //     gender: props?.professor?.gender ?? '',
    //     email: props?.professor?.email ?? '',
    //     phone: props?.professor?.phone ?? '',
    //     url: props?.professor?.url ?? '',
    //     url_response: props?.professor?.url_response ?? '',
    //     address: props?.professor?.address ?? '',
    //     department_id: props?.professor?.department_id ?? '',
    //     setShowCreateProfessor : props.setShowCreateProfessor
    // }),
    validationSchema: FormValidationSchema,
    handleSubmit: async (values, { props, setFieldError }) => {

        try {

            const res = await UpdateProfessor(values)
            toast.success("the professor updated successfully");
            //props.setShowCreateProfessor(true);
            props.professorsMutate();
            props.setShowCreateProfessor(true)

            // if (res.status === 200) {
            //     Router.push('/admin/professors')
            // }
            
            //GetProfessors;

        } catch (error) {
            if (error instanceof validationErrors) {
                Object.entries(error.messages).forEach(
                    ([key, value]) => setFieldError(key, value as string)
                )
                return;
            }
            console.log(error)
        }

    }
})(InnerEditProfessorForm)

export default EditProfessorForm;