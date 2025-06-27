import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function AddStudent() {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [courseId, setCourseId] = useState("");

  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [courseList, setCourseList] = useState([]);

  const Navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    getCourse();
    if (location.state) {
      setFullName(location.state.student.fullName);
      setPhone(location.state.student.phone);
      setEmail(location.state.student.email);
      setAddress(location.state.student.address);
      setCourseId(location.state.student.courseId);
      setImageUrl(location.state.student.imageUrl);
    } else {
      setFullName("");
      setPhone("");
      setEmail("");
      setAddress("");
      setCourseId("");
      setImageUrl("");
    }
  }, [location]);

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

  const fileHandler = (e) => {
    setImage(e.target.files[0]);
    setImageUrl(URL.createObjectURL(e.target.files[0]));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("phone", phone);
    formData.append("email", email);
    formData.append("address", address);
    formData.append("courseId", courseId);
    if (image) {
      formData.append("image", image);
    }

    if (location.state) {
      axios
        .put(
          "http://localhost:4200/student/" + location.state.student._id,
          formData,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          setLoading(false);
          toast.success("Student Detail updated.");
          Navigate("/dashboard/student-detail/" + location.state.student._id);
        })
        .catch((err) => {
          setLoading(false);
          toast.error("Something went wrong...");
        });
    } else {
      axios
        .post("http://localhost:4200/student/add-student", formData, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((res) => {
          setLoading(false);
          toast.success("Student added successfully.");
          Navigate("/dashboard/courses");
        })
        .catch((err) => {
          setLoading(false);
          toast.error("Something went wrong...");
        });
    }

    setLoading(true);

    // Here you can add other fields to formData as needed

    axios
      .post("http://localhost:4200/student/add-student", formData, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setLoading(false);
        toast.success("Student added successfully.");
        Navigate("/dashboard/courses");
      })
      .catch((err) => {
        setLoading(false);
        toast.error("Something went wrong...");
      });
  };

  return (
    <div>
      <form onSubmit={submitHandler} className="form">
        <h1>{location.state ? "Edit studentDetails" : "Add new Student"}</h1>
        <input
          value={fullName}
          onChange={(e) => {
            setFullName(e.target.value);
          }}
          placeholder="Student Name"
        />
        <input
          value={phone}
          onChange={(e) => {
            setPhone(e.target.value);
          }}
          placeholder="Phone Number"
        />
        <input
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          placeholder="Email"
        />
        <input
          value={address}
          onChange={(e) => {
            setAddress(e.target.value);
          }}
          placeholder="Full Address"
        />
        <select
          disabled={location.state}
          value={courseId}
          onChange={(e) => {
            setCourseId(e.target.value);
          }}
        >
          <option>select course</option>
          {courseList.map((course, index) => (
            <option value={course._id} key={index}>
              {course.courseName}
            </option>
          ))}
        </select>

        <input required={!location.state} onChange={fileHandler} type="file" />
        {imageUrl && (
          <img alt="your logo" className="your-logo" src={imageUrl} />
        )}
        <button type="submit" disabled={isLoading}>
          {isLoading && <i className="fa-solid fa-spinner fa-spin"></i>}
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddStudent;
