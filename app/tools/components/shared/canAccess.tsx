
import React from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/app/tools/hooks/useAuth";
import User from "@/app/tools/models/user";

interface Props {
  children: React.ReactNode;
  permissions?: string;
}

const CanAccess = ({ children, permissions }: Props) => {


  // todo : felan vase inke kar nakone
  return <>{children}</>;




  
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
