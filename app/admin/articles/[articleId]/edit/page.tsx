"use client";

import useSWR from "swr";
import { EditArticle } from "@/app/services/article";
import { useRouter } from "next/navigation";
import EditArticleForm from "@/app/forms/admin/articles/editArticleForm";
import AdminPanelLayout from "@/app/components/adminPanelLayout";
import CanAccess from "@/app/components/shared/canAccess";

const ArticleEdid = ({ params }: any) => {
  const { data: article, error } = useSWR(`${params.articleId}`, EditArticle);
  console.log('article',article)

  const router = useRouter()
  return (
      <CanAccess permissions="edit_article">
        {article && (
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
              <div className="sm:flex-auto">
                <h1 className="text-xl font-semibold text-gray-900">
                  create articles
                </h1>
              </div>
            </div>
            <div className="mt-8 flex flex-col">
              <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                  <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                    <EditArticleForm router={router}  article={article} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {article === undefined && (
          <div className="px-4 sm:px-6 lg:px-8">please wait...</div>
        )}
      </CanAccess>
    
  );
};


export default ArticleEdid;
