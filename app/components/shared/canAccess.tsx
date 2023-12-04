
import React from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/app/hooks/useAuth";
import User from "@/app/models/user";

interface Props {
  children: React.ReactNode;
  permissions?: string;
}

const CanAccess = ({ children, permissions }: Props) => {
  const router = useRouter();
  const { user : userData } = useAuth();
  let user = new User(userData);

  if (permissions) {
    if (! user.canAccess(permissions)) {
      router.push("/admin");
      return <span>Loading...</span>;
    }
  }
  return <>{children}</>;
}

export default CanAccess;
