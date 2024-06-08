"use client";

import "bootstrap/dist/css/bootstrap.min.css";
import RegisterForm from "@/app/tools/forms/auth/registerForm";
import RegisterFormPhone from "@/app/tools/forms/auth/registerFormPhone";
import { useRouter } from "next/navigation";

const Register = () => {

  const router = useRouter();
  return (
    <div className="mt-5 vh-100 d-flex flex-column justify-content-center align-items-center">
      <div className="w-50 mb-4">
        <h2>Register page!</h2>
      </div>
      <RegisterForm router = {router} />
      {/* <RegisterFormPhone /> */}
    </div>
  );
};

export default Register;
