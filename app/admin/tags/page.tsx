"use client";

import Modal from "@/app/tools/components/shared/modal";
import { useRouter } from "next/navigation";
import CreateTagForm from "@/app/tools/forms/admin/tags/createTagForm";
import useSWR from "swr";
import Tag from "@/app/tools/models/tag";
import LoadingBox from "@/app/tools/components/shared/loadingBox";
import ReactCustomPaginate from "@/app/tools/components/shared/reactCutsomPaginate";
import EmptyList from "@/app/tools/components/shared/emptyList";
import TagListItem from "@/app/tools/components/admin/tags/tagListItem";
import { useSelector } from "react-redux";
import { selectUser } from "@/app/tools/store/auth";
import { GetTags } from "@/app/tools/services/db/tag";
import { useState } from "react";
import EditTagForm from "@/app/tools/forms/admin/tags/editTagForm";

interface Props {
  searchParams: {
    page: any;
    per_page: string;
  };
}

const AdminTags = ({ searchParams: { page, per_page } }: Props) => {
  const user = useSelector(selectUser);
  const router = useRouter();

  const [showCreateTag, setShowCreateTag] = useState(true);
  const [editableTag, setEditableTag] = useState<Tag | undefined>(undefined);

  //page === undefined ? router.push('/admin/tags?page=1') : ''
  //console.log("editableTag", editableTag);

  const { data, error, mutate } = useSWR(
    {
      url: "/admin/tags",
      page,
    },
    GetTags
  );

  const total_page = 1;

  const loadingTags = !data?.tags && !error;

  const onPageChangeHandler = ({ selected }: { selected: number }) => {
    router.push(`/admin/tags?page=${selected + 1}`);
  };

  // const setShowCreateTag = (show = true) => {
  //   router.push(`/admin/tags${show === true ? "?create-tag" : ""}`);
  // };

  return (
    <>
      {user.canAccess("add_new_tag") && (
        <Modal setShow={() => setShowCreateTag(false)}>
          <div className="p-4 inline-block w-full max-w-4xl mt-20 mb-20 ml-20 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg opacity-100 scale-100">
            <CreateTagForm
              router={router}
              tagsMutate={mutate}
              setShowCreateTag={setShowCreateTag}
            />
          </div>
        </Modal>
      )}

      <div className="px-4 sm:px-6 lg:px-8">
        {showCreateTag ? (
          <CreateTagForm
            router={router}
            tagsMutate={mutate}
            setShowCreateTag={setShowCreateTag}
          />
        ) : (
          <EditTagForm
            id="editTagForm"
            router={router}
            tag={editableTag}
            tagsMutate={mutate}
            setEditableTag={setEditableTag}
            setShowCreateTag={setShowCreateTag}
          />
        )}

        <div className="mt-8 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                {loadingTags ? (
                  <div className="p-5">
                    <LoadingBox />
                  </div>
                ) : data?.tags?.length > 0 ? (
                  <div className="p-5">
                    {data?.tags.map(
                      (tag: Tag) => (
                        <TagListItem
                          key={tag.id}
                          tag={tag}
                          tagsMutate={mutate}
                          //editableTag={editableTag}
                          setEditableTag={setEditableTag}
                          setShowCreateTag={setShowCreateTag}
                        />
                      )
                      // <table className="min-w-full divide-y divide-gray-300">
                      //   <thead className="bg-gray-50">
                      //     <tr>
                      //       <th
                      //         scope="col"
                      //         className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      //       >
                      //         Tag Number
                      //       </th>
                      //       <th
                      //         scope="col"
                      //         className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      //       >
                      //         Title
                      //       </th>
                      //       <th
                      //         scope="col"
                      //         className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      //       >
                      //         Description
                      //       </th>
                      //       <th
                      //         scope="col"
                      //         className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                      //       ></th>
                      //     </tr>
                      //   </thead>
                      //   <tbody className="divide-y divide-gray-200 bg-white">
                      //     {data?.tags.map((tag: Tag) => (
                      //       <TagListItem
                      //         key={tag.id}
                      //         tag={tag}
                      //         tagsMutate={mutate}
                      //         //editableTag={editableTag}
                      //         setEditableTag={setEditableTag}
                      //         setShowCreateTag={setShowCreateTag}
                      //       />
                      //     ))}
                      //   </tbody>
                      // </table>
                    )}
                  </div>
                ) : (
                  <EmptyList
                    title="Nothing to show!"
                    description="please add some tags to the list"
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

export default AdminTags;
