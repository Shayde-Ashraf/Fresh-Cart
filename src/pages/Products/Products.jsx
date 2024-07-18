import React from "react";
import Card from "../../components/Card/Card";
import axios from "axios";
import Loading from "../../components/Loading/Loading";
import { useQuery } from "@tanstack/react-query";

export default function Products() {
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
      <div className="max-w-7xl mx-auto gap-8 py-5 flex items-center justify-center flex-wrap">
        {data.data.data.map((product) => (
          <Card key={product.id} productDetails={product} />
        ))}
      </div>
    </>
  );
}
