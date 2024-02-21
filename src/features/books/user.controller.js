import userRepository from "./user.repository.js";
import jwt from "jsonwebtoken";
import { adminSchema } from "./admin.schema.js";
import { employeeSchema } from "./employee.schema.js";
import mongoose from 'mongoose';

const adminModel = mongoose.model('Admin', adminSchema);

// creating model for review.
const employeeModel = mongoose.model('Employee', employeeSchema);




export default class userController {
  constructor() {
    this.userRepository = new userRepository();
  }


  homePage = async(req, res) => {
    res.render("home");
  }

  loginForAdmin = async(req, res) => {
    // const admin =  await this.userRepository.getAdminLoginData();sssss
    console.log("in controller");
    res.render("adminLoginPage.ejs");
  }

  adminAccess = async(req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const status = await this.userRepository.checkAdminLoginDetails(username, password);
    // console.log("res", result);
    console.log("status", status);
    if (status) {
      const token = jwt.sign(
        { userId: status._id, username: status.username},
        "CodingNinjas2016",
        { expiresIn: "1h" }
      );
      await adminModel.findByIdAndUpdate((status.admin._id), {token:token});

      res.render("adminPage.ejs", {admin: status.admin, employees:status.employee});

    } else {
      res.status(400).json({ status: "failure", msg: "invalid user details" });
    }
    
  }
  

  addEmployee = async(req, res) => {
    const adminId = req.params.adminId;
    res.render("addEmployeeForm",{adminId: adminId});
  }

  employeeAdded = async(req, res) => {

    const {name, username, password} = req.body;
    const adminId = req.params.adminId;
    const admin = await adminModel.findById(adminId);
    const employees = await this.userRepository.addEmployeeToDb(name, username, password);
    res.render("adminPage", {admin:admin, adminId: adminId, adminName: "Rakesh", employees:employees});

  }

  removeEmployee = async(req, res) => {

    const id = req.params.id;
    const adminId = req.params.adminId;
    const admin = await adminModel.findById(adminId);
    const employees = await this.userRepository.removeEmployeeFromDb(id);
    res.render("adminPage", {admin:admin, adminId: adminId, adminName: "Rakesh", employees:employees});

    }

  renderUpdateEmployee = async(req, res) => {

    const id = req.params.id;
    const adminId = req.params.adminId;
    const admin = await adminModel.findById(adminId);
    const employee = await this.userRepository.getEmployeeData(id);
    res.render("updateEmployeeForm", {admin:admin, adminId: adminId, employee:employee});
  }

  updateEmployee = async(req, res) => {
    const id = req.params.id;
    const adminId = req.params.adminId;
    const {name, username, password} = req.body;
    const admin = await adminModel.findById(adminId);
    const employees = await this.userRepository.updateEmployeeInDb(id, name, username, password);
    res.render("adminPage", {admin:admin, adminId: adminId, adminName: "Rakesh",employees:employees});

  }

  viewEmployee = async(req, res) => {
    const id = req.params.id;
    const adminId = req.params.adminId;
    console.log("in employee view");
    const admin = await adminModel.findById(adminId);
    const employees_data = await this.userRepository.getEmployeeFromDb(id);
    res.render("viewEmployee", {admin:admin, adminId: adminId, employees:employees_data});


  }

  // renderAssignReview

  renderAssignReview = async(req, res) => {
    const id = req.params.id;
    const adminId = req.params.adminId;
    const employee = await this.userRepository.getEmployeeToAssign(id);
    res.render("assignEmployee", { adminId: adminId, employee:employee});
  }
    
  reviewAssigned = async(req, res) =>{
    const {employeeName} = req.body;
    const adminId = req.params.adminId;
    const admin = await adminModel.findById(adminId);
    const employees = await this.userRepository.reviewAssigned(employeeName);
    res.render("adminPage", {admin:admin, adminId: adminId, adminName: "Rakesh",employees:employees});
} 

  renderEmployeeLogin = async(req, res) => {
    res.render("employeeLogin");
  }

  employeePage = async(req, res) => {
    const {username, password} = req.body;
    const employee = await this.userRepository.checkValidEmployeeCred(username, password);
    if (employee) {
      const token = jwt.sign(
        { userId: employee._id, username: employee.username},
        "CodingNinjas2016",
        { expiresIn: "1h" }
      );
      res.render("employeePage", {employee:employee});
    } else {
      res.status(400).json({ status: "failure", msg: "invalid user details" });
    }

  }

  renderShareFeedback = async(req, res) => {
    const {targetId, employeeId} = req.params;
    console.log("in render share feedback", targetId);

    
    res.render("shareFeedbackPage",{targetId:targetId, employeeId:employeeId});

  }

  feedbackShared = async(req, res) => {

    const {targetId, employeeId} = req.params;
    console.log("both", targetId, employeeId);
    const {feedback} = req.body;
    const employee = await this.userRepository.storeFeedbackIntoDb(targetId, employeeId, feedback);
    res.render("employeePage", {employee:employee});



  }

  }
    
  


