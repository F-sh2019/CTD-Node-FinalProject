
const express = require('express') ;
const router= express.Router() ; 

const {
    createRegister,
    deleteRegister,
    getAllRegister,
    updateRegister,
    getRegister,
  } = require('../controllers/registers');

router.route('/').post(createRegister).get(getAllRegister);
router.route('/:id').get(getRegister).delete(deleteRegister).patch(updateRegister) ;

module.exports = router