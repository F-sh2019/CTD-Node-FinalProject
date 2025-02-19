const Student = require('../models/student');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, NotFoundError } = require('../errors');

const getAllStudents = async (req, res) => {
  const students = await Student.find({ createdBy: req.user.userId }).sort('createdAt');
  res.status(StatusCodes.OK).json({ students, count: students.length });
};

const getStudent = async (req, res) => {
  const {
    user: { userId },
    params: { id: studentId },
  } = req;

  const student = await Student.findOne({
    _id: studentId,
    createdBy: userId,
  });
  if (!student) {
    throw new NotFoundError(`No Student with id ${studentId}`);
  }
  res.status(StatusCodes.OK).json({ student });
};

const createStudent = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const student = await Student.create(req.body);
  res.status(StatusCodes.CREATED).json({ student });
};

const updateStudent = async (req, res) => {
  const {
    body: { name, StudentId },
    user: { userId },
    params: { id: studentId },
  } = req;

  if (name === '' || StudentId === '') {
    throw new BadRequestError('Name or StudentId fields cannot be empty');
  }

  const student = await Student.findOneAndUpdate(
    { _id: studentId, createdBy: userId },
    req.body,
    { new: true, runValidators: true }
  );
  if (!student) {
    throw new NotFoundError(`No Student with id ${studentId}`);
  }
  res.status(StatusCodes.OK).json({ student });
};

const deleteStudent = async (req, res) => {
  const {
    user: { userId },
    params: { id: studentId },
  } = req;

  const student = await Student.findOneAndRemove({
    _id: studentId,
    createdBy: userId,
  });
  if (!student) {
    throw new NotFoundError(`No Student with id ${studentId}`);
  }
  res.status(StatusCodes.OK).json({ msg: "The entry was deleted." });
};

module.exports = {
  createStudent,
  deleteStudent,
  getAllStudents,
  updateStudent,
  getStudent,
};
