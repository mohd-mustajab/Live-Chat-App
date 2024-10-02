import React from 'react'
import { FaSquareInstagram } from "react-icons/fa6";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaSquareGithub } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa6";
import { FaCopyright } from "react-icons/fa";
import "./main.css"

const Footer = () => {
  return (
    <footer><p><FaCopyright /> copyright</p>
    <div className="socialmedia">
     <Link to='https://www.instagram.com/mj__this_side/' target='_blank'><div ><FaSquareInstagram /></div></Link> 
     <Link to='https://x.com/mohdmustajab02' target='_blank'><div ><FaSquareXTwitter /></div></Link> 
     <Link to='https://github.com/mohd-mustajab' target='_blank'><div ><FaSquareGithub /></div></Link> 
     <Link to='https://www.linkedin.com/in/mohd-mustajab-174374271/' target='_blank'><div ><FaLinkedin /></div></Link> 
      </div>
      </footer>
  )
}

export default Footer
