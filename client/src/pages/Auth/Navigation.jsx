import "./Navigation.css";
import { useState } from "react";
import {
  AiOutlineHome,
  AiOutlineShopping,
  AiOutlineLogin,
  AiOutlineShoppingCart,
  AiOutlineUserAdd,
} from "react-icons/ai";
import { FaHeart } from "react-icons/fa";

import { Link } from "react-router";

function Navigation() {
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const [sideBarOpen, setSideBarOpen] = useState(false);

  const toggleDropDown = () => {
    setDropDownOpen(!dropDownOpen);
  };

  const toggleSideBar = () => {
    setSideBarOpen(!sideBarOpen);
  };

  const closeSideBar = () => {
    setSideBarOpen(false);
  };
  return (
    <div
      className={`${
        sideBarOpen ? "hidden" : "flex"
      } xl:flex lg:flex sm:hidden flex-col justify-between p-4 text-white bg-black w-[4%] hover:w-[15%] h-[100vh] fixed`}
      id="nav-container"
    >
      <div className="flex flex-col justify-center space-y-4">
        <Link
          to="/"
          className="flex items-center transition-transform transform hover:translate-x-2"
        >
          <AiOutlineHome size={30} className="mr-2 mt-[1rem]" />
          <span className="hidden nav-item-name mt-[1rem]">HOME</span>{" "}
        </Link>
        <Link
          to="/shop"
          className="flex items-center transition-transform transform hover:translate-x-2"
        >
          <AiOutlineShopping size={30} className="mr-2 mt-[1rem]" />
          <span className="hidden nav-item-name mt-[1rem]">SHOP</span>{" "}
        </Link>
        <Link
          to="/cart"
          className="flex items-center transition-transform transform hover:translate-x-2"
        >
          <AiOutlineShoppingCart size={30} className="mr-2 mt-[1rem]" />
          <span className="hidden nav-item-name mt-[1rem]">CART</span>{" "}
        </Link>
        <Link
          to="/favourite"
          className="flex items-center transition-transform transform hover:translate-x-2"
        >
          <FaHeart size={30} className="mr-2 mt-[1rem]" />
          <span className="hidden nav-item-name mt-[1rem]">
            FAVOURITES
          </span>{" "}
        </Link>
      </div>

      <ul>
        <li>
          <Link
            to="/login"
            className="flex items-center transition-transform transform hover:translate-x-2"
          >
            <AiOutlineLogin size={30} className="mr-2 mt-[1rem]" />
            <span className="hidden nav-item-name mt-[1rem]">LOGIN</span>{" "}
          </Link>
        </li>
        <li>
          <Link
            to="/signup"
            className="flex items-center transition-transform transform hover:translate-x-2"
          >
            <AiOutlineUserAdd size={30} className="mr-2 mt-[1rem]" />
            <span className="hidden nav-item-name mt-[1rem]">SIGN UP</span>{" "}
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Navigation;
