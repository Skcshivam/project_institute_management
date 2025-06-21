import React from "react";
import "../components/style.css";
import { Link, useLocation } from "react-router-dom";

function SideNav() {
  const location = useLocation();
  return (
    <div className="nav-container">
      <div className="brand-container">
        <img
          alt="brand-logo"
          className="profile-logo"
          src={require("../assets/book_logo-removebg-preview.png")}
        />
        <div>
          <h2 className="brand-name">SS Management app</h2>
          <p className="brand-slogen">Manage your app in easy way..</p>
        </div>
      </div>
      <div className="menu-container">
        <Link
          to="/dashboard/home"
          className={
            location.pathname === "/dashboard/home"
              ? "menu-active-link"
              : "menu-link"
          }
        >
          <i className="fa-solid fa-house"></i>Home
        </Link>
        <Link
          to="/dashboard/courses"
          className={
            location.pathname === "/dashboard/courses"
              ? "menu-active-link"
              : "menu-link"
          }
        >
          <i className="fa-solid fa-book"></i>All Courses
        </Link>
        <Link
          to="/dashboard/add-course"
          className={
            location.pathname === "/dashboard/add-course"
              ? "menu-active-link"
              : "menu-link"
          }
        >
          <i className="fa-solid fa-plus"></i>Add Course
        </Link>
        <Link
          to="/dashboard/students"
          className={
            location.pathname === "/dashboard/students"
              ? "menu-active-link"
              : "menu-link"
          }
        >
          <i className="fa-solid fa-user-group"></i>All Students
        </Link>
        <Link
          to="/dashboard/add-students"
          className={
            location.pathname === "/dashboard/add-students"
              ? "menu-active-link"
              : "menu-link"
          }
        >
          <i className="fa-solid fa-plus"></i>Add Student
        </Link>
        <Link
          to="/dashboard/collect-fee"
          className={
            location.pathname === "/dashboard/collect-fee"
              ? "menu-active-link"
              : "menu-link"
          }
        >
          <i className="fa-solid fa-money-bill"></i>Collect Fee
        </Link>
        <Link
          to="/dashboard/payment-history"
          className={
            location.pathname === "/dashboard/payment-history"
              ? "menu-active-link"
              : "menu-link"
          }
        >
          <i className="fa-solid fa-list-ul"></i>
          Payment History
        </Link>
      </div>

      <div className="contact-us">
        <p>
          <i className="fa-solid fa-address-book"></i>Contact developer
        </p>
        <p>
          <i className="fa-solid fa-phone"></i>8654312342
        </p>
      </div>
    </div>
  );
}

export default SideNav;
