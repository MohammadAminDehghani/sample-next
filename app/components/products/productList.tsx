"use client";

import Link from "next/link";
import ReactCustomPaginate from "../shared/reactCutsomPaginate";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const productsTailwind = [
  {
    id: 1,
    name: "Earthen Bottle",
    href: "#",
    price: "$48",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg",
    imageAlt:
      "Tall slender porcelain bottle with natural clay textured body and cork stopper.",
  },
  {
    id: 2,
    name: "Nomad Tumbler",
    href: "#",
    price: "$35",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg",
    imageAlt:
      "Olive drab green insulated bottle with flared screw lid and flat top.",
  },
  {
    id: 3,
    name: "Focus Paper Refill",
    href: "#",
    price: "$89",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-03.jpg",
    imageAlt:
      "Person using a pen to cross a task off a productivity paper card.",
  },
  {
    id: 4,
    name: "Machined Mechanical Pencil",
    href: "#",
    price: "$35",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg",
    imageAlt:
      "Hand holding black machined steel mechanical pencil with brass tip and top.",
  },
  // More products...
];



export default function ProductList({ productsData }: { productsData: any }) {

  const router = useRouter()

  useEffect(()=>{
    router.push(`/products?page=1&per_page=4`);
  },[])

  // const onPageChangeHandler = ({ page, per_page }: { page: string, per_page: string }) => {
  //   router.push(`/products?page=${parseInt(page) + 1}&per_page=${per_page}`);
  // };

  const onPageChangeHandler = ({ selected }: { selected: number }) => {
    router.push(`/products?page=${selected + 1}&per_page=${productsData.per_page ?? 4}`);
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        {productsData?.data.map((product: any) => (
          <div key={product.id} className="group">
            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
              <img
                src={productsTailwind[Math.floor(Math.random() * 4)].imageSrc}
                alt={product.imageAlt}
                className="h-full w-full object-cover object-center group-hover:opacity-75"
              />
            </div>
            <h3 className="mt-4 text-lg text-gray-800">{product.title}</h3>
            <p className="mt-1 font-medium text-gray-900">{product.price}$</p>
            <p className="font-medium text-gray-500">{product.body} ...</p>
            <div className="mt-5">
              <Link
                className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-5 border border-blue-500 hover:border-transparent rounded"
                href={{
                  pathname: `/products/${product.id}`,
                }}
              >
                <span>See product</span>
              </Link>
            </div>
          </div>
        ))}
      </div>

      <ReactCustomPaginate
        pageCount={productsData.total_page}
        page={productsData.page}
        onPageChangeHandler={onPageChangeHandler}
      />
    </>
  );
}
