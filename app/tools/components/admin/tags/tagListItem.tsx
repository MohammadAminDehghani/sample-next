import Tag from "@/app/tools/models/tag";
import React, { useState } from "react";
import DeleteConfirmation from "@/app/tools/components/shared/deleteConfirmation";
import { toast } from "react-toastify";
import validationErrors from "@/app/tools/exceptions/validationErrors";
import { DeleteTag } from "@/app/tools/services/db/tag";
import { KeyedMutator } from "swr";

interface Props {
  tag: Tag;
  tagsMutate: KeyedMutator<{
    tags: any;
    total_page?: any;
  }>;
}

export default function TagListItem({ tag, tagsMutate }: Props) {
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
      <tr>
        {showDeleteConfirmation && (
          <td className="hidden">
            <DeleteConfirmation
              title={`delete ${tag.title}`}
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
          {tag.title}
        </td>
        {/* <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          {tag.body}
        </td> */}
        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
          <a
            href={`/admin/tags/${tag.id}/edit`}
            className="bg-transparent hover:bg-amber-500 text-amber-600 font-semibold hover:text-white py-1 px-2 mx-1 border border-amber-500 hover:border-transparent rounded"
          >
            edit
          </a>
          <button
            onClick={() => setShowDeleteConfirmation(true)}
            className="bg-transparent hover:bg-red-500 text-red-500 font-semibold hover:text-white py-1 px-2 mx-1 border border-red-500 hover:border-transparent rounded"
          >
            delete
          </button>
        </td>
      </tr>
    </>
  );
}
