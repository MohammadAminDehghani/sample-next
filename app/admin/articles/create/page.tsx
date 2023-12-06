"use client";

import { useSelector } from "react-redux";
import CreateProductForm from "@/app/forms/admin/products/createProductForm";
import { selectUser } from "@/app/store/auth";
import { useRouter } from "next/navigation";
import CanAccess from "@/app/components/shared/canAccess";

const ProductCreate = () => {
  const router = useRouter()
  const user = useSelector(selectUser);

  return (
    <CanAccess permissions="add_new_product">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900">
              create products
            </h1>
          </div>
        </div>
        <div className="mt-8 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <CreateProductForm router={router} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </CanAccess>
  );
};

// ProductCreate.getLayout = (page) => (
//   <AdminPanelLayout pageName="products.create">{page}</AdminPanelLayout>
// );

export default ProductCreate;
