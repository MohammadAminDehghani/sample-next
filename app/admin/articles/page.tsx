"use client";

import Modal from "@/app/tools/components/shared/modal";
import { useRouter } from "next/navigation";
import CreateArticleForm from "@/app/tools/forms/admin/articles/createArticleForm";
import useSWR from "swr";
import Article from "@/app/tools/models/article";
import LoadingBox from "@/app/tools/components/shared/loadingBox";
import ReactCustomPaginate from "@/app/tools/components/shared/reactCutsomPaginate";
import EmptyList from "@/app/tools/components/shared/emptyList";
import ArticleListItem from "@/app/tools/components/admin/articles/articleListItem";
import { useSelector } from "react-redux";
import { selectUser } from "@/app/tools/store/auth";
import { GetArticles } from "@/app/tools/services/db/article";
import { handleError } from "@/app/tools/utils/errorHandler";
//import { useRouter as nextRouter } from "next/router";


interface Props {
  searchParams: {
    page: any;
    per_page: string;
  };
}

const AdminArticles = ({ searchParams: { page, per_page } }: Props) => {
  const user = useSelector(selectUser);
  const router = useRouter();

  console.log('my user',user);
  //const nextRouterInstance = nextRouter();

  //page === undefined ? router.push('/admin/articles?page=1') : ''

  const { data, error, mutate } = useSWR(
    {
      url: "/admin/articles",
      page,
    },
    GetArticles
  );

  if (error) {
    handleError(error, router);
  }

  const total_page = 1;
  const loadingArticles = !data?.articles && !error;

  const onPageChangeHandler = ({ selected }: { selected: number }) => {
    router.push(`/admin/articles?page=${selected + 1}`);
  };

  const setShowCreateArticle = (show = true) => {
    router.push(`/admin/articles${show === true ? "?create-article" : ""}`);
  };

  // const checkLogin = (data:any) => {
  //   let status = data?.status;
  //   if (status !== 200 && status !==undefined){
  //     router.push('/auth/login');
  //   }
  // };


  // checkLogin(data);

  return (

    <>
      {user.canAccess("add_new_article") && (
        <Modal setShow={() => setShowCreateArticle(false)}>
          <div className="p-4 inline-block w-full max-w-4xl mt-20 mb-20 ml-20 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg opacity-100 scale-100">
            <CreateArticleForm router={router} />
          </div>
        </Modal>
      )}

      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900">
              Articles List
            </h1>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            {!user.canAccess("add_new_article") && (
              <button
                // onClick={() => setShowAddArticle(true)}
                onClick={() => {
                  //setShowCreateArticle(true);
                  //router.push('/admin/products?create-product')
                  router.push("/admin/articles/create");
                }}
                type="submit"
                className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
              >
                add article
              </button>
            )}
          </div>
        </div>
        <div className="mt-8 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                {loadingArticles ? (
                  <div className="p-5">
                    <LoadingBox />
                  </div>
                ) : data?.articles?.length > 0 ? (
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                        >
                          Article Number
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Title
                        </th>
                        {/* <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Description
                        </th> */}
                        <th
                          scope="col"
                          className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                        ></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {data?.articles.map((article: Article) => (
                        <ArticleListItem
                          key={article.id}
                          article={article}
                          articlesMutate={mutate}
                        />
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <EmptyList
                    title="Nothing to show!!!"
                    description="please add some articles to the list"
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

export default AdminArticles;
