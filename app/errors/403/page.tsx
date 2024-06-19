"use client";

import * as React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import MyButton from "@/app/tools/components/shared/buttons/infoButtons";
import { useRouter } from "next/navigation";
//import "./styles.css";

const Error403 = () => {
  const router = useRouter();

  return (
    <>
      <div className="container">
        <div className="my-5">
          <div className="row h-100">
            <div className="col-md-2"></div>
            <div className="col-md-8">
              <div className="card p-5 shadow-sm" style={{height:'80vh'}}>
                <h1>Forbiden!</h1>
                <p>you don't have access to this page.</p>
                <img src="/images/error-403.webp" alt="" style={{width:'auto', height:'50vh'}} />
                <div className="row">
                  <div className="col">
                    <MyButton
                      title="Home"
                      colorSet={"red"}
                      className="w-100"
                      onClick={() => {router.push("/")}}
                    ></MyButton>
                  </div>
                  <div className="col">
                    <MyButton
                      title="login"
                      colorSet={"blue"}
                      className="w-100"
                      onClick={() => {router.push("/auth/login")}}
                    ></MyButton>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-2"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Error403;
