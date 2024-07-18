import axios from "axios";
import React, { useEffect, useState } from "react";
import Loading from "../Loading/Loading";
import { useQuery } from "@tanstack/react-query";

export default function CategorySlider() {
  const [categories, setCategories] = useState(null);

  async function getCategories() {
    const options = {
      url: "https://ecommerce.routemisr.com/api/v1/categories",
      method: "GET",
    };
    return await axios.request(options);
  }

  const { data, isLoading } = useQuery({
    queryKey: ["categorySlider"],
    queryFn: getCategories,
  });
  if(isLoading) return <Loading/>
  return (
    <>
      
      <section className=" hidden md:block pt-2 pb-8">
        <h2 className="font-semibold text-neutral-600 text-lg md:pl-0 pl-3 pb-3">
          Shop Popular Categories
        </h2>
        <swiper-container
          loop={true}
          slides-per-view={6}
          speed={500}
          autoplay={true} 
          
        >
          {data.data.data.map((category) => (
            <swiper-slide key={category._id}>
              <img
                src={category.image}
                alt=""
                className="w-full object-cover h-72"
              />
              <h3>{category.title}</h3>
            </swiper-slide>
          ))}
        </swiper-container>
      </section>
      
    </>
  );
}
