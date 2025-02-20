const Course = require('../models/course')  
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')


const getAllCourse = async(req , res)=>{
 const Courses =  await Course.find({createdBy: req.user.userId}) .sort('createAt')
 res.status(StatusCodes.OK).json({ Courses, count: Courses.length })
}


const getCourse = async (req , res) =>{
    const {
        user: { userId },
        params: { id: courseId },
      } = req;
    
      const course = await Course.findOne({
        _id: courseId,
        createdBy: userId,
      });
      if (!course) {
        throw new NotFoundError(`No course with id ${courseId}`);
      }
      res.status(StatusCodes.OK).json({ course });
}

const createCourse = async (req, res) => {
    
    req.body.createdBy = req.user.userId;
    const course = await Course.create(req.body);
    res.status(StatusCodes.CREATED).json({ course });

  };

  const updateCourse = async (req, res) => {
    const {
      body: { teacherId, title , description , schedule },
      user: { userId },
      params: { id: courseId },
    } = req;
  
    if (teacherId === '' || title === '' || description === '' || schedule ==='') {
      throw new BadRequestError('teacherId or title or schedule fields cannot be empty');
    }
  
    const course = await Course.findOneAndUpdate(
      { _id: courseId, createdBy: userId },
      req.body,
      { new: true, runValidators: true }
    );
    if (!course) {
      throw new NotFoundError(`No course with id ${courseId}`);
    }
    res.status(StatusCodes.OK).json({ course });
  };
  
  const deleteCourse  = async (req, res) => {
   
    const {
      user: { userId },
      params: { id: courseId },
    } = req;
    
    const course = await Course.findOneAndDelete({
      _id: courseId,
      createdBy: userId,
    });
    console.log("course2")
    console.log(course)
    if (!course) {
      throw new NotFoundError(`No course with id ${courseId}`);
    }
    res.status(StatusCodes.OK).json({ msg: "The entry was deleted." });
  };
  
  module.exports = {
    createCourse,
    deleteCourse,
    getAllCourse,
    updateCourse,
    getCourse,
  };