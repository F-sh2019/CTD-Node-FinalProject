const { date } = require('joi')
const mongoose = require('mongoose')

const StudentSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Types.ObjectId, 
      ref:'User' ,
      required: true },
    StudentId: {
      type: String,
      required: [true, 'Please provide StudentId'],
      maxlength: 100,
    },
    StartDate: {
      type: Date ,
      required: [true, 'Please provide entered Date'],
      default: Date.now,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide user'],
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Student', StudentSchema)
