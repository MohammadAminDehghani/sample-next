"use client";
import validationErrors from "@/app/tools/exceptions/validationErrors";
import {FilterProfessors} from "@/app/tools/services/db/professor";
import { withFormik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import Professor from "@/app/tools/models/professor";
import InnerFilterProfessorForm from "@/app/tools/components/admin/professors/innerFilterProfessorForm";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { KeyedMutator } from "swr";

const FormValidationSchema = yup.object({
  first_name: yup.string().max(255),
  last_name: yup.string().max(255),
  research_fields: yup.string().min(0).max(6000),
});

interface FormProps {
  professorsMutate: KeyedMutator<{
    professors: Professor[];
    total_page?: any;
  }>;
  router: AppRouterInstance;
  first_name?: string;
  last_name?: string;
  research_fields?: string;
}

const FilterProfessorForm = withFormik<FormProps, any>({
  mapPropsToValues: (props) => ({
    first_name: props?.first_name ?? '',
    last_name: props?.last_name ?? '',
    research_fields: props?.research_fields ?? ''
  }),
  validationSchema: FormValidationSchema,
  handleSubmit: async (values, { props, setFieldError }) => {

    try {
          // Fetch filtered data based on the form values
          const res = await FilterProfessors(values);
    
          // Pass the filtered professors data directly to mutate and avoid re-fetch
          props.professorsMutate(res, false); // `false` disables automatic re-fetch

          toast.success("Your search results are ready!");

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
})(InnerFilterProfessorForm);

export default FilterProfessorForm;
