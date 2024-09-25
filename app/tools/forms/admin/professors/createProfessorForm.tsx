import InnerCreateProfessorForm from "@/app/tools/components/admin/professors/innerCreateProfessorForm";
import { StoreProfessorInterface } from "@/app/tools/contracts/admin/professors";
import validationErrors from "@/app/tools/exceptions/validationErrors";
import { withFormik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import { GetProfessors, StoreProfessor } from "@/app/tools/services/db/professor";
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
  professorsMutate: KeyedMutator<{
    professors: any;
    total_page?: any;
  }>;
  setShowCreateProfessor : Dispatch<SetStateAction<boolean>> ,
}
//const router = useRouter

const CreateProfessorForm = withFormik<FormProps, StoreProfessorInterface>({
  //TODO check
  // mapPropsToValues: (props) => ({
  //   id: props.id ?? "",
  //   name: props.name ?? "",
  //   description: props.description ?? "",
  // }),
  validationSchema: FormValidationSchema,
  handleSubmit: async (values, { props, setFieldError, resetForm }) => {
    //console.log("values", values);
    try {
      const res = await StoreProfessor(values);
      if (res.status === 200) {
        toast.success("The professor was created successfully");
        props.professorsMutate();
        props.setShowCreateProfessor(true)
        //GetProfessors;
        // Redirect to '/admin/professors' after successful creation
        //window.location.href = '/admin/professors';
        props.router.push("/admin/professors");
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
})(InnerCreateProfessorForm);

export default CreateProfessorForm;
