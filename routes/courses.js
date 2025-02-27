
// const express = require('express') ;
// const router= express.Router() ; 

// const {
//     createCourse,
//     deleteCourse,
//     getAllCourse,
//     updateCourse,
//     getCourse,
//   } = require('../controllers/courses');

// router.route('/').post(createCourse).get(getAllCourse);

//   router.route('/:id').get(getCourse).delete(deleteCourse).patch(updateCourse) ;

// module.exports = router
const express = require('express');
const router = express.Router();

const {
  createCourse,
  deleteCourse,
  getAllCourse,
  updateCourse,
  getCourse,
} = require('../controllers/courses');

const upload = require('../middleware/upload');


router.route('/')
  .post(upload.fields([{ name: 'pic' }, { name: 'document' }]), createCourse)
  .get(getAllCourse);

router.route('/:id')
  .get(getCourse)
  .delete(deleteCourse)
  .patch(upload.fields([{ name: 'pic' }, { name: 'document' }]), updateCourse);

module.exports = router;
