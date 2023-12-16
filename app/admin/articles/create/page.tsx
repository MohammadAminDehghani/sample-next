"use client";

import { useRouter } from "next/navigation";
import CreateArticleForm from "@/app/tools/forms/admin/articles/createArticleForm";
import useSWR from "swr";
import { GetCategories } from "@/app/tools/services/db/category";

const ProductCreate = () => {
  const router = useRouter();


  // const { data , error, mutate } = useSWR(
  //   {},
  //   GetCategories
  // );

  // console.log(data?.categories);


  //const user = useSelector(selectUser);
  {
    /* <CanAccess permissions="add_new_product"> */
  }

  {
    /* </CanAccess> */
  }
  return (
    <>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900">
              create article
            </h1>
          </div>
        </div>
        <div className="mt-8 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <CreateArticleForm router={router} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCreate;
