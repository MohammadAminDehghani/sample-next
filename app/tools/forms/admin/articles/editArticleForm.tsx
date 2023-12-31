'use client'

import { EditArticleInterface } from "@/app/tools/contracts/admin/articles";
import validationErrors from "@/app/tools/exceptions/validationErrors";
import { UpdateArticle } from "@/app/tools/services/db/article";
import { withFormik } from "formik";
import * as yup from 'yup';
import { toast } from 'react-toastify';
import Article from "@/app/tools/models/article";
import InnerEditArticleForm from "@/app/tools/components/admin/articles/innerEditArticleForm";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

const FormValidationSchema = yup.object({
    title: yup.string().min(4).max(255).required('title is required'),
    body: yup.string().min(0),
    category: yup.string(),
    description: yup.string().min(4).max(6000),
});

interface FormProps {
    article : Article,
    router: AppRouterInstance
}

const EditArticleForm = withFormik<FormProps, EditArticleInterface>({
    mapPropsToValues: ({article}) => ({
        id: article.id ?? '',
        title: article.title ?? '',
        slug: article.slug ?? '',
        body: article.body ?? '',
        tags: article.tags ?? [],
        category: article.category ?? '',
    }),
    validationSchema: FormValidationSchema,
    handleSubmit: async (values, { props, setFieldError }) => {

        

        try {
            values.tags = values.tags.map(tag=>tag.id);
            const res = await UpdateArticle(values)
            toast.success("the article updated successfully");
            props.router.push('/admin/articles')


            // if (res.status === 200) {
            //     Router.push('/admin/articles')
            // }
            
            //GetArticles;

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
})(InnerEditArticleForm)

export default EditArticleForm;