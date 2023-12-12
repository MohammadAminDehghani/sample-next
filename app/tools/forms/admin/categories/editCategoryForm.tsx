'use client'

import { EditCategoryInterface } from "@/app/tools/contracts/admin/categories";
import validationErrors from "@/app/tools/exceptions/validationErrors";
import { UpdateCategory } from "@/app/tools/services/db/category";
import { withFormik } from "formik";
import * as yup from 'yup';
import { toast } from 'react-toastify';
import Category from "@/app/tools/models/category";
import InnerEditCategoryForm from "@/app/tools/components/admin/categories/innerEditCategoryForm";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

const FormValidationSchema = yup.object({
    title: yup.string().min(4).max(255).required('Title is required'),
    body: yup.string().min(0),
    category: yup.number().integer(),
    description: yup.string().min(4).max(6000),
});

interface FormProps {
    category : Category,
    router: AppRouterInstance
}

const EditCategoryForm = withFormik<FormProps, EditCategoryInterface>({
    mapPropsToValues: ({category}) => ({
        id: category.id ?? '',
        user: category.user ?? '',
        title: category.title ?? '',
        slug: category.slug ?? '',
        body: category.body ?? '',
        image: category.image ?? {},
        tags: category.tags ?? '',
        viewCount: category.viewCount ?? 0,
        commentCount: category.commentCount ?? 0,
        categories: category.categories ?? [],
        path: category.path ?? ''
    }),
    validationSchema: FormValidationSchema,
    handleSubmit: async (values, { props, setFieldError }) => {

        try {

            const res = await UpdateCategory(values)
            toast.success("the category updated successfully");
            props.router.push('/admin/categories')


            // if (res.status === 200) {
            //     Router.push('/admin/categories')
            // }
            
            //GetCategories;

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
})(InnerEditCategoryForm)

export default EditCategoryForm;