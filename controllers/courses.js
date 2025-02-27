const Course = require('../models/course')  
const upload = require('../middleware/upload');

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

  // Extract uploaded files from req.files
  const picFile = req.files && req.files['pic'] ? req.files['pic'][0] : null;
  const documentFile = req.files && req.files['document'] ? req.files['document'][0] : null;
  
  // If files exist, update req.body with their paths
  if (picFile) {
    req.body.pic = `/uploads/${picFile.filename}`;
  }
  if (documentFile) {
    req.body.document = `/uploads/${documentFile.filename}`;
  }
  if (typeof req.body.schedule === 'string') {
    req.body.schedule = JSON.parse(req.body.schedule);
  }
  // Create course using the updated req.body
  const course = await Course.create(req.body);
  console.log("course created:", course);
  res.status(201).json({ course });
};

// const createCourse = async (req, res) => {
    
//     req.body.createdBy = req.user.userId;
//     const course = await Course.create(req.body);
//     console.log("course")
//     res.status(StatusCodes.CREATED).json({ course });
//     console.log(course)

//   };

//   const updateCourse = async (req, res) => {
//     const {
//         body: { teacher, title, description, schedule, document, pic },
//         user: { userId },
//         params: { id: courseId },
//     } = req;

//     // Validate required fields
//     if (!teacher || !title || !description || !schedule) {
//         throw new BadRequestError('Teacher, title, description, and schedule fields cannot be empty');
//     }

//     // Find course first
//     let course = await Course.findOne({ _id: courseId, createdBy: userId });

//     if (!course) {
//         throw new NotFoundError(`No course with id ${courseId}`);
//     }

//     // Update fields
//     course.title = title;
//     course.description = description;
//     course.schedule = schedule;
//     course.teacher = teacher;

//     // Handle optional fields (images/documents)
//     if (document) {
//         course.document.data = Buffer.from(document, 'base64'); // Convert base64 string to Buffer
//     }
//     if (pic) {
//         course.pic.data = Buffer.from(pic, 'base64'); // Convert base64 string to Buffer
//     }

//     // Save updated course
//     await course.save();

//     res.status(StatusCodes.OK).json({ course });
// };

const updateCourse = async (req, res) => {
  if (typeof req.body.schedule === 'string') {
    req.body.schedule = JSON.parse(req.body.schedule);
  }
  const {
    body: { teacher, title, description, schedule },
    user: { userId },
    params: { id: courseId },
  } = req;

  // Validate required fields
  if (!teacher || !title || !description || !schedule) {
    throw new BadRequestError('Teacher, title, description, and schedule fields cannot be empty');
  }
  
  // Find the course to update
  let course = await Course.findOne({ _id: courseId, createdBy: userId });
  if (!course) {
    throw new NotFoundError(`No course with id ${courseId}`);
  }
  

  // Update basic fields
  course.title = title;
  course.description = description;
  course.schedule = schedule;
  course.teacher = teacher;

  // If new files are uploaded, update their paths
  if (req.files) {
    if (req.files['pic']) {
      const picFile = req.files['pic'][0];
      course.pic = `/uploads/${picFile.filename}`;
    }
    if (req.files['document']) {
      const documentFile = req.files['document'][0];
      course.document = `/uploads/${documentFile.filename}`;
    }
  }
  

  // Save the updated course
  await course.save();
  res.status(200).json({ course });
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
    //console.log("course2")
    //console.log(course)
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