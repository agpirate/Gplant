

const bodyParser = require("body-parser");
const multer = require("multer");
/*
Multer is a node.js middleware for handling multipart/form-data , 
which is primarily used for uploading files. 
It is written on top of busboy for maximum efficiency.
*/
const path = require("path");
const fs = require("fs");

import { Router } from "express";
const router = Router();
import {
    leavereqModel,
    reportModel,
    planModel,
    empyModel,
    attendModel,
    comtModel,
    postModel,
  } from "app/src-ssr/backendCore/models/humanresource";

//  const {
//    GridFsStorage
//  } = require("multer-gridfs-storage");

const supportedMimes= {
  'text/csv': 'csv'
}
const  uploadsFolder= 'uploads'
const  dbConnection= 'mongodb://127.0.0.1:27017/fileuploaddb'




fileService={

  getFileOptions: () => {
  return {
    storage: multer.diskStorage({
      destination: (req, file, cb) => cb(null, "app/src-ssr/assets/uploads"), 
      filename: (req, file, cb) => {
        let extension = supportedMimes[file.mimetype]
        let originalname = file.originalname.split('.')[0]
        //`${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`
        let fileName = originalname + '-' + (new Date()).getMilliseconds() + '.' + extension
        cb(null, fileName)
      }
    }),
    limits: { fields: 1, fileSize: 6000000, files: 1, parts: 2 },
    fileFilter: (req, file, cb) => {
      let extension = supportedMimes[file.mimetype]
      if (!extension) {
        return cb(null, false)
      } else {
        cb(null, true)
      }
    }
  }
},

uploadFile: (req, res, next) => {
  let savedModels = []
  async.each(req.files, (file, callback) => {
    let fileModel = new File({
      name: file.filename
    });
    fileModel.save((err) => {
      if (err) {
        return next('Error creating new file', err);
      }
      fileModel.encodedName = btoa(fileModel._id)
      fileModel.save((err) => {
        if (err) {
          return next('Error creating new file', err);
        }
        savedModels.push(fileModel)
        callback()
        console.log('File created successfully');
      })
    });
  }, (err) => {
    if (err) {
      return res.status(400).end();
    }
    return res.send(savedModels)
  })
}
}


const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "app/src-ssr/assets/uploads"), // cb -> callback
    filename: (req, file, cb) => {
      const uniqueName = file.fieldname + '-' +  `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`;
      cb(null, uniqueName);
    },
  });
  //build handler //Handle Saving
  const handleMultipartData = multer({
    storage,
    limits: { fields: 1, fileSize: 6000000, files: 1, parts: 2 }});


const handleMultipartArrayData = multer({ dest: "uploads/" });

router.post("/upload_files", handleMultipartArrayData.array("files"), uploadFiles);
async function uploadFiles(req, res) {
  console.log(req.body);
  console.log(req.files);
  res.json({ message: "Successfully uploaded files" });
}

router.post("/photo", handleMultipartData.single("proImage"), (req, res) => {

    var img = fs.readFileSync(path.join(__dirname + "/uploads/" + req.file.filename));
  //const img = req.files.image;
    var encode_img = img.toString('base64');

    var stringg = "data:image/png;base64,long-String"
    var bindata = new Buffer(stringg.split(",")[1],"base64");

    var final_img = {

        contentType:req.file.mimetype, //"image/png", //contentType: img.mimetype
        image:new Buffer(encode_img,'base64') //data: img.data,  // buffer
        
    };


    const newImage = new empyModel({
        title:'userProfile',
      proImage: final_img, //whilte image datatype is buffer
    });
    newImage.save().then(() =>{

    });

  });
/*
image: {
        data: Buffer,
        contentType: String
    }
*/
router.post("/profile", handleMultipartData.single("proImage"), (req, res) => {
    const obj = {
      img: {
        data: fs.readFileSync(
          path.join(__dirname + "/uploads/" + req.file.filename)
        ),
        contentType: "image/png",
      },
    };
    
    const newImage = new ImageModel({
      image: obj.img,
    });
    newImage.save((err) => {
      err ? console.log(err) : res.redirect("/");
    });
  });
  
module.exports = router;
