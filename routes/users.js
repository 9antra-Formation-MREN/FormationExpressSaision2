var express = require('express');
var router = express.Router();
const userController = require("../Controllers/userController");
const upload = require("../middlewares/uploadFile")
const {requireAuthUser} = require("../middlewares/authMiddlewares");
/* GET users listing. */
router.get('/getAllUser',requireAuthUser,userController.getUsers );
router.get('/getOrderAllUsersByAge',requireAuthUser,userController.getOrderAllUsersByAge );
router.get('/getUsers18',userController.getUsers18)
router.get('/getUsersByAge/:age',userController.getUsersByAge)
router.get('/getUserBetweenXAndY',userController.getUserBetweenXAndY );
router.get('/searchUsersByName',userController.searchUsersByName );
router.get('/login',userController.login );
router.get('/logout',userController.logout );

router.get('/getUsers40',userController.getUsers40)
router.get('/getUserById/:id',userController.getUserByID );
router.get('/GetUserAuth',requireAuthUser,userController.GetUserAuth );
router.post('/addUser',userController.addUserC );
router.post('/addwithImg',requireAuthUser,upload.single("image_user"),userController.addwithImg );
router.put('/updateUser/:id',userController.updateUserC );
router.put('/updatePassword/:id',userController.updateUserPassword );
router.delete('/deleteUser/:id',userController.deleteUser );
//



module.exports = router;
