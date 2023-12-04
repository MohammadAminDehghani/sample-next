import { EditProductInterface } from "@/app/contracts/admin/products";
import validationErrors from "@/app/exceptions/validationErrors";
import callApi from "@/app/helpers/callApi";
import { CreateProduct, EditProduct, GetProducts, UpdateProduct } from "@/app/services/product";
import { withFormik } from "formik";
import Router from "next/router";
import * as yup from 'yup';
import { toast } from 'react-toastify';
import Product from "@/app/models/product";
import InnerEditProductForm from "@/app/components/admin/products/innerEditProductForm";

const FormValidationSchema = yup.object({
    title: yup.string().min(4).max(255).required('Name is required'),
    price: yup.string().min(0),
    category: yup.number().integer(),
    description: yup.string().min(4).max(6000),
});

interface FormProps {
    // title: string,
    // price: number,
    // category: number,
    // description: string,
    product: Product
}

const EditProductForm = withFormik<FormProps, EditProductInterface>({
    mapPropsToValues: ({product}) => ({
        id: product.id ,
        title: product.title ?? '',
        price: product.price ?? 0,
        category: product.category ?? 0,
        description: product.body,
    }),
    validationSchema: FormValidationSchema,
    handleSubmit: async (values, { props, setFieldError }) => {
       
        try {

            const res = await UpdateProduct(values)
            Router.push('/admin/products')
            // if (res.status === 200) {
            //     Router.push('/admin/products')
            // }
            toast.success("the product updated successfully");
            //GetProducts;

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
})(InnerEditProductForm)

export default EditProductForm;