import { LoginFormValuesInterfaceVerifyPhone } from "@/app/contracts/auth"
import { Form, FormikProps } from "formik";
import Input from "@/app/components/shared/form/input";

const InnerLoginFormVerifyPhone = (props: FormikProps<LoginFormValuesInterfaceVerifyPhone>) => {
    return (
        <Form className="w-50" >
            <div className="mb-4">
                <Input
                    // label="Phone number"
                    name="phone"
                    type="hidden"
                // inputClassName="form-control"
                />
            </div>

            <div className="mb-4">
                <Input
                    label="code"
                    name="code"
                    inputClassName="form-control"
                />
            </div>

            <button type="submit" className="btn btn-primary">
                Verify
            </button>
        </Form>
    )
}

export default InnerLoginFormVerifyPhone;