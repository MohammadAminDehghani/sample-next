import { NextPageWithLayout } from "../../_app";
import { useEffect, useState } from "react";
import AdminPanelLayout from "@/app/components/adminPanelLayout";
import Modal from "@/app/components/shared/modal";
import { useRouter } from "next/router";
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

const AdminProducts: NextPageWithLayout = () => {
  const [page, setPage] = useState(1);
  const user = useSelector(selectUser);
  const router = useRouter();

  const { page: queryPage } = router.query;
  const { data, error, mutate } = useSWR(
    {
      url: "/admin/products",
      page,
    },
    GetProducts
  );
  const products = data?.products;
  const total_page = data?.total_page;

  useEffect(() => {
    if (queryPage !== undefined && typeof queryPage === "string")
      setPage(parseInt(queryPage));
  }, [queryPage]);

  const loadingProducts = !products && !error;

  const onPageChangeHandler = ({ selected }: { selected: number }) => {
    router.push(`/admin/products?page=${selected + 1}`);
  };

  const setShowCreateProduct = (show = true) => {
    router.push(`/admin/products${show === true ? "?create-product" : ""}`);
  };

  // useEffect(() => {
  //   setInterval(() => {
  //     setLoading(false);
  //   }, 1500);
  // }, []);

  // if (loading)
  //   return (
  //     <div>
  //       <div role="status">
  //         <svg
  //           aria-hidden="true"
  //           className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
  //           viewBox="0 0 100 101"
  //           fill="none"
  //           xmlns="http://www.w3.org/2000/svg"
  //         >
  //           <path
  //             d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
  //             fill="currentColor"
  //           />
  //           <path
  //             d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
  //             fill="currentFill"
  //           />
  //         </svg>
  //         <span className="sr-only">Loading...</span>
  //       </div>
  //     </div>
  //   );

  return (
    <>
      {user.canAccess("add_new_product") &&
        "create-product" in router.query && (
          <Modal setShow={() => setShowCreateProduct(false)}>
            <div className="p-4 inline-block w-full max-w-4xl mt-20 mb-20 ml-20 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg opacity-100 scale-100">
              <CreateProductForm router={router} refresh = {true} />
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
                      page={page}
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

AdminProducts.getLayout = (page) => (
  <AdminPanelLayout pageName="products">{page}</AdminPanelLayout>
);

export default AdminProducts;
