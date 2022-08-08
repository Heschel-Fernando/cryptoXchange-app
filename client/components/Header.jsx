import React, { useState, useEffect } from "react";
import { HiMenuAlt4 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";

const NavbarItem = ({ title, classProps }) => {
  return <li className={`mx-4 cursor-pointer ${classProps}`}>{title}</li>;
};

const Header = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <nav className=" w-full flex md:justify-center justify-between items-center p-4 pt-6 pb-2 ">
      <div className="md:flex-[0.5] flex-initial justify-center">
        <h1 className="cursor-pointer w-32 text-white font-bold text-3xl  ">cryptoXchange</h1>
      </div>

      <ul className="text-white md:flex hidden list-none flex-row justify-between items-center flex-initial ">
        {["Market", "Exchange", "Tutorials", "Wallets"].map((item, i) => (
          <NavbarItem title={item} key={item + i} />
        ))}
        <li className="bg-[#2952e3] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2426bd] ">Login</li>
      </ul>

      <div className="flex relative ">
        {toggleMenu ? (
          <AiOutlineClose
            fontSize={22}
            color="#fff"
            className=" text-white md:hidden cursor-pointer"
            onClick={() => setToggleMenu((prevState) => !prevState)}
          />
        ) : (
          <HiMenuAlt4
            fontSize={22}
            color="#fff"
            className=" text-white md:hidden cursor-pointer"
            onClick={() => setToggleMenu((prevState) => !prevState)}
          />
        )}
        {toggleMenu && (
          <ul className="z-10 top-0 fixed p-3 w-[70vw] text-white animate-slide-in -right-2 h-screen md:hidden shadow-2xl list-none flex flex-col justify-start items-end  rounded-md blue-glassmorphism ">
            <li className="text-xl w-full my-2 ">
              <AiOutlineClose onClick={() => setToggleMenu(false)} />
            </li>
            {["Market", "Exchange", "Tutorials", "Wallets"].map((item, i) => (
              <NavbarItem title={item} key={item + i} classProps="my-2  text-lg  " />
            ))}
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Header;
