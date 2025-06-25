import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

function Students() {
  const [studentList, setStudentList] = useState([]);

  useEffect(() => {
    getStudentList();
  }, []);

  const getStudentList = () => {
    axios
      .get("http://localhost:4200/student/all-students", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res.data);
        setStudentList(res.data.Student);
      })
      .catch((err) => {
        console.log(err);
        toast.error("something went wrong..");
      });
  };
  return (
    <div>
      {studentList && studentList.length > 0 && (
        <div className="students-container">
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
                <tr className="student-row" key={student._id}>
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
  );
}

export default Students;
