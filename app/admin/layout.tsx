"use client";

import { ReactNode, Fragment, useState, useEffect } from "react";
import { Menu, Transition } from "@headlessui/react";
import { Bars3BottomLeftIcon, BellIcon } from "@heroicons/react/24/outline";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";

import SidebarLayout from "@/app/tools/components/admin/sidebar/sidebarLayouts";
import { useRouter } from "next/navigation";

import store from "../tools/store";
import { selectLoadingUser, selectUser, selectVerifyToken, updateVerifyToken } from "../tools/store/auth";
import { useDispatch, useSelector } from "react-redux";
import { useCookies } from "react-cookie";

const userNavigation = [
  { name: "Your Profile", href: "#" },
  { name: "Settings", href: "#" },
  { name: "Sign out", href: "#" },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

interface Props {
  children: ReactNode;
  pageName?: string;
}

const AdminPanelLayout = ({ children, pageName }: Props) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const dispatch = useDispatch();
  const loadingUser = useSelector(selectLoadingUser); // You can add a loading state to wait for Redux
  const router = useRouter();
  const token = useSelector(selectVerifyToken);

  const user = useSelector(selectUser);
  console.log(user);

  const [cookies, setCookie, removeCookie] = useCookies(["login-token"]);

  const Logout = ()=>{
    removeCookie("login-token");
    store.dispatch(updateVerifyToken(undefined));
  } 

  useEffect(() => {
    const token = cookies["login-token"];
  
    if (token) {
      // Make an API call to verify the token
      const verifyToken = async () => {
        try {
          const res = await fetch("http://localhost:8000/api/auth/verify-token", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
  
          if (res.ok) {
            const data = await res.json();
            if (data.valid) {
              dispatch(updateVerifyToken(token)); // Valid token, hydrate Redux store
              localStorage.setItem("login-token", token)
            } else {
              throw new Error("Invalid token");
            }
          } else {
            throw new Error("Token verification failed");
          }
        } catch (error) {
          console.error(error);
          // Clear token from Redux and cookies, and redirect to login
          dispatch(updateVerifyToken(undefined));
          removeCookie("login-token");
          router.replace("/auth/login");
        }
      };

      verifyToken();
    } else {
      // Redirect if no token
      router.replace("/auth/login");
    }
  }, [cookies, dispatch, router, removeCookie]);
  

  return (
    <>
      <div>
        <SidebarLayout
          open={sidebarOpen}
          setOpen={setSidebarOpen}
          pageName={pageName}
        />
        <div className="flex flex-col md:pl-64 min-h-screen">
          <div className="sticky top-0 z-10 flex h-16 flex-shrink-0 bg-white shadow">
            <button
              type="button"
              className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3BottomLeftIcon className="h-6 w-6" aria-hidden="true" />
            </button>
            <div className="flex flex-1 justify-between px-4">
              <div className="flex flex-1">
                <form className="flex w-full md:ml-0" action="#" method="GET">
                  <label htmlFor="search-field" className="sr-only">
                    Search
                  </label>
                  <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center">
                      <MagnifyingGlassIcon
                        className="h-5 w-5"
                        aria-hidden="true"
                      />
                    </div>
                    <input
                      id="search-field"
                      className="block h-full w-full border-transparent py-2 pl-8 pr-3 text-gray-900 placeholder-gray-500 focus:border-transparent focus:placeholder-gray-400 focus:outline-none focus:ring-0 sm:text-sm"
                      placeholder="Search"
                      type="search"
                      name="search"
                    />
                  </div>
                </form>
              </div>
              <div className="ml-4 flex items-center md:ml-6">
                <button
                  type="button"
                  className="rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  onClick={Logout}
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {userNavigation.map((item) => (
                        <Menu.Item key={item.name}>
                          {({ active }) => (
                            <a
                              href={item.href}
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              {item.name}
                            </a>
                          )}
                        </Menu.Item>
                      ))}
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <main className="flex-1 items-stretch bg-grey-lighter px-4 py-6">
            {children}
          </main>
        </div>
      </div>
    </>
  );
};

export default AdminPanelLayout;
