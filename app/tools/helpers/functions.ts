import { useRouter } from "next/navigation";
import Router from "next/router";

export const redirectTo = (url: string) => {
    // const router = useRouter();
    // router.push(url);
    Router.push(url);
}