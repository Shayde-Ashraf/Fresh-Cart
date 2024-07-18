import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
export default function Register() {
  const [errorMsg, setErrorMsg] = useState(null)
  const navigate=useNavigate()
  const phoneRegex = /^01[0152][0-9]{8}$/;
  const passwordRegex = /^[A-Z][a-z0-9A-Z]{5,25}$/;
  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Name is Required")
      .min(3, "Name must be at least 3 character")
      .max(10, "Name must be less than 10 character"),
    email: Yup.string()
      .required("Email is Required")
      .email("Email is not valid"),
    phone: Yup.string()
      .required("Mobile Number is Required")
      .matches(phoneRegex, "Only Egyptian Number"),
    password: Yup.string()
      .required("Password is Required")
      .matches(
        passwordRegex,
        "Password must be start with Uppercase character and at least 5 numbers or characters"
      ),
    rePassword: Yup.string()
      .required("RePassword is Required")
      .oneOf([Yup.ref("password")], "Password and Re-Password not matched"),
  });
 async function onSubmit(values) {
  let id;
  try {
    const options={
      url:'https://ecommerce.routemisr.com/api/v1/auth/signup',
      method:'post',
      data:values
    }
    id= toast.loading('waiting...')
    const{data}=await axios.request(options)
    console.log(data);
    toast.dismiss(id)
    toast.success('User Created successfully')
    if(data.message=='success'){
      navigate('/login')
    }
  }
   catch (error) {
    console.log(error);
    setErrorMsg(error.response.data.message)
    toast.dismiss(id)
    toast.error(error.response.data.message)
    
  }}
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    onSubmit,
    validationSchema,
  });
  return (
    <>
      <section className="max-w-3xl md:px-0  px-8 mx-auto py-10">
        <div className="flex items-center gap-2 pb-5 ">
          <i className="fa-solid text-lime-600 fa-user text-lg"></i>
          <h1 className="text-lg text-neutral-500 font-semibold">
            {" "}
            Register Now
          </h1>
        </div>

        <form onSubmit={formik.handleSubmit}>
          <div className="relative z-0 w-full pb-5 group">
            <input
              type="text"
              id="floating_first_name"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-solid border-gray-300 appearance-none  dark:focus:border-lime-500 focus:outline-none focus:ring-0 focus:border-lime-600 peer"
              placeholder=" "
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.name && formik.touched.name ? (
              <div
                className="p-3 mt-3 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                <span className="font-medium"> {formik.errors.name}.</span>
              </div>
            ) : (
              ""
            )}
            <label
              htmlFor="floating_first_name"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-lime-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Name
            </label>
          </div>
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
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-solid border-gray-300 appearance-none   focus:outline-none focus:ring-0 focus:border-lime-600 peer"
              placeholder=" "
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.password && formik.touched.password? (
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
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="password"
              id="floating_repeat_password"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-solid border-gray-300 appearance-none dark:text-white dark:border-gray-600  focus:outline-none focus:ring-0 focus:border-lime-600 peer"
              placeholder=" "
              name="rePassword"
              value={formik.values.rePassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.rePassword && formik.touched.rePassword? (
              <div
                className="p-3 mt-3 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                <span className="font-medium">{formik.errors.rePassword}</span>
              </div>
            ) : (
              ""
            )}
            <label
              htmlFor="floating_repeat_password"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-lime-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Confirm Password
            </label>
          </div>

          <div className="relative z-0 w-full mb-5 group ">
            <input
              type="tel"
              id="floating_phone"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-solid border-gray-300 appearance-none dark:text-white dark:border-gray-600  focus:outline-none focus:ring-0 focus:border-lime-600 peer"
              placeholder=" "
              name="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.phone && formik.touched.phone? (
              <div
                className="p-3 mt-3 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                <span className="font-medium">{formik.errors.phone}</span>
              </div>
            ) : (
              ""
            )}
            <label
              htmlFor="floating_phone"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-lime-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Phone number
            </label>
          </div>

          <button
            type="submit"
            className="text-white bg-lime-600 hover:bg-lime-800 focus:ring-4 focus:outline-none focus:ring-lime-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            SIGN UP
          </button>
        </form>
      </section>
    </>
  );
}
