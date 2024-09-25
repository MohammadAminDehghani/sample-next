import callApi from "../../helpers/callApi";
import {
  StoreProfessorInterface,
  EditProfessorInterface,
  FilterProfessorInterface,
} from "@/app/tools/contracts/admin//professors";

//export async function GetProfessors({ page = 1, per_page = 10 }) {
export async function GetProfessors() {
  //let res = await callApi().get(`/admin/professors?page=${page}&per_page=${per_page}`);
  let res = await callApi().get('/admin/professors');

  //return { professors: res?.data?.data, total_page: res?.data?.total_page };
  return { professors: res?.data };
}

export async function FilterProfessor(values: FilterProfessorInterface) {
  let res = await callApi().post(`/admin/professors/filter`, {
    ...values,
    //description: values.description,
  });

  console.log(res)
  return res;
}

export async function ShowProfessor(professorId: string | string) {
  if (professorId !== 'undefined') {
    let res = await callApi().get(`/admin/professors/${professorId}/show`, {});
    //console.log('res', res?.data)
    return res?.data;
  }
}

export async function StoreProfessor(values: StoreProfessorInterface) {
  console.log('values',values)
  return await callApi().post("/admin/professors", {
    ...values,
    //body: values.body,
  });
}

export async function EditProfessor(professorId: string | string) {
  if (professorId !== 'undefined') {
    let res = await callApi().get(`/admin/professors/${professorId}/edit`, {});
    //console.log('res', res?.data)
    return res?.data;
  }
}

export async function UpdateProfessor(values: EditProfessorInterface) {
  return await callApi().post(`/admin/professors/${values.id}/update`, {
    ...values,
    //description: values.description,
  });
}

export async function DeleteProfessor(professorId: number) {
  return await callApi().delete(`/admin/professors/${professorId}/delete`, {});
}

export async function SearchProfessors(query: string) {
    //let res = await callApi().get(`/admin/professors?page=${page}&per_page=${per_page}`);
    let res = await callApi().get(`/admin/professors/${query}/search`, {});
    //return { professors: res?.data?.data, total_page: res?.data?.total_page };
    return { professors: res?.data };
}
