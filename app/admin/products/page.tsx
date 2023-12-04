"use client";

import { useEffect, useState } from "react";
import AdminPanelLayout from "@/app/components/adminPanelLayout";
import Modal from "@/app/components/shared/modal";
import { useRouter } from "next/navigation";
import CreateProductForm from "@/app/forms/admin/products/createProductForm";
import useSWR from "swr";
import { GetProducts } from "@/app/services/product";
import Product from "@/app/models/product";
import LoadingBox from "@/app/components/shared/loadingBox";
import ReactCustomPaginate from "@/app/components/shared/reactCutsomPaginate";
import EmptyList from "@/app/components/shared/emptyList";
import ProductListItem from "@/app/components/admin/products/productListItem";
import { useSelector } from "react-redux";
import { selectUser } from "@/app/store/auth";

interface Props {
  searchParams: {
    page: any;
    per_page: string;
  };
}


const AdminProducts = ({
  searchParams: { page, per_page },
}: Props) => {
    
  const user = useSelector(selectUser);
  const router = useRouter();

  page === undefined ? router.push('/admin/products?page=1') : ''

  // const { page: queryPage } = router.query;
  const { data, error, mutate } = useSWR(
    {
      url: "/admin/products",
      page,
    },
    GetProducts
  );
  const products = data?.products;
  const total_page = data?.total_page;

  // useEffect(() => {
  //   if (queryPage !== undefined && typeof queryPage === "string")
  //     setPage(parseInt(queryPage));
  // }, [queryPage]);

  const loadingProducts = !products && !error;

  const onPageChangeHandler = ({ selected }: { selected: number }) => {
    router.push(`/admin/products?page=${selected + 1}`);
  };

  const setShowCreateProduct = (show = true) => {
    router.push(`/admin/products${show === true ? "?create-product" : ""}`);
  };

  return (
    <>
      {user.canAccess("add_new_product") &&
        // "create-product" in router.query && 
        (
          <Modal setShow={() => setShowCreateProduct(false)}>
            <div className="p-4 inline-block w-full max-w-4xl mt-20 mb-20 ml-20 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg opacity-100 scale-100">
              <CreateProductForm router={router}   />
            </div>
          </Modal>
        )}

      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900">
              Products List
            </h1>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            {user.canAccess("add_new_product") && (
              <button
                // onClick={() => setShowAddProduct(true)}
                onClick={() => {
                  setShowCreateProduct(true);
                  //router.push('/admin/products?create-product')
                }}
                type="submit"
                className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
              >
                add product
              </button>
            )}
          </div>
        </div>
        <div className="mt-8 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                {loadingProducts ? (
                  <div className="p-5">
                    <LoadingBox />
                  </div>
                ) : products?.length > 0 ? (
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                        >
                          Product Number
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Title
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Description
                        </th>
                        <th
                          scope="col"
                          className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                        ></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {products.map((product: Product) => (
                        <ProductListItem
                          key={product.id}
                          product={product}
                          productsMutate={mutate}
                        />
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <EmptyList
                    title="Nothing to show!"
                    description="please add a some product"
                  />
                )}

                {total_page > 1 ? (
                  <div className="p-1 border-t border-gray-200">
                    <ReactCustomPaginate
                      onPageChangeHandler={onPageChangeHandler}
                      pageCount={total_page}
                      page={Number(page)}
                    />
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};


export default AdminProducts;
