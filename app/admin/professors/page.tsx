"use client";

import Modal from "@/app/tools/components/shared/modal";
import { useRouter } from "next/navigation";
import CreateProfessorForm from "@/app/tools/forms/admin/professors/createProfessorForm";
import useSWR from "swr";
import Professor from "@/app/tools/models/professor";
import LoadingBox from "@/app/tools/components/shared/loadingBox";
import ReactCustomPaginate from "@/app/tools/components/shared/reactCutsomPaginate";
import EmptyList from "@/app/tools/components/shared/emptyList";
import ProfessorListItem from "@/app/tools/components/admin/professors/professorListItem";
import { useSelector } from "react-redux";
import { selectUser } from "@/app/tools/store/auth";
import { GetProfessors } from "@/app/tools/services/db/professor";
import { useState } from "react";
import EditProfessorForm from "@/app/tools/forms/admin/professors/editProfessorForm";
import FilterProfessorForm from "@/app/tools/forms/admin/professors/filterProfessorForm";

interface Props {
  searchParams: {
    page: any;
    per_page: string;
  };
}

const AdminProfessors = ({ searchParams: { page, per_page } }: Props) => {
  const user = useSelector(selectUser);
  const router = useRouter();

  const [showCreateProfessor, setShowCreateProfessor] = useState(true);
  const [editableProfessor, setEditableProfessor] = useState<
    Professor | undefined
  >(undefined);

  //page === undefined ? router.push('/admin/professors?page=1') : ''
  //console.log("editableProfessor", editableProfessor);

  const { data, error, mutate } = useSWR(
    {
      url: "/admin/professors",
      page,
    },
    GetProfessors
  );

  console.log(data);

  const total_page = 1;

  const loadingProfessors = !data?.professors && !error;

  const onPageChangeHandler = ({ selected }: { selected: number }) => {
    router.push(`/admin/professors?page=${selected + 1}`);
  };

  // const setShowCreateProfessor = (show = true) => {
  //   router.push(`/admin/professors${show === true ? "?create-professor" : ""}`);
  // };

  return (
    <>
      {user.canAccess("add_new_professor") && (
        <Modal setShow={() => setShowCreateProfessor(false)}>
          <div className="p-4 inline-block w-full max-w-4xl mt-20 mb-20 ml-20 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg opacity-100 scale-100">
            <CreateProfessorForm
              router={router}
              professorsMutate={mutate}
              setShowCreateProfessor={setShowCreateProfessor}
            />
          </div>
        </Modal>
      )}

      <div className="px-4 sm:px-6 lg:px-8">
        <FilterProfessorForm
          id={1}
          router={router}
          professor={editableProfessor}
          professorsMutate={mutate}
          setFilterableProfessor={setEditableProfessor}
          setShowCreateProfessor={setShowCreateProfessor}
        />

        <div className="mt-8 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                {loadingProfessors ? (
                  <div className="p-5">
                    <LoadingBox />
                  </div>
                ) : data?.professors?.length > 0 ? (
                  <div className="p-5">
                    {data?.professors.map((professor: Professor) => (
                      <>
                        <ProfessorListItem
                          key={professor.first_name}
                          professor={professor}
                          professorsMutate={mutate}
                          //editableProfessor={editableProfessor}
                          setEditableProfessor={setEditableProfessor}
                          setShowCreateProfessor={setShowCreateProfessor}
                        />
                      </>
                    ))}
                  </div>
                ) : (
                  <EmptyList
                    title="Nothing to show!"
                    description="please add some professors to the list"
                  />
                )}

                {total_page > 1 ? (
                  <div className="p-1 border-t border-gray-200">
                    <ReactCustomPaginate
                      onPageChangeHandler={onPageChangeHandler}
                      pageCount={total_page}
                      page={Number(page)}
                    />
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminProfessors;
