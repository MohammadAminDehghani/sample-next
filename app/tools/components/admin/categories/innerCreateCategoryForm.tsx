import { Form, FormikProps } from "formik";
import Input from "@/app/tools/components/shared/form/input";
import { StoreCategoryInterface } from "@/app/tools/contracts/admin/categories";
import TextArea from "@/app/tools/components/shared/form/textarea";
import SelectBox from "../../shared/form/selectbox";
import { GetCategories } from "@/app/tools/services/db/category";
import useSWR from "swr";

const InnerCreateCategoryForm = (
  props: FormikProps<StoreCategoryInterface>
) => {
  const { data, error, mutate } = useSWR({}, GetCategories);

  const options: any = [
    {
      label: "It's parent category",
      value: "",
    },
  ];

  data?.categories.map((category: any) => {
    options.push({
      label: category.name,
      value: category.id,
    });
  });

  return (
    <Form>
      <div className="p-6 grid grid-cols-1 gap-y-6 sm:grid-cols-4 sm:gap-x-8">
        <div className="sm:col-span-2">
          <Input
            name="name"
            label="category name"
            labelClassName="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            inputClassName="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>

        <div className="sm:col-span-2">
          <SelectBox
            name="parent"
            options={options}
            label="choose parent"
            labelClassName="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          />
        </div>

        <div className="sm:col-span-4">
          <TextArea
            name="description"
            label="about category"
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
          Create a new category
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

export default InnerCreateCategoryForm;
