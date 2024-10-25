

let _returnRecords ={}
const documentCupdateList = (thisModel,lists=[]) =>{
  _returnRecords ={}

    try{
        thisModel.create(lists).then((createdDoc) => {console.log('Products created:', createdDoc); })
        .catch((error) => {console.error('Error creating products:', error); });
    }catch{  }

    return true
}

 async function documentCupdate (thisModel,documentRecords,updateKey=false,overWrite=false){
    _returnRecords ={}
    for (let doc in documentRecords)
        {
    try {
       let documentRecord = documentRecords[doc]
      //------------Preparing finding Query
      // console.log(documentRecord,'creating Item')
      let findBy={} 
      if (updateKey ?? false) {findBy[updateKey]= documentRecord[updateKey] ?? null//updating by id
      }else{ 
        findBy={updatedAt:null} //Existing_columns(for Null O/P)
        //return res.status(404).send({ message: "NullData(P) Received." });
      }
      //---
      //-----------finding Record__
       await thisModel
        .findOne(findBy) //if findby is null it returns index_0 item
        .then(async(modelQA) => {
          // let columnOperation = documentRecords['onplayOps'] ?? true
          if(modelQA==null){ 
             modelQA = new thisModel(documentRecord)
          // console.log(findBy,'Creating Process Debug')

          }else{//----------------Column Computing_I
            //=============S1================Computing Service
            if(!updateKey){return false}
            Object.assign(modelQA, documentRecord);
            // console.log(modelQA.id,findBy,'Updating Process Debug')
          }
          //---------------Computer ModelData
          //=============S2===============Content Weighting Service
          //-----------Saving Model_START
          return  await modelQA.save().then((modelData) => {
            // console.log(modelData['quantity'],'Update ===')
            if (modelData && Object.keys(modelData).length) {
               if(updateKey){_returnRecords[findBy[updateKey]]=modelData} //return the id of each records = (updateKey_Value)
              return { status: 200, data: _returnRecords}
            } else {return { status: 501, data: modelData}; }
          }).catch((modelError) => {
            console.log(modelError,'Creating Process Debug Error')
            return { status: 500, data: modelError}; 
          });
        //-------------------------Saving Model_END
      }).catch((modelQAR)=>{
        return { status:500, data:modelQAR}
      }) //------------
    } catch(error) { return { status: 500, data: error};}
            }
    
    return {status:200,'data':_returnRecords}

}


export {documentCupdate,documentCupdateList}
