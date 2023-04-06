import "./index.css";
const Header = () => {
  return (
    <div className="header-main-container">
      <div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
          alt="logo"
          className="header-logo"
        />
      </div>
      <div className="profile-and-logout-button-container">
        <div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
            alt="profile"
            className="profile-photo"
          />
        </div>
        <div>
          <button>Logout</button>
        </div>
      </div>
    </div>
  );
};
export default Header;
