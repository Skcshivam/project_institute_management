import React, { useState } from "react";
import "../components/style.css";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState(false);

  const Navigate = useNavigate();

  const submitHandler = (event) => {
    setLoading(true);
    event.preventDefault();

    axios
      .post("http://localhost:4200/user/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        setLoading(false);
        Navigate("/dashboard");
        console.log(res);
      })
      .catch((err) => {
        setLoading(false);
        toast.error("something went wrong....");
        console.log(err);
      });
  };

  return (
    <div className="signup-wrapper">
      <div className="signup-box">
        <div className="signup-left">
          <img src={require("../assets/book_logo-removebg-preview.png")} />
          <h1 className="signup-left-heading">Institute management App</h1>
          <p className="signup-left-para">
            Manage your all data in easy way ....
          </p>
        </div>

        <div className="signup-right">
          <form onSubmit={submitHandler} className="signup-form">
            <h1>Login with your Account</h1>
            <input
              required
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              type="email"
              placeholder="Email"
            />

            <input
              required
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="password"
              placeholder="Password"
            />

            <button type="submit" disabled={isLoading}>
              {isLoading && <i className="fa-solid fa-spinner fa-spin"></i>}
              Submit
            </button>
            <Link className="link" to="/signup">
              Create your account
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
