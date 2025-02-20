const mongoose = require('mongoose');

const RegisterSchema=new mongoose.Schema({

    studentId: { type: mongoose.Schema.Types.ObjectId, ref: "User" } ,
    courseId:{ type:mongoose.Schema.Types.ObjectId, ref:"Course"} ,
    quarter: { type: String, required: true, enum: ["Winter", "Spring", "Summer", "Fall"] }, // Quarter of registration
    year: { type: Number, required: true }, // Example: 2025
    status: { type: String, enum: ["enrolled", "dropped"], default: "enrolled" }, 
    createdBy : {
        type: mongoose.Schema.Types.ObjectId , ref: "User"
    }
}
, { timestamps: true });
module.exports = mongoose.model ('Register' , RegisterSchema)