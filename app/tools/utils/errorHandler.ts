// app/tools/utils/errorHandler.ts
import { toast } from "react-toastify";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
//import { AppRouterInstance } from "next/router";

export const handleError = (error: any, router: AppRouterInstance) => {
  console.error('An error occurred:', error);

  if (error.response) {
    switch (error.response.status) {
      case 401:
        toast.error('Unauthorized access, redirecting to login.');
        //router.push('/auth/login');
        break;
      case 403:
        toast.error('Forbidden access.');
        router.push('/errors/403');
        break;
      case 404:
        toast.error('Page not found.');
        //router.push('/error/404');
        break;
      case 500:
        toast.error('Internal server error.');
        //router.push('/error/500');
        break;
      default:
        toast.error('An unexpected error occurred.');
        //router.push('/error');
    }
  } else if (error.request) {
    toast.error('Network error, please try again.');
    //router.push('/error/network');
  } else {
    toast.error('An unexpected error occurred.');
    //router.push('/error');
  }
};
