import InnerCreateArticleForm from "@/app/tools/components/admin/articles/innerCreateArticleForm";
import { StoreArticleInterface } from "@/app/tools/contracts/admin/articles";
import validationErrors from "@/app/tools/exceptions/validationErrors";
import { withFormik } from "formik";
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { StoreArticle } from "@/app/tools/services/db/article";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

const FormValidationSchema = yup.object({
    title: yup.string().min(4).max(255).required('title is required'),
    slug: yup.string().min(3).required('slug is required'),
    body: yup.string().min(0).max(6000),
});

interface FormProps {
    // id?: string,
    title?: string,
    slug?: string,
    body?: string,
    tags?: string[] | null,
    category?: string | null,
    router: AppRouterInstance
}

const CreateArticleForm = withFormik<FormProps, StoreArticleInterface>({
    mapPropsToValues: (props) => ({
        // id: props.id ?? '',
        title: props.title ?? '',
        slug: props.slug ?? '',
        body: props.body ?? '',
        tags: props.tags ?? [],
        category: props.category ?? '',
    }),
    validationSchema: FormValidationSchema,
    handleSubmit: async (values, { props, setFieldError }) => {

        try {
            const res = await StoreArticle(values);
            if (res.status === 200) {
                toast.success("The article was created successfully");
                //GetArticles;
                // Redirect to '/admin/articles' after successful creation
                //window.location.href = '/admin/articles';
                props.router.push('/admin/articles')
                
            }
        } catch (error) {
            if (error instanceof validationErrors) {
                Object.entries(error.messages).forEach(
                    ([key, value]) => setFieldError(key, value as string)
                );
                return;
            }
            console.log(error);
        }
    }
})(InnerCreateArticleForm);

export default CreateArticleForm;