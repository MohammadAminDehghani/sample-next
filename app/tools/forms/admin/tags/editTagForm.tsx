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

const FormValidationSchema = yup.object({
    title: yup.string().min(4).max(255).required('Title is required'),
    body: yup.string().min(0),
    category: yup.number().integer(),
    description: yup.string().min(4).max(6000),
});

interface FormProps {
    tag : Tag,
    router: AppRouterInstance
}

const EditTagForm = withFormik<FormProps, EditTagInterface>({
    mapPropsToValues: ({tag}) => ({
        id: tag.id ?? '',
        user: tag.user ?? '',
        title: tag.title ?? '',
        slug: tag.slug ?? '',
        body: tag.body ?? '',
        image: tag.image ?? {},
        tags: tag.tags ?? '',
        viewCount: tag.viewCount ?? 0,
        commentCount: tag.commentCount ?? 0,
        categories: tag.categories ?? [],
        path: tag.path ?? ''
    }),
    validationSchema: FormValidationSchema,
    handleSubmit: async (values, { props, setFieldError }) => {

        try {

            const res = await UpdateTag(values)
            toast.success("the tag updated successfully");
            props.router.push('/admin/tags')


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