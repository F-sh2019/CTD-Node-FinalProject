const mongoose = require('mongoose')

const TeacherSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Types.ObjectId, 
              ref:'User' ,
              required: true },
    
    department: {
      type: String,
     
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide user'],
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Teacher', TeacherSchema)
