

const { date } = require('joi')
const mongoose = require('mongoose')

const CourseSchema = mongoose.Schema({
    title:{type:string , requires:true} ,
    description: string ,
    schedule: [
        {
            day: { type: String, required: true },
            startTime: { type: String, required: true },
            endTime: { type: String, required: true },
        }
      ] ,
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher" },
    

} , 
    { timestamps: true }


)


module.exports = mongoose.model('Course' , CourseSchema)