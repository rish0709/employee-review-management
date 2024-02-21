import express from "express";
const router = express.Router();
import usersController from "./user.controller.js";
import jwtAuth from "../../middlewares/jwtAuth.js";

const userController = new usersController();

// Create a New Book
router.get("/", (req, res) => {
  console.log("hey");
  userController.homePage(req, res);
});

router.get("/adminLogin", (req, res) => {
  console.log("hiii");
  
  userController.loginForAdmin(req, res);
  // res.send("kya yr");
});

router.post("/admin", (req, res) => {

  userController.adminAccess(req, res);
});

router.get("/addEmployee/:adminId", jwtAuth, (req, res) => {
  // console.log("in change status route");
  userController.addEmployee(req, res);
})

router.post("/employeeAdded/:adminId", jwtAuth, (req, res) => {
  userController.employeeAdded(req, res);
})

router.delete("/removeEmployee/:id",  jwtAuth, (req, res) => {
  userController.removeEmployee(req, res);
})

router.get("/renderUpdateEmployee/:id/:adminId", jwtAuth, (req, res) => {
  userController.renderUpdateEmployee(req, res);
})



router.post("/updateEmployee/:id/:adminId", jwtAuth, (req, res) => {
  userController.updateEmployee(req, res);
})

router.get("/viewEmployee/:id/:adminId",  jwtAuth,(req, res) => {
  userController.viewEmployee(req, res);
})

router.get("/renderAssignReview/:id/:adminId", jwtAuth, (req, res) => {
  userController.renderAssignReview(req, res);
})

router.post("/reviewAssigned/:adminId", jwtAuth, (req, res) => {
  userController.reviewAssigned(req, res);
})

router.get("/renderEmployeeLogin", (req, res) => {
  userController.renderEmployeeLogin(req, res);
})

router.post("/employee", (req, res) => {
  userController.employeePage(req, res);
})

router.get("/shareFeedback/:targetId/:employeeId", jwtAuth, (req, res) => {
  userController.renderShareFeedback(req, res);
})

router.post("/feedbackShared/:targetId/:employeeId", jwtAuth, (req, res) => {
  userController.feedbackShared(req, res);
})






export default router;
