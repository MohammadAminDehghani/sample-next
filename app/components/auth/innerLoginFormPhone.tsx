import { Form, FormikProps } from "formik";
import Input from "@/app/components/shared/form/input";
import { LoginFormValuesInterfacePhone } from "@/app/contracts/auth";

const InnerLoginFormPhone = (
  props: FormikProps<LoginFormValuesInterfacePhone>
) => {
  return (
    <Form className="w-50">
      <div className="mb-4">
        <Input
          label="Phone number"
          name="phone"
          inputClassName="form-control"
        />
      </div>

      <div className="mb-4">
        <Input
          label="Password"
          name="password"
          type="password"
          inputClassName="form-control"
        />
      </div>

      <button type="submit" className="btn btn-primary">
        login
      </button>
    </Form>
  );
};

export default InnerLoginFormPhone;
