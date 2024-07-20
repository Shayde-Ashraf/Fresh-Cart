import React, { useContext, useEffect } from "react";
import logo from "../../assets/logo.svg";
import { Link, NavLink } from "react-router-dom";
import { userContext } from "../../context/UserContext";
import { cartContext } from "../../context/CartContext";
import { wishlistContext } from "../../context/WishlistContext";
export default function Navbar() {
  const { token, logOut } = useContext(userContext);
  const { getCartItems, cartInfo } = useContext(cartContext);
  const{getWishlist,wishlist}=useContext(wishlistContext)
  useEffect(() => {
    getCartItems();
    getWishlist()
  }, []);
  return (
    <>
      <div className="fixed top-0 right-0 left-0 z-50">
        <nav>
          <div className="flex flex-col md:flex-row md:gap-0 gap-3 bg-neutral-200 flex-wrap justify-center md:justify-between items-center mx-auto p-4">
            <ul className=" md:pl-10 flex gap-4 text-neutral-600 ">
              <li className="hover:text-800">
                <a href="#">
                  <i className="fa-brands fa-facebook "></i>
                </a>
              </li>
              <li className="hover:text-neutral-950">
                <a href="#">
                  <i className="fa-brands fa-instagram"></i>
                </a>
              </li>
              <li className="hover:text-neutral-950">
                <a href="#">
                  <i className="fa-brands fa-x-twitter"></i>
                </a>
              </li>
              <li className="hover:text-neutral-800">
                <a href="#">
                  <i className="fa-brands fa-youtube"></i>
                </a>
              </li>
              <li className="hover:text-neutral-800">
                <a href="#">
                  <i className="fa-brands fa-tiktok"></i>
                </a>
              </li>
            </ul>
            <Link to="/" className="flex items-center  space-x-3 ">
              <img src={logo} className="h-12 w-12" alt="Fresh cart logo" />
              <span className="self-center text-2xl font-semibold whitespace-nowrap ">
                Fresh Cart
              </span>
            </Link>

            <div className="flex pr-1 md:pr-10 items-center gap-6 ">
              {token ? (
                <>
                  <Link
                    to="/cart"
                    className="relative inline-flex items-center p-3 text-xl text-center "
                  >
                    <i className=" cursor-pointer text-neutral-600 fa-solid fa-cart-shopping hover:text-neutral-900"></i>
                    <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-lime-600 border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">
                      {cartInfo === null ? (
                        <i className="fa-solid fa-spin fa-spinner"></i>
                      ) : (
                        cartInfo?.numOfCartItems || 0
                      )}
                    </div>
                  </Link>
                  <Link
                    to="/wishlist"
                  
                    className="relative  inline-flex items-center p-3  text-xl text-center "
                  >
                    <i className=" cursor-pointer text-neutral-600 fa-solid fa-heart hover:text-neutral-900"></i>
                    <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-lime-600 border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">
                    {wishlist === null ? (
                        <i className="fa-solid fa-spin fa-spinner"></i>
                      ) : (
                        wishlist?.data?.length ||0
                      )}
                    </div>
                  </Link>
                </>
              ) : (
                ""
              )}
              {!token ? (
                <Link
                  to="/login"
                  className="text-md md:pl-0 pl-8 font-bold  text-neutral-500 hover:underline"
                >
                  Login / Register
                </Link>
              ) : (
                ""
              )}

              {token ? (
                <span
                  onClick={logOut}
                  className="text-md font-bold cursor-pointer text-neutral-500 hover:underline hover:text-neutral-900"
                >
                  <i className="fa-solid fa-right-from-bracket text-2xl"></i>
                </span>
              ) : (
                ""
              )}
            </div>
          </div>
        </nav>
        {token ? (
          <nav className="bg-gray-50 px-1  ">
            <div className="max-w-screen-2xl px-4 py-3 mx-auto">
              <div className="flex items-center justify-center">
                <ul className="flex flex-row font-medium mt-0 md:space-x-8 space-x-5 text-gray-500  text-sm">
                  <li>
                    <NavLink
                      to="/"
                      className=" hover:underline"
                      aria-current="page"
                    >
                      Home
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/products" className="  hover:underline">
                      Products
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/categories" className="  hover:underline">
                      Categories
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/brands" className=" hover:underline">
                      Brands
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/allorders" className=" hover:underline">
                      Orders
                    </NavLink>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        ) : (
          ""
        )}
      </div>
    </>
  );
}
