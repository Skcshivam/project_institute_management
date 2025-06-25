import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function AddCourses() {
  const [courseName, setCourseName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [startingDate, setStartingDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [image, setImage] = useState(null);

  const [imageUrl, setImageUrl] = useState("");
  const [isLoading, setLoading] = useState(false);
  const Navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state) {
      console.log(location.state.course);
      setCourseName(location.state.course.courseName);
      setPrice(location.state.course.price);
      setDescription(location.state.course.description);
      setStartingDate(location.state.course.startingDate);
      setEndDate(location.state.course.endDate);
      setImageUrl(location.state.course.imageUrl);
    } else {
      console.log("");
      setCourseName("");
      setPrice("");
      setDescription("");
      setStartingDate("");
      setEndDate("");
      setImageUrl("");
    }
  }, [location]);

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    setLoading(true);
    formData.append("courseName", courseName);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("startingDate", startingDate);
    formData.append("endDate", endDate);
    if (image) {
      formData.append("image", image);
    }

    if (location.state) {
      axios
        .put(
          "http://localhost:4200/course/" + location.state.course._id,
          formData,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          setLoading(false);
          console.log(res.data);
          toast.success("course updated susscessfully.");
          Navigate("/dashboard/course-detail/" + location.state.course._id);
        })
        .catch((err) => {
          setLoading(false);
          console.error(err);
          toast.error("Something went wrong...");
        });
    } else {
      axios
        .post("http://localhost:4200/course/add-course", formData, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((res) => {
          setLoading(false);
          console.log(res.data);
          toast.success("New course added.");
          Navigate("/dashboard/courses");
        })
        .catch((err) => {
          setLoading(false);
          console.error(err);
          toast.error("Something went wrong...");
        });
    }
  };

  const fileHandler = (e) => {
    setImage(e.target.files[0]);
    setImageUrl(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <div>
      <form onSubmit={submitHandler} className="form">
        <h1>{location.state ? "Edit course" : "Add New Course"}</h1>
        <input
          value={courseName}
          required
          onChange={(e) => {
            setCourseName(e.target.value);
          }}
          placeholder="course Name"
          type="text"
        />
        <input
          value={price}
          required
          onChange={(e) => {
            setPrice(e.target.value);
          }}
          placeholder="price"
          type="Number"
        />
        <input
          required
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          placeholder="description"
          type="text"
        />
        <input
          required
          value={startingDate}
          onChange={(e) => {
            setStartingDate(e.target.value);
          }}
          placeholder="Starting Date (DD-MM-YY)"
          type="text"
        />
        <input
          required
          value={endDate}
          onChange={(e) => {
            setEndDate(e.target.value);
          }}
          placeholder="End Date (DD-MM-YY)"
          type="text"
        />
        <input
          required={!location.state}
          onChange={fileHandler}
          type="file"
          // value={setImageUrl}
        />
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

export default AddCourses;
