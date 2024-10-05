import "./SignIn.scss";
import { useContext, useState } from "react";
import { Context } from "../../context/Context";
import axios from "axios";
import LabelledInput from "../../components/LabelledInput/LabelledInput";
import Login_image from "../../image/signIn.svg";

export default function SignIn() {
  const [error, setError] = useState("");
  const [userName, setUserName] = useState("");
  const [passWord, setPassword] = useState("");

  const { dispatch, isFetching } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = userName.toLowerCase();
    const password = passWord;

    try {
      const res = await axios.post(
        "https://blog-backend-zeta.vercel.app/api/auth/login",
        {
          username,
          password,
        }
      );
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    } catch (error) {
      setUserName("");
      setPassword("");
      setError("* Invalid username or password!");
      dispatch({ type: "LOGIN_FAILURE" });
    }
  };

  return (
    <div className="SignIn">
      <h1 className="SignIn_Heading">SignIn</h1>
      <div className="SignIn_Content">
        <div className="SignIn_Content_Image">
          <img src={Login_image} alt="SignIn" />
        </div>

        <div className="SignIn_Content_FormContainer">
          <div
            className="SignIn_Content_FormContainer_Form"
            onSubmit={handleSubmit}
          >
            <LabelledInput
              label="Username"
              type="text"
              placeholder="Enter your name ..."
              value={userName}
              errorMsg={error}
              onChange={(e) => setUserName(e.target.value)}
            />
            <LabelledInput
              label="Password"
              type="password"
              placeholder="Enter your password ..."
              value={passWord}
              errorMsg={error}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              className="SignIn_Content_FormContainer_Form_Button"
              disabled={isFetching}
              onClick={handleSubmit}
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
