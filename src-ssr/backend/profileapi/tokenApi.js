

import {
  profileModel,threeaModel
} from "../../backendCore/models/profileModels.js";

import { mongoose } from "mongoose";
var ObjectId = mongoose.Types.ObjectId;

import jwt  from "jsonwebtoken";
import { Router } from "express"

const router = Router()

// Protected route ( formating ObjectID column with new ObjectID is needed)
let createKey=['keyID','id']
router.post("/login", async (req, res) => {
      //---------------------Grap User Data of Request_Header + Body
      let reqData= req.body ?? {}
      console.log(`\n\n  User Authentication LogKeys FAiled ?  ${(reqData[createKey[0]] ?? reqData[createKey[1]]) == null  }\n`)
      console.log(reqData)
      //createKey_parameters at leastOne Existance ?
      if (((reqData[createKey[0]] ?? reqData[createKey[1]]) == null  )) {return res.status(404).send(""); }

      let findBy={}
      //createKey_parameters casting and build findQuery
      if(reqData[createKey[0]] ?? false){ findBy[createKey[0]] = reqData[createKey[0]]}
      else{findBy['_id'] = new ObjectId(reqData[createKey[1]])}

      //-------------Find User On Database
      try {
        return await profileModel.findOne(findBy).then(async (modelData) => {
            console.log(`\n\n User Authentication Profile == ${modelData ?? null  },, for UserId = \n`)
            console.log(findBy)
            // changing mondodb object(.toObject() ; .lean()) will not redefine the << _id key to id >> automatic    
            if (modelData && Object.keys(modelData).length) {
              console.log(`\n User Acckey  == ${(modelData.acckey ?? false)}  <= ${(modelData.acckey ?? false) ? 'Yes' : 'No'} < == >User Already Existed ?\n`)
               //------user Already Registered..Then Check for Roles use acckey
               let queryID = new ObjectId(modelData.acckey)
               //--------------Search For Role and Permissions----Start
               return await threeaModel.findOne({'_id':queryID}).then((_rolePermisions)=>{
              console.log(`\n Checked :_ User Acckey  == ${(_rolePermisions ?? false)}  <= < == >User Already Existed ?\n`)

                if(_rolePermisions){
                  modelData = modelData.toObject() ?? false//lean()
                  //generate Token
                  const token = jwt.sign({ userId: modelData['_id'],'acckey':_rolePermisions['id'] }, process.env.TOKEN_SECRET, { expiresIn: '24h' }); 
                  //---set Token as Response
                  res.setHeader('authorization', `Bearer ${token}`)//To send the token in the Authorization header, the client needs to include it in subsequent requests:
                  res.cookie('access_token', token, { maxAge: 900000, httpOnly: true,secure:false,signed:false }); //this Would Inject token into [cookie_storage && cookie_Header]
                  //---------Including Other Response Data
                  
                  //--------Injecting Permission and UserDatas
                  res.setHeader('acctype',JSON.stringify(_rolePermisions)) //Injecting new_attribute into mongodb(findOne or Obj)_ data is not good..best...In Header
                  res.setHeader('token',token) //Injecting new_attribute into mongodb(findOne or Obj)_ data is not good..best...In Header
                  res.setHeader('role',_rolePermisions.profile.group ?? null) //Injecting new_attribute into mongodb(findOne or Obj)_ data is not good..best...In Header
                  ///console.log('User is Authenticated && Has Permissions of ===>',_rolePermisions)
                  modelData['acctype']=_rolePermisions 
                  modelData['id']=modelData['_id']  // changing mondodb object(.toObject() ; .lean()) will not redefine the << _id key to id >> automatic               
                  console.log(`\n Final Checked :  == ${(modelData.id ?? false)}  <= < == >User Authenticated ?\n`)
                  
                  return res.status(200).send(JSON.stringify(modelData)); 
                }
                return  res.status(501).json({'data':'Permission Error' +'Acckey not found.'})
               }).catch((e)=>{console.log(`\n ${e}`); return res.status(501).json({'data':e})})
               //--------------------Permission Operation---Ends
            } else { return res.status(202).send(null ); }
          }).catch((modelError) => {return res.status(404).send({'data':modelError }); }); // return modelError
      } catch (error) {  return  res.status(505).send({'data':error});  }
    });
  //----------------------------------Query Builder

  // API
  export default router;

  