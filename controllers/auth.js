const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnauthenticatedError } = require('../errors')

const register = async (req, res) => {
  const user = await User.create({ ...req.body })
  const token = user.createJWT() ;
  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token })
}

const login = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    throw new BadRequestError('Please provide email and password')
  }
  const user = await User.findOne({ email })
  if (!user) {
    throw new UnauthenticatedError('Invalid Credentials')
  }
  const isPasswordCorrect = await user.comparePassword(password)
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError('Invalid Credentials')
  }
 
  const token = user.createJWT()
  res.status(StatusCodes.OK).json({ user: { userid: user._id , userRole:user.role }, token })
}

const getAllUsers= async(req , res) =>{
  console.log("Users")
  const Users =  await User.find().sort('createdAt');
  console.log(Users)
  res.status(StatusCodes.OK).json({ Users, count: Users.length })
}


module.exports = {
  register,
  login,
  getAllUsers,
}
