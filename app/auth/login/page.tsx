"use client";

//pakages
import { useCookies } from "react-cookie";

// my imports
import "bootstrap/dist/css/bootstrap.min.css";
import LoginForm from "@/app/tools/forms/auth/loginForm";
import { useAppDispatch, useAppSelector } from "@/app/tools/hooks";
import {
  selectVerifyToken,
  updatePhoneVerifyToken,
  updateUser,
  updateVerifyToken,
} from "@/app/tools/store/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { UserType } from "@/app/tools/models/user";

const Login = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["login-token"]);

  const router = useRouter();
  const dispatch = useAppDispatch();
  const token = useAppSelector(selectVerifyToken);

  const setVerifyToken = (token: string) => {
    dispatch(updateVerifyToken(token));
  };

  const setUser = (user: UserType) => {
    dispatch(updateUser(user));
  };

  const clearVerifyToken = () => {
    dispatch(updateVerifyToken(undefined));
  };

  useEffect(() => {
    if (token === undefined) {
      router.push("/auth/login");
    }

    return () => {
      clearVerifyToken();
    };
  }, [token]);

  return (
    <div className="mt-5 vh-100 d-flex flex-column justify-content-center align-items-center">
      <div className="w-50 mb-4">
        <h2>Login page!</h2>
      </div>
      <LoginForm
        setToken={setVerifyToken}
        setCookie={setCookie}
        router={router}
        clearToken={clearVerifyToken}
        setUser ={setUser}
      />
      {/* <LoginFormPhone setToken={setPhoneVerifyToken} setCookie={setCookie} router={router} /> */}
    </div>
  );
};

export default Login;
