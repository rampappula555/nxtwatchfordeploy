import "./index.css";
import { NavLink } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { VscFlame } from "react-icons/vsc";
import { FaGamepad } from "react-icons/fa";
import { BiListPlus } from "react-icons/bi";
const Links = () => {
  return (
    <div className="links-main-container">
      <div>
        <div>
          <NavLink>
            <AiFillHome />
            Home
          </NavLink>
        </div>
        <div>
          <NavLink>
            <VscFlame />
            Trending
          </NavLink>
        </div>
        <div>
          <NavLink>
            <FaGamepad />
            Gaming
          </NavLink>
        </div>
        <div>
          <NavLink>
            <BiListPlus />
            Saved Videos
          </NavLink>
        </div>
      </div>
      <div>
        <p>CONTACT US</p>
        <div>
          <img
            className="contact-us-logos"
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png "
            alt="facebook logo"
          />
          <img
            className="contact-us-logos"
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
            alt="twitter logo"
          />
          <img
            className="contact-us-logos"
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
            alt="linked in logo"
          />
        </div>
        <p>Enjoy! Now to see your channels and recommendations!</p>
      </div>
    </div>
  );
};
export default Links;
