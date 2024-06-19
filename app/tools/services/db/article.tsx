import { number } from "yup";
import callApi from "../../helpers/callApi";
import {
  StoreArticleInterface,
  EditArticleInterface,
} from "@/app/tools/contracts/admin/articles";

import { useRouter } from "next/navigation";

export async function GetArticles() {
  //let res = await callApi().get(`/admin/articles?page=${page}&per_page=${per_page}`);

  let res = await callApi().get('/admin/articles')
  return { articles: res?.data } ;


  // let res = await callApi().get('/admin/articles').then((res) => {
  //   return { articles: res?.data };
  // })
  // .catch((error) => {
  //   console.log('there is an error to get articles [services.db.article.GetArticles]');
  //   console.error(error);
  // });;
  
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
