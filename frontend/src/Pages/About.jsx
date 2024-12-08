import React from "react";
import TitleText from "../Components/TitleText";
import { assets } from "../assets/assets";
import NewsLetter from "../Components/NewsLetter";

const About = () => {
  return (
    <div className="">
      <div className="text-2xl text-center pt-8 border-t">
        <TitleText text1={"ABOUT"} text2={"US"}/>
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-16">
    <img className="w-full md:max-w-[450px] rounded-lg" src={assets.about_img}alt="" />
    <div className="flex flex-col justify-center gap-6 md:w-2/4 to-gray-600">
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde, nobis accusantium. Impedit facere ducimus unde praesentium quisquam. Sit, quia consequuntur?</p>
    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ex architecto repellat tempore quod quisquam ullam dolorem earum molestiae nemo, quos corrupti laudantium voluptatibus facere nam maiores ipsum, vitae maxime libero autem dolor animi officiis nobis, harum velit. Eos sequi iusto facilis eligendi consectetur neque beatae corrupti reiciendis alias? Laboriosam, unde.</p>
    <b className="text-gray-800">Our Mission</b>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque modi libero qui fugiat odio id ducimus reiciendis, dignissimos animi cum?</p>
    </div>

    
    </div>
    <div className="text-4xl py-4">
      <TitleText text1={"WHY"} text2={"CHOOSE US"}/>
    </div>

    <div className="flex flex-col md:flex-row text-sm mb-20">
      <div className="border px-10 md:px-16 py-20 flex flex-col gap-5">
        <b>Quality Assurence :</b>
        <p className="text-gray-600">Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis facere commodi incidunt perspiciatis dignissimos natus aliquid rem minus ipsam animi?</p>
      </div>
      <div className="border px-10 md:px-16 py-20 flex flex-col gap-5">
        <b>Convenience :</b>
        <p className="text-gray-600">Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis facere commodi incidunt perspiciatis dignissimos natus aliquid rem minus ipsam animi?</p>
      </div>
      <div className="border px-10 md:px-16 py-20 flex flex-col gap-5">
        <b>Exceptional Customer Servies :</b>
        <p className="text-gray-600">Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis facere commodi incidunt perspiciatis dignissimos natus aliquid rem minus ipsam animi?</p>
      </div>
      </div>

     <NewsLetter />


    </div>
  );
};

export default About;
