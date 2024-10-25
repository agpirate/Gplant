import {documentCupdate,documentCupdateList} from "../services/dBServices/documentCupdate"
import {profileModel} from "../backendCore/models/profileModels"


async function createProfile(sampleRecord={},createUpdateKey){
    let records =[
      Object.assign({injectV:''},sampleRecord) //add more list of sample Records to the list ??
    ]

    return await documentCupdate(profileModel,records,createUpdateKey)
  }

  export {createProfile}