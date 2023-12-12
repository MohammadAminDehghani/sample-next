"use client";

import useSWR from "swr";
import { EditTag } from "@/app/tools/services/db/tag";
import { useRouter } from "next/navigation";
import EditTagForm from "@/app/tools/forms/admin/tags/editTagForm";
import CanAccess from "@/app/tools/components/shared/canAccess";

const TagEdid = ({ params }: any) => {
  const { data: tag, error } = useSWR(`${params.tagId}`, EditTag);
  console.log('tag',tag)

  const router = useRouter()
  return (
      <CanAccess permissions="edit_tag">
        {tag && (
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
              <div className="sm:flex-auto">
                <h1 className="text-xl font-semibold text-gray-900">
                  create tags
                </h1>
              </div>
            </div>
            <div className="mt-8 flex flex-col">
              <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                  <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                    <EditTagForm router={router}  tag={tag} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {tag === undefined && (
          <div className="px-4 sm:px-6 lg:px-8">please wait...</div>
        )}
      </CanAccess>
    
  );
};


export default TagEdid;
