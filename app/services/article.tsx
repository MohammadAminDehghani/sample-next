import callApi from "../helpers/callApi";
import {
  StoreArticleInterface,
  EditArticleInterface,
} from "@/app/contracts/admin/articles";

export async function GetArticles({ page = 1, per_page = 10 }) {
  //let res = await callApi().get(`/admin/articles?page=${page}&per_page=${per_page}`);
  let res = await callApi().get('/admin/articles');
  console.log(res);
  //return { articles: res?.data?.data, total_page: res?.data?.total_page };
  return { articles: res?.data };
}

export async function StoreArticle(values: StoreArticleInterface) {
  console.log('values',values)
  return await callApi().post("/admin/articles", {
    ...values,
    body: values.body,
  });
}

export async function EditArticle(articleId: number | string) {
  if (articleId !== 'undefined') {
    let res = await callApi().get(`/admin/articles/${articleId}`, {});
    return res?.data?.article;
  }
}

export async function UpdateArticle(values: EditArticleInterface) {
  return await callApi().post(`/admin/articles/${values.id}/update`, {
    ...values,
    body: values.body,
  });
}

export async function DeleteArticle(articleId: string) {
  return await callApi().delete(`/admin/articles/${articleId}/delete`, {});
}
