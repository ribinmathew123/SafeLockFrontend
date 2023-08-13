import { useState } from "react";
import { NavLink, useNavigate, Link } from "react-router-dom";
import { Fragment } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Disclosure, Menu, Transition } from "@headlessui/react";


import { toast } from "react-hot-toast";



function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Navbar() {


  const defaultProfilePicture = "https://res.cloudinary.com/dbpbx7tw4/image/upload/v1687104909/profile/60111_qidycx.jpg"

  const user = JSON.parse(localStorage.getItem("userInfo"));
  const navigate = useNavigate();

  const userLogout = () => {
    localStorage.removeItem("userInfo");

    navigate("/");
    toast.success("Logged out successfully!");

  };


  const links = [
    { name: "HOME", link: "/" },

  ];

  return (
    <Disclosure
      as="nav"
      className="shadow-md w-full fixed top-0 left-0 z-50 bg-white  text-black "
    >
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">




                <div className="flex flex-shrink-0 justify-center items-center">
                  <span className="font-bold text-4xl text-teal-700 font-Poppins">S</span>
                  <span className="text-2xl font-medium text-black">AFE LOCK</span>
                  <img
                    className="h-10 w-auto ml-2"
                    src="https://res.cloudinary.com/dbpbx7tw4/image/upload/v1691755152/hacker_sjwxdo.png"
                    alt=""
                  />
                </div>
              </div>





              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                  <div className="flex space-x-8 md:ml-64">
                    <Link to="/">
                      <span className="hover:text-gray-800 text-teal-700 duration-500 text-xl font-Lexend font-bold"
                      > HOME PAGE </span>
                    </Link>
                  </div>
                </div>
              </div>


              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <div className="header_top_right flex items-center justify-end gap-3">
                  {user ? (
                    <>


                      <span className="hover:text-gray-800 text-teal-700 duration-500 text-xl font-Lexend font-bold md:flex items-center gap-1 ms-3 uppercase hidden"
                      >    {user.name || user?.user?.name} </span>


                    </>
                  ) : (
                    <>
                      <Link to="/login" className="flex items-center gap-2">
                        <span className="hover:text-gray-800 text-teal-700 duration-500 text-xl font-Lexend font-bold hidden"
                        > LOGIN </span>                      </Link>
                    </>
                  )}
                </div>

                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full hover:bg-primary"

                        src={defaultProfilePicture}
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


                      <Menu.Item>
                        {({ active }) => (
                          <>
                            {user ? (
                              <span
                                onClick={userLogout}
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm  text-black hover:bg-teal-400"
                                )}
                              >
                                <span className="hover:text-gray-800 text-teal-700 duration-500 text-xl font-Lexend font-bold"
                                >   SIGN OUT </span>
                              </span>
                            ) : (
                              <div> 
                              <div>
                              <Link
                                to="/login"
                                className="block px-3 py-2 text-base text-black hover:bg-gray-100"
                              >

                                <span className="hover:text-gray-800 text-teal-700 duration-500 text-xl font-Lexend font-bold"
                                >   LOGIN </span>

                              </Link>
                              </div>


                              <div>
                              <Link
                                to="/signup"
                                className="block px-3 py-2 text-base text-black hover:bg-gray-100"
                              >

                                <span className="hover:text-gray-800 text-teal-700 duration-500 text-xl font-Lexend font-bold"
                                >   SIGN UP </span>

                           
                              </Link>
                              </div>

                              </div>
                            )}
                          </>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {links.map((link) => (

                // <Disclosure.Button

                <NavLink

                  key={link.name}
                  as="a"
                  to={link.link}
                  className={classNames(
                    link.current
                      ? "bg-gray-900 text-white"
                      : "text-black hover:bg-gray-700 hover:text-primary",
                    "block rounded-md px-3 py-2 text-base font-medium  "
                  )}
                  aria-current={link.current ? "page" : undefined}
                >
                  {link.name}
                </NavLink>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}

// export default Navbar;

// import { Link } from "react-router-dom"; // Import Link from React Router

// import { Disclosure } from '@headlessui/react';
// import { HiX, HiMenu } from 'react-icons/hi'; // Import icons

// // ... other imports ...

// function Navbar() {
//   return (
//     <Disclosure as="nav" className="bg-teal-500 shadow-md">
//       {({ open }) => (
//         <>
//           <div className="container mx-auto px-4 py-2 flex justify-between items-center">
//             <Link to="/" className="text-white font-bold text-lg">
//               Password Generator
//             </Link>
//             <div className="flex items-center space-x-4">
//               <Link to="/home" className="text-white hover:underline">
//                 Home
//               </Link>
//               <Link to="/profile" className="text-white hover:underline">
//                 User Profile
//               </Link>
//               <Link to="/logout" className="text-white hover:underline">
//                 Logout
//               </Link>
//             </div>
//             <div className="flex items-center sm:hidden">
//               {/* Mobile menu button */}
//               <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
//                 <span className="sr-only">Open main menu</span>
//                 {open ? (
//                   <HiX className="block h-6 w-6" aria-hidden="true" />
//                 ) : (
//                   <HiMenu className="block h-6 w-6" aria-hidden="true" />
//                 )}
//               </Disclosure.Button>
//             </div>
//           </div>
//           {/* Mobile menu content */}
//           <Disclosure.Panel className="sm:hidden">
//             <div className="bg-teal-500 p-4">
//               <Link to="/home" className="block text-white hover:underline mb-2">
//                 Home
//               </Link>
//               <Link to="/profile" className="block text-white hover:underline mb-2">
//                 User Profile
//               </Link>
//               <Link to="/logout" className="block text-white hover:underline">
//                 Logout
//               </Link>
//             </div>
//           </Disclosure.Panel>
//         </>
//       )}
//     </Disclosure>
//   );
// }

export default Navbar;

