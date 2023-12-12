import callApi from "../../helpers/callApi";
import {
  StoreCategoryInterface,
  EditCategoryInterface,
} from "@/app/tools/contracts/admin/categories";

export async function GetCategories({ page = 1, per_page = 10 }) {
  //let res = await callApi().get(`/admin/categories?page=${page}&per_page=${per_page}`);
  let res = await callApi().get('/admin/categories');
  //return { categories: res?.data?.data, total_page: res?.data?.total_page };
  return { categories: res?.data };
}

export async function StoreCategory(values: StoreCategoryInterface) {
  console.log('values',values)
  return await callApi().post("/admin/categories", {
    ...values,
    body: values.body,
  });
}

export async function EditCategory(categoryId: string | string) {
  if (categoryId !== 'undefined') {
    let res = await callApi().get(`/admin/categories/${categoryId}/edit`, {});
    //console.log('res', res)
    return res?.data;
  }
}

export async function UpdateCategory(values: EditCategoryInterface) {
  return await callApi().post(`/admin/categories/${values.id}/update`, {
    ...values,
    body: values.body,
  });
}

export async function DeleteCategory(categoryId: string) {
  return await callApi().delete(`/admin/categories/${categoryId}/delete`, {});
}
