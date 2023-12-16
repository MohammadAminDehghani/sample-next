import { Form, FormikProps } from "formik";
import Input from "@/app/tools/components/shared/form/input";
import { StoreArticleInterface } from "@/app/tools/contracts/admin/articles";
import TextArea from "@/app/tools/components/shared/form/textarea";
import SelectBox from "../../shared/form/selectbox";
import useSWR from "swr";
import { GetCategories } from "@/app/tools/services/db/category";

const InnerCreateArticleForm = (props: FormikProps<StoreArticleInterface>) => {
  
  //console.log('inja', props.categories)

  const { data , error, mutate } = useSWR(
    {},
    GetCategories
  );

  const options : any = [];

  data?.categories.map((category : any) =>{
    options.push({
      label : category.title,
      value : category.id
    })
  })
  
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
        {
          data?.categories !== undefined ?

            <SelectBox
            name="categories"
              label="categories"
              options={options}
            />
            : 'loading...'
          
        }

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
