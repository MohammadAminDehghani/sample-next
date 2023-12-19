'use client'

import { EditTagInterface } from "@/app/tools/contracts/admin/tags";
import validationErrors from "@/app/tools/exceptions/validationErrors";
import { UpdateTag } from "@/app/tools/services/db/tag";
import { withFormik } from "formik";
import * as yup from 'yup';
import { toast } from 'react-toastify';
import Tag from "@/app/tools/models/tag";
import InnerEditTagForm from "@/app/tools/components/admin/tags/innerEditTagForm";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { Dispatch } from "react";
import { SetStateAction } from "react";
import { KeyedMutator } from "swr";

const FormValidationSchema = yup.object({
    name: yup.string().min(2).max(255).required('name is required'),
    description: yup.string().min(0).max(6000),
});

interface FormProps {
    id: string,
    tag : Tag | undefined,
    setEditableTag : Dispatch<SetStateAction<Tag|undefined>> ,
    setShowCreateTag : Dispatch<SetStateAction<boolean>> ,
    tagsMutate: KeyedMutator<{
        tags: any;
        total_page?: any;
      }>;
    router: AppRouterInstance
}

const EditTagForm = withFormik<FormProps, EditTagInterface>({
    mapPropsToValues: (props) => ({
        id: props?.tag?.id ?? '',
        name: props?.tag?.name ?? '',
        description: props?.tag?.description ?? '',
        setShowCreateTag : props.setShowCreateTag
    }),
    validationSchema: FormValidationSchema,
    handleSubmit: async (values, { props, setFieldError }) => {

        try {

            const res = await UpdateTag(values)
            toast.success("the tag updated successfully");
            //props.setShowCreateTag(true);
            props.tagsMutate();
            props.setShowCreateTag(true)

            // if (res.status === 200) {
            //     Router.push('/admin/tags')
            // }
            
            //GetTags;

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
})(InnerEditTagForm)

export default EditTagForm;