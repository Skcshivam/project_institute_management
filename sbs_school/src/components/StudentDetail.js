import axios from "axios";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

function StudentDetails() {
  const params = useParams();
  useEffect(() => {
    getStudentDetail();
  }, []);
  const getStudentDetail = () => {
    axios
      .get("http://localhost:4200/student/student-detail/" + params.id, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
        toast.error("something went wrong..");
      });
  };
  return <div>StudentDetails</div>;
}

export default StudentDetails;
