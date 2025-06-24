import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

function CourseDetail() {
  const params = useParams();
  const [course, setCourse] = useState(null);
  const [studentList, setStudentList] = useState([]);

  useEffect(() => {
    getCourseDetail();
    // console.log(params.id);
  }, []);

  const getCourseDetail = () => {
    axios
      .get("http://localhost:4200/course/course-detail/" + params.id, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res.data);
        console.log(res.data.course);
        setCourse(res.data.course);
        setStudentList(res.data.studentList);
      })
      .catch((err) => {
        console.log(err);
        toast.error("something went wrong..");
      });
  };
  return (
    <div className="course-detail-main-wrapper">
      {course && (
        <div>
          <div className="course-detail-wrapper">
            <img alt="course thumbnail" src={course.imageUrl} />
            <div>
              <h2>{course.courseName}</h2>
              <p>Price :- {course.price}</p>
              <p>starting Date :- {course.startingDate}</p>
              <p>end Date :- {course.endDate}</p>
            </div>
            <p>{course.description}</p>
          </div>

          {studentList && studentList.length > 0 && (
            <div className="studentlist-container">
              <table>
                <thead>
                  <tr>
                    <th>Student's Pic</th>
                    <th>Student Name</th>
                    <th>Phone</th>
                    <th>Email</th>
                  </tr>
                </thead>
                <tbody>
                  {studentList.map((student) => (
                    <tr className="student-row">
                      <td>
                        <img
                          className="student-profile-pic"
                          alt="student Pic"
                          src={student.imageUrl}
                        />
                      </td>
                      <td>
                        <p>{student.fullName}</p>
                      </td>
                      <td>
                        <p>{student.phone}</p>
                      </td>
                      <td>
                        <p>{student.email}</p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default CourseDetail;
