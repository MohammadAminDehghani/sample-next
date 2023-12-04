import { RegisterFormValuesInterfacePhone } from "@/app/contracts/auth";
import Input from "@/app/components/shared/form/input";
import { Form, FormikProps } from "formik";


const InnerRegisterFormPhone = (props: FormikProps<RegisterFormValuesInterfacePhone>) => {
    return (
        <Form className="w-50">
            <div className="mb-4">
                <Input
                    label="Your Name"
                    name="name"
                    inputClassName="form-control"
                />
            </div>

            <div className="mb-4">
                <Input
                    label="Phone Number"
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
                submit
            </button>
        </Form>
    )
}

export default InnerRegisterFormPhone;