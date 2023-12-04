import callApi from "../helpers/callApi";
import {
  CreateProductInterface,
  EditProductInterface,
} from "@/app/contracts/admin/products";

export async function GetProducts({ page = 1, per_page = 10 }) {
  let res = await callApi().get(`/products?page=${page}&per_page=${per_page}`);

  return { products: res?.data?.data, total_page: res?.data?.total_page };
}

export async function CreateProduct(values: CreateProductInterface) {
  return await callApi().post("/products/create", {
    ...values,
    body: values.description,
  });
}

export async function EditProduct(productId: number | string) {
  if (productId !== 'undefined') {
    let res = await callApi().get(`/products/${productId}`, {});
    return res?.data?.product;
  }
}

export async function UpdateProduct(values: EditProductInterface) {
  return await callApi().post(`/products/${values.id}/update`, {
    ...values,
    body: values.description,
  });
}

export async function DeleteProduct(productId: number) {
  return await callApi().post(`/products/${productId}/delete`, {});
}
