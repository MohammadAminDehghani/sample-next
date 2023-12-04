import AdminPanelLayout from "@/app/components/adminPanelLayout";
import { NextPageWithLayout } from "@/pages/_app";
import CreateProductForm from "@/app/forms/admin/products/createProductForm";
import useSWR from "swr";
import { EditProduct } from "@/app/services/product";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import callApi from "@/app/helpers/callApi";
import EditProductForm from "@/app/forms/admin/products/editProductForm";

const ProductEdid: NextPageWithLayout = () => {
  //const [product, setProduct] = useState(undefined);
  const router = useRouter();
  const { query } = router;
  const productId = query.productId as string;

  const {data : product, error} = useSWR(`${productId}`, EditProduct)

  // useEffect(() => {
  //   const fetchProductDetails = async () => {
  //     try {
  //       // Call your API endpoint to fetch product details based on the productId
  //       const product = await EditProduct(productId ? parseInt(productId) : 1);
  //       setProduct(product);
  //       // Process the fetched data and update your component state
  //       // For example, you can set the product details in a state variable
  //       // setProductDetails(data);
  //     } catch (error) {
  //       // Handle any errors that may occur during the API call
  //       console.error("Error fetching product details:", error);
  //     }
  //   };
  //   fetchProductDetails();
  //   console.log("yes");
  // }, [productId]);

  return (
    <>
      {product && (
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-xl font-semibold text-gray-900">
                create products
              </h1>
            </div>
          </div>
          <div className="mt-8 flex flex-col">
            <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                  <EditProductForm product={product} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {product === undefined && (
        <div className="px-4 sm:px-6 lg:px-8">please wait...</div>
      )}
    </>
  );
};

ProductEdid.getLayout = (page) => (
  <AdminPanelLayout pageName="products.create">{page}</AdminPanelLayout>
);

export default ProductEdid;
