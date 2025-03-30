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
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/api/UserApiSlice";
import { logout, setCredentials } from "../../redux/features/auth/authSlice";

function Navigation() {
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const [sideBarOpen, setSideBarOpen] = useState(false);

  const { userInfo } = useSelector((state) => state.auth);
  console.log("userInfo: ", userInfo);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.log("error message from Navigation: ", error);
    }
  };

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

      <div className="relative">
        <button
          onClick={toggleDropDown}
          className="flex items-center text-gray-800 focus:outline-none"
        >
          {userInfo ? (
            <span className="text-white">{userInfo.username}</span>
          ) : (
            ""
          )}

          {userInfo && (
            <svg
              fill="none"
              stroke="white"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              className={`h-4 w-4 ml-1 ${
                dropDownOpen ? "transform rotate-180" : ""
              }`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={dropDownOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
              />
            </svg>
          )}
        </button>
        {userInfo && dropDownOpen && (
          <ul
            className={`absolute right-0 mt-2 mr-14 space-y-2 bg-white text-gray-700 ${
              !userInfo.isAdmin ? "-top-20" : "-top-90"
            }`}
          >
            {userInfo.isAdmin && (
              <>
                <li>
                  <Link
                    to="/admin/dashboard"
                    className="block px-4 py-2 hover:bg-gray-500"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/productlists"
                    className="block px-4 py-2 hover:bg-gray-500"
                  >
                    Products
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/categorylist"
                    className="block px-4 py-2 hover:bg-gray-500"
                  >
                    Category
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/orderlist"
                    className="block px-4 py-2 hover:bg-gray-500"
                  >
                    Orders
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/userlist"
                    className="block px-4 py-2 hover:bg-gray-500"
                  >
                    Users
                  </Link>
                </li>
              </>
            )}

            <li>
              <Link to="/profile" className="block px-4 py-2 hover:bg-gray-500">
                Profile
              </Link>
            </li>

            <li>
              <button
                onClick={logoutHandler}
                className="block w-full px-4 py-2 text-left hover:bg-red-500"
              >
                Logout
              </button>
            </li>
          </ul>
        )}
      </div>

      {!userInfo && (
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
              <span className="hidden nav-item-name mt-[1rem]">
                SIGN UP
              </span>{" "}
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
}

export default Navigation;
