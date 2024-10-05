"use client";


import { useRouter } from "next/navigation";
import useSWR from "swr";
import Professor from "@/app/tools/models/professor";
import LoadingBox from "@/app/tools/components/shared/loadingBox";
import ReactCustomPaginate from "@/app/tools/components/shared/reactCutsomPaginate";
import EmptyList from "@/app/tools/components/shared/emptyList";
import ProfessorListItem from "@/app/tools/components/admin/professors/professorListItem";
import { FilterProfessors } from "@/app/tools/services/db/professor";
import FilterProfessorForm from "@/app/tools/forms/admin/professors/filterProfessorForm";

interface Props {
  searchParams: {
    page: any;
    per_page: string;
  };
}

const Home = ({ searchParams: { page, per_page } }: Props) => {

  const router = useRouter();

  const { data, error, mutate } = useSWR(
    {
      url: "/admin/professors",
      page,
    },
    FilterProfessors
  );

  const total_page = 1;
  const loadingProfessors = !data?.professors && !error;

  const onPageChangeHandler = ({ selected }: { selected: number }) => {
    router.push(`/admin/professors?page=${selected + 1}`);
  };

  return (
    <>
      <div className="container p-10">
        <FilterProfessorForm
          router={router}
          professorsMutate={mutate}
        />
        <h2 className="text-3xl pt-20">List of professors</h2>
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
                        <ProfessorListItem
                          key={professor._id}
                          professor={professor}
                          professorsMutate={mutate}
                        />
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

export default Home;
