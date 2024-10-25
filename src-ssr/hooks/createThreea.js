


// Creating role and permissions tables
// and let user assign permissions sets by ID

/*  
Permissions Rule;- like ubunut/linux file permissions schecma
                group: name (user type)
                capability: has 4 permissions status indicators ; 0-0-0-0
                        Value Rules ; ==> 0 = no any(block any) , 1=yes this(allowed column) , 2=yes any(all column_of document except listed)
                            Create :0(ADD) the first index of ; creating new item ; 
                            Read(R):1(Read) the second Index of capability digits ; read permissions : 0 = yes , 1=no
                            Write (W) :2(Update) the thrid index of capabilit digitst : write/modifie permi ; 0 = yes , 1=no
                            Excute (x) :3(Delete) the fourth index of capability digit : execute/ run it or delete ; 0 = yes , 1=no
                            Group  :4 the fifth index of capability digit : group of applications ; 0 = self-group(his Own) , 1= can operate with all_user's Data ( but limited to specfic column), 2= is root(godMode) , ... other groups
                accstage : at what stage of the content is the capability, could work (be functional)
                            [1,2,3,4,5,6]
                role : to what part of the contents is the capability specified ( to all the documents or by column specified)
                            ['','columnNames']
*/
import {documentCupdate,documentCupdateList} from "../services/dBServices/documentCupdate"
import { threeaModel,profileModel } from "../backendCore/models/profileModels"
let letRolePermissions = [
  {
    group:'admin',
    profile:{capability:'22221',accstage:[1,2,3,4,5,6],
    role:['']},
    user:{capability:'02100',accstage:[1],
      role:['keyID','name','lastName','']},
    attendance:{capability:'22221',accstage:[1,2,3,4,5,6],
    role:['']},
    plan:{capability:'22221',accstage:[1,2,3,4,5,6],
    role:['']},
    report:{capability:'22221',accstage:[1,2,3,4,5,6],
    role:['']},
    leavereq:{capability:'22221',accstage:[1,2,3,4,5,6],
    role:['']},   
    supplier:{capability:'22221',accstage:[1,2,3,4,5,6],
    role:['']},
    asset:{capability:'22221',accstage:[1,2,3,4,5,6],
    role:['']},
    rawmaterial:{capability:'22221',accstage:[1,2,3,4,5,6],
    role:['']},
    goods:{capability:'22221',accstage:[1,2,3,4,5,6],
    role:['']},
    product:{capability:'22221',accstage:[1,2,3,4,5,6],
    role:['']},
    mainten:{capability:'22221',accstage:[1,2,3,4,5,6],
    role:['']},
    statment:{capability:'22221',accstage:[1,2,3,4,5,6],
    role:['']},
    monpay:{capability:'22221',accstage:[1,2,3,4,5,6],
    role:['']},
    mispay:{capability:'22221',accstage:[1,2,3,4,5,6],
    role:['']},
    customer:{capability:'22110',accstage:[1],
      role:['regAdmin']},
  },
{
  group:'root',
  profile:{capability:'22222',accstage:[1,2,3,4,5,6],
  role:['']},
  user:{capability:'02100',accstage:[1],
    role:['keyID','name','lastName','']},
  attendance:{capability:'22222',accstage:[1,2,3,4,5,6],
  role:['']},
  plan:{capability:'22222',accstage:[1,2,3,4,5,6],
  role:['']},
  report:{capability:'22222',accstage:[1,2,3,4,5,6],
  role:['']},
  leavereq:{capability:'22222',accstage:[1,2,3,4,5,6],
  role:['']},   
  supplier:{capability:'22222',accstage:[1,2,3,4,5,6],
  role:['']},
  asset:{capability:'22222',accstage:[1,2,3,4,5,6],
  role:['']},
  rawmaterial:{capability:'22222',accstage:[1,2,3,4,5,6],
  role:['']},
  goods:{capability:'22222',accstage:[1,2,3,4,5,6],
  role:['']},
  product:{capability:'22222',accstage:[1,2,3,4,5,6],
  role:['']},
  mainten:{capability:'22222',accstage:[1,2,3,4,5,6],
  role:['']},
  statment:{capability:'22222',accstage:[1,2,3,4,5,6],
  role:['']},
  monpay:{capability:'22222',accstage:[1,2,3,4,5,6],
  role:['']},
  mispay:{capability:'22222',accstage:[1,2,3,4,5,6],
  role:['']},
  customer:{capability:'22222',accstage:[1,2,3,4,5,6],
    role:['regAdmin']},
},

  {
  group:'regAdmin',


    asset:{capability:'22110',accstage:[1,2],
    role:['']},
    rawmaterial:{capability:'22110',accstage:[1,2],
    role:['']},
    goods:{capability:'22110',accstage:[1,2],
    role:['']},
    product:{capability:'22110',accstage:[1,2,3],
    role:['']},

    user:{capability:'02100',accstage:[1],
      role:['keyID','name','lastName','']},

      plan:{capability:'22110',accstage:[1],
      role:['']},
      report:{capability:'22110',accstage:[1],
      role:['']},
      leavereq:{capability:'22110',accstage:[1],
      role:['']},   
      supplier:{capability:'22110',accstage:[1],
      role:['']},

    mainten:{capability:'22110',accstage:[1],
    role:['']},
    customer:{capability:'00000',accstage:[1],
      role:['regAdmin']},
      },
    {
  group:'gmStatus',



      asset:{capability:'21121',accstage:[1,2,3,4,5,6],
      role:['gmStatus']},
      rawmaterial:{capability:'21121',accstage:[1,2,3,4,5,6],
      role:['gmStatus']},

      goods:{capability:'02101',accstage:[2,3,4],
      role:['gmStatus']},
      product:{capability:'21121',accstage:[1,2,3,4,5,6],
      role:['gmStatus']},

      user:{capability:'02100',accstage:[1],
        role:['keyID','name','lastName','']},
    
          plan:{capability:'21121',accstage:[1,2,3,4,5,6],
          role:['gmStatus','performance']},
          report:{capability:'21121',accstage:[1,2,3,4,5,6],
          role:['gmStatus',"performance"]},
          leavereq:{capability:'21121',accstage:[1,2,3,4,5,6],
          role:['gmStatus']}, 
    
          mainten:{capability:'21121',accstage:[1,2,3,4,5,6],
          role:['gmStatus']},
        },
    {
  group:'userAuthorization',

  user:{capability:'02100',accstage:[1],
    role:['keyID','name','lastName','']},
     
      plan:{capability:'22110',accstage:[1],
      role:['']},
      report:{capability:'22110',accstage:[1],
      role:['']},
      leavereq:{capability:'22110',accstage:[1],
      role:['']},   
      mainten:{capability:'22110',accstage:[1],
      role:['']},  
        },

        {
  group:'store',

            //buy1,2 --- finance,3 --store,4 --taken,5 --sale,6
            //buy1,2 ---  --store,3 --taken,4 --sale,5
          asset:{capability:'02101',accstage:[3,4,5],
          role:['storeStatus','takenBy']},
          rawmaterial:{capability:'02101',accstage:[3,4,5],
          role:['storeStatus','takenBy']},
          goods:{capability:'02101',accstage:[3,4,5],
          role:['storeStatus','takenBy']},

          product:{capability:'02101',accstage:[2,3,4,5],
          role:['storeStatus','takenBy']},
          
          plan:{capability:'22110',accstage:[1],
            role:['']},
            report:{capability:'22110',accstage:[1],
            role:['']},
            leavereq:{capability:'22110',accstage:[1],
            role:['']},
            mainten:{capability:'22110',accstage:[1],
            role:['']},   
            },
          {
  group:'finance',

  profile:{
        capability:'22221',accstage:[1,2,3,4,5,6],
        role:['']
      },

      //buy1,2 --- finance,3 --store,4 --taken,5 --sale,6
            //buy1,2 ---  --store,3 --taken,4 --sale,5
            product:{capability:'02101',accstage:[4,5],
              role:['financeApStatus']},   
            goods:{capability:'02101',accstage:[2,3],
              role:['financeStatus',]},
            asset:{
              capability:'02101',
              accstage:[2,3],
              role:['financeStatus']
            },

            rawmaterial:{capability:'02101',accstage:[2,3],
            role:['financeStatus']},
     
            user:{capability:'02100',accstage:[1],
              role:['keyID','name','lastName','']},
                  attendance:{capability:'00000',accstage:[1],
                  role:[''] },

                  plan:{capability:'22110',accstage:[1],
                  role:['']},
                  report:{capability:'22110',accstage:[1],
                  role:['']},
                  leavereq:{capability:'22110',accstage:[1],
                  role:['']},
                  mainten:{capability:'22110',accstage:[1],
                  role:['']},   
              },
            {
  group:'sale',

      
            //buy1,2 --- finance,3 --store,4 --taken,5 --sale,6
            //buy1,2 ---  --store,3 --taken,4 --sale,5
            product:{capability:'02101',accstage:[4,5],
              role:['saleStatus']},

              goods:{capability:'02101',accstage:[5,6],
              role:['saleStatus']},
              
            
              customer:{capability:'02101',accstage:[1],
                role:['regAdmin']},

                plan:{capability:'22110',accstage:[1],
                  role:['']},
                  report:{capability:'22110',accstage:[1],
                  role:['']},
                  leavereq:{capability:'22110',accstage:[1],
                  role:['']},  
                  mainten:{capability:'22110',accstage:[1],
                  role:['']},
                },
            {
              group:'quality',
  

                            rawmaterial:{capability:'02101',accstage:[1,2],
                            role:['qualityStatus']},
                            goods:{capability:'02101',accstage:[1,2],
                            role:['qualityStatus']},
                            product:{capability:'02101',accstage:[1,2],
                            role:['qualityStatus'],

                            
                            user:{capability:'02100',accstage:[1],
                              role:['keyID','name','lastName','']},
                            attendance:{capability:'00000',accstage:[1],
                            role:[''] },
                            plan:{capability:'22110',accstage:[1],
                            role:['']},
                            report:{capability:'22110',accstage:[1],
                            role:['']},
                            leavereq:{capability:'22110',accstage:[1],
                            role:['']}, 
                            mainten:{capability:'22110',accstage:[1],
                            role:['']},
                              },
                            },
            {
              group:'marketing',



                rawmaterial:{capability:'02000',accstage:[1],
                role:['']},
                goods:{capability:'02100',accstage:[1],
                role:['']},
                product:{capability:'02000',accstage:[1],
                role:['']},
                customer:{capability:'22110',accstage:[1,2,3,4,5,6],
                  role:['regAdmin']},

                                 
                user:{capability:'02100',accstage:[1],
                  role:['keyID','name','lastName','']},
                attendance:{capability:'00000',accstage:[1],
                role:[''] },
                plan:{capability:'22110',accstage:[1],
                role:['']},
                report:{capability:'22110',accstage:[1],
                role:['']},
                leavereq:{capability:'22110',accstage:[1],
                role:['']}, 
                mainten:{capability:'22110',accstage:[1],
                role:['']},
                  },
                {
                  group:'others',
                  user:{capability:'02100',accstage:[1],
                    role:['keyID','name','lastName','']},
                  
                  asset:{capability:'02001',accstage:[1],
                  role:['']},
                  rawmaterial:{capability:'02001',accstage:[1],
                  role:['']},
                  goods:{capability:'02001',accstage:[2,3,4],
                  role:['']},
                  product:{capability:'02001',accstage:[1],
                  role:['']},
                  
                    },
  ]

let createUpdateKey = 'group'
let userSampleRole ='admin'
let createUpdatePKey = 'keyID'
async function createRolePermissions(){
  // let letRolePermissions =reqData.roles
  console.log('\n\n-==--------------------------------Role & Permissions Managment---------------START')

  return await documentCupdate(threeaModel,letRolePermissions,createUpdateKey).then(async (modelData)=>{
    console.log('\n'+Object.keys(modelData.data).length,' = Sum of Role and Permissions <=>\n')
    for(let i in modelData.data){console.log(`\n Role Name = ${i} && acckey = ${modelData.data[i]._id}`)}
    //---and Create sample users
    let _sampleRole =null
    if(modelData.status == 200){
       _sampleRole= modelData.data[userSampleRole] ?? false
    }else{return true}
    console.log(`\n Creating Sample User's Role Name = ${userSampleRole} && with accKey ${_sampleRole._id ?? null}`)
    try{
    const letProfiles = [
      {name:'root',lastName:'root',keyID:'12345',companyID:'023','acckey':_sampleRole ? new ObjectId(_sampleRole._id) : null},
      {name:'root',lastName:'regadmin',keyID:'regadmin',companyID:'regadmin','acckey':_sampleRole ? new ObjectId(modelData.data['regAdmin']._id) : null},
      {name:'root',lastName:'finance',keyID:'finance',companyID:'finance','acckey':_sampleRole ? new ObjectId(modelData.data['finance']._id) : null},
      {name:'root',lastName:'store',keyID:'store',companyID:'store','acckey':_sampleRole ? new ObjectId(modelData.data['store']._id) : null},
      {name:'root',lastName:'sales',keyID:'sales',companyID:'sales','acckey':_sampleRole ? new ObjectId(modelData.data['sale']._id) : null},
      {name:'root',lastName:'sales2',keyID:'sales2',companyID:'sales2','acckey':_sampleRole ? new ObjectId(modelData.data['sale']._id) : null},
      // {name:'admin3',lastName:'12345',phone:'12345899',companyID:'00029','acckey':_sampleRole ? new ObjectId(_sampleRole._id) : null},
     ]
     try{
      let modelData2 = await documentCupdate(profileModel,letProfiles,createUpdatePKey)
      console.log(`User Creating  ====>> ${modelData2.status ==200 ? 'success' : 'Error'}`)
      console.log('Approved Acckey is ='+modelData2.data['1023456786']?.acckey ?? 'KeyID is Not Created ?')
    }catch(e){
    console.log(' \n\n')
    console.log(e)
    }
    console.log(' \n\n')
    }catch(e){
    console.log(' \n\n')
      console.log(e)
    }
    //-----   
    console.log('---------------------------------Role & Permissions Managment---------------END\n\n')
    return true                 
  })   
}
   export {createRolePermissions}