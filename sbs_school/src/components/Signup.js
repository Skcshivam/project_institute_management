import React, { useState } from "react";
import "../components/style.css";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [isLoading, setLoading] = useState(false);

  const Navigate = useNavigate();

  const submitHandler = (event) => {
    setLoading(true);
    event.preventDefault();
    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("password", password);
    formData.append("image", image);

    axios
      .post("http://localhost:4200/user/signup", formData)
      .then((res) => {
        setLoading(false);
        toast.success("account created succesfully");
        Navigate("/login");
        console.log(res);
      })
      .catch((err) => {
        setLoading(false);
        toast.error("something went wrong....");
        console.log(err);
      });
  };

  const fileHandler = (e) => {
    setImage(e.target.files[0]);
    setImageUrl(URL.createObjectURL(e.target.files[0]));
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
            <h1>Create your Account</h1>
            <input
              required
              onChange={(e) => {
                setFullName(e.target.value);
              }}
              type="text"
              placeholder="Institute Full Name"
            />
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
                setPhone(e.target.value);
              }}
              type="number"
              placeholder="Phone"
            />
            <input
              required
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="password"
              placeholder="Password"
            />
            <input required onChange={fileHandler} type="file" />
            {imageUrl && (
              <img alt="your logo" className="your-logo" src={imageUrl} />
            )}
            <button type="submit" disabled={isLoading}>
              {isLoading && <i className="fa-solid fa-spinner fa-spin"></i>}
              Submit
            </button>
            <Link className="link" to="/login">Login with your account</Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
