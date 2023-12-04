"use client";

// next
import { useEffect } from "react";

//pakages
import { useCookies } from "react-cookie";

// my imports
import "bootstrap/dist/css/bootstrap.min.css";
import LoginFormVerifyPhone from "@/app/forms/auth/loginFormVerifyPhone";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import {
  selectPhoneVerifyToken,
  updatePhoneVerifyToken,
} from "@/app/store/auth";
import { useRouter } from "next/navigation";

const LoginVerify = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["login-token"]);
  // const token = cookies['login-token']
  const router = useRouter();
  const dispatch = useAppDispatch();
  const token = useAppSelector(selectPhoneVerifyToken);

  const clearPhoneVerifyToken = () => {
    dispatch(updatePhoneVerifyToken(undefined));
  };

  useEffect(() => {
    if (token === undefined) {
      router.push("/auth/login");
    }

    return () => {
      clearPhoneVerifyToken();
    };
  }, [token]);

  return (
    <div className="mt-5 vh-100 d-flex flex-column justify-content-center align-items-center">
      <div className="w-50 mb-4">
        <h2>Verify your phone number!</h2>
      </div>
      {/* <LoginForm setCookie={setCookie} /> */}
      {/* <LoginFormVerifyPhone setCookie={setCookie} token={token} /> */}
      <LoginFormVerifyPhone
        token={token}
        setCookie={setCookie}
        clearToken={clearPhoneVerifyToken}
        router={router}
      />
    </div>
  );
};

export default LoginVerify;
