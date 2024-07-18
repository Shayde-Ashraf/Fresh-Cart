import React from "react";
import slide1 from "../../assets/slide1.jpg";
import slide2 from "../../assets/slide2.jpg";
import slide3 from "../../assets/slide3.jpg";
import mainSlider from "../../assets/mainSlider.jpg";
import mainSlider1 from "../../assets/mainSlider1.jpg";

export default function MainSlider() {
  return (
    <div className="flex md:p-0 p-4 items-center">
      <div className="w-4/6">
      <swiper-container loop={true}  speed="500"  autoplay={true}>
        <swiper-slide>
          <img src={slide1} alt="" className="h-[310px] w-full object-cover " />
        </swiper-slide>
        <swiper-slide>
          <img src={slide2} alt="" className="h-[310px] w-full object-cover" />
        </swiper-slide>
        <swiper-slide>
          <img src={slide3} alt="" className="h-[310px] w-full object-cover" />
        </swiper-slide>
      </swiper-container>
      </div>

      <div className="w-2/6  ">
        <img
          src={mainSlider}
          alt=""
          className="h-[155px] w-full object-cover"
        />
        <img
          src={mainSlider1}
          alt=""
          className="h-[155px] w-full object-cover"
        />
      </div>
    </div>
  );
}
