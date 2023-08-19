import React from "react";

const NavBar = () => {
  return (
    <nav className="bg-gray-900 rounded-full mx-1 my-1 p-5 text-white fixed top-0 left-0 right-0 z-50 bg-opacity-90 backdrop-blur-sm shadow-lg shadow-indigo-600/70">
      <ul className="items-center justify-center flex text-2xl">
        <li>
          <img className="w-13 h-11" src="/icon.png" alt="logo" />
        </li>
        <li className="ml-5 space text-3xl">WEATHER</li>
        <div className="hidden md:flex md:ml-auto">
          <li className="mx-3">Home</li>
          <li className="mx-3">About</li>
          <li className="mx-3">Contact</li>
        </div>
      </ul>
    </nav>
  );
};

export default NavBar;
