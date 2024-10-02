export interface StoreProfessorInterface {
    id:number;
    first_name:string | null;
    last_name:string | null;
    affiliation:string | null;
    gender:string | null;
    email:string | null;
    phone:string | null;
    url:string | null;
    url_response:number | null;
    address:string | null;
    department_id:string | null;
}

export interface EditProfessorInterface {
    _id:string;
    first_name:string | null;
    last_name:string | null;
    affiliation:string | null;
    gender:string | null;
    email:string | null;
    phone:string | null;
    url:string | null;
    url_response:number | null;
    address:string | null;
}

export interface FilterProfessorInterface {
    _id:string;
    first_name:string | null;
    last_name:string | null;
    affiliation:string | null;
    gender:string | null;
    email:string | null;
    phone:string | null;
    url:string | null;
    url_response:number | null;
    address:string | null;
}