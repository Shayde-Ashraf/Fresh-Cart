import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { userContext } from "./UserContext";
import toast from "react-hot-toast";

export const wishlistContext = createContext("");
export default function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState(null);
  const { token } = useContext(userContext);

  async function getWishlist() {
    const options = {
      url: "https://ecommerce.routemisr.com/api/v1/wishlist",
      method: "GET",
      headers: { token },
    }
    const{data}=await axios.request(options)
    if(data.data.length==0)setWishlist([])
      else setWishlist(data)

console.log(data);
 
  }
  async function addToWishlist(productId) {
    let alert;
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/wishlist",
        method: "POST",
        headers: { token },
        data: { productId },
      };
      alert = toast.loading("waiting...");
      const { data } = await axios.request(options);
      console.log(data);
      if(wishlist.data.length==0){
        setWishlist([])
      }else{
        setWishlist(data)
      }
      toast.dismiss(alert);
      toast.success(data.message);
    } catch (error) {
      toast.error(error);
    }
  }
  async function removeWishlistItems(id) {
    
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,
        method: "DELETE",
        headers: {
          token,
        },
      };
      const { data } = await axios.request(options);
        if(data.data.length==0)setWishlist([])
          else setWishlist(data)
      
      toast.success("Product Deleted Successfully")
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(()=>{
    getWishlist()
  },[])
  return (
    <wishlistContext.Provider value={{ addToWishlist, wishlist,getWishlist,removeWishlistItems,setWishlist }}>
      {children}
    </wishlistContext.Provider>
  );
}
