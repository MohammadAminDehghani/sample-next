import { useRouter } from "next/router";
import InnerCreateProductForm from "@/app/components/admin/products/innerCreateProductForm";
import { CreateProductInterface } from "@/app/contracts/admin/products";
import validationErrors from "@/app/exceptions/validationErrors";
import { withFormik } from "formik";
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { CreateProduct, GetProducts } from "@/app/services/product";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

const FormValidationSchema = yup.object({
    title: yup.string().min(4).max(255).required('Name is required'),
    price: yup.string().min(0),
    category: yup.number().integer(),
    description: yup.string().min(4).max(6000),
});

interface LoginFormProps {
    // title?: string,
    // price?: number,
    // category?: number,
    // description?: string,
    router : AppRouterInstance
}
//const router = useRouter

const CreateProductForm = withFormik<LoginFormProps, CreateProductInterface>({
    mapPropsToValues: (props) => ({
        title: '',
        price: 0,
        category: 0,
        description: '',
        router: props.router
    }),
    validationSchema: FormValidationSchema,
    handleSubmit: async (values, { props, setFieldError }) => {
        try {
            const res = await CreateProduct(values);
            if (res.status === 200) {
                toast.success("The product was created successfully");
                GetProducts;
                // Redirect to '/admin/products' after successful creation
                //window.location.href = '/admin/products';
                props.router.push('/admin/products')
                
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
})(InnerCreateProductForm);

export default CreateProductForm;