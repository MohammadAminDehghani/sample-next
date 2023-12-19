import InnerCreateTagForm from "@/app/tools/components/admin/tags/innerCreateTagForm";
import { StoreTagInterface } from "@/app/tools/contracts/admin/tags";
import validationErrors from "@/app/tools/exceptions/validationErrors";
import { withFormik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import { GetTags, StoreTag } from "@/app/tools/services/db/tag";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { KeyedMutator } from "swr";
import { Dispatch, SetStateAction } from "react";

const FormValidationSchema = yup.object({
  name: yup.string().min(2).max(255).required("name is required"),
  description: yup.string().min(0).max(6000),
});

interface FormProps {
  id?: string;
  name?: string | undefined;
  description?: string;
  router: AppRouterInstance;
  tagsMutate: KeyedMutator<{
    tags: any;
    total_page?: any;
  }>;
  setShowCreateTag : Dispatch<SetStateAction<boolean>> ,
}
//const router = useRouter

const CreateTagForm = withFormik<FormProps, StoreTagInterface>({
  mapPropsToValues: (props) => ({
    id: props.id ?? "",
    name: props.name ?? "",
    description: props.description ?? "",
  }),
  validationSchema: FormValidationSchema,
  handleSubmit: async (values, { props, setFieldError, resetForm }) => {
    //console.log("values", values);
    try {
      const res = await StoreTag(values);
      if (res.status === 200) {
        toast.success("The tag was created successfully");
        props.tagsMutate();
        props.setShowCreateTag(true)
        //GetTags;
        // Redirect to '/admin/tags' after successful creation
        //window.location.href = '/admin/tags';
        props.router.push("/admin/tags");
        resetForm();
      }
    } catch (error) {
      if (error instanceof validationErrors) {
        Object.entries(error.messages).forEach(([key, value]) =>
          setFieldError(key, value as string)
        );
        return;
      }
      console.log(error);
    }
  },
})(InnerCreateTagForm);

export default CreateTagForm;
