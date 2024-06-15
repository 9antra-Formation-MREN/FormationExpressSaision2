const multer = require("multer");
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public')
  },
  filename: function (req, file, cb) {
    // Generate a unique filename using timestamp and random string
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const fileExtension = file.originalname.split('.').pop();
    cb(null, `${uniqueSuffix}.${fileExtension}`);
  }
})

var uploadImagesUsers = multer({ storage: storage });
module.exports = uploadImagesUsers;


// const multer = require("multer");
// const path = require('path')
// const fs = require('fs')
// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'public/images/Users')
//   },
//   filename: function (req, file, cb) {
//     const uploadPath = 'public/images/Users';
//     const originalName = file.originalname;
//     console.log(file.originalname)
//     const fileExtension = path.extname(originalName);
//     let fileName = originalName;

//     // Vérifier si le fichier existe déjà
//     let fileIndex = 1;
//     while (fs.existsSync(path.join(uploadPath, fileName))) {
//       const baseName = path.basename(originalName, fileExtension);
//       fileName = `${baseName}_${fileIndex}${fileExtension}`;
//       fileIndex++;
//     }

//     cb(null, fileName);
//   }
// })

// var uploadfile = multer({ storage: storage });
// module.exports = uploadfile;