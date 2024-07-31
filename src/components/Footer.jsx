import React from "react";
import footerIcon1 from "../assets/svg/footerSvg1.svg";
import footerIcon2 from "../assets/svg/footerSvg2.svg";

const Footer = () => {
  return (
    <div className="relative">
      <img src={footerIcon1} alt="" className="absolute w-full" />
      <img src={footerIcon2} alt="" className=" w-full" />
    </div>
  );
};

export default Footer;
