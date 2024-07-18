import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../components/Loading/Loading";

export default function Categories() {


  async function getCategories() {
    try {
      return await axios.get("https://ecommerce.routemisr.com/api/v1/categories");
      
    } catch (error) {
      console.log(error);
    }
  }
 const {data,isLoading}=useQuery({
  queryKey:['categories'],
  queryFn:getCategories
 })
console.log(data);
if(isLoading) return <Loading/>
  return (
    <>
    
      <div   className="py-8 flex flex-wrap gap-x-4 gap-y-8 justify-center items-center max-w-7xl mx-auto">
        {data.data.data.map((category) => (
          <div key={category._id} className="md:w-64 w-40 h-50 md:h-80 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="w-full h-48">
              <img className="object-cover w-full h-full rounded-t-lg" src={category.image} alt={category.name} />
            </div>
            <div className="pt-10 flex flex-col justify-center">
              <h5 className="mb-2 text-2xl font-bold text-center tracking-tight text-gray-900 dark:text-white">
                {category.name}
              </h5>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
