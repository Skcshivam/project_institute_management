import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

function CourseDetail() {
  const params = useParams();
  const [course, setCourse] = useState(null);
  const [studentList, setStudentList] = useState([]);

  const Navigate = useNavigate();

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
            <div className="course-detail-text">
              <h2>{course.courseName}</h2>
              <p>Price :- {course.price}</p>
              <p>starting Date :- {course.startingDate}</p>
              <p>end Date :- {course.endDate}</p>
            </div>
            <div className="course-description-box">
              <div className="btn-container">
                <button
                  className="primary-btn"
                  onClick={() => {
                    Navigate("/dashboard/update-course/" + course._id, {
                      state: { course },
                    });
                  }}
                >
                  Edit
                </button>
                <button className="secondary-btn">Delete</button>
              </div>
              <h3>Course description</h3>
              <div className="course-description-container">
                <p>{course.description}</p>
              </div>
            </div>
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
                    <tr
                      onClick={() => {
                        Navigate("/dashboard/student-detail/" + student._id);
                      }}
                      key={student._id}
                      className="student-row"
                    >
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
