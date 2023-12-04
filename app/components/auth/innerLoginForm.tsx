import { LoginFormValuesInterface } from "@/app/contracts/auth"
import { Form, FormikProps } from "formik";
import Input from "@/app/components/shared/form/input";

const InnerLoginForm = (props: FormikProps<LoginFormValuesInterface>) => {
    return (
        <Form className="w-50" >
            <div className="mb-4">
                <Input
                    label="Email Address"
                    name="email"
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
    )
}

export default InnerLoginForm;