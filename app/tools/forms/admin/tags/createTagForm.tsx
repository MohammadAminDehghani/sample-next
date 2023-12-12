import InnerCreateTagForm from "@/app/tools/components/admin/tags/innerCreateTagForm";
import { StoreTagInterface } from "@/app/tools/contracts/admin/tags";
import validationErrors from "@/app/tools/exceptions/validationErrors";
import { withFormik } from "formik";
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { StoreTag } from "@/app/tools/services/db/tag";
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

const CreateTagForm = withFormik<LoginFormProps, StoreTagInterface>({
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
            const res = await StoreTag(values);
            if (res.status === 200) {
                toast.success("The tag was created successfully");
                //GetTags;
                // Redirect to '/admin/tags' after successful creation
                //window.location.href = '/admin/tags';
                props.router.push('/admin/tags')
                
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
})(InnerCreateTagForm);

export default CreateTagForm;