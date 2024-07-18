import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import ReactImageGallery from "react-image-gallery";
import { cartContext } from "../../context/CartContext";

export default function ProductDetails() {
  const [details, setDetails] = useState(null);
  const { id } = useParams();
  const{addToCart}=useContext(cartContext)
  const images=details?.images.map((imageUrl)=>{return({
    original:imageUrl,
    thumbnail:imageUrl,
})

  })
  async function getProductDetails() {
    const { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products/${id}`
    );
    setDetails(data.data);
  }
  useEffect(() => {
    getProductDetails();
  }, []);

  return (
    <>
    {details?<div className="max-w-7xl mx-auto flex flex-col md:flex-row p-5">
        <div className="md:w-3/12 w-3/4 mx-auto">
          <ReactImageGallery items={images} showNav={false} showPlayButton={false} showFullscreenButton={false}/>
        </div>
        <div className="md:w-9/12 md:pl-10 py-5 md:py-0 flex md:gap-0 gap-3 flex-col items-center justify-center ">
          <h2 className="text-xl">{details?.title}</h2>
          
          <h3 className="text-lime-600 font-semibold"><span>{details?.brand.name}</span> {details?.category.name} </h3>
          <p className="text-zinc-500 text-center md:text-start">{details?.description}</p>
          <div className="flex items-center justify-between py-2 ">
            <p className="text-lg font-semibold">Price: <span className="font-normal text-zinc-500">{details.price} LE</span> </p>
            <div className="flex items-center gap-1">
                <i className="fa-solid fa-star text-yellow-300"></i>
                <p>{details?.ratingsAverage}</p>
            </div>
          
          </div>
          
          <p className="text-center font-semibold text-neutral-600 pb-5 md:pb-2"> Available Stock : {details?.quantity}</p>
          <button onClick={()=>{addToCart({id:details.id})}}  className="w-full bg-lime-600  p-1 rounded-3xl text-white hover:bg-lime-700">Add To Cart</button>
        </div>
      </div>:<Loading/>}

    </>
  );
}
