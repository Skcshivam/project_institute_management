import React from "react";
import SideNav from "./SideNav";
import { Outlet, useNavigate } from "react-router-dom";

function Dashboard() {
  const Navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.clear();
    Navigate("/login");
  };
  return (
    <div className="dashboard-main-container">
      <div className="dashboard-container">
        <SideNav />
        <div className="main-container">
          <div className="top-bar">
            <div className="logo-container">
              <img
                alt="profile logo"
                className="profile-logo"
                src={localStorage.getItem("imageUrl")}
              />
            </div>
            <div className="profile-container">
              <h2 className="profile-name">
                {localStorage.getItem("fullName")}
              </h2>
              <button className="logout-btn" onClick={logoutHandler}>
                Logout
              </button>
            </div>
          </div>

          <div className="outlet-area">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Dashboard;
