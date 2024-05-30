import callApi from "../../helpers/callApi";
import {
  StoreArticleInterface,
  EditArticleInterface,
} from "@/app/tools/contracts/admin/articles";

export async function GetArticles({ page = 1, per_page = 10 }) {
  //let res = await callApi().get(`/admin/articles?page=${page}&per_page=${per_page}`);
  let res = await callApi().get('/admin/articles').then((res) => {
    console.log(50);
    console.log(res?.data);
    return { articles: res?.data };
  })
  .catch((error) => {
    console.log(60);
    console.error(error);
  });;
  //return { articles: res?.data?.data, total_page: res?.data?.total_page };
  
}

export async function StoreArticle(values: StoreArticleInterface) {
  console.log('values',values)
  return await callApi().post("/admin/articles", {
    ...values,
    body: values.body,
  });
}

export async function EditArticle(articleId: string | string) {
  if (articleId !== 'undefined') {
    let res = await callApi().get(`/admin/articles/${articleId}/edit`, {});
    //console.log('res', res?.data)
    return res?.data;
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
