import React from "react";
import amazonPay from '../../assets/AmazonPay.png'
import masterCard from '../../assets/MasterCard.png'
import americanExpress from '../../assets/americanExpress.png'
import payPal from '../../assets/PayPal.png'
import appStore from '../../assets/appStore.png'
import googlePlay from '../../assets/googlePlay.png'

export default function Footer() {
  return (
    <>
      <footer className="bg-neutral-200 p-10 md:absolute md:left-0 md:right-0 md:bottom-0 ">
        <div className=" border-neutral-300 border-2 border-t-0 border-l-0 border-r-0 pb-7">
          <h2 className="text-2xl pb-2"> Get The Fresh Cart App</h2>
          <p>
            we will send you a link, open it on your phone to download the app
          </p>
          <div className=" flex flex-col md:flex-row gap-4 items-center pt-3">
            <input
              type="text"
              placeholder="Email.."
              className="md:w-3/4 w-full rounded-lg"
            />
            <button className="bg-lime-600 text-white py-2 px-6 rounded-lg">
              Send App Link
            </button>
          </div>
        </div>
        <div className="md:py-5 flex md:flex-row flex-col items-center justify-between  border-2 border-t-0 border-l-0 border-r-0 border-neutral-300 ">
          <div className=" flex flex-col md:flex-row items-center ">
          <h3 className="text-nowrap  text-xl md:text-lg  md:pr-3">Payment Partners </h3>
          <div className="flex items-center justify-center gap-2 ">
            <img src={masterCard} alt="master card logo"  className="w-12 pt-3 md:pt-0"/>
          <img src={amazonPay} alt="amazonPay logo" className="w-28 " />
          <img src={americanExpress} alt="master card logo"  className="w-[5rem] "/>
          <img src={payPal} alt="master card logo"  className="w-20 md:py-0 py-5"/>
          </div>
          
        </div>
        <div className="  flex flex-col md:flex-row items-center gap-5">
          <h3 className="text-lg">Get deliveries with FreshCart </h3>
          <div className="flex gap-5 ">
            <img src={appStore} alt="app store logo" className="w-28" />
          <img src={googlePlay} alt="google Play logo"  className="w-32"/>
          </div>
          
        </div>
        </div>
        
      </footer>
    </>
  );
}
