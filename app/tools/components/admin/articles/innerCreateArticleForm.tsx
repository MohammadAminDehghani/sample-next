"use client";

import { Form, FormikProps } from "formik";
import Input from "@/app/tools/components/shared/form/input";
import { StoreArticleInterface } from "@/app/tools/contracts/admin/articles";
import TextArea from "@/app/tools/components/shared/form/textarea";
import SelectBox from "../../shared/form/selectbox";
import useSWR from "swr";
import { GetCategories } from "@/app/tools/services/db/category";
import { SearchTags } from "@/app/tools/services/db/tag";
import Category from "@/app/tools/models/category";
import Tag from "@/app/tools/models/tag";
import { useState } from "react";
import { UploadFile } from "../../shared/form/uploadFile";

const InnerCreateArticleForm = (props: FormikProps<StoreArticleInterface>) => {
  const {
    data: categoriesData,
    error: categoryError,
    mutate: categoryMutate,
  } = useSWR("/api/admin/categories", GetCategories);

  const categoryOptions: any = [];

  categoriesData?.categories.map((category: Category) => {
    categoryOptions.push({
      label: category.name,
      value: category.id,
    });
  });

  const [inputValue, setInputValue] = useState("");
  const {
    data: tagsData,
    error: tagError,
    mutate: tagMutate,
  } = useSWR(inputValue, SearchTags, {
    revalidateOnMount: true,
    revalidateOnFocus: false,
  });

  const tagOptions =
    tagsData?.tags?.map((tag: Tag) => ({
      label: tag.name,
      value: tag.id,
    })) || [];

  const [showingTags, setShowingTags] = useState<
    { label: string; value: string }[]
  >([]);

  const onchangeHandlerForTags = (event: React.ChangeEvent<Element> | null) => {
    let selectElement = event?.currentTarget as HTMLSelectElement;
    let label = selectElement.options[selectElement.selectedIndex].text;

    setShowingTags([
      ...showingTags,
      {
        label: label,
        value: selectElement.value,
      },
    ]);

    props.values.tags = showingTags.map((tag) => tag.value);
    props.values.tags.push(selectElement.value);
  };

  const deleteHanderForShowingTags = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const filtered = showingTags.filter(
      (tag) => tag.value !== event.currentTarget.value
    );
    setShowingTags(filtered);
  };

  const tagInputChangeHandler = (value: string) => {
    setInputValue(value);
    tagMutate();
  };

  return (
    <Form>
      <div className="p-6 grid grid-cols-1 gap-y-6 sm:grid-cols-4 sm:gap-x-8">
        <div className="sm:col-span-2">
          <Input
            name="title"
            label="article name"
            labelClassName="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            inputClassName="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div className="sm:col-span-2">
          <Input
            name="slug"
            label="article's slug"
            labelClassName="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            inputClassName="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <UploadFile maxFiles={1} onUpload={()=>{}} />
        {categoriesData?.categories !== undefined &&
        categoryOptions.length !== 0 ? (
          <div className="sm:col-span-4">
            <SelectBox
              name="category"
              label="category"
              options={categoryOptions}
              defaultValue={""}
            />
          </div>
        ) : (
          " loading categories... "
        )}

        <div className="sm:col-span-2">
          <Input
            name="searchTag"
            //value={inputValue}
            inputOnChange={tagInputChangeHandler}
            label="tag's search"
            labelClassName="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            inputClassName="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>

        {tagsData?.tags !== undefined && tagOptions.length !== 0 ? (
          <div className="sm:col-span-2">
            <SelectBox
              name="tags"
              label="tags"
              options={tagOptions}
              defaultValue={""}
              onChange={onchangeHandlerForTags}
            />
          </div>
        ) : (
          " loading tags... "
        )}

        {showingTags.map((tag) => {
          return (
            <div
              key={tag.value}
              className="text-xs inline-flex items-center font-bold leading-sm uppercase px-2 py-1 rounded-full bg-white text-gray-700 border"
            >
              {tag.label}
              <button value={tag.value} onClick={deleteHanderForShowingTags}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4 ml-5"
                  color="#dc2626"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </button>
            </div>
          );
        })}

        <div className="sm:col-span-4">
          <TextArea
            name="body"
            label="about article"
            rows={7}
            labelClassName="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            inputClassName="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
      </div>

      <div className="p-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center">
        <button
          type="submit"
          className="ml-2 inline-flex items-center mx-1 px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 hover:bg-indigo-700 "
        >
          Create a new article
        </button>
        <button
          type="button"
          className="inline-flex items-center mx-1 px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Cancel
        </button>
      </div>
    </Form>
  );
};

export default InnerCreateArticleForm;
