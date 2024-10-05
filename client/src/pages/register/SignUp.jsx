import "./SignUp.scss";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import LabelledInput from "../../components/LabelledInput/LabelledInput";
import SignUp_image from "../../image/signUp.svg";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); // Initialize password state with an empty string
  const [errorEmail, setErrorEmail] = useState("");
  const [passwordError, setPasswordError] = useState("");

  function isValidEmail(email) {
    const regex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    return regex.test(email);
  }

  function isStrongPassword(password) {
    if (password.length < 8) {
      return false;
    }

    if (!/[a-z]/.test(password)) {
      return false;
    }

    if (!/[A-Z]/.test(password)) {
      return false;
    }

    if (!/\d/.test(password)) {
      return false;
    }

    if (!/[@$!%*?&#]/.test(password)) {
      return false;
    }

    return true;
  }

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorEmail(false);
    if (!isValidEmail(email) && !isStrongPassword(password)) {
      setEmail('');
      setPassword('');
      setErrorEmail("* Please enter a valid email.");
      setPasswordError(
        "* Must be 8 or more characters and contain at least 1 number and 1 special character."
      );
      return;
    }
    if (!isValidEmail(email)) {
      setEmail('');
      setErrorEmail("* Please enter a valid email address.");
      return;
    }

    if (!isStrongPassword(password)) {
      setPassword('');
      setPasswordError(
        "* Must be 8 or more characters and contain at least 1 number and 1 special character."
      );
      return;
    }
    try {
      const res = await axios.post(
        "https://blog-backend-zeta.vercel.app/api/auth/register",
        {
          username,
          email,
          password,
        }
      );
      res.data && navigate("/login");
    } catch (errorEmail) {
      setErrorEmail(true);
    }
  };
  return (
    <div className="SignUp">
    <h1 className="SignUp_Heading">SignUp</h1>
    <div className="SignUp_Content">
    <div className="SignUp_Content_FormContainer">
        <form
          className="SignUp_Content_FormContainer_Form"
          onSubmit={handleSubmit} 
        >
          <LabelledInput
            label="Username"
            type="text"
            placeholder="Enter your name ..."
            value={username}
            onChange={(e) => setUsername(e.target.value.toLowerCase())}
          />
          <LabelledInput
            label="Email"
            type="email"
            placeholder="Enter your email..."
            value={email}
            errorMsg={errorEmail}
            onChange={(e) => setEmail(e.target.value.toLowerCase())}
          />

          <LabelledInput
            label={"Password"}
            type="password"
            placeholder="Enter your password..."
            value={password}
            errorMsg={passwordError}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            className="SignUp_Content_FormContainer_Form_Button"
            type="submit" // Set the button type to submit
          >
            Sign Up
          </button>
        </form>
      </div>
      <div className="SignUp_Content_Image">
        <img src={SignUp_image} alt="SignUp" />
      </div>

     
    </div>
  </div>
  );
}
