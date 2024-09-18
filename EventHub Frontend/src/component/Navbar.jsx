import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  Disclosure,
  Menu,
  Transition
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Button from "@mui/material/Button";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";
import AuthModal from "../auth/AuthModal";
import CustomAvatar from "./CustomAvatar";
import { TextField } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import { openModal, closeModal } from '../service/features/modalSlice';
import { logout } from '../service/features/authSlice';
import { showSnackbar } from "../service/features/snackbarSlice";

const Navbar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { isOpen } = useSelector((state) => state.modal);
  const { user, token } = useSelector((state) => state.auth);
  const [isSearchVisible, setIsSearchVisible] = useState(true);
  const form = useForm();
  const { register, watch } = form;
  const search = watch("search");

  const navigation = [
    { name: "Home", to: "/", current: location.pathname === "/" },
    { name: "Events", to: "/event", current: location.pathname === "/event" },
    { name: "Dashboard", to: "/dashboard", current: location.pathname === "/dashboard" },
  ];

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  const toggleSearchBar = () => {
    setIsSearchVisible(!isSearchVisible);
    setTimeout(() => {}, 2000);
  };

  const handleOpen = () => {
    dispatch(openModal());
  };

  const handleClose = () => {
    dispatch(closeModal());
  };

  const handleLogout = () => {
    dispatch(showSnackbar({ message: "Logout successful" }));
    dispatch(logout());
  };

  useEffect(() => {}, [user]);

  return (
    <>
      <div
        className={`fixed  ${isSearchVisible ? "-translate-y-[100%]" : "translate-y-[110%]"}  
          left-[5%] p-5 sm:p-8 md:p-10 rounded-lg w-[90%] md:w-[24%]  bg-white md:left-[40%] z-[99] 
          transition-transform duration-300 ease-in-out`}
      >
        <div className="bg-white rounded-md flex justify-center items-center">
          <TextField fullWidth label="Search With Event ID" id="search" {...register("search")} />
          <Link to={`/event/${search}`}>
            <div className="cursor-pointer">
              <SearchSharpIcon color="primary" className="relative text-[2.35rem] ms-2" />
            </div>
          </Link>
        </div>
      </div>

      {!isSearchVisible && (
        <div
          onClick={() => {
            setIsSearchVisible(true);
          }}
          className={`w-full h-full bg-black fixed ${isSearchVisible ? "opacity-0" : "opacity-75"}  
            z-50 transition-transform duration-300 ease-in-out`}
        ></div>
      )}

      <Disclosure as="nav" className="bg-gray-800 z-50">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-16 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>

                <Link to="/">
                  <div className="ps-10 sm:ps-2 flex items-center">
                    <img
                      alt="Your Company"
                      src="/images/Logo.png"
                      className="w-32 hidden sm:block"
                    />
                  </div>
                </Link>

                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="hidden sm:ml-6 sm:block">
                    <div className="flex space-x-4">
                      {navigation.map((item) => {
                        if (item.name === "Dashboard" && (user?.role === "Attendee" || !user)) {
                          return null;
                        }
                        return (
                          <Link
                            key={item.name}
                            to={item.to}
                            aria-current={item.current ? "page" : undefined}
                            className={classNames(
                              item.current ? "bg-gray-900 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white",
                              "rounded-md px-3 py-2 text-sm font-medium"
                            )}
                          >
                            {item.name}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="absolute inset-y-0 right-0 flex gap-2 items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  {token && user?.role !== "Admin" && (
                    <Link to="/organize-event">
                      <Button variant="contained" className="rounded-full capitalize">
                        Organize
                      </Button>
                    </Link>
                  )}

                  <Button variant="contained" className="rounded-full capitalize" onClick={toggleSearchBar}>
                    <SearchSharpIcon />
                  </Button>

                  {/* Profile dropdown */}
                  {user ? (
                    <Menu as="div" className="relative">
                      <div>
                        <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                          <span className="sr-only">Open user menu</span>
                          <CustomAvatar str={user?.first_name || "User"} />
                        </Menu.Button>
                      </div>
                      <Transition
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5">
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                to="/profile"
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                Your Profile
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                onClick={handleLogout}
                                to="#"
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                Sign out
                              </Link>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  ) : (
                    <Link
                      onClick={handleOpen}
                      to={"#"}
                      className="text-gray-300 bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                    >
                      Login
                    </Link>
                  )}
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 px-2 pb-3 pt-2">
                {navigation.map((item) => {
                  if (item.name === "Dashboard" && (user?.role === "Attendee" || !user)) {
                    return null;
                  }
                  return (
                    <Link
                      key={item.name}
                      to={item.to}
                      className={classNames(
                        item.current ? "bg-gray-900 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white",
                        "block rounded-md px-3 py-2 text-base font-medium"
                      )}
                    >
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>

      <AuthModal openModal={isOpen} handleCloseModal={handleClose} />
    </>
  );
};

export default Navbar;
