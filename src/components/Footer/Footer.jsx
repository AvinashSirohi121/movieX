/* eslint-disable react/no-unescaped-entities */
import "./Footer.scss"

import {
 
  FaInstagram,
  
  FaLinkedin,
  FaGithub,
} from "react-icons/fa";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import { Link } from "react-router-dom";



const Footer = () => {
  return (
    <footer className="footer">
      <ContentWrapper>
        <ul className="menuItems">
          <li className="menuItem">Terms Of Use</li>
          <li className="menuItem">Privacy-Policy</li>
          <li className="menuItem">About</li>
          <li className="menuItem">Blog</li>
          <li className="menuItem">FAQ</li>
        </ul>
        <div className="infoText">
          Thank you for visiting our movie website! We are thrilled to present
          you with a comprehensive platform where you can explore the world of
          cinema and discover your favorite movies. Our website is meticulously
          crafted using ReactJS, SCSS, JavaScript, and Redux Toolkit, ensuring a
          seamless and user-friendly experience. At the heart of our website
          lies the integration of The Movie Database (TMDb) APIs, providing you
          with access to a vast repository of movie information. Browse through
          our extensive catalog of movies, read detailed descriptions, and stay
          updated with the latest releases. Our website also features
          user-friendly search and filtering options, allowing you to quickly
          find the movies that pique your interest. We are passionate about
          movies and strive to create a vibrant community of movie enthusiasts.
          Join our online forums and engage in discussions with fellow movie
          lovers, share your thoughts and recommendations, and stay connected
          with the latest trends in the film industry. We appreciate your
          support and hope you enjoy your time on our website. If you have any
          questions or suggestions, please don't hesitate to contact us. Your
          feedback is invaluable in helping us improve and enhance your
          movie-watching experience. Happy movie watching!
        </div>
        <Link
          className="link"
          to="https://www.linkedin.com/in/avinashsirohi86/"
        >
          <div style={{ fontStyle: "italic", marginBottom: "20px" }}>
            by - Avinash Sirohi
          </div>
        </Link>
        <div  className="socialIcons ">
          <Link to="https://www.instagram.com/avinash_sirohi86/">
            <span className="icon link">
              <FaInstagram />
            </span>
          </Link>
          <Link  to="https://github.com/AvinashSirohi121">
            <span className="icon link">
              <FaGithub />
            </span>
          </Link>
          <Link to="https://www.linkedin.com/in/avinashsirohi86/">
            <span className="icon link">
              <FaLinkedin />
            </span>
          </Link>
        </div>
      </ContentWrapper>
    </footer>
  );
};

export default Footer;
