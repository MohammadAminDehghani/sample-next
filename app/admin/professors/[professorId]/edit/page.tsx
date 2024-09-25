"use client";

import useSWR from "swr";
import { EditProfessor } from "@/app/tools/services/db/professor";
import { useRouter } from "next/navigation";
import EditProfessorForm from "@/app/tools/forms/admin/professors/editProfessorForm";
import CanAccess from "@/app/tools/components/shared/canAccess";

const ProfessorEdid = ({ params }: any) => {
  const { data: professor, error } = useSWR(`${params.professorId}`, EditProfessor);
  console.log('professor',professor)

  const router = useRouter()
  return (
      <CanAccess permissions="edit_professor">
        {professor && (
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
              <div className="sm:flex-auto">
                <h1 className="text-xl font-semibold text-gray-900">
                  create professors
                </h1>
              </div>
            </div>
            <div className="mt-8 flex flex-col">
              <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                  <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                    <EditProfessorForm router={router}  professor={professor} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {professor === undefined && (
          <div className="px-4 sm:px-6 lg:px-8">please wait...</div>
        )}
      </CanAccess>
    
  );
};


export default ProfessorEdid;
