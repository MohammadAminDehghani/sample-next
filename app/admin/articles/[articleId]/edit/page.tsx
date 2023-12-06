"use client";

import useSWR from "swr";
import { EditProduct } from "@/app/services/product";
import { useRouter } from "next/navigation";
import EditProductForm from "@/app/forms/admin/products/editProductForm";
import AdminPanelLayout from "@/app/components/adminPanelLayout";
import CanAccess from "@/app/components/shared/canAccess";

const ProductEdid = ({ params }: any) => {
  const { data: product, error } = useSWR(`${params.productId}`, EditProduct);

  return (
    
      <CanAccess permissions="edit_product">
        {product && (
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
                    <EditProductForm product={product} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {product === undefined && (
          <div className="px-4 sm:px-6 lg:px-8">please wait...</div>
        )}
      </CanAccess>
    
  );
};

// ProductEdid.getLayout = (page) => (
//   <AdminPanelLayout pageName="products.create">{page}</AdminPanelLayout>
// );

export default ProductEdid;
