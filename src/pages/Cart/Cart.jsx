import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { cartContext } from "../../context/CartContext";
import Loading from "../../components/Loading/Loading";

export default function Cart() {
  const { cartInfo, removeCartItems, updateCartItems, deleteCartItems } =
    useContext(cartContext);

  return (
    <>
      {cartInfo === null ? (
        <Loading />
      ) : (
        <section className="py-5 max-w-6xl   mx-auto">
          <div className=" bg-neutral-100">
            {cartInfo.length === 0 ? (
              <div className="flex flex-col justify-center pt-10 pb-16 items-center">
                <h3 className="text-lg py-2">there are not items yet</h3>
                <Link
                  to="/"
                  className="bg-lime-600 text-white p-3 rounded-md hover:bg-lime-700"
                >
                  ADD YOUR FIRST PRODUCT TO CART
                </Link>
              </div>
            ) : (
              <>
                <div className="relative  overflow-x-auto shadow-md sm:rounded-lg">
                  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs  text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
                      {cartInfo?.data?.products?.map((item) => (
                        <tr
                          key={item._id}
                          className=" odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                        >
                          <td
                            scope="row"
                            className="px-6 py-4 flex items-center gap-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                          >
                            <img
                              src={item.product.imageCover}
                              className="w-20"
                            />
                            <h2>
                              {item?.product?.title
                                .split(" ")
                                .splice(0, 4)
                                .join(" ")}
                            </h2>
                          </td>
                          <td className="px-6 py-4">
                            {item?.product?.category?.name}
                          </td>
                          <td className="px-4 py-4">
                            <div className="flex items-center gap-2">
                              <i
                                className="fa fa-minus cursor-pointer bg-lime-500 text-white p-1 rounded-full"
                                onClick={() => {
                                  const newCount = item.count - 1;
                                  if (newCount >= 1) {
                                    updateCartItems({
                                      id: item.product._id,
                                      count: newCount,
                                    });
                                  }
                                }}
                              ></i>
                              {item.count}

                              <i
                                className="fa fa-plus cursor-pointer bg-lime-500 text-white p-1 rounded-full"
                                onClick={() =>
                                  updateCartItems({
                                    id: item.product._id,
                                    count: item.count + 1,
                                  })
                                }
                              ></i>
                            </div>
                          </td>
                          <td className="px-6 py-4">{item.price} LE</td>
                          <td className="px-6 py-4">
                            <button
                              onClick={() =>
                                removeCartItems({
                                  id: item.product._id,
                                })
                              }
                              className="font-medium text-red-600 dark:text-blue-500 hover:underline"
                            >
                              Remove
                            </button>
                          </td>
                        </tr>
                      ))}
                      <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                        <td className="px-4 py-6 text-center text-xl font-semibold text-neutral-800">
                          TOTAL PRICE :
                        </td>
                        <td className="px-4 py-6 text-neutral-800   font-semibold text-lg">
                          {cartInfo?.data.totalCartPrice} LE
                        </td>
                        <td className="px-4 py-6 text-neutral-800   font-semibold text-lg">
                          {" "}
                          TOTAL ITEMS : {cartInfo?.numOfCartItems}
                        </td>
                        <td className=" pl-10 py-6  text-neutral-800 font-semibold text-lg"></td>
                        <td className="px-4 py-6">
                          <button
                            onClick={deleteCartItems}
                            className="bg-red-500 hover:bg-red-600 text-white py-2 px-6 rounded-lg font-semibold fs-5"
                          >
                            Clear Cart
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>
          {cartInfo.length === 0 ? (
            ""
          ) : (
            <>
              <div className="flex items-center justify-end  pt-3 ">
                <Link
                  to="/checkout"
                  className="bg-lime-500 hover:bg-lime-600 text-white py-2 px-5 rounded-md "
                >
                  Next Step <i className="fa-solid fa-arrow-right"></i>
                </Link>
              </div>
            </>
          )}
        </section>
      )}
    </>
  );
}
