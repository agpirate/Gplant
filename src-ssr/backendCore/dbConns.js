import { mongoose } from "mongoose";

const MONGO_humdURI = process.env.API_MNGDB + "/humanResource";
const MONGO_serviceURI = process.env.API_MNGDB + "/services";
const MONGO_chatURI = process.env.API_MNGDB + "/chats";
const MONGO_procURI = process.env.API_MNGDB + "/procurement";
const MONGO_finURI = process.env.API_MNGDB + "/finance";
const MONGO_saleURI = process.env.API_MNGDB + "/sales";
const MONGO_adminURI = process.env.API_MNGDB + "/admin";

//-------------
const supportedMimes = {
  "text/csv": "csv",
};

// defing the database instance as variable mean as this js_module is imported the get excuted..
console.log( process.env.API_MNGDB + "/procurement",'Mongodb DBs ; Paths')
var procDBs;
try {
  procDBs = mongoose.createConnection(MONGO_procURI, {});
  procDBs.once('open', async () => {
    let collections =[]
    try{
       collections = await procDBs.models
      if (collections && Object.keys(collections).length > 0) {}
    }catch{}
    console.log(collections,` Database connected: ${MONGO_procURI} with # ${Object.keys(collections).length}`);
   return procDBs
 });
 procDBs.on("error", (err) => {console.log("Error"+ err); return false });
} catch (err) { process.exit(1); }

var finDBs;
try {
   finDBs = mongoose.createConnection(MONGO_finURI, {});
  finDBs.once('open', async () => {
    let collections =[]
    try{
       collections = await finDBs.models
       if (collections && Object.keys(collections).length > 0) {}
     }catch{}
   console.log(` Database connected: ${MONGO_finURI} with # ${Object.keys(collections).length}`);
   return finDBs
 });
 finDBs.on("error", (err) => {console.log("Error"+ err); return false });
} catch (err) { process.exit(1); }


var humdDBs;
try {
   humdDBs = mongoose.createConnection(MONGO_humdURI, {});
  humdDBs.once('open', async () => {
    let collections =[]
    try{
       collections = await humdDBs.models
       if (collections && Object.keys(collections).length > 0) {}
     }catch{}
   console.log(collections,` Database connected_: ${MONGO_humdURI} with # ${Object.keys(collections).length}`);
   return true
 });
 humdDBs.on("error", (err) => {console.log("Error"+ err); return false });
} catch (err) { process.exit(1); }

var chatDBs;
try {
   chatDBs = mongoose.createConnection(MONGO_chatURI, {});
  chatDBs.once('open', async () => {
    let collections =[]
    try{
       collections = await chatDBs.models//{name:'profile'});
      if (collections.length > 0) {}
    }catch{}
   console.log(` Database connected: ${MONGO_chatURI} with # ${Object.keys(collections).length}`);
   return chatDBs
 });
 chatDBs.on("error", (err) => {console.log("Error"+ err); return false });
} catch (err) { process.exit(1); }

var saleDBs;
try {
   saleDBs = mongoose.createConnection(MONGO_saleURI, {});
  saleDBs.once('open', async () => {
    let collections =[]
    try{
       collections = await saleDBs.models//{name:'profile'});
      if (collections.length > 0) {}
    }catch{}
   console.log(` Database connected: ${MONGO_saleURI} with # ${Object.keys(collections).length}`);
   return saleDBs
 });
 saleDBs.on("error", (err) => {console.log("Error"+ err); return false });
} catch (err) { process.exit(1); }

var serviceDBs;
try {
  serviceDBs = mongoose.createConnection(MONGO_serviceURI, {});
  serviceDBs.once('open', async () => {
    let collections =[]
    try{
       collections = await serviceDBs.models//{name:'profile'});
      if (collections.length > 0) {}
    }catch{}
   console.log(` Database connected: ${MONGO_serviceURI} with # ${Object.keys(collections).length}`);
   return serviceDBs
 });
 serviceDBs.on("error", (err) => {console.log("Error"+ err); return false });
} catch (err) { process.exit(1); }

var adminDBs;
try {
   adminDBs = mongoose.createConnection(MONGO_adminURI, {});
  adminDBs.once('open', async () => {
    let collections =[]
    try{
       collections = await adminDBs.models//{name:'profile'});
      if (collections.length > 0) {}
    }catch{}
   console.log(` Database connected: ${MONGO_adminURI} with # ${Object.keys(collections).length}`);
   return adminDBs
 });
 adminDBs.on("error", (err) => {console.log("Error"+ err); return false });
} catch (err) { process.exit(1); }


//}MONGO_serviceURI
export { finDBs, humdDBs,chatDBs,serviceDBs,
   procDBs, saleDBs, adminDBs };

//proc()
//module.exports = {   proc2,proc,mongoose }
// var conn = require(../dconns);
// conn.proc.model(); // for proc access..
// mongoose.model(); ///for admin acess
