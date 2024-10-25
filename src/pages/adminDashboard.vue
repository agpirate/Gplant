<template>
  
  <q-page>


  </q-page>
</template>

<script setup>
  import { ref,reactive,computed,watch,onUnmounted, onMounted, onBeforeMount } from "vue";
  import { toRaw } from 'vue'
  // import { useLocalStorage } from '@vueuse/core'
  //---------------------Login form
  import { authenticatingStore } from "stores/authenticatedStore/authenticatingStore";
  import { profileStore } from "stores/authenticatedStore/profileStore";
import { thisStore } from "stores/dataStores/thisStore"; //Asset Store ( Main Store)

  // import {getCountry,getState,countries } from "src/services/geotimezone"
  import { useRouter } from "vue-router";
  import {useQuasar, useMeta } from "quasar";
  

const metaData = {
  // sets document title
  title: "Admin Dashboard",
  titleTemplate: (title) => `${title} - `,
  script: {
    printJs: {
      type: "application/ld+json",
      innerHTML: `{  }`,
    },
    ldJson: {
      type: "application/ld+json",
      innerHTML: `{ }`,
    },
  },
};

useMeta(metaData);

const $q = useQuasar();

const router = useRouter();

const _thisService = thisStore();
const _thisapiUrl ='/procurment/asset'


//----------------------------------------------Notifier (pos,act,notes)
var _this =ref({})

async function _buildOnplay (){
  _this.value={}
  try{
  _this.value.keyID =  null
  _this.value.isPwd = null

  }catch{ }

  return true
}
_buildOnplay()

//----=========================================================================---DATA ---/// ---ROW----CRUD
let createKey = "keyID";
let updateKey = "id";
let delKey = "id";

//----=========================================================================---DATA ---/// ---ROW----CRUD

const Crud_this = {
createData: async function (objParam={}) {
  //-------Check for Param_Requirents
  try {
    if (_this.value[createKey] == null) {return false; }
      //-----------Calling for Store Services  (_suburl, formData, objParam)
    return await _thisService.createData(_thisapiUrl,_this.value,objParam).then((response) => { 
          
          if (response.status) {
            return response.data;
          } else {
            return false;
          }}).catch((error) => {return false;});
  } catch {return false; }
},
//----------------------------------------------------------------
updateData: async function (objParam={}) {
  //-------Check for Param_Requirments
  try {
    if (_this.value[updateKey] == null) {return false; }
    //-----------Calling for Store Services
    return await _thisService.updateData(_thisapiUrl,_this.value, objParam).then((response) => { //returning as [false,response_obj]
      if (response.status) {
        return response.data;
        } else {
          return false;
        }
      }).catch((error) => {return false;});
  } catch {return false; }
},

readData: async function () {
  return await _thisService.readData(_thisapiUrl).then((response) => { //returning as ['data'][{},{},{data..}]
  if (response.status) {
        ////timerDone(5000,_readTitle[1],_readTitle[0]);return response.data;
      } else {
        ////timerError(5000,_readTitle[2],_readTitle[0]);return false;
      }
     }).catch((error) => {
      //timerError(5000,_readTitle[2],_readTitle[0]);
      return false;});
},
//---------------------------------------------------------------
readFData: async function (objParam={}) {
  //-------Check for Param_Requirents
  try {
    if (Object.keys(objParam).length ==0) {return false; }
  //-----------Calling for Store Services
  return await _thisService.readFData(_thisapiUrl,objParam).then((response) => {
    if (response.status) {
        //timerDone(5000,_readTitle[1],_readTitle[0]);
        return response.data;  
      } else {
        //timerError(5000,_readTitle[2],_readTitle[0]);
        return false;
      }
    })
    .catch((error) => {
      //timerError(5000,_readTitle[2],_readTitle[0]);
      return false;});
  } catch {return false; }
},

deleteData: async function () {
  //-------Check for Param_Requirents
  try {
    if (_this.value[delKey] == null) {return false; }
    //-----------------
    let objParam ={}
    objParam[delKey]=_this.value[delKey]
    //---------
    return await _thisService.deleteData(_thisapiUrl,objParam).then((response) => {
        if (response.status) {
          //timerDone(5000,_deleteTitle[1],_deleteTitle[0]);
          return response.data;
        } else {
          //timerError(5000,_deleteTitle[2],_deleteTitle[0]);
          return false;
        }
      }).catch((error) => {
        //timerError(5000,_deleteTitle[2],_deleteTitle[0]);
        return false; });
    
    } catch {return false; }
},
}
//------------------------------------------------------------------------------ Warming UP(BIOS_Process.....POST)
onMounted(async () => {  //--------------ON MOUNT
   //await _clearLogs()
    //console.log(_this.value.phone ,'ManageStoreLogin()-check Phone')
    // _manageStoreLogin()

});

</script>
