

import {
  profileModel,threeaModel
} from "app/src-ssr/backendCore/models/profileModels";
import { mongoose } from "mongoose";
//var Schema = mongoose.Schema,
ObjectId = mongoose.Types.ObjectId;
const jwt = require('jsonwebtoken');

// Authentication middleware
async function authenticate(req, res, next) { // ... authentication logic ...
    //--SEARCHING tokens
    console.log(`\n\n Authentication Middlewares =========> Entering \n`)
    //----1) Tokens (cookies---- 2 options)
    const _thisCookies= (req.cookies  ?? false )
    let _cookie =_thisCookies ? (_thisCookies?.['access_token'] ?? false) : false  //Extract sessionID/Token from cookies
    console.log(`Cookies Finding ; Option 1 : Cookies = ${_cookie } \n`)
    //----2) Headers (Token Strings---)
    var _header = req.headers ?? false
    if(typeof _header == 'string'){ //------seterialize the Header_Conten if it's isn't coming as object_data(?????)
        let _iisTemp = _header//.split('|')[1]
        try{
          _header= JSON.parse(_iisTemp)
        }catch{}
     }else{}
    let _authHeader = _header['authorization'] ?? false //Extract sessionID/Token from Header
    let _cookieHeader = _header['cookie'] ?? false //Extract sessionID/Token from Header
     //----------------Header way of Cookies Finding Require Further spliting and slicing
     if(!_cookie) {//if cookies exist (ignore bearToken), if _cookies=false, continues using bearToken_way & modify _cookie Value
        
        let bearer =''
        if(_authHeader){
            bearer=_authHeader?.replace('Bearer ', '');
        }else{
            bearer=_cookieHeader ? _cookieHeader.replace('access_token= ', '') : '';
        }
        _cookie = bearer.trim() ?? _cookie;
        console.log(`Cookies Finding ; Option 2 : Header-Cookies = ${_cookie } \n`)
     }else{}
    //----------Check if Token Existing
    if(!_cookie){
      console.log(`Cookies Finding ; No Cookie : Exit!\n`)
      return res.status(401).send('Access forbidden ? _cookies failed');
    }
    //----------------------------------------------------------Cookkies Passed
    //-------optional userData
     let _userID = _header['id'] ?? null
     var _issID= _header?.acckey ?? null  //_iss
     var _issrole= _header?._iss ?? null  //_iss
     var _issmodal= _header?._issmodal ?? null  //_issModal 
     var _userQuery= _header?.acckey ?? null  //_iss

     //----------process.env.TOKEN_SECRET
     try{
       const decoded = jwt.verify(_cookie, process.env.TOKEN_SECRET);
      console.log(`Token Decoded For = \n`)
      console.log(decoded)
        //---------Embeding Generated_Data && Forwarding
        if(!_userID || decoded){
          _userID = decoded.userId ?? _userID;
          _issID=decoded['acckey'] ?? _issID
        }else{}
     }catch{ console.log(`Token Decoded Error = \n`);  }

    //--------------Check User for REgisteration using user_id ? or return error
    if(_userID){
      await profileModel.findOne({'_id':new ObjectId(_userID)}).then((_user) =>{
            if(_user){
              _issID=_user['acckey'] ?? false
              _userQuery=_user['queryWeight'] ?? false
            }else{return res.status(403).send('UserID ; Access forbidden');}
        }).catch(()=>{return res.status(403).send('UserID ; Access forbidden');})
    }else{return res.status(401).send('Access forbidden ? userID failed');}
    //-----------------use Acckey for Permissions table
    //-------------------------------
    req.userId=_userID
    req.issId=_issID
    // req.issrole=_issrole
    req.queryWeight=_userQuery
    //----- Other Neccessary Informations
    req.location={'lat':_header.lat ?? '','long':_header.long ?? ''}

    try{
        //--------------------------------------------------------------------Authentication Ends//
        _issrole=null
        _issmodal = _issmodal ?? 'saleit'
        console.log(`== Role & Permission Acckey ${_issID ? 'is OK':'No'} && Target Modal is = ${_issmodal}  \n`)

        if(_issID && _issmodal){
            await threeaModel.findOne({'_id':new ObjectId(_issID)}).then((_role_permission)=>{
              if(_role_permission){ //if Permissions Founded
                _issrole =_role_permission[_issmodal] ?? null
              }else{  }  //ifNot
              //next();
              return true
            }).catch(()=>{ return true;//res.status(403).send('Access forbidden');    
          })
          }else{ }
          console.log(`== Role & Permission  = Null for Modal ${_issmodal}  \n`)
    }catch(error){ return true   }
    if(!_issrole){return res.status(403).send('UserRole ; Access forbidden')}
    //-----------------IF...Not _iss_ID
    req._issrole =_issrole
    // req.role =_issrole
    console.log(`Ending MWare UserID = ${_userID} && Acckey = ${_issID} \n`)

    next()
    return true
  }
  
 export default authenticate;
