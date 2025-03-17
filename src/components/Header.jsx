import React from "react";
import {  Image   } from "react-bootstrap";
import logoImage from "../assets/images/logo.png"; 
import { FaUser } from "react-icons/fa";
const Header = () => {
  return (
    <header className="header">
      <Image
            src={logoImage}
            alt="Banner"
            fluid
            className=" mb-2  logo-im" 
            style={{ objectFit: "cover" , width: "150px"}} 
          />
      <nav>
        <ul>
        
          <li><FaUser /> <span>Fernando</span></li>
          
        </ul>
      </nav>
    </header>
  );
};

export default Header;