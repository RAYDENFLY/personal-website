import React from "react";
import {
  FaLaptopCode, FaPalette, FaMusic, FaCamera, FaPen,
  FaMoon, FaCoffee, FaStar, FaLaptop,
  FaGithub, FaLinkedin, FaTwitter, FaInstagram, FaDiscord
} from "react-icons/fa";
import { MdEmail, MdFoodBank, MdOutlineAnimation } from "react-icons/md";
import { BsInfinity } from "react-icons/bs";

export const iconMap: Record<string, React.ReactNode> = {
  // Social
  "MdEmail": <MdEmail />,
  "FaGithub": <FaGithub />,
  "FaLinkedin": <FaLinkedin />,
  "FaTwitter": <FaTwitter />,
  "FaInstagram": <FaInstagram />,
  "FaDiscord": <FaDiscord />,
  
  // Interests
  "FaLaptopCode": <FaLaptopCode />,
  "FaPalette": <FaPalette />,
  "MdAnimationIcon": <MdOutlineAnimation />,
  "FaMusic": <FaMusic />,
  "FaCamera": <FaCamera />,
  "FaPen": <FaPen />,
  
  // Stats
  "BsInfinity": <BsInfinity />,
  
  // Favorites
  "MdFoodBank": <MdFoodBank />,
  "FaMoon": <FaMoon />,
  "MdOutlineAnimation": <MdOutlineAnimation />,
  "FaCoffee": <FaCoffee />,
  
  // Gallery
  "FaStar": <FaStar />,
  "FaLaptop": <FaLaptop />,
};

export function renderIcon(iconName: string | React.ReactNode): React.ReactNode {
  if (typeof iconName === "string") {
    return iconMap[iconName] || iconName;
  }
  return iconName;
}
