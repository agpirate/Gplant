<template>
  <q-page v-if="Loadingevent.main ?? false" class="flex flex-center bg-black text-white text-bolder fontestyle">
    {{Loadingpage.content}}
  </q-page>
  <q-page v-else-if="Loadingevent.loading">
      <div  class="col-auto" style="width:8vw;">
        <q-linear-progress dark query color="white" class="q-mt-sm"  />
      </div>
  </q-page>
  <q-page class="q-px-sm q-gutter-sm row justify-center"  v-else>

    <div
      class="justify-center col-md-col col-sm-col column q-pa-sm"
      style="min-height: 92vh"
    >
      <div  class="col-auto text-white fontdstyle " v-if="Loadingevent.loginform ?? false">
        {{Loadingpage.content}}
      </div>
      <div class="col column flex flex-center q-pa-sm">

        <div class="bordered-radius" >
          <loginForm  :_this="_this" @login="_manageStoreLogin()" >   </loginForm>
        </div>

      </div>
    </div>
  </q-page>

</template>

<script setup>
import { ref, reactive, computed, onMounted, onBeforeMount, watch } from "vue";
import loginForm from "src/components/forms/loginForm.vue";
//---------------------Login form
import { authenticatingStore } from "stores/authenticatedStore/authenticatingStore";
import _localStorage from "src/services/storeService"

import { useRouter } from "vue-router";
import {useQuasar, useMeta } from "quasar";

import debugCard from "@/components/debugCards.vue";
import useDebugMixin from "@/composables/debugMixin";
const { 
  Loadingpage,
      Loadingevent,
      Loading,

      DoneMessage,
      KnowthisMessage,
      WarnthisMessage,
      //----------returning values
      // timerLoadpage,
      timerLoadevent,

      timerLoad,
      timerDone,
      timerInformthis,
      timerError
} = useDebugMixin()

const authService = authenticatingStore();

const metaData = {
  // sets document title
  title: "YGP Asystem",
  titleTemplate: (title) => `${title} - LoginPage`,
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
const router = useRouter();
const $q = useQuasar();

// Loadingpage.value= null
//null == initial loading , = false (incorrect tried) = value_message ( is rolling)
//----------------------------------------------Notifier (pos,act,notes)

var _this =ref({})
async function _thisDefaulting (){
  _this.value={}
  try{
  _this.value.keyID =  null
  _this.value.clearText = null

  _this.value['acctype']=''
  }catch{ }
  return true
}
// _thisDefaulting()

async function _manageStoreLogin(_thisReturn={}){
  _this.value=Object.assign(_this.value,_thisReturn)
  //------clearLog
  // Loadingpage.value=null
  await timerLoadevent({ loading: 0 }, 3000, "");
  //-----------
  console.log('\n\nFunction - _manageStoreLogin --STORE Authentication Initializing [Phone,Stored_ID]---- \n')
  return await authService.useLogin(_this.value)
    .then(async (resp) => {
      var _userData = resp["data"] ?? false 
      console.log(`\n LoginStatus = ${resp.status} \n`)
      console.log(resp.data)
       if((!resp.status  || !_userData )){
         timerLoadevent({ loginform: 0 }, 0, _this.value.keyID ? 'Incorect Keys': null);
        return false 
      }
      //----------- Succefully Registered
      _this.value = Object.assign({}, _userData);
      console.log(`\n User Acctype = ${_this.value["acctype"]} \n`)
      //------------ Validate Acctype ?
      if(!(_this.value["acctype"] ?? false)){ await timerLoadevent({ main: 5000 }, 0, "Access Error, Retrying..");return false}
      //----------- Loading Messages
      // await timerLoadevent({ main: 0 }, 0, "...");
      //----------- Routing to models
      let modals = Object.keys(_this.value["acctype"]);
      for (let index in modals) {
          console.log('Routing Models : ++ '+modals[index],index)
        if (await routeIt(modals[index])) {
          console.log('\n\n</Function - _manageStoreLogin --Loged In \n')
          return true; //break;
        }
      }
      return timerLoadevent({ main: 0 }, 0, "Routing Error.");
    })
    .catch(async (e) => {
      console.log('\n\n</Function - _manageStoreLogin - \n'+e)
      return await timerLoadevent({ main: 0 }, 0, "Error Connecting.." + e);
    });
}

//------------------------------------------------------------------------------ Warming UP(BIOS_Process.....POST)
// timerLoadevent({ main: 0 }, 0, "..");
//--------------------------
async () => timerLoadevent({ main: 0 }, 0, "Yirgu Gas Plant");
onMounted(async () => {
      //--------------ON MOUNT
      await timerLoadevent({ main: 2000 }, 2000, "Yirgu Gas Plant")
      //Extract Important data and Update the Build Basic
      console.log('\n\n<0 ---------Automatic Authentications Initiated---- \n')
       await _manageStoreLogin();
      console.log('\n\n</0---------Automatic Authentications Terminated--- \n')
      return true //if new Registered User Auto Login
});
onBeforeMount(async() => {
    //--------------ON MOUNT
  console.log('\n\n<---------Defaulting Profile <--this--> ---- \n')
  await _thisDefaulting(); //Build Basic _this_default Schema ( same to columns)
  console.log('\n\n---------Mining User Device Informations [Phones, GeoLocations]---- \n')
});

let excludedModals = ['user','group',null,'']
let routeIt = async (_accDefault = null) => {
  if(excludedModals.includes(_accDefault) || !(_this.value['acctype'] ?? false)){return false}
  await timerLoadevent({ main: 3000 }, 3000, "Loading " + _accDefault); //Message  [ wait 3 sec ] [reset]
  await timerLoadevent({ main: 0 }, 0, "Loading " + _accDefault); //Message display for unlimited sec,but  wait && don reset it
  let _ismobile = $q.screen.lt.sm ? true : false;
  try {
    let routePath =Object.assign({'acctype':_this.value['acctype'][_accDefault]??''},_localStorage._reroute(_accDefault,_accDefault,_ismobile))
    await router.push(routePath)
    console.log('Routing Path =>=================',routePath)
    timerLoadevent({ main: 5000 }, 3000, "Ok, Loading " + _accDefault);//Message display for 3sec,but don wait && reset it
    return true; //
  }catch(e){
    console.log(`\n\n</Routing Functions of pathName = ${_accDefault}  == >> ${e} == >>  \n`)
    timerLoadevent({ main: 3000 }, 3000,e);return false}
};
</script>
