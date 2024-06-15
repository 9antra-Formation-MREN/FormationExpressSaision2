var express = require('express');
var router = express.Router();
const userController = require("../Controllers/userController");
const upload = require("../middlewares/uploadFile")
/* GET users listing. */
router.get('/getAllUser',userController.getUsers );
router.get('/getOrderAllUsersByAge',userController.getOrderAllUsersByAge );
router.get('/getUsers18',userController.getUsers18)
router.get('/getUsersByAge/:age',userController.getUsersByAge)
router.get('/getUserBetweenXAndY',userController.getUserBetweenXAndY );
router.get('/searchUsersByName',userController.searchUsersByName );

router.get('/getUsers40',userController.getUsers40)
router.get('/getUserById/:id',userController.getUserByID );
router.post('/addUser',userController.addUserC );
router.post('/addwithImg',upload.single("image_user"),userController.addwithImg );
router.put('/updateUser/:id',userController.updateUserC );
router.put('/updatePassword/:id',userController.updateUserPassword );
router.delete('/deleteUser/:id',userController.deleteUser );
//



module.exports = router;
