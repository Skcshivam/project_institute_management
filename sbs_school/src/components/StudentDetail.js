import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
// import Students from "./Students";

function StudentDetail() {
  const [student, setStudent] = useState({});
  const [paymentList, setPaymentList] = useState([]);
  const [course, setCourse] = useState({});

  const Navigate = useNavigate();

  const params = useParams();
  useEffect(() => {
    getStudentDetail();
  }, []);
  const getStudentDetail = () => {
    // console.log(params.id);
    axios
      .get("http://localhost:4200/student/student-detail/" + params.id, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res.data);
        setStudent(res.data.studentDetail);
        setPaymentList(res.data.feeDetail);
        setCourse(res.data.courseDetail);
      })
      .catch((err) => {
        console.log(err);
        toast.error("something went wrong..");
      });
  };
  return (
    <div className="student-detail-main-wrapper">
      <div className="student-detail-wrapper">
        <div className="student-detail-header">
          <h2>Student Full detail</h2>
          <div className="sd-btn-container">
            <button
              className="primary-btn"
              onClick={() => {
                Navigate("/dashboard/update-student/" + student._id, {
                  state: { student },
                });
              }}
            >
              Edit
            </button>
            <button className="secondary-btn">Delete</button>
          </div>
        </div>

        <div className="sd-detail">
          <img alt="student Pic" src={student.imageUrl} />
          <div>
            <h2>{student.fullName}</h2>
            <p>Phone :- {student.phone}</p>
            <p> Email :- {student.email}</p>
            <p>Address :- {student.address}</p>
            <h4>Course Name : - {course.courseName}</h4>
          </div>
        </div>
      </div>
      <br />
      <h2 className="payment-history-title"> Payment History</h2>
      <div className="fee-detail-wrapper"></div>
    </div>
  );
}

export default StudentDetail;
