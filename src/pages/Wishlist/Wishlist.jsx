import React, { useContext, useEffect } from "react";
import { wishlistContext } from "../../context/WishlistContext";
import Loading from "../../components/Loading/Loading";
import { Link } from "react-router-dom";
import { data } from "autoprefixer";

export default function Wishlist() {
  const { wishlist, removeWishlistItems,  } =
    useContext(wishlistContext);
  return (
    <>
      {wishlist === null ? (
        <Loading />
      ) : (
        <section className="py-5 max-w-6xl mx-auto">
          <div className="bg-neutral-100">
            {wishlist?.length == 0 ? (
              <div className="flex flex-col justify-center pt-10 pb-16 items-center">
                <h3 className="text-lg py-2">There are no items yet</h3>
                <Link
                  to="/"
                  className="bg-lime-600 text-white p-3 rounded-md hover:bg-lime-700"
                >
                  ADD YOUR FIRST PRODUCT TO WISHLIST
                </Link>
              </div>
            ) : (
              <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Product name
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Category
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Count
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Price
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {wishlist?.data?.map((item) => (
                      <tr
                        key={item.id}
                        className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                      >
                        <td
                          scope="row"
                          className="px-6 py-4 flex items-center gap-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          <img src={item?.imageCover} className="w-20" />
                          <h2>
                            {item?.title?.split(" ").splice(0, 4).join(" ")}
                          </h2>
                        </td>
                        <td className="px-6 py-4">{item?.category?.name}</td>
                        <td className="px-4 py-4"></td>
                        <td className="px-6 py-4">{item?.price} LE</td>
                        <td className="px-6 py-4">
                          <button
                            onClick={()=>removeWishlistItems(item?.id)}
                            className="font-medium text-red-600 dark:text-blue-500 hover:underline"
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </section>
      )}
    </>
  );
}
