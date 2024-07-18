import axios from "axios";
import { jwtDecode } from "jwt-decode";
import React, { useContext, useEffect, useState } from "react";
import { userContext } from "../../context/UserContext";
import Loading from "../../components/Loading/Loading";
import { Link, useNavigate } from "react-router-dom";

export default function AllOrders() {
  const [orders, setOrders] = useState(null);
  const { token } = useContext(userContext);
  const { id } = jwtDecode(token);
  async function getUserOrders() {
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/orders/user/${id}`,
        method: "GET",
      };
      const { data } = await axios.request(options);
      console.log(data);
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  }
  function deleteOrders(){
    setOrders([])
    console.log(orders);
  }
  useEffect(() => {
    getUserOrders();
  }, []);
  return (
    <>
      {!orders ? (
        <Loading />
      ) : (
        <>
          {orders.length === 0 ? (
            <>
              <div className="bg-gray-100 mt-5 py-8 flex flex-col items-center justify-center">
                <h2 className="text-2xl py-5">No Any Orders</h2>
                <Link
                  to="/cart"
                  className="block bg-lime-500 rounded-md p-2 text-white"
                >
                  Make Your First Order
                </Link>
              </div>
            </>
          ) : (
            <>
              <div>
                {orders?.map((order) => (
                  <section key={order.id} className="py-5">
                    <div className="border-2 border-solid border-gray-100 p-3 ">
                      <div className="flex flex-col md:flex-row py-5 items-center justify-between ">
                        <h5 className="text-lg font-semibold pb-3 md:pb-0 text-neutral-500">
                          Order Id:
                          <span className="font-normal text-neutral-700">
                            #{order.id}
                          </span>
                        </h5>
                        <div className="flex items-center gap-5 ">
                          {order.isDelivered ? (
                            <p className="bg-lime-500 text-white p-1 rounded-lg">
                              Delivered
                            </p>
                          ) : (
                            <p className="bg-yellow-300 text-white p-1 rounded-lg">
                              Non Delivered
                            </p>
                          )}
                          {order.isPaid ? (
                            <p className="bg-lime-500 text-white p-1 rounded-lg">
                              Payed
                            </p>
                          ) : (
                            <p className="bg-red-500 text-white p-1 rounded-lg">
                              Cash On Delivery
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-wrap items-center  gap-2  ">
                        {order.cartItems.map((cartItem) => (
                          <>
                            <div
                              key={cartItem._id}
                              className="w-3/12 md:w-1/12   border border-gray-200 p-2 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
                            >
                              <img
                                className="rounded-t-lg w-full "
                                src={cartItem.product.imageCover}
                                alt=""
                              />
                              <h5 className="mb-2 text-md  font-semibold tracking-tight text-gray-900 dark:text-white">
                                {cartItem.product.title
                                  .split(" ")
                                  .splice(0, 2)
                                  .join(" ")}
                              </h5>
                              <p className="mb-3 font-semibold text-gray-700 dark:text-gray-400">
                                {cartItem.price} L.E
                              </p>
                            </div>
                          </>
                        ))}
                      </div>
                      <div className="flex justify-end">
                        <button className="bg-red-500 text-white p-2 rounded-sm " onClick={deleteOrders}>
                          Cancel Order
                        </button>
                      </div>
                    </div>
                  </section>
                ))}
              </div>
            </>
          )}
        </>
      )}
    </>
  );
}
