import Product from "@/app/models/product";
import React, { FC, useState } from "react";
import DeleteConfirmation from "../../shared/deleteConfirmation";
import { toast } from "react-toastify";
import validationErrors from "@/app/exceptions/validationErrors";
import { DeleteProduct } from "@/app/services/product";
import { KeyedMutator } from "swr";

interface Props {
  product: Product;
  productsMutate: KeyedMutator<{
    products: any;
    total_page: any;
  }>;
}

export default function ProductListItem({ product, productsMutate }: Props) {
  const [showDeleteConfirmation, setShowDeleteConfirmation] =
    useState<boolean>(false);

  const handleDeleteConfirmation = async (product: Product) => {
    try {

      await DeleteProduct(product.id);
      await productsMutate();
      toast.success("The product deleted successfully");
      setShowDeleteConfirmation(false);

    } catch (error) {
      if (error instanceof validationErrors) {
        Object.entries(error.messages).forEach(([key, value]) =>
          toast.error(value as string)
        );
        return;
      }
      toast.success("The product can't delete");
      console.log(error);
    }
  };

  return (
    <>
      <tr>
        {showDeleteConfirmation && (
          <td className="hidden">
            <DeleteConfirmation
              title={`delete ${product.title}`}
              description="Are you sure you want to delete?"
              handleCancel={() => setShowDeleteConfirmation(false)}
              handleTrue={() => handleDeleteConfirmation(product)}
            />
          </td>
        )}
        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
          {product.id}
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          {product.title}
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          {product.body}
        </td>
        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-left text-sm font-medium sm:pr-6">
          <a
            href={`/admin/products/${product.id}/edit`}
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
