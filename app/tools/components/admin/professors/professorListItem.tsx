import Professor from "@/app/tools/models/professor";
import { classNames } from "primereact/utils";
import React from "react";
import { KeyedMutator } from "swr";

interface Props {
  professor: Professor;
  professorsMutate: KeyedMutator<{
    professors: any;
    total_page?: any;
  }>;
}

export default function ProfessorListItem({ professor }: Props) {
  return (
    <>
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
          {professor.image_url ? (
            <img
              className="w-24 h-24 mb-3 rounded-full shadow-lg"
              src={"https://www.concordia.ca/" + professor.image_url}
              alt={professor.first_name + " " + professor.last_name}
            />
          ) : (
            <span className="inline-flex items-center justify-center w-24 h-24 mb-3 rounded-full shadow-lg text-xl font-semibold leading-none rounded-full bg-gray-50 text-gray-500 dark:bg-white/10 dark:text-white">
              {professor.first_name?.charAt(0) +
                " " +
                professor.last_name?.charAt(0)}
            </span>
          )}

          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
            <span className="px-2">{professor.first_name}</span>
            {professor.last_name}
          </h5>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {professor.email}
          </span>
          <p className="ps-5">{professor.summary}</p>
          <div className="flex mt-4 md:mt-6">
            <a
              href={"/admin/professors/" + professor._id + "/show"}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              details
            </a>
            <a
              href={professor.url}
              className="py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              page on university website
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
