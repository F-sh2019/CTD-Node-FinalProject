
const { StatusCodes } = require('http-status-codes')

const errorHandlerMiddleware = (err, req, res, next) => {
   console.log(err)
  let customError={
   
 statuscode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR ,
 msg: err.mrssgae || 'something went wrong . try again later'
  }
  

  if(err.name==="ValidationError"){
    customError.msg = Object.values(err.errors)
    .map((item)=>item.message)
    .join(',')
    customError.statuscode = 400 ;
  }
 if(err.code && err.code === 11000){
  customError.msg =`Duplicate value entered for ${Object.keys(err.keyValue)} field, Please choose another Value`
  customError.statuscode = 400 ;
 }
 if(err.name==="CastError"){
  customError.msg = `No item found with id: ${err.value}`
  
  customError.statuscode = 404 ;
}

  return res.status(customError.statuscode).json({ msg:customError.msg })
}

module.exports = errorHandlerMiddleware
