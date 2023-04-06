import { useState } from "react";
import "./index.css";
const BannerSection = () => {
  const [showBannerSection, setShowBannerSection] = useState(true);
  const onClickX = () => {
    setShowBannerSection(false);
  };
  return (
    <>
      {showBannerSection && (
        <div className="banner-section-background-container">
          <div className="premium-details-container">
            <div>
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                alt="logo"
                className="banner-section-logo"
              />
            </div>
            <p>Buy Nxt Watch Premium Prepaid Plans with UPI</p>
            <div>
              <button>GET IT NOW</button>
            </div>
          </div>
          <div>
            <button onClick={onClickX}>X</button>
          </div>
        </div>
      )}
    </>
  );
};
export default BannerSection;
