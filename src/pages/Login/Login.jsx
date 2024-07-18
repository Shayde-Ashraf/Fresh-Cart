import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { userContext } from "../../context/UserContext";
export default function Register() {
  const [errorMsg, setErrorMsg] = useState(null);
  const { token, setToken } = useContext(userContext);
  const navigate = useNavigate();
  const passwordRegex = /^[A-Z][a-z0-9A-Z]{5,25}$/;
  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Email is Required")
      .email("Email is not valid"),
    password: Yup.string()
      .required("Password is Required")
      .matches(
        passwordRegex,
        "Password must be start with Uppercase character and at least 5 numbers or characters"
      ),
  });
  async function onSubmit(values) {
    let alert;
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/signin",
        method: "post",
        data: values,
      };
      alert = toast.loading("waiting...");
      const { data } = await axios.request(options);
      console.log(data);
      toast.dismiss(alert);
      toast.success("User Logged successfully");
      if (data.message == "success") {
        localStorage.setItem("token", data.token);
        setToken(data.token);
        console.log(token);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      setErrorMsg(error.response.data.message);
      toast.dismiss(id);
      toast.error(error.response.data.message);
    }
  }
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit,
    validationSchema,
  });
  return (
    <>
      <section className="max-w-3xl px-10 md:px-0 mx-auto pt-20 md:py-10">
        <div className="flex items-center gap-2 pb-5 ">
          <i className="fa-solid text-lime-600 fa-user text-lg"></i>
          <h1 className="text-xl text-neutral-500 font-semibold">Login</h1>
        </div>

        <form onSubmit={formik.handleSubmit}>
          <div className="relative z-0 w-full pb-5 group">
            <input
              type="user"
              id="floating_email"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-solid border-b-2 border-gray-300 appearance-none  dark:focus:border-lime-500 focus:outline-none focus:ring-0 focus:border-lime-600 peer"
              placeholder=" "
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.email && formik.touched.email ? (
              <div
                className="p-3 mt-3 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                <span className="font-medium">{formik.errors.email}</span>
              </div>
            ) : (
              ""
            )}
            <label
              htmlFor="floating_email"
              className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-lime-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Email address
            </label>
          </div>
          <div className="relative z-0 w-full pb-5 group">
            <input
              type="password"
              id="floating_password"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-solid border-b-2 border-gray-300 appearance-none   focus:outline-none focus:ring-0 focus:border-lime-600 peer"
              placeholder=" "
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.password && formik.touched.password ? (
              <div
                className="p-3 mt-3 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                <span className="font-medium">{formik.errors.password}</span>
              </div>
            ) : (
              ""
            )}
            <label
              htmlFor="floating_password"
              className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-lime-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Password
            </label>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between">
            <button
              type="submit"
              className="text-white  bg-lime-600 hover:bg-lime-800 focus:ring-4 focus:outline-none focus:ring-lime-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            >
              LOGIN
            </button>
            <p className="pt-5 md:pt-0">
              Don't have an account?
              <Link to={"/signup"} className=" text-blue-700 ">
                Sign up
              </Link>{" "}
            </p>
          </div>
        </form>
        <div className="flex justify-center cursor-pointer">
          <a className="underline font-semibold text-blue-500 md:py-0 py-5"> Forget Password ?</a>
        </div>
        
      </section>
    </>
  );
}
