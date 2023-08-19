import React from 'react'

const Footer = () => {
  return (
    <div className="mt-10 bg-gray-900 text-white text-center text-xl py-5">
      WEATHER APP
      <p className="my-3">Created by Aman Tiwari</p>
      <a href="https://linkedin.com/in/aman-tiwari001/">
        <img
          className="h-8 w-8 inline mx-2"
          src="/linkedin.png"
          alt="linkedin"
        />
      </a>
      <a href="https://github.com/aman-tiwari001/">
        <img className="h-8 w-8 inline" src="/github.png" alt="github" />
      </a>
    </div>
  );
}

export default Footer;