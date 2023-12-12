import InnerCreateCategoryForm from "@/app/tools/components/admin/categories/innerCreateCategoryForm";
import { StoreCategoryInterface } from "@/app/tools/contracts/admin/categories";
import validationErrors from "@/app/tools/exceptions/validationErrors";
import { withFormik } from "formik";
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { StoreCategory } from "@/app/tools/services/db/category";
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

const CreateCategoryForm = withFormik<LoginFormProps, StoreCategoryInterface>({
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
            const res = await StoreCategory(values);
            if (res.status === 200) {
                toast.success("The category was created successfully");
                //GetCategories;
                // Redirect to '/admin/categories' after successful creation
                //window.location.href = '/admin/categories';
                props.router.push('/admin/categories')
                
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
})(InnerCreateCategoryForm);

export default CreateCategoryForm;