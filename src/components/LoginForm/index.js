import React, { useState } from "react";
import "./index.css";
import Cookies from "js-cookie";
const LoginForm = () => {
  const [username, setUsername] = useState("rahul");
  const [password, setPassword] = useState("rahul@2021");
  const [showPassword, setShowPassword] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const onSubmitForm = async (event) => {
    event.preventDefault();
    const userDetails = { username, password };
    const options = {
      method: "POST",
      body: JSON.stringify(userDetails),
    };
    const response = await fetch("https://apis.ccbp.in/login", options);
    const data = await response.json();
    console.log(data);
    if (response.ok) {
      //Go to home page.
      Cookies.set("jwtToken", data.jwt_token, { expires: 30 });
    } else if (!response.ok) {
      setErrorMessage(data.error_msg);
      setShowErrorMessage(true);
    }
  };
  const onChangeUsername = (event) => {
    setUsername(event.target.value);
  };
  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };
  const onChangeShowPassword = (event) => {
    setShowPassword(event.target.checked);
  };

  return (
    <div className="login-form-main-container">
      <div className="form-background-container">
        <div className="nxt-watch-loginpage-logo-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
            alt="logo"
            className="nxt-watch-loginpage-logo"
          />
        </div>
        <form onSubmit={onSubmitForm}>
          <label htmlFor="username">USERNAME</label>
          <br />
          <input
            type="text"
            id="username"
            onChange={onChangeUsername}
            value={username}
          />

          <br />
          <label htmlFor="password">PASSWORD</label>
          <br />
          <input
            value={password}
            type={showPassword ? "text" : "password"}
            id="password"
            onChange={onChangePassword}
          />
          <br />

          <input
            value={showPassword}
            type="checkbox"
            id="showpassword"
            onChange={onChangeShowPassword}
          />
          <label htmlFor="showpassword">Show Password</label>
          <br />

          <button autoFocus type="submit">
            Login
          </button>
        </form>
        {showErrorMessage && (
          <p className="error-message-text">*{errorMessage}</p>
        )}
      </div>
    </div>
  );
};
export default LoginForm;
