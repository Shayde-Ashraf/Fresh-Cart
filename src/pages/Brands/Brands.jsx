import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../components/Loading/Loading";

export default function Brands() {
  async function getBrands() {
    try {
      return await axios.get("https://ecommerce.routemisr.com/api/v1/brands")
    } catch (error) {
      console.log(error);
    }
  }
  const{data,isLoading}=useQuery({
    queryKey:['brands'],
    queryFn:getBrands
  })
if(isLoading)return <Loading/>

  return (
    <>
    <section className="py-8">
      <h2 className="text-center text-5xl font-bold text-zinc-900 pb-20">All Brands</h2>
      <div className="max-w-7xl mx-auto  flex flex-wrap gap-y-10 gap-x-5   items-center justify-center  ">
        {data.data.data.map((brand) =><div key={brand._id} className="w-1/4 border-solid border-2 border-gray-100 rounded-lg py-5 hover:shadow-md hover:transition-all hover:shadow-lime-300">
              <img src={brand.image} alt="" />
              <h2 className="text-lg font-semibold text-lime-500 text-center">{brand.name}</h2>
            </div>
          )}
      </div>
    </section>
     
    </>
  );
}
