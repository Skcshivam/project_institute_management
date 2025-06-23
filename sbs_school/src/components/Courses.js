import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Courses() {
  const [courseList, setCourseList] = useState([]);
  const Navigate = useNavigate();

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
    <div className="course-wrapper">
      {courseList.map((course) => (
        <div
          onClick={() => {
            Navigate("/dashboard/course-detail/" + course._id);
          }}
          className="course-box"
          key={course._id}
        >
          <img
            alt="course-img"
            className="course-thumbnail"
            src={course.imageUrl}
          />
          <h2 className="course-title">{course.courseName}</h2>
          <p className="course-price">RS. {course.price} only</p>
        </div>
      ))}
    </div>
  );
}

export default Courses;
