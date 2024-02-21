import jwt from "jsonwebtoken";
import { adminSchema } from "../features/books/admin.schema.js";
import { employeeSchema } from "../features/books/employee.schema.js"; 
import mongoose from 'mongoose';

const adminModel = mongoose.model('Admin', adminSchema);



const jwtAuth = async(req, res, next) => {
    // const {jwtToken}=req.cookies;
  const adminId = req.params.adminId;
  console.log("adminid", adminId);
  const admin = await adminModel.findById(adminId);
  const token = admin.token;
  console.log("token", token);
  // req.headers["authorization"] = token;


  
  try {
     const authStatus = jwt.verify(token, "CodingNinjas2016");
    // console.log(authStatus);
    req.id = authStatus.userId; 
    
    

    // res.status(200).json({success:true,msg:"login successfull",authStatus}
    next();
  } catch (error) {
    res.status(401).json({ success: false, msg: error });
  }
};

export default jwtAuth;
