import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

function Courses() {
  const [courseList, setCourseList] = useState([]);

  useEffect(() => {
    getCourse();
  }, []);

  const getCourse = () => {
    axios
      .get("http://localhost:4200/course/all-courses", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res.data.courses);
        setCourseList(res.data.courses);
      })
      .catch((err) => {
        console.log(err);
        toast.error("something went wrong..");
      });
  };

  return (
    <div>
      {courseList.map((course) => (
        <div key={course._id}>{course.courseName}</div>
      ))}
    </div>
  );
}

export default Courses;
