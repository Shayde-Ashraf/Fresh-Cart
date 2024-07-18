import React, { useContext } from "react";
import logo from "../../assets/logo.svg";
import { Link } from "react-router-dom";
import { cartContext } from "../../context/CartContext";
import { wishlistContext } from "../../context/WishlistContext";
export default function Card({ productDetails }) {
  const { price, title, imageCover, ratingsAverage, category, id } =
    productDetails;
    
  const { addToCart } = useContext(cartContext);
  const { addToWishlist } = useContext(wishlistContext);

  return (
    <>
      <div className="md:w-1/5 w-40  hover:shadow-2xl bg-white border group  border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className="relative ">
          <img
            className="p-8 rounded-t-lg "
            src={imageCover}
            alt="product image"
          />
          <div className=" flex items-center justify-center  lg:gap-6 gap-2 lg:p-2  absolute bottom-3 right-0 left-0 opacity-0 group-hover:opacity-100 transition-all	duration-1000	">
            <Link
              onClick={()=>addToWishlist(id)}
              className="fa-solid fa-heart text-sm bg-lime-500 rounded-full p-3  text-white"
            ></Link>
            <div
              onClick={() => addToCart({ id })}
              className="fa-solid fa-cart-plus cursor-pointer text-sm bg-lime-500 rounded-full p-3 text-white"
            ></div>
            <Link
              to={`/product/${id}`}
              className="fa-regular fa-eye text-sm bg-lime-500 rounded-full p-3 text-white"
            ></Link>
          </div>
        </div>

        <div className="px-5 pb-5">
          <h4 className="text-xl font-semibold line-clamp-1 tracking-tight text-gray-900 dark:text-white">
            {title}
          </h4>
          <h5 className="font-semibold ">{category.name}</h5>

          <div className="flex items-center justify-between pt-2">
            <p className="text-lg font-bold text-gray-900 dark:text-white text-nowrap">
              {price} LE
            </p>
            <div>
              <i className="fa-solid fa-star text-[#FFD43B] pr-1"></i>
              <span>{ratingsAverage}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
