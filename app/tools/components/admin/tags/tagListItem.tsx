import Tag from "@/app/tools/models/tag";
import React, { useState } from "react";
import DeleteConfirmation from "@/app/tools/components/shared/deleteConfirmation";
import { toast } from "react-toastify";
import validationErrors from "@/app/tools/exceptions/validationErrors";
import { DeleteTag } from "@/app/tools/services/db/tag";
import { KeyedMutator } from "swr";
import { Dispatch, SetStateAction } from "react";

interface Props {
  tag: Tag;
  setEditableTag: Dispatch<SetStateAction<undefined | Tag>>;
  setShowCreateTag: Dispatch<SetStateAction<boolean>>;

  tagsMutate: KeyedMutator<{
    tags: any;
    total_page?: any;
  }>;
}

export default function TagListItem({
  tag,
  tagsMutate,
  setEditableTag,
  setShowCreateTag,
}: Props) {
  const [showDeleteConfirmation, setShowDeleteConfirmation] =
    useState<boolean>(false);

  const handleDeleteConfirmation = async (tag: Tag) => {
    try {
      await DeleteTag(tag.id);
      await tagsMutate();
      toast.success("The tag deleted successfully");
      setShowDeleteConfirmation(false);
    } catch (error) {
      if (error instanceof validationErrors) {
        Object.entries(error.messages).forEach(([key, value]) =>
          toast.error(value as string)
        );
        return;
      }
      toast.error("The tag can't delete");
      console.log(error);
    }
  };

  return (
    <>
      {showDeleteConfirmation && (
        <div className="hidden">
          <DeleteConfirmation
            title={`delete ${tag.name}`}
            description="Are you sure you want to delete?"
            handleCancel={() => setShowDeleteConfirmation(false)}
            handleTrue={() => handleDeleteConfirmation(tag)}
          />
        </div>
      )}
      <div className="ml-4 my-1 text-xs inline-flex items-center font-bold leading-sm uppercase px-3 py-1 rounded-full bg-white text-gray-700 border">
        {tag.name}
        <button
          onClick={() => {
            setShowCreateTag(false);
            setEditableTag(tag);
            window.scrollTo({ top: 20, behavior: "smooth" });
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-4 h-4 ml-5"
            color="#f59e0b"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
            />
          </svg>
        </button>
        <button onClick={() => setShowDeleteConfirmation(true)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4 ml-5"
            color="#dc2626"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            />
          </svg>
        </button>
      </div>
      {/* <tr>
        {showDeleteConfirmation && (
          <td className="hidden">
            <DeleteConfirmation
              title={`delete ${tag.name}`}
              description="Are you sure you want to delete?"
              handleCancel={() => setShowDeleteConfirmation(false)}
              handleTrue={() => handleDeleteConfirmation(tag)}
            />
          </td>
        )}
        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
          {tag.id}
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          {tag.name}
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          {tag.description}
        </td>
        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
          <button
            //href={`/admin/tags/${tag.id}/edit`}
            onClick={() => {
              setShowCreateTag(false);
              setEditableTag(tag);
              window.scrollTo({ top: 20, behavior: "smooth" });
            }}
            className="bg-transparent hover:bg-amber-500 text-amber-600 font-semibold hover:text-white py-1 px-2 mx-1 border border-amber-500 hover:border-transparent rounded"
          >
            edit
          </button>
          <button
            onClick={() => setShowDeleteConfirmation(true)}
            className="bg-transparent hover:bg-red-500 text-red-500 font-semibold hover:text-white py-1 px-2 mx-1 border border-red-500 hover:border-transparent rounded"
          >
            delete
          </button>
        </td>
      </tr> */}
    </>
  );
}
