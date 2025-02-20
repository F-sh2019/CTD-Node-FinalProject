
const Register = require('../models/Register')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')


const getAllRegister = async ( req , res) =>{
  const Registers =  await Register.find() .sort('createAt')
 res.status(StatusCodes.OK).json({ Registers, count: Registers.length })  
}

const getRegister = async (req , res) =>{
    console.log(req)
    const {
        user: { userId },
        params: { id: registerId },
      } = req;
    
      const register = await Register.findOne({
        _id: registerId,
        createdBy: userId,
      });
      if (!register) {
        throw new NotFoundError(`No registraion with id ${registerId}`);
      }
      res.status(StatusCodes.OK).json({ register });
}

const createRegister= async (req , res)=>{
    console.log('create user')
    req.body.createdBy = req.user.userId;
    const register = await Register.create(req.body);
    res.status(StatusCodes.CREATED).json({ register });
}

const deleteRegister= async(req , res) =>{
    
    const{ user: {userId} ,
         params:{id: registerId }, } =req
    const register = await Register.findByIdAndDelete({_id: registerId , createdBy: userId}) ;
    if (!register){
        throw new NotFoundError(`No Registration with Id ${registerId}`)
    }
    res.status(StatusCodes.OK).json({msg: "The entry was deleted." })
}

const updateRegister=async(req, res) =>{

    const {
        body: { courseId, quarter , year , status },
        user: { userId },
        params: { id: registerId },
      } = req;
    
      if (courseId === '' || quarter === '' || year === '' || status ==='') {
        throw new BadRequestError('course or  quarter or year or status fields cannot be empty');
      }
    
      const register = await Register.findOneAndUpdate(
        { _id: registerId, createdBy: userId },
        req.body,
        { new: true, runValidators: true }
      );
      if (!register) {
        throw new NotFoundError(`No course with id ${registerId}`);
      }
      res.status(StatusCodes.OK).json({ register });
}

module.exports = { createRegister,
     deleteRegister,
     getAllRegister,
     updateRegister,
     getRegister,
    }