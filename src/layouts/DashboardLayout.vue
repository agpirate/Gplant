<template>
  <q-layout class="text-primary bg-white"  v-if="Loadingevent.main ?? false">
    <!--loading page-->
    <q-page-container>
      <q-page 
        class="flex flex-center  text-overline full-width full-height"
        style="background: rgb(6, 23, 54)"
      >
        <div class="q-gutter-sm flex flex-center">
          <q-chip class="text-weight-bolder text-h4 text-green-10 transparent" style="font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
            <q-avatar>
              <img src="/yirgumini.jpg" style="max-width: 10vw" />
            </q-avatar>
                  {{ Loadingpage.content ?? "" }}
          </q-chip>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
  <!---User Page-->
  <q-layout class="text-primary"  v-else>
<!---->
    <q-page-container class=" fronted-glass">
      <q-page class="fit-viewBox column">
        <!----------------Profile.....page-->
    
        <q-expansion-item :label="'YGP-'+(_this.companyID ?? '- ')+ ' ይርጉ ጋዝ ፕላንት ሓላ/ዝተ/ው/ማ'"
          class="shadow-1 overflow-hidden"
          style="border-radius: 5px;text-transform: capitalize;font-size: medium;font-weight: bold;"
          header-class="text-black-10 text-green"
          expand-icon-class="text-blue"
          :dense="true"    
        >
       
        <div class="col-auto raised" >
          <q-card class="q-my-xs">
            <q-item>
              <q-item-section avatar>
                <q-btn-dropdown
                  class="glossy column col-auto"
                  
                  split
                  padding="0px"
                 icon="add"
                >
                 

                  <div class="q-pa-md" style="min-width: 30vw">
                    <q-tabs
                      v-model="tab"
                      dense
                      class="text-grey fontcstyle"
                      active-color="primary"
                      indicator-color="primary"
                    >
                      <q-tab name="_empprofile" label="Profile" />
                      <q-tab name="_empSetting" label="Setting" />
                    </q-tabs>

                    <q-separator />

                    <q-tab-panels v-model="tab" animated>
                      <q-tab-panel
                        name="_empprofile"
                        class="q-pa-none q-gutter-xs"
                      >
                        <q-tab-panel name="iempprofile">
                          <q-item clickable v-ripple class="row justify-between bg-grey-3 fontcstyle ">
                            
                            
                            <div class="fontbstyle row q-gutter-sm"> 
                              <q-avatar rounded size="48px">
                                <img :src="_this['profile']" /> 
                                <!-- <q-badge floating color="teal">ygp</q-badge> -->
                              </q-avatar>
                              <div> {{ _this["name"] }} </div>
                              <!-- <div>  {{ _this["companyID"] }}</div> -->
                            </div>
                            <q-btn 
                                  dense
                                  size="sm"
                                  label="singOut"
                                  @click="_logOut()"
                                />
                          
                            
                          </q-item>

                          <q-item  class="text-grey-10 text-bold">
                            

                            <q-item-section side top>
                              <q-item-label >
                                since
                                {{    _this["createdAt"].split("T")[0] }}</q-item-label
                              >
                              <div class="text-orange">
                                <q-icon name="star" />
                                <q-icon name="star" />
                                <q-icon name="star" />
                              </div>
                            </q-item-section>
                          </q-item>

                          <q-item
                            class="q-gutter-sm column items-start text-grey-10 text-bold" style=""
                          >
                           
                             <div class="row q-gutter-sm boxbstyle"><Label>Department :</Label><div class="text-grey">{{ _this.department}}</div></div>
                             <div class="row q-gutter-sm boxbstyle"><Label>Position :</Label><div class="text-grey">{{ _this.position}}</div></div>
                            
                            </q-item>
                         
                        </q-tab-panel>
                      </q-tab-panel>

                      <q-tab-panel
                        name="_empSetting"
                        class="q-gutter-xs col column"
                      >
                        <div class="text-overline col">
                          <q-avatar size="24px" color="orange">Y</q-avatar>
                          {{ _this["name"] }}
                        </div>
                        <div class="text-overline col q-gutter-xs row">
                          <div class="col-auto q-gutter-xs column">
                            <q-input
                              outlined
                              type="password"
                              v-model="_this.keyID"
                              label="keyID"
                              stack-label
                              :dense="true"
                              autocomplete="off"
                            />
                            <q-input
                              outlined
                              type="password"
                              v-model="_this.confirmKeyID"
                              label="Confirm"
                              stack-label
                              :dense="true"
                              autocomplete="off"
                            />
                            <div v-if="_this.confirmKeyID != _this.keyID" style="color:red;">Match confirming</div>
                            <q-btn
                              @click="Update_this()"
                              label="Reset Key ID"
                              no-caps
                              :dense="true"
                              class="q-gutter-xs bg-blue"
                            />

                            <q-separator inset />
                            <div v-if="_this._updateProfile">
                              <q-file
                              v-model="_this.profile"
                              filled
                              label="change profile image"
                              :dense="true"
                              class="q-gutter-xs"
                              
                            /> 

                            <div>
                              <q-btn
                                @click="Update_this()"
                                color="primary"
                                no-cpas
                                label="Change Pic"
                                :dense="true"
                              />
                            </div>
                            </div>
                          
                          </div>

                          <div class="col flex flex-center">
                            <div class="q-pa-md q-gutter-sm column">
                              <q-avatar class="bg-grey-3">
                                <img :src="_this['profile']" > 
                              </q-avatar>
                              <div>
                                {{ _this["name"] }}
                                <!-- <q-btn rounded flat @click="_this._updateProfile = !_this._updateProfile" label="edit" /> -->
                              </div>
                            </div>
                          </div>
                        </div>
                      </q-tab-panel>
                    </q-tab-panels>
                  </div>
                </q-btn-dropdown>
              </q-item-section>

              <!--end-->
              <q-item-section class="col-auto text-secondary">
                <q-item-label>{{ _this["name"] }}</q-item-label>
                <q-item-label >@_{{ _this['department'] }} </q-item-label>
              </q-item-section>
              <q-separator horizontal inset />

              <q-item-section side>
                <q-avatar rounded size="48px">
                  <q-img :src="_this['profile']">
                    <q-popup-proxy
                      transition-show="flip-up"
                      transition-hide="flip-down"
                      style="max-width: 40vw"
                    >
                      <q-banner class="bg-green text-white q-gutter-xs">
                        <div class="col-auto">
                          <q-item class="q-gutter-xs row col-12" style="width:40vw">
                            <q-item-section
                              class="text-weight-bold text-overline text-h2 text-white-12"
                            >
                              Yirgu Gas Plan PLC
                            </q-item-section>
                            <q-item-section class="col-8">
                              Ygp is a gas production compayn, that has been
                              established on 2016 as pionner gas production
                              plant on tigrai, with aims of brighten future.
                            </q-item-section>
                          </q-item>
                        </div>
                        <div>
                          <q-btn
                            @click="_pageSettings.showPage = !_pageSettings.showPage"
                            class="bg-orange"
                          >
                            GoTo MiniPage
                          </q-btn>
                        </div>
                      </q-banner>
                    </q-popup-proxy>
                  </q-img>
                  <q-badge floating color="green">YGP</q-badge>
                </q-avatar>
              </q-item-section>

              <q-item-section
                class="text-primary text-bolder text-weight-bolder text-h5 q-px-sm q-gutter-none column col-auto"
              >
                <q-badge class="text-green bg-black col-auto q-pa-xs row">
                  <q-badge
                    class="text-green bg-black col-auto text-bolder text-weight-bolder text-h5 q-pa-none"
                    >YIRGU
                  </q-badge>
                  <q-badge
                    class="text-black bg-green col-auto text-bolder text-weight-bolder text-h5 q-pa-none"
                  >
                    GAS</q-badge
                  >
                </q-badge>
              </q-item-section>
            
                              
              <q-item-section
                class="text-primary col-auto q-px-sm text-overline text-h4"
              >
              </q-item-section>

              <q-item-section class="text-primary"></q-item-section>
              <q-item-section> </q-item-section>
              <!-- Data Models of every... local admin administrates... it generate from child_components(data_Schema)-->
              <q-item-section class="col-auto">
                <div class="q-gutter-sm row items-center q-px-xs q-mx-sm">

                  
                  <q-item-label>                   
                      {{  showDate }}                    
                  </q-item-label>

                  <!-- <q-item-label>
                    <q-btn @click="showroot = !showroot" no-caps :dense="true" size="sm">
                      Show Access  
                    </q-btn>
                  </q-item-label> -->
                  <q-item-label>
                    <q-btn
                      size="sm"
                      class="text-bold text-red transparent"
                      flat
                      no-caps
                      :dense="true"
                      @click="_logOut()"
                    >
                      Logout
                    </q-btn>
                  </q-item-label>

                  <q-item-label>
                    <q-fab
                      label-position="left"
                      color="green"
                      padding="xs"
                      direction="left"
                      class=" boxastyle"
                    >
                      <q-fab-action
                        v-for="(item, key) in _this.acctype"
                        :key="item"
                        @click="routeIt(key,_this.acctype)"
                      
                        style="background: white ; color:blue;text-transform: capitalize;"
                        class="fontastyle "
                        padding="xs"
                      >
                      <div v-if="key == 'group'" class="fontastyle" >{{ item }} Priviledges</div>
                      <div v-else>{{ key }} </div>
                      <!--router-link 
                        vueRoutes
                      :to="{path: item,query:{_req_id: 1},meta:{_isauth:true,},params: {_thismodal3A: 1,_thisaccetype: 1,_thisusertoken: 1, }}"
               
    > {{key}} </router-link-->

                      </q-fab-action>
                    </q-fab>
                  </q-item-label>
                </div>

             
              </q-item-section>
            </q-item>
          </q-card>
        </div>

        </q-expansion-item>
        <!----------------------------Main Page-->
        <div class="col transparent column " v-if="(_this['acctype']??false) && (_this.id ?? false)">
          <RouterView  
            :_pageSetting="_pageSettings"
            :_profile ="_this"
            :_acctype="_this.acctype ?? {}"
          />
        </div>

        <div class="col-1 row q-px-sm items-end bg-white">
          <div class="col text-text-primary">
            |   {{  showDay }}  
          </div>

          <!--q-btn color="blue" flat @click="$q.fullscreen.toggle()" label="fl" /-->

          <div class="col-auto">
            <q-toggle
              size="xs"
              val="xs"
              toggle-indeterminate
              toggle-order="ft"
              v-model="_pageSettings.toglColor"
              label="Mode"
              color="green"
              :class="{
                'text-dark ': $q.dark.isActive,
                'text-light': !$q.dark.isActive,
              }"
              @click="$q.dark.toggle()"
            />
          </div>
          
        </div>

      </q-page>
    </q-page-container>

  </q-layout>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onBeforeMount, watch } from "vue";
import { storeToRefs } from 'pinia'

import { profileStore } from "src/stores/authenticatedStore/profileStore";
// import { thisStore } from "stores/dataStores/thisStore"; //monpay Store ( Main Store)
import { authenticatingStore } from "stores/authenticatedStore/authenticatingStore";

import _localStorage from "src/services/storeService"

import { profileSchema } from "src/composables/schemas/profileSchemas";
import { threeASchema } from "src/composables/schemas/profileSchemas";

import { LocalStorage, useQuasar, useMeta } from "quasar";
import { useRouter } from "vue-router";

import useDebugMixin from "src/composables/debugMixin"
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
import useStatusMixin from "src/composables/statusMixin"
const { 
  status_Loading,
      status_DoneMessage,
      status_KnowthisMessage,
      status_WarnthisMessage,
      //----------returning values
      staus_timerLoad,
      status_timerDone,
      status_timerInformthis,
      status_timerError
} = useStatusMixin()

//--------------
const $q = useQuasar();

//-----------

// const _theService = profileService
const profileService = profileStore();
const authService =authenticatingStore() //it(storeToRefs is like computed_ reactive_variable
//-----------
const _theService = profileService;


const router = useRouter();

//const $m = useMeta()
const metaData = {
  // sets document title
  title: "YGP Asystem",
  // optional; sets final title as "Index Page - My Website", useful for multiple level meta
  titleTemplate: (title) => `${title} - DashBoard`,

  icon:"/public/icons/favicon-32x32.jpg", 
  // JS tags
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

//------------------------------FLAGS

// let _rolePerSchema = threeASchema ?? null
let _profile_iss=ref(null)
//-------------USER PROFILE_Variables..
//---------
var _this = ref({}); //userSchema Data skelton...skeltones of ---- [update_userMode]

let _pageSettings =ref({toglColor:'green',showPage:false})
async function _buildDataModel(){
  _this.value.confirmKeyID = null
  _this.value._updateProfile=null

  _this.value._fileAttributeName =null
  _this.value.__thisOpsStatus=null

  
  return true
}
_buildDataModel()

//===============================================-----------------------
watch(_this,async(_newV,_oldV)=>{
  let _requestHeader ={}
  _requestHeader['id']=_newV?.['userID'] ?? ''
  _requestHeader['phone']=_newV?.['phone'] ?? ''
  //-----------
  profileService.set_reqHeader(_requestHeader)
  return true
})

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

//-------------
async function Update_this() { //UpdateRowItem User DAta with graphic to update or not
      //---set--loading row operation
      _this.value.__thisOpsStatus=true
      //-------------
      let _fileExistance = _this.value._fileAttributeName ?? false
      if(_fileExistance){
          //_this.value['file_']={'files':_fileExistance}
          _this.value[_fileExistance]=_fileAsRaw.value
          if(typeof _fileAsRaw.value == 'object'){
            _this.value['file_']={'files':_fileExistance}
          }else{
            _this.value['file_']={'file':_fileExistance}
          }
        }
       //----------set Operational parameters
      _this.value['onplayOps']='UpdateRowItem'
      _this.value['onplaySubops'] = 'update'
      //--------
      return await Crud_this.updateData()
        .then(async (response) => {
          if (response) {
            // timerDone(5000,_createTitle[1],'Succefully Updated')
            // _this.value=Object.assign({},response)
            _logIn()
            return true
            // Reset_this(null,null)
          }else{
            // timerError(5000,_updateTitle[1],_updateTitle[0])
          }
            // __thisOpsStatus.value=false;
          // _fileAttributeName.value=null;
          return true; 
        }).catch((error) => {
            // timerError(5000,_updateTitle[2],_updateTitle[0])
          //  __thisOpsStatus.value=false;
          //  __thisBox.value=false;
          //  _fileAttributeName.value=null;
           return false;
          });
}

//////////////////////////// DATA_MANAGING 
//ModalCrudOps
let createKey = "keyID";
let updateKey = "id";
let delKey = "id";
//ModalCrudOps
const Crud_this = {
  createData: async function (objParam = {}) {
    //-------Check for Param_Requirents
    try {
      if (_this.value[createKey] == null) {
        return false;
      }
      //-----------Calling for Store Services  (_suburl, formData, objParam)
      return await _theService
        .createData( _this.value, objParam)
        .then((response) => {
          if (response.status) {
            return response.data;
          } else {
            timerLoadevent({ 'createData': 5000 }, 5000, 'Error'+response.data);
            return false;
          }
        })
        .catch((e) => {
          timerLoadevent({ 'createData': 5000 }, 5000, 'Error createData', '...'+e);
          return false;
        });
    } catch(e) {
      timerLoadevent({ 'createData': 5000 }, 5000, 'Error createData', '...'+e);
      return false;
    }
  },
  //----------------------------------------------------------------
  updateData: async function (objParam = {}) {
    //-------Check for Param_Requirments
    try {
      if (_this.value[updateKey] == null) {
        return false;
      }
      //-----------Calling for Store Services
      return await _theService
        .updateData(_this.value, objParam)
        .then((response) => {
          if (response.status) {
            return response.data;
          } else {
            timerLoadevent({ 'updateData': 5000 }, 5000, 'Error'+response.data);
            return false;
          }
        })
        .catch((e) => {
          timerLoadevent({ 'updateData': 5000 }, 5000, 'Error updateData', '...'+e);
          return false;
        });
    } catch(e) {
      timerLoadevent({ 'updateData': 5000 }, 5000, 'Error updateData', '...'+e);
      return false;
    }
  },

  readData: async function () {
    timerLoadevent({ 'readData': 0 }, 0, "Searching...");
    return await _theService
      .readData()
      .then((response) => {
        if (response.status) {
          return response.data;
        } else {
          timerLoadevent({ 'readData': 5000 }, 0, ' Error '+response.data);
          return false;
        }
      })
      .catch((e) => {
        timerLoadevent({ 'readData': 5000 }, 5000, 'Error Deleting', '...'+e);
        return false;
      });
  },
  //---------------------------------------------------------------
  readFData: async function (objParam = {}) {
    //-------Check for Param_Requirents
    timerLoadevent({ 'readFData': 0 }, 0, "Searching...");
    try {
      if (Object.keys(objParam ?? {}).length == 0) {
        return false;
      }
      //-----------Calling for Store Services
      return await _theService
        .readFData( objParam)
        .then((response) => {
          if (response.status) {
            return response.data;
          } else {
            timerLoadevent({ 'readFData': 5000 }, 0, ' Error'+response.data);
            return false;
          }
        })
        .catch((e) => {
          timerLoadevent({ 'readFData': 5000 }, 5000, 'Error Deleting', '...'+e);
          return false;
        });
    } catch(e) {
      timerLoadevent({ 'readFData': 5000 }, 5000, 'Error Deleting', '...'+e);
      return false;
    }
  },

  deleteData: async function () {
    //-------Check for Param_Requirents
    timerLoadevent({ 'deleteData': 0 }, 0, "Searching...");
    try {
      if (_this.value[delKey] == null) {
        return false;
      }
      //-----------------
      let objParam = {};
      objParam[delKey] = _this.value[delKey];
      //---------
      return await _theService
        .deleteData( objParam)
        .then((response) => {
          if (response.status) {
            // timerDone(5000, 'Deleted', '...');
            return response.data;
          } else {
            timerLoadevent({ 'deleteData': 5000 }, 0, ' Error'+response.data);
            return false;
          }
        })
        .catch((e) => {
            timerLoadevent({ 'deleteData': 5000 }, 5000, 'Error Deleting', '...'+e);
          return false;
        });
    } catch {
      timerLoadevent({ 'deleteData': 5000 }, 5000, 'Error Deleting', '...'+e);
      return false;
    }
  },
  //------------------filtering & searching for different Model
};
//--------------------------------------------------------------------Profiling (CHECK AUTHENTICATIONS &&& USER INFORMATIONS)
// var {getLogStatus,getLogUser,getLogisREgistered,clearlogStatus} = storeToRefs(authService) //is like making reactive(ref)_variable
//--------------------------------------------------------------------Profiling (CHECK AUTHENTICATIONS &&& USER INFORMATIONS)
timerLoadevent({ main: 0 }, 0, `Yirgu Gas Plant`);
onMounted(async () => {  //--------------ON MOUNT
  await timerLoadevent({ main: 2000 }, 2000, "Yirgu Gas Plant")
  console.log('\n\nFunction - _manageStoreLogin --STORE Authentication Initializing [Phone,Stored_ID]---- \n')
  await authService.useLogin().then(async (response) => {
    console.log(`\n LoginStatus = ${response.status} \n`)
      if((!response.status)){ 
        await timerLoadevent({ main: 0 }, 5000, "Authentication Error")
        return _logIn()
       }
      // Loadingpage.value=null
      //----------- Succefully Registered
      _this.value = Object.assign({}, response.data);
      console.log("\n User Acctype ="+_this.value['acctype']+" \n")
      //------------ Validate Acctype ?
      if(!(_this.value["acctype"] ?? false)){ await timerLoadevent({ main: 5000 }, 0, "Access Type Null Error, Retrying..");return _logOut()}
      //----------- Loading Messages
      _profile_iss.value =  _this.value['acctype']["profile"] ?? null;
      timerLoadevent({ main: 1 }, 1, '');
      return true;
    }).catch(async(e) => {
      console.log(e)
         await timerLoadevent({ main: 5000 }, 0, e);return _logIn()
    });
});

//----------------------------------------
let excludedModals = ['user','group',null,'']
let routeIt = async (_accDefault = null) => {
  if(excludedModals.includes(_accDefault) || !(_this.value['acctype'] ?? false)){return false}
  await timerLoadevent({ main: 3000 }, 3000, "Loading " + _accDefault); //Message  [ wait 3 sec ] [reset]
  await timerLoadevent({ main: 0 }, 0, "Loading " + _accDefault); //Message display for unlimited sec,but  wait && don reset it
  let _ismobile = $q.screen.lt.sm ? true : false;
  try {
    let routePath =Object.assign({'acctype':_this.value['acctype'][_accDefault]??''},_localStorage._reroute(_accDefault,_accDefault,_ismobile))
    await router.push(routePath)
    console.log(routePath)
    timerLoadevent({ main: 5000 }, 3000, "Ok, Loading " + _accDefault);//Message display for 3sec,but don wait && reset it
    return true; //
  }catch(e){
    console.log(`\n\n</Routing Functions of pathName = ${_accDefault}  == >> ${e} == >>  \n`)
    timerLoadevent({ main: 3000 }, 3000,e);return false}
};
let _logOut=async ()=> router.push(_localStorage._clear())
let _logIn=async ()=> router.push('/')

// timerLoadpage(15000,"Loading...")
//Loadingpage.value = [{ content: "Loading..." }]; //it
onBeforeMount(async() => {
    //--------------ON MOUNT
  console.log('\n\n<---------Defaulting Profile <--this--> ---- \n')
  await _thisDefaulting(); //Build Basic _this_default Schema ( same to columns)
  console.log('\n\n---------Mining User Device Informations [Phones, GeoLocations]---- \n')

});
///----------SCHEMATICS & DATA MINING...


var tab = ref("_empprofile");
var showDate = ref("")// curWeekDay+", "+curDay+" "+curMonth+" "+curYear;
var showTime = "" //
var showDay = ref("") //
var breakTime = ref(false) //

 function startTime() {
    var today = new Date();
    var hr = today.getHours();
    var min = today.getMinutes();
    var sec = today.getSeconds();
    var ap = (hr < 12) ? "AM" : "PM";
    hr = (hr == 0) ? 12 : hr;
    hr = (hr > 12) ? hr - 12 : hr;
    //Add a zero in front of numbers<10
    hr = checkTime(hr);
    min = checkTime(min);
    sec = checkTime(sec);

    //document.getElementById("clock").innerHTML = hr + ":" + min + ":" + sec + " " + ap;
    showDate.value = hr + ":" + min + ":" + sec + " " + ap;
    if(hr == 12 && min > 30 && min < 31 ){breakTime.value=true}

    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    var curWeekDay = days[today.getDay()];
    var curDay = today.getDate();
    var curMonth = months[today.getMonth()];
    var curYear = today.getFullYear();

    showDay.value = curWeekDay+", "+curDay+" "+curMonth+" "+curYear;

    showTime = setTimeout(function(){ startTime() }, 500);
}
 function checkTime(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}
startTime();
//-------
</script>

<style>
/* ===================   layout W x H */
.fit-viewBox {
  height: 100vh;
  width: 100vw;
}

.fit-hbox {
  height: 100vh;
}

.fit-wbox {
  width: 100vw;
}

/*=====================  Background Image Styles              */
.bg-Image {
  background-image: url(/yirgumin.jpg);
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 100vh;
  width: 100vw;
  border-radius: 25px;
  filter: blur(4px);
  /* Flex Box Method */
  display: flex;
  justify-content: center;
  align-items: center;
}
.bg-Image:hover {
  filter: blur(0);
}

.bg-Image1 {
  background-image: url(/images/im9.jpg);
  background-repeat: repeat;
}

.bg-Image2 {
  background-image: url(/images/im4.jpg);
  background-repeat: repeat;
}

.bg-image2:hover {
  filter: blur(2);
}

.bg-Image3 {
  background-image: url(/images/im5.jpg);
  background-repeat: repeat;
}

.bg-image3:hover {
  filter: blur(5);
}

/*===========================    text-Over Backgrounds  */
.text-Overly {
  background-color: rgb(0, 0, 0, 0.5);
  width: 100%;
  height: 40%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 20px;
}

/*=====================  Fronted_Glass / Blur Styles as OverLay Background... */
.overlay-Glass {
  backdrop-filter: blur(15px);
  background-color: rgba(0, 110, 255, 0.158);
  color: rgb(0, 0, 255);
}
.overlay-Glass:before {
  background: inherit;
}
.overlay-GlassDark {
  background: inherit;
}
</style>
