import React, { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import Sidebar from "../dashboard/Sidebar";
import MyProfile from "../dashboard/MyProfile";
import MyBlog from "../dashboard/MyBlog";
import CreateBlog from "../dashboard/CreateBlog";
import Update from "../dashboard/Update";

function Dashboard() {
  const { profile, isAuthenticated } = useAuth();
  const [component, setComponent] = useState("My Blog");

  console.log(profile);
  console.log(isAuthenticated);

  return (
    <div className="">
      <Sidebar component={component} setComponent={setComponent}/>
      <div className="">
        {component === "My Profile" ? (
          <MyProfile />
        ) : component === "Create Blog" ? (
          <CreateBlog />
        ) : component === "Update" ? (
          <Update />
        ) : (
          <MyBlog />
        )}
      </div>
    </div>
  );
}

export default Dashboard;
