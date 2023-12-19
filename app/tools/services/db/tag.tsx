import callApi from "../../helpers/callApi";
import {
  StoreTagInterface,
  EditTagInterface,
} from "@/app/tools/contracts/admin/tags";

export async function GetTags({ page = 1, per_page = 10 }) {
  //let res = await callApi().get(`/admin/tags?page=${page}&per_page=${per_page}`);
  let res = await callApi().get('/admin/tags');
  //return { tags: res?.data?.data, total_page: res?.data?.total_page };
  return { tags: res?.data };
}

export async function StoreTag(values: StoreTagInterface) {
  console.log('values',values)
  return await callApi().post("/admin/tags", {
    ...values,
    //body: values.body,
  });
}

export async function EditTag(tagId: string | string) {
  if (tagId !== 'undefined') {
    let res = await callApi().get(`/admin/tags/${tagId}/edit`, {});
    //console.log('res', res?.data)
    return res?.data;
  }
}

export async function UpdateTag(values: EditTagInterface) {
  return await callApi().post(`/admin/tags/${values.id}/update`, {
    ...values,
    //description: values.description,
  });
}

export async function DeleteTag(tagId: string) {
  return await callApi().delete(`/admin/tags/${tagId}/delete`, {});
}
