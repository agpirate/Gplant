

import {
  profileModel,threeaModel
} from "../../backendCore/models/profileModels.js";
import authenticate from "../../middlewares/authenticate.js";

import { mongoose } from "mongoose";
var ObjectId = mongoose.Types.ObjectId;

import jwt  from "jsonwebtoken";
import { Router } from "express"

const router = Router()

// Protected route
let createKey=['keyID','id']
router.post("/login", async (req, res) => {
      //---------------------Grap User Data of Request_Header + Body  
      let reqData= req.body ?? {}

      if (((reqData[createKey[0]] ?? reqData[createKey[1]]) == null  )) {return res.status(404).send(""); }

      let findBy={}
      if(reqData[createKey[0]] ?? false){ findBy[createKey[0]] = reqData[createKey[0]]}
      else{findBy['_id'] = new ObjectId(reqData[createKey[1]])}
      //-------------Finde User On Database
      try {
        return await profileModel.findOne(findBy).then(async (modelData) => {
            if (modelData && Object.keys(modelData).length) {
               //------user Already Registered..Then Check for Roles use acckey
               let queryID = new ObjectId(modelData.acckey)
               //--------------Search For Role and Permissions----Start
              console.log(modelData,queryID,findBy)
               return await threeaModel.findOne({'_id':queryID}).then((_rolePermisions)=>{
                if(_rolePermisions){
                  //generate Token
                  const token = jwt.sign({ userId: modelData['id'],'acckey':_rolePermisions['id'] }, process.env.TOKEN_SECRET, { expiresIn: '24h' }); 
                  //---set Token as Response
                  res.setHeader('authorization', `Bearer ${token}`)//To send the token in the Authorization header, the client needs to include it in subsequent requests:
                  res.cookie('access_token', token, { maxAge: 900000, httpOnly: true,secure:false,signed:false }); //this Would Inject token into [cookie_storage && cookie_Header]
                  //---------Including Other Response Data
                  
                  //--------Injecting Permission and UserDatas
                  res.setHeader('acctype',JSON.stringify(_rolePermisions)) //Injecting new_attribute into mongodb(findOne or Obj)_ data is not good..best...In Header
                  res.setHeader('token',JSON.stringify(token)) //Injecting new_attribute into mongodb(findOne or Obj)_ data is not good..best...In Header
                  // res.setHeader('role',_rolePermisions.profile.group) //Injecting new_attribute into mongodb(findOne or Obj)_ data is not good..best...In Header
                  // /console.log('User is Authenticated && Has Permissions of ===>',_rolePermisions)
                  
                return res.status(200).send(JSON.stringify(modelData)); 
                }
                return  res.status(501).json({'Permission Error':_rolePermisions})
               }).catch((error)=>{return res.status(501).json({'Null Permission,Error':error})})
               //--------------------Permission Operation---Ends

            } else { return res.status(401).send({'Profile Error0':modelData}); }
          }).catch((modelError) => {return res.status(404).send({'Profile Error1':modelError} ); }); // return modelError
      } catch (error) {  return  res.status(505).send({'Profile Error2':error});  }
    });
//----------------------------------Query Builder

let _checkQuery='id'
router.post("/add", async (req, res) => {
      //---------------------Grap User Data of Request_Header + Body
      let findBy={}
      let reqData= req.body ?? {}
      if (reqData[_checkQuery] ?? false) {findBy[_checkQuery] = reqData[_checkQuery] ?? false
      }else{ 
        return res.status(303).send("req.body is null")
      }

      //reqData['upgrade'] ?? 'creator'
      let _role_permission =await acctypeModel.findOne({'group':reqData['upgrade'] ?? 'creator'})
      if(_role_permission){modelQA['acckey']= _role_permission._id }
      else{return { status: 303, data: "Permission Assign Error" };}

      //-------------Finde User On Database
      try {
        return await profileModel.findOne(findBy).then(async (modelData) => {
            if (modelData && Object.keys(modelData).length) {
               //------user Already Registered..Then Check for Roles use acckey
               let queryID = new ObjectId(modelData.acckey)
               //--------------Search For Role and Permissions----Start
               return await acctypeModel.findOne({'_id':queryID}).then((_rolePermisions)=>{
                if(_rolePermisions){
                  //generate Token
                  const token = jwt.sign({ userId: modelData['id'],'acckey':_rolePermisions['id'] }, process.env.TOKEN_SECRET, { expiresIn: '1h' }); 
                  //---set Token as Response
                  res.setHeader('Authorization', `Bearer ${token}`)//To send the token in the Authorization header, the client needs to include it in subsequent requests:
                  res.cookie('access_token', token, { maxAge: 900000, httpOnly: true,secure:false,signed:false }); //this Would Inject token into [cookie_storage && cookie_Header]
                  //---------Including Other Response Data
                  
                  //--------Injecting Permission and UserDatas
                  res.setHeader('acctype',JSON.stringify(_rolePermisions)) //Injecting new_attribute into mongodb(findOne or Obj)_ data is not good..best...In Header
                  res.setHeader('token',JSON.stringify(token)) //Injecting new_attribute into mongodb(findOne or Obj)_ data is not good..best...In Header
                  res.setHeader('role',_rolePermisions.profile.group) //Injecting new_attribute into mongodb(findOne or Obj)_ data is not good..best...In Header
                  ///console.log('User is Authenticated && Has Permissions of ===>',_rolePermisions)
                  
                return res.status(200).send(JSON.stringify(modelData)); 
                }
                return  res.status(404).json('Permission Error')
               }).catch(()=>{ return res.status(404).json({})})
               //--------------------Permission Operation---Ends

            } else { return res.status(202).send(null ); }
          }).catch((modelError) => {return res.status(404).send(modelError ); }); // return modelError
      } catch (error) {  return  res.status(505).send(error);  }
    });
 
  // API
  export default router


  