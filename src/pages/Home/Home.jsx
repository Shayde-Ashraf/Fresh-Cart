import React, { useEffect, useState } from "react";
import Card from "../../components/Card/Card";
import axios from "axios";
import Loading from "../../components/Loading/Loading";
import MainSlider from "../../components/MainSlider/MainSlider";
import CategorySlider from "../../components/CategorySlider/CategorySlider";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  async function getProducts() {
    const options = {
      url: "https://ecommerce.routemisr.com/api/v1/products",
      method: "get",
    };
    return await axios.request(options);
  }
  const {data,isLoading} = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  if (isLoading) return <Loading />;
  return (
    <>
      <MainSlider />
      <CategorySlider />
    
      <div className="max-w-7xl mx-auto gap-8 flex items-center justify-center flex-wrap">
        {data.data.data.map((product) => (
          <Card key={product.id} productDetails={product} />
        ))}
      </div>
    </>
  );
}
