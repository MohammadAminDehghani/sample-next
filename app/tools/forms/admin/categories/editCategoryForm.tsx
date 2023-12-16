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
    name: yup.string().min(2).max(255).required('Title is required'),
    parent: yup.string(),
    description: yup.string().min(0),
});

interface FormProps {
    category : Category,
    router: AppRouterInstance
}

const EditCategoryForm = withFormik<FormProps, EditCategoryInterface>({
    mapPropsToValues: ({category}) => ({
        id: category.id ?? '',
        user: category.user ?? '',
        name: category.name ?? '',
        description: category.description ?? '',
        parent: category.parent ?? '',

    }),
    //validationSchema: FormValidationSchema,
    handleSubmit: async (values, { props, setFieldError }) => {
        console.log('values ghable', values);
        values.parent === 'parent' ? values.parent = undefined : values.parent;
        console.log('test', 'qqqqqqqqqqqqq');
        console.log('values', values);
        console.log('props', props);
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