import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { cartContext } from "../../context/CartContext";
import { userContext } from "../../context/UserContext";
import { data } from "autoprefixer";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const navigate=useNavigate()
  const { cartInfo, setCartInfo } = useContext(cartContext);
  const { token } = useContext(userContext);
  const [orderType, setOrderType] = useState(null);
  const formik = useFormik({
    initialValues: {
      shippingAddress: {
        details: "",
        phone: "",
        city: "",
      },
    },
    onSubmit: (values) => {
      if (orderType === "cash") {
        createCashOrder(values);
      } else {
        createOnlineOrder(values);
      }
    },
  });
  async function createCashOrder(values) {
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/orders/${cartInfo.data._id}`,
        method: "POST",
        headers: { token },
        data: values,
      };
      const { data } = await axios.request(options);
      console.log(data);
      navigate('/allorders')
      setCartInfo([]);
    } catch (error) {
      console.log(error);
    }
  }
  async function createOnlineOrder(values) {
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartInfo.data._id}?url=http://localhost:5173`,
        method: "POST",
        headers: { token },
        data: values,
      };
      const { data } = await axios.request(options);
      console.log(data);
      if (data.status === "success") {
        window.location.href = data.session.url;
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="max-w-6xl mx-auto py-5">
        <h2 className="text-xl font-semibold text-neutral-500">
          Shipping Address
        </h2>
        <form
          onSubmit={formik.handleSubmit}
          className="py-3 flex flex-col gap-5"
        >
          <input
            value={formik.values.shippingAddress.city}
            onChange={formik.handleChange}
            name="shippingAddress.city"
            type="text"
            placeholder="City"
            className=" w-full p-3 border-2 border-solid text-gray-900 rounded-md border-gray-300  text-xs focus:ring-lime-500 focus:border-lime-500 "
          />
          <input
            value={formik.values.shippingAddress.phone}
            onChange={formik.handleChange}
            name="shippingAddress.phone"
            type="tel"
            placeholder="Phone"
            className=" w-full p-3 border-2 border-solid text-gray-900 rounded-md border-gray-300  text-xs focus:ring-lime-500 focus:border-lime-500 "
          />
          <textarea
            value={formik.values.shippingAddress.details}
            onChange={formik.handleChange}
            name="shippingAddress.details"
            placeholder="Details"
            className=" w-full h-16 p-3 border-2 border-solid text-gray-900 rounded-md border-gray-300  text-xs focus:ring-lime-500 focus:border-lime-500 "
          ></textarea>
          <div className="flex items-center gap-5">
            <button
              onClick={() => setOrderType("cash")}
              type="submit"
              className="bg-lime-500 py-2 px-5 text-white rounded-lg"
            >
              Cash Order
            </button>
            <button
              onClick={() => setOrderType("online")}
              type="submit"
              className="bg-red-500 py-2 px-5 text-white rounded-lg"
            >
              Online Order
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
