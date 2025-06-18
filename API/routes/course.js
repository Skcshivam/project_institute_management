const express = require("express");
const checkAuth = require("../middleware/checkAuth");
const { default: mongoose } = require("mongoose");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Course = require("../model/Course");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

//add new course
router.post("/add-course", checkAuth, (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const verify = jwt.verify(token, "sbs online classes 123");

  cloudinary.uploader.upload(req.files.image.tempFilePath, (err, result) => {
    const newCourse = new Course({
      _id: new mongoose.Types.ObjectId(),
      courseName: req.body.courseName,
      price: req.body.price,
      description: req.body.description,
      startingDate: req.body.startingDate,
      endDate: req.body.endDate,
      uId: verify.uId,
      imageUrl: result.secure_url,
      imageId: result.public_id,
    });
    newCourse
      .save()
      .then((result) => {
        res.status(200).json({
          newCourse: result,
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

//get all courses for any user

router.get("/all-courses", checkAuth, (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const verify = jwt.verify(token, "sbs online classes 123");

  Course.find({ uId: verify.uId })
    .select(
      "_id uId courseName price description startingDate endDate imageUrl imageId"
    )
    .then((result) => {
      res.status(200).json({
        courses: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

//get one course for any user

router.get("/course-detail/:id", checkAuth, (req, res) => {
  Course.findById(req.params.id)
    .select(
      "_id uId courseName price description startingDate endDate imageUrl imageId"
    )
    .then((result) => {
      res.status(200).json({
        courses: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

//delete course

router.delete("/:id", checkAuth, (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const verify = jwt.verify(token, "sbs online classes 123");

  Course.findById(req.params.id).then((course) => {
    console.log(course);
    if (course.uId == verify.uId) {
      Course.findByIdAndDelete(req.params.id)
        .then((result) => {
          cloudinary.uploader.destroy(course.imageId, (deleteImage) => {
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

//update course
router.put("/:id", checkAuth, (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const verify = jwt.verify(token, "sbs online classes 123");
  console.log(verify.uId);

  Course.findById(req.params.id).then((course) => {
    if (verify.uId != course.uId) {
      return res.status(500).json({
        error: "you are not Eligible to update the data",
      });
    }
    if (req.files) {
      cloudinary.uploader.destroy(course.imageId, (deleteImage) => {
        cloudinary.uploader.upload(
          req.files.image.tempFilePath,
          (err, result) => {
            const newUpdatedCourse = {
              courseName: req.body.courseName,
              price: req.body.price,
              description: req.body.description,
              startingDate: req.body.startingDate,
              endDate: req.body.endDate,
              uId: verify.uId,
              imageUrl: result.secure_url,
              imageId: result.public_id,
            };

            Course.findByIdAndUpdate(req.params.id, newUpdatedCourse, {
              new: true,
            })
              .then((data) => {
                res.status(200).json({
                  updatedCourse: data,
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
      const updatedData = {
        courseName: req.body.courseName,
        price: req.body.price,
        description: req.body.description,
        startingDate: req.body.startingDate,
        endDate: req.body.endDate,
        uId: verify.uId,
        imageUrl: course.secure_url,
        imageId: course.public_id,
      };
      Course.findByIdAndUpdate(req.params.id, updatedData, { new: true })
        .then((data) => {
          res.status(200).json({
            updatedData: data,
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

module.exports = router;
