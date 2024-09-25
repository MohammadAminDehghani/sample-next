"use client";

import useSWR from "swr";
import { ShowProfessor } from "@/app/tools/services/db/professor";
import { useRouter } from "next/navigation";
// import ShowProfessorForm from "@/app/tools/forms/admin/professors/showProfessorForm";
import CanAccess from "@/app/tools/components/shared/canAccess";

const ProfessorId = ({ params }: any) => {
  const { data: professor, error } = useSWR(
    `${params.professorId}`,
    ShowProfessor
  );

  console.log(professor);

  // Utility function to render arrays
  const renderArrayItems = (array: string[], title: string) => (
    <div className="mb-4">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <ul className="list-disc list-inside">
        {array.map((item, index) => (
          <li key={index} className="text-gray-700">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );

  interface Publication {
    title: string;
    journal: string;
    year: number;
    link: string;
  }

  // Utility function to render publications
  const renderPublications = (publications: Publication[]) => (
    <div className="mb-4">
      <h3 className="text-lg font-semibold mb-2">Publications</h3>
      <ul className="space-y-2">
        {publications.map((pub, index) => (
          <li key={index} className="text-gray-700">
            <strong>{pub.title}</strong> - {pub.journal} ({pub.year})
            {pub.link ? (
              <a
                href={pub.link}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-rose-600 hover:bg-rose-950 text-rose-100 hover:text-white py-1 px-3 m-2 border border-rose-800 hover:border-transparent rounded"
              >
                View
              </a>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  );

  interface ExternalLinks {
    website?: string;
    "university-site"?: string;
    linkedin?: string;
    twitter?: string;
  }

  // Utility function to render external links
  const renderExternalLinks = (links: ExternalLinks) => (
    <div className="mb-4">
      <h3 className="text-lg font-semibold mb-2">External Links</h3>
      {Object.keys(links).map((key) =>
        links[key as keyof ExternalLinks] ? (

            <a key={key}
              href={links[key as keyof ExternalLinks]}
              target="_blank"
              rel="noopener noreferrer"
                className="bg-rose-950 hover:bg-rose-950 text-rose-100 hover:text-white py-1 px-3 m-1 border border-rose-800 hover:border-transparent rounded"
            >
              {key}
            </a>
          
        ) : null
      )}
    </div>
  );

  const router = useRouter();
  return (
    <>
      {professor && (
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="mt-8 flex flex-col">
            <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                  <div className="w-full max-w-auto bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 m-2">
                    <div className="flex justify-end px-4 pt-4">
                      <button
                        id="dropdownButton"
                        data-dropdown-toggle="dropdown"
                        className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5"
                        type="button"
                      >
                        <span className="sr-only">Open dropdown</span>
                        <svg
                          className="w-5 h-5"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 16 3"
                        >
                          <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                        </svg>
                      </button>
                      <div
                        id="dropdown"
                        className="z-10 hidden text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
                      >
                        <ul className="py-2" aria-labelledby="dropdownButton">
                          <li>
                            <a
                              href="#"
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                            >
                              Edit
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                            >
                              Export Data
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                            >
                              Delete
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="flex flex-col items-center pb-10">
                      {/* <img
                        className="w-24 h-24 mb-3 rounded-full shadow-lg"
                        src={"https://i.pravatar.cc/150?u=" + professor.email}
                        alt={professor.first_name + " " + professor.last_name}
                      /> */}

                      <img
                        className="w-24 h-24 mb-3 rounded-full shadow-lg"
                        src={"https://www.concordia.ca/" + professor.image_url}
                        alt={professor.first_name + " " + professor.last_name}
                      />

                      <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                        <span className="px-2">{professor.first_name}</span>
                        {professor.last_name}
                      </h5>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {professor.email}
                      </span>

                      {professor.education &&
                        renderArrayItems(professor.education, "Education")}

                      {professor.courses &&
                        renderArrayItems(professor.courses, "Courses")}

                      {professor.publications &&
                        renderPublications(professor.publications)}

                      {professor.news_and_media &&
                        renderArrayItems(
                          professor.news_and_media,
                          "News and Media"
                        )}

                      {professor.external_links &&
                        renderExternalLinks(professor.external_links)}

                      <div className="flex mt-4 md:mt-6">
                        <a
                          href={professor.url}
                          className="py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                        >
                          university page
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {professor === undefined && (
        <div className="px-4 sm:px-6 lg:px-8">please wait...</div>
      )}
    </>
  );
};

export default ProfessorId;
