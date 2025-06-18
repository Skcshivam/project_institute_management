const express = require("express");
const checkAuth = require("../middleware/checkAuth");
const { default: mongoose } = require("mongoose");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Student = require("../model/Student");
const Course = require("../model/Course");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

//add new student
router.post("/add-student", checkAuth, (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const verify = jwt.verify(token, "sbs online classes 123");

  cloudinary.uploader.upload(req.files.image.tempFilePath, (err, result) => {
    const newStudent = new Student({
      _id: new mongoose.Types.ObjectId(),
      fullName: req.body.fullName,
      phone: req.body.phone,
      email: req.body.email,
      address: req.body.address,
      courseId: req.body.courseId,
      uId: verify.uId,
      imageUrl: result.secure_url,
      imageId: result.public_id,
    });
    newStudent
      .save()
      .then((result) => {
        res.status(200).json({
          newStudent: result,
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          error: err,
        });
      });
  });
});

//get all own students
router.get("/all-students", checkAuth, (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const verify = jwt.verify(token, "sbs online classes 123");

  Student.find({ uId: verify.uId })
    .select("_id uId fullName phone email address courseId imageUrl imageId")
    .then((result) => {
      res.status(200).json({
        Student: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

//get own all students for a course
router.get("/all-students/:courseId", checkAuth, (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const verify = jwt.verify(token, "sbs online classes 123");

  Student.find({ uId: verify.uId, courseId: req.params.courseId })
    .select("_id uId fullName phone email address courseId imageUrl imageId")
    .then((result) => {
      res.status(200).json({
        Student: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

//delete student
router.delete("/:id", checkAuth, (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const verify = jwt.verify(token, "sbs online classes 123");

  Student.findById(req.params.id).then((student) => {
    console.log(student);
    if (student.uId == verify.uId) {
      Student.findByIdAndDelete(req.params.id)
        .then((result) => {
          cloudinary.uploader.destroy(Student.imageId, (deleteImage) => {
            res.status(200).json({
              result: result,
            });
          });
        })
        .catch((err) => {
          res.status(500).json({
            msg: err,
          });
        });
    } else {
      res.status(500).json({
        msg: "Bad request",
      });
    }
  });
});

//update Stuent
router.put("/:id", checkAuth, (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const verify = jwt.verify(token, "sbs online classes 123");
  console.log(verify.uId);

  Student.findById(req.params.id).then((student) => {
    if (verify.uId != student.uId) {
      return res.status(500).json({
        error: "you are not Eligible to update the data of student",
      });
    }
    if (req.files) {
      cloudinary.uploader.destroy(student.imageId, (deleteImage) => {
        cloudinary.uploader.upload(
          req.files.image.tempFilePath,
          (err, result) => {
            const newUpdatedStudent = {
              fullName: req.body.fullName,
              phone: req.body.phone,
              email: req.body.email,
              address: req.body.address,
              courseId: req.body.courseId,
              uId: verify.uId,
              imageUrl: result.secure_url,
              imageId: result.public_id,
            };

            Student.findByIdAndUpdate(req.params.id, newUpdatedStudent, {
              new: true,
            })
              .then((data) => {
                res.status(200).json({
                  updatedStudent: data,
                });
              })
              .catch((err) => {
                console.log(err);
                res.status(500).json({
                  error: err,
                });
              });
          }
        );
      });
    } else {
      const updatedStudentData = {
        fullName: req.body.fullName,
        phone: req.body.phone,
        email: req.body.email,
        address: req.body.address,
        courseId: req.body.courseId,
        uId: verify.uId,
        imageUrl: student.secure_url,
        imageId: student.public_id,
      };
      Student.findByIdAndUpdate(req.params.id, updatedStudentData, {
        new: true,
      })
        .then((data) => {
          res.status(200).json({
            updatedStudentData: data,
          });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json({
            error: err,
          });
        });
    }
  });
});

//get latest 5 student data
router.get("/latest-students", checkAuth, (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const verify = jwt.verify(token, "sbs online classes 123");
  // console.log(verify.uId);

  Student.find({ uId: verify.uId })
    .sort({ $natural: -1 })
    .limit(5)
    .then((result) => {
      res.status(200).json({
        student: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

module.exports = router;
