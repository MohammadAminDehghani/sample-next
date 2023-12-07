import { useRouter } from "next/router";
import InnerCreateArticleForm from "@/app/components/admin/articles/innerCreateProductForm";
import { StoreArticleInterface } from "@/app/contracts/admin/articles";
import validationErrors from "@/app/exceptions/validationErrors";
import { withFormik } from "formik";
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { StoreArticle } from "@/app/services/article";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

const FormValidationSchema = yup.object({
    title: yup.string().min(4).max(255).required('Name is required'),
    price: yup.string().min(0),
    category: yup.number().integer(),
    description: yup.string().min(4).max(6000),
});

interface LoginFormProps {
    id?: string,
    user?: string,
    title?: string,
    slug?: string,
    body?: string,
    image?: object,
    tags?: string | null,
    viewCount?: number,
    commentCount?: number,
    categories?: string[],
    path?: string,
    router: AppRouterInstance
}
//const router = useRouter

const CreateArticleForm = withFormik<LoginFormProps, StoreArticleInterface>({
    mapPropsToValues: (props) => ({
        id: props.id ?? '',
        user: props.user ?? '',
        title: props.title ?? '',
        slug: props.slug ?? '',
        body: props.body ?? '',
        image: props.image ?? {},
        tags: props.tags ?? '',
        viewCount: props.viewCount ?? 0,
        commentCount: props.commentCount ?? 0,
        categories: props.categories ?? [],
        path: props.path ?? ''
    }),
    validationSchema: FormValidationSchema,
    handleSubmit: async (values, { props, setFieldError }) => {
        try {
            console.log('values', values)
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