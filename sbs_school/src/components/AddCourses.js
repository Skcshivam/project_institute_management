import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    setLoading(true);
    formData.append("courseName", courseName);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("startingDate", startingDate);
    formData.append("endDate", endDate);
    formData.append("image", image);

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
  };

  const fileHandler = (e) => {
    setImage(e.target.files[0]);
    setImageUrl(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <div>
      <form onSubmit={submitHandler} className="form">
        <input
          required
          onChange={(e) => {
            setCourseName(e.target.value);
          }}
          placeholder="course Name"
          type="text"
        />
        <input
          required
          onChange={(e) => {
            setPrice(e.target.value);
          }}
          placeholder="price"
          type="Number"
        />
        <input
          required
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          placeholder="description"
          type="text"
        />
        <input
          required
          onChange={(e) => {
            setStartingDate(e.target.value);
          }}
          placeholder="Starting Date (DD-MM-YY)"
          type="text"
        />
        <input
          required
          onChange={(e) => {
            setEndDate(e.target.value);
          }}
          placeholder="End Date (DD-MM-YY)"
          type="text"
        />
        <input required onChange={fileHandler} type="file" />
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
