import { createContext, useContext, useState } from "react";
import { userContext } from "./UserContext";
import axios from "axios";
import toast from "react-hot-toast";

export const cartContext = createContext(null);
export default function CartProvider({ children }) {
  const { token } = useContext(userContext);
  const[cartInfo,setCartInfo]=useState(null)

  async function addToCart({ id }) {
    let alert;
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/cart",
        method: "POST",
        headers: {
          token,
        },
        data: {
          productId: id,
        },
      };
      alert = toast.loading("waiting...");
      const { data } = await axios.request(options);
      setCartInfo(data)
      console.log(data);
      toast.dismiss(alert);
      toast.success("product added");
    } catch (error) {
      toast.error(error);
    }
  }
  async function getCartItems() {
    
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/cart",
        method: "GET",
        headers: {
          token,
        },
      };
      const { data } = await axios.request(options);
      if(data.numOfCartItems==0){
        setCartInfo([])
      }else{
        setCartInfo(data)
      }
      console.log(data);
    } catch (error) {
      if(error.response.data.message.includes('No cart')){
        setCartInfo([])
    }
      console.log(error);
    }
  }
  async function removeCartItems({id}) {
    
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        method: "DELETE",
        headers: {
          token,
        },
      };
      const { data } = await axios.request(options);
      if(data.numOfCartItems===0){
        setCartInfo([])
      }else{
        setCartInfo(data)
      }
      toast.success("Product Deleted Successfully")
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }
  async function updateCartItems({id,count}) {
    
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        method: "PUT",
        headers: {
          token,
        },
        data:{
            count,
        }
      };
      const { data } = await axios.request(options);
      setCartInfo(data)
      console.log(data);
    } catch (error) {
        
       
      console.log(error);
    }
  }
  async function deleteCartItems() {
    
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/cart`,
        method: "DELETE",
        headers: {
          token,
        }
      };
      const { data } = await axios.request(options);
      if(data.message==='success'){
        setCartInfo([])
      }
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <cartContext.Provider value={{ addToCart ,getCartItems,cartInfo,removeCartItems,updateCartItems,deleteCartItems,setCartInfo}}>
      {children}
    </cartContext.Provider>
  );
}
