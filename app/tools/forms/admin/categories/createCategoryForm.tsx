import InnerCreateCategoryForm from "@/app/tools/components/admin/categories/innerCreateCategoryForm";
import { StoreCategoryInterface } from "@/app/tools/contracts/admin/categories";
import validationErrors from "@/app/tools/exceptions/validationErrors";
import { withFormik } from "formik";
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { StoreCategory } from "@/app/tools/services/db/category";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

const FormValidationSchema = yup.object({
    name: yup.string().min(2).max(255).required('Name is required'),
    description: yup.string().min(0).max(6000),
    // parent: yup.string(),
});

interface FormProps {
    id?: string;
    user?: string;
    name?: string;
    description?: string;
    parent?: string | null;
    router: AppRouterInstance
}
//const router = useRouter

const CreateCategoryForm = withFormik<FormProps, StoreCategoryInterface>({
    mapPropsToValues: (props) => ({
        id: props.id ?? '',
        user: props.user ?? '',
        name: props.name ?? '',
        description: props.description ?? '',
        parent: props.parent ?? '',

    }),
    validationSchema: FormValidationSchema,
    handleSubmit: async (values, { props, setFieldError }) => {
        console.log('values ghable', values);
        values.parent === '' ? values.parent = null : values.parent;
        console.log('test', 'qqqqqqqqqqqqq');
        console.log('values', values);
        console.log('props', props);
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