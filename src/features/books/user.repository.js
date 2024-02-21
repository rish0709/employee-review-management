import mongoose from 'mongoose';
const { ObjectId } = mongoose.Types;
import { adminSchema } from './admin.schema.js'
import { employeeSchema } from './employee.schema.js';

// creating model from schema.
const adminModel = mongoose.model('Admin', adminSchema);

// creating model for review.
const employeeModel = mongoose.model('Employee', employeeSchema);


export default class userRepository {

    async checkAdminLoginDetails(username, password){
        console.log("in check admin login details repo");
        const data = new adminModel({username: username, password:password, token : "null"});

        const flag = await data.save();
        console.log("flag", flag);
        const admin = await adminModel.findOne({username: username, password: password});
        console.log("admin", admin);
        const employee = await employeeModel.find();
        const data1 = {"admin": admin, "employee": employee};
        return data1;
    }

    async addEmployeeToDb(name, username, password){
        const employee = new employeeModel({name: name, username: username, password: password});
        await employee.save();
        return await employeeModel.find();

    }

    async removeEmployeeFromDb(id){
        await employeeModel.findByIdAndDelete(id);
        return await employeeModel.find();

    }

    async getEmployeeData(id){
        const employee = await employeeModel.findById(id);
        console.log("employee", employee);
        return employee;
        
    }
        

    

    async updateEmployeeInDb(id, name, username, password){
        await employeeModel.findByIdAndUpdate(id, {name: name, username:username, password: password});
        return await employeeModel.find();
    }

    async getEmployeeFromDb(id){
        console.log("in repo");
        const admin = await adminModel.findOne({name:"Rakesh"});
        console.log("yha h bai",admin, admin._id);
        const admin2 = await adminModel.findById(admin._id).populate('feedbacks');
        console.log(admin2.feedbacks);
        const data = [];
        admin2.feedbacks.forEach( async (element)=>{
            if (element[0] == id){
                const emp = await employeeModel.findById(element[1]);
                data.push([emp.name, element[2]]);

            }
        })
        console.log(data);
        const employee = await employeeModel.findById(id);
        const employeeName = employee.name;
        const full_data = {"data":data, "employeeName": employeeName};

        return full_data;

        
    }
    


    

    async getEmployeeToAssign(id){

        return await employeeModel.findById(id);

    }

    async reviewAssigned(name){
        const employee = await employeeModel.findOne({name:name});
        console.log("employee", employee);
        employee.pendingReviews.push([employee.name, new ObjectId(employee._id)]);
        console.log("desired", await employee.save());
        return await employeeModel.find();

    }

    async checkValidEmployeeCred(username, password){
        const employee = await employeeModel.findOne({username:username, password: password});
        return employee;
    }

    async storeFeedbackIntoDb(targetId,employeeId, feedback){
        console.log("in stor feedback data");
        const admin = await adminModel.findOne({name:"Rakesh"});
        admin.feedbacks.push([targetId, employeeId, feedback]);
        await admin.save();
        
        const targetPerson = await employeeModel.findById(targetId);
        const employee = await employeeModel.findById(employeeId);
        console.log("name idhr hai", targetPerson.name);
        // employee.pendingReviews.pull([targetPerson.name, targetId]);
        const result = await employeeModel.updateOne(
            { _id: new ObjectId(targetId) },
            { $pull: { feedbacks: [targetPerson.name, targetId] } }
        );
        console.log("resulttttt", result);
        return employee;
            
        
        
        
        
        



}


    async addHabit(habit){
        
        const addHabit = new habitModel({habit:habit});
        const habit1 = await addHabit.save();

        

        const allHabits = await habitModel.find();
        // console.log(allHabits);
        return allHabits;
        
    }

    async changeStatus(habitId, habit){
        console.log("in change status repo");
        const dayNumber = habit[habit.length - 1];
        if (dayNumber < 0){
            dayNumber = dayNumber + 7;
        }
        const currentStatus = habit.slice(0,habit.length - 1);
        
        const Habit = await habitModel.findById(habitId);
        Habit.status.set(dayNumber, currentStatus);
        
        
        const flag = await Habit.save();
        console.log("required data", flag);
        return flag;


    }

    async getHabitArray(){
        const allHabits = await habitModel.find();
        // console.log(allHabits);
        return allHabits;
    }

    async getSelectedHabitData(habitId){

        const flag = await habitModel.findById(habitId);
        // console.log(flag);
        return flag;
    }
}