import { Metadata, ResolvingMetadata } from "next";

interface Props {
  params: {
    id: string,
    imageSrc? : string
  };
}

const getProduct = async (id: string) => {
  let res = await fetch(`http://localhost:5000/api/products/${id}`, {});
  //console.log(res);
  if (!res.ok) {
    //toast.error('Something went wrong. Please try again')
    //console.log('Something went wrong. Please try again');
    throw new Error("Something went wrong. Please try again");
  }

  return res.json();
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  let productData = await getProduct(params.id);
  let product = productData.product;

  return {
    title: product.title,
    description: product.body.substr(0, 120),
  };
}


const Images = [
    'https://www.kasandbox.org/programming-images/avatars/spunky-sam.png',
    'https://www.kasandbox.org/programming-images/avatars/spunky-sam-green.png',
    'https://www.kasandbox.org/programming-images/avatars/purple-pi.png',
    'https://www.kasandbox.org/programming-images/avatars/purple-pi-teal.png',
    'https://www.kasandbox.org/programming-images/avatars/purple-pi-pink.png',
    'https://www.kasandbox.org/programming-images/avatars/primosaur-ultimate.png',
    'https://www.kasandbox.org/programming-images/avatars/primosaur-tree.png',
    'https://www.kasandbox.org/programming-images/avatars/primosaur-sapling.png',
    'https://www.kasandbox.org/programming-images/avatars/orange-juice-squid.png',
    'https://www.kasandbox.org/programming-images/avatars/old-spice-man.png',
    'https://www.kasandbox.org/programming-images/avatars/old-spice-man-blue.png',
    'https://www.kasandbox.org/programming-images/avatars/mr-pants.png',
    'https://www.kasandbox.org/programming-images/avatars/mr-pants-purple.png',
    'https://www.kasandbox.org/programming-images/avatars/mr-pants-green.png',
    'https://www.kasandbox.org/programming-images/avatars/marcimus.png',
    'https://www.kasandbox.org/programming-images/avatars/marcimus-red.png',
    'https://www.kasandbox.org/programming-images/avatars/marcimus-purple.png',
    'https://www.kasandbox.org/programming-images/avatars/marcimus-orange.png',
    'https://www.kasandbox.org/programming-images/avatars/duskpin-ultimate.png',
    'https://www.kasandbox.org/programming-images/avatars/duskpin-tree.png',
    'https://www.kasandbox.org/programming-images/avatars/duskpin-seedling.png',
    'https://www.kasandbox.org/programming-images/avatars/duskpin-seed.png',
    'https://www.kasandbox.org/programming-images/avatars/duskpin-sapling.png',
];

export default async function ShowProduct({ params }: Props) {
  let productData = await getProduct(params.id);
  let product = productData.product;

  if (product){
        return (
      <div className="bg-gray-100 dark:bg-gray-800 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row -mx-4">
            <div className="md:flex-1 px-4">
              <div className="h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4">
                <img
                  src={Images[Math.round(Math.random() * Images.length)]}
                  alt="Product Image"
                  className="h-full w-full object-cover object-center group-hover:opacity-75"
                />
              </div>
              <div className="flex -mx-2 mb-4">
                <div className="w-1/2 px-2">
                  <button className="w-full bg-gray-900 dark:bg-gray-600 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-700">
                    Add to Cart
                  </button>
                </div>
                <div className="w-1/2 px-2">
                  <button className="w-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white py-2 px-4 rounded-full font-bold hover:bg-gray-300 dark:hover:bg-gray-600">
                    Add to Wishlist
                  </button>
                </div>
              </div>
            </div>
            <div className="md:flex-1 px-4">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                {product.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                {product.body}
              </p>
              <div className="flex mb-4">
                <div className="mr-4">
                  <span className="font-bold text-gray-700 dark:text-gray-300">
                    Price: 
                  </span>
                  <span className="text-gray-600 dark:text-gray-300 pl-1">
                    ${product.price}
                  </span>
                </div>
                <div>
                  <span className="font-bold text-gray-700 dark:text-gray-300">
                    Availability:
                  </span>
                  <span className="text-gray-600 dark:text-gray-300">
                    In Stock
                  </span>
                </div>
              </div>
              <div className="mb-4">
                <span className="font-bold text-gray-700 dark:text-gray-300">
                  Select Color:
                </span>
                <div className="flex items-center mt-2">
                  <button className="w-6 h-6 rounded-full bg-gray-800 dark:bg-gray-200 mr-2"></button>
                  <button className="w-6 h-6 rounded-full bg-red-500 dark:bg-red-700 mr-2"></button>
                  <button className="w-6 h-6 rounded-full bg-blue-500 dark:bg-blue-700 mr-2"></button>
                  <button className="w-6 h-6 rounded-full bg-yellow-500 dark:bg-yellow-700 mr-2"></button>
                </div>
              </div>
              <div className="mb-4">
                <span className="font-bold text-gray-700 dark:text-gray-300">
                  Select Size:
                </span>
                <div className="flex items-center mt-2">
                  <button className="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600">
                    S
                  </button>
                  <button className="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600">
                    M
                  </button>
                  <button className="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600">
                    L
                  </button>
                  <button className="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600">
                    XL
                  </button>
                  <button className="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600">
                    XXL
                  </button>
                </div>
              </div>
              <div>
                <span className="font-bold text-gray-700 dark:text-gray-300">
                  Product Description:
                </span>
                <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  sed ante justo. Integer euismod libero id mauris malesuada
                  tincidunt. Vivamus commodo nulla ut lorem rhoncus aliquet.
                  Duis dapibus augue vel ipsum pretium, et venenatis sem
                  blandit. Quisque ut erat vitae nisi ultrices placerat non eget
                  velit. Integer ornare mi sed ipsum lacinia, non sagittis
                  mauris blandit. Morbi fermentum libero vel nisl suscipit, nec
                  tincidunt mi consectetur.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }else{
    return (
        <div>Loading...</div>
    )
  }

}
