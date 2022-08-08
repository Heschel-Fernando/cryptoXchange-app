import React from "react";

const ServiceCard = ({ color, title, icon, subtitle }) => {
  return (
    <div className="flex flex-row justify-start items-start white-glassmorphism p-3 m-2 cursor-pointer hover:shadow-xl">
      <div className={`w-10 h-10 rounded-full flex mt-5 ml-2 justify-center items-center ${color}`}>{icon}</div>
      <div className="ml-5 flex flex-col flex-1">
        <h3 className="mt-2 font-bold text-white text-lg">{title}</h3>
        <p className="mt-1 text-white text-sm md:w-9/12">{subtitle}</p>
      </div>
    </div>
  );
};

export default ServiceCard;
