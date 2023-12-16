"use client";

import Modal from "@/app/tools/components/shared/modal";
import { useRouter } from "next/navigation";
import CreateCategoryForm from "@/app/tools/forms/admin/categories/createCategoryForm";
import useSWR from "swr";
import Category from "@/app/tools/models/category";
import LoadingBox from "@/app/tools/components/shared/loadingBox";
import ReactCustomPaginate from "@/app/tools/components/shared/reactCutsomPaginate";
import EmptyList from "@/app/tools/components/shared/emptyList";
import CategoryListItem from "@/app/tools/components/admin/categories/categoryListItem";
import { useSelector } from "react-redux";
import { selectUser } from "@/app/tools/store/auth";
import { GetCategories } from "@/app/tools/services/db/category";

interface Props {
  searchParams: {
    page: any;
    per_page: string;
  };
}

const AdminCategories = ({ searchParams: { page, per_page } }: Props) => {
  const user = useSelector(selectUser);
  const router = useRouter();

  //page === undefined ? router.push('/admin/categories?page=1') : ''

  const { data, error, mutate } = useSWR(
    {
      url: "/admin/categories",
      page,
    },
    GetCategories
  );

  const total_page = 1;

  const loadingCategories = !data?.categories && !error;

  const onPageChangeHandler = ({ selected }: { selected: number }) => {
    router.push(`/admin/categories?page=${selected + 1}`);
  };

  const setShowCreateCategory = (show = true) => {
    router.push(`/admin/categories${show === true ? "?create-category" : ""}`);
  };

  return (
    <>
      {user.canAccess("add_new_category") && (
        <Modal setShow={() => setShowCreateCategory(false)}>
          <div className="p-4 inline-block w-full max-w-4xl mt-20 mb-20 ml-20 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg opacity-100 scale-100">
            <CreateCategoryForm router={router} />
          </div>
        </Modal>
      )}

      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900">
              Categories List
            </h1>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            {!user.canAccess("add_new_category") && (
              <button
                // onClick={() => setShowAddCategory(true)}
                onClick={() => {
                  //setShowCreateCategory(true);
                  //router.push('/admin/products?create-product')
                  router.push("/admin/categories/create");
                }}
                type="submit"
                className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
              >
                add category
              </button>
            )}
          </div>
        </div>
        <div className="mt-8 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                {loadingCategories ? (
                  <div className="p-5">
                    <LoadingBox />
                  </div>
                ) : data?.categories?.length > 0 ? (
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                        >
                          Index
                        </th>
                        <th
                          scope="col"
                          className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                        >
                          Category Id
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Name
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Parent
                        </th>
                        <th
                          scope="col"
                          className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6"
                        >Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {data?.categories.map(
                        (category: Category, index: number) => (
                          <CategoryListItem
                            key={category.id}
                            index={index + 1}
                            category={category}
                            categoriesMutate={mutate}
                          />
                        )
                      )}
                    </tbody>
                  </table>
                ) : (
                  <EmptyList
                    title="Nothing to show!"
                    description="please add some categories to the list"
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

export default AdminCategories;
