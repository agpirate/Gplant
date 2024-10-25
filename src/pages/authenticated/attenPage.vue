<template id="full-page">
  <!----------------------------Dialog Schema Form-----START--->
  <q-dialog
    v-model="loadInstance"
    transition-show="scale"
    transition-hide="scale"
    class="shadow-5"
    style="
      background: rgba(108, 253, 11, 0.445);
      border: 0px solid rgb(255, 255, 255);
    "
  >

  <q-table
      title="Choose Employeess Into Payrole"
      :rows="loadingRows"

      row-key="name"
      selection="multiple"
      v-model:selected="loadSelected"

      grid
      hide-header
      style="background: whitesmoke;"
      class="col-auto column text-xs  sticky-table bg-white"
    >
      <template v-slot:top-right >
   
        <q-btn flat label="CANCEL" class="bg-red text-green text-lg-10 "  @click="closePUPForm()" />
        <q-btn flat label="Submit" class="bg-green text-red" @click="AcceptPUPForm()" />
     
      </template>

      <template v-slot:item="props">
        <div
          class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition bg-grey-1 color-white"
          :style="props.selected ? 'transform: scale(0.95);' : ''"
        >
          <q-card bordered flat :class="props.selected ? ($q.dark.isActive ? 'bg-grey-9' : 'bg-grey-2') : ''" class="items-start justify-start" >
            <q-card-section>
              <q-checkbox dense v-model="props.selected" :label="props.row.name" />
            </q-card-section>

            <q-separator />
           
            <q-list dense>
              <!--q-item v-for="col in props.cols.filter(col => col.name !== 'desc')" :key="col.name" -->
           
            </q-list>
          </q-card>
        </div>
      </template>     
    </q-table>

  </q-dialog>

  <q-dialog v-model="__thisBox" v-if="_rolesColumns.length"
    transition-show="scale" transition-hide="scale"
    style="background: rgba(73, 255, 1, 0.342); border: 15px solid rgb(0, 0, 117)"
    persistent
  >
  <mainForm inputColor='white' :_rolesColumns=_rolesColumns :_this=_this :_thisDefault=_thisDefault :__thisOps=__thisOps 
  @close="__thisBox = $event" @update="Update_this()" @create="Create_this()"
  />

  </q-dialog>

  <dialogOne :isOpen="confirmObj" @emitClick0="confirmObj = $event">

    <confirmButton @confirmButton="confirmObj"
    :header=confirmMessage
    title="Yes" textcolor="black" background="green"
    title2="No" textcolor2="green" background2="red"/>

</dialogOne>

  <!-----------------------------Dialog Schema Form---END-->


  <div class="col row q-pa-xs q-gutter-xs" style="height: 90vh">
    <div
      class="col-xs-12 col-sm-12 col-md-grow col-lg-grow col-xl-grow column rounded"
      style="height: 90vh"
    >
      <q-card class="col dark bordered column q-pa-none q-ma-none">
        <q-expansion-item :label="_thisModel+ ' ' + 'More ...'"
      class="shadow-1 overflow-hidden"
      style="border-radius: 5px;text-transform: capitalize;"
      header-class="text-black-10 text-blue"
      expand-icon-class="text-blue"
      :dense="true"
    
    >
        <q-card-section class="col-auto row" style="text-transform: capitalize;">
          <div class="col text-bold">
            DashBoard Monitor @ {{ _thisModel }}
          </div>
          <div class="q-gutter-xs row items-top col" >
            <q-list class="row q-gutter-xs">
              <q-item-label class="text-bold text-green"
                >Access Privilges:-
              </q-item-label>
              <q-item-label
                class=" text-red-10" 
              >
                {{ _this_acctype?.group ?? '' }}:
              </q-item-label>
            </q-list>
          </div>

        </q-card-section>

    </q-expansion-item>

        <q-card-section
          class="q-pa-none col column bordered wrap scroll bg-blue"
        >
          <!----------------------------------------- Table View...-->
          <div class="col row transparent">
            <q-table
              class="col text-md text-weight-bold sticky-table"
              :dense="true"

              :rows="rows"
              :columns="columns"

              row-key="id"
   
              v-model:selected="selected"
              @update:selected="updateSelected"

             
              :selected-rows-label="getSelectedString"
              selection="multiple"

              :filterMethod="filterMethod"
              :filter="filter"

              :visible-columns="visibleColumns"

            
              no-data-label="Items doesn't Founded !"
              virtual-scroll
              :pagination="pagination"
            >
              <!--style="height: calc(100vh - 50vh)" -->
              <!--template v-slot:loading>
                <q-inner-loading showing color="secondary" />
              </template-->

              <template v-slot:top-left>
                <div class="q-gutter-xs row">
                  <q-btn
                    dense
                    outline
                    size="sm"
                    disabled
                    color="black"
                    class="col-auto"
                    :label="_thisModelHeader"
                  />
                  <q-btn
                    dense
                    color="secondary"
                    class=""
                    :label="'ADD  ' + _thisModel"
                    @click="pressADDItem()"
                    v-if="__isSSuper"
                  ></q-btn>
                </div>

                <div class="col-grow transparent q-pa-xs q-gutter-xs row  items-start" v-if="$q.screen.gt.sm">
            <fieldset class="rounded-borders col text-blue">
              <legend > Payments</legend>

              <div class="q-pa-sm rounded-borders" >
              <q-option-group
                name="accepted_genres"
                v-model="_choosemonths"
                :options="_monthsfilter"
                type="checkbox"
                color="primary"
                inline
                :dense="true"
                size="sm"
              />
            </div>

            </fieldset>
          </div>


              </template>

              <template v-slot:top-right>
                <div class="col-2">
                  <!--q-select
                    v-model="visibleColumns"
                    multiple
                    outlined
                    dense
                    options-dense
                    :display-value="$q.lang.table.columns"
                    emit-value
                    map-options
                    :options="columns"
                    option-value="name"
                    options-cover
                    style="min-width: 150px"
                  /-->
                </div>

                <div class="col-3 q-mx-sm row ">
                  <q-btn style="width:5vw;background:white" @click=" showReport = !showReport" label="Report" :dense="true"  no-caps />
                  <q-input
                    standout="bg-green"
                   
                    style="min-width: 7vw;max-width:13vw;background: rgba(255, 255, 255, 0.589);border-radius: 5px;"
                    debounce="400"
                    color="white"
                    v-model="search"
                    label="quick-Search"
                    stack-label
                    :dense="true"
                  >
                    <template v-slot:append>
                      <q-icon name="search"  />
                    </template>
                  </q-input>
                </div>
              </template>

              <template #header-cell="props">
                <q-th
                  style="font-size: 0.8em; text-align: centercenter;text-transform: capitalize;"
                  class="text-bold text-center "
                  :props="props"
                  ><!--q-icon name="lock_open" size="1.5em" /-->
                  {{
                    typeof props.col.label === "string"
                      ? props.col.label
                      : " "
                  }}
                </q-th>
              </template>

                       <!---
                        <q-popup-edit
                          v-model="props.row[object.name]"
                          :title="props.row[object.name]"
                          buttons
                          persistent
                          v-slot="scope"
                          v-if="'Number' in object.schema['vtype']"
                        >
                          <q-input
                            type="number"
                            v-model="scope.value"
                            dense
                            autofocus
                            hint="press close to exit!"
                            v-if="'String' in object.schema['type']"
                            
                          />
                          <q-input
                            type="String"
                            v-model="scope.value"
                            dense
                            autofocus
                            hint="press close to exit!"
                            v-else-if="'Number' in object.schema['vtype']"
                          />

                        </q-popup-edit>
                      -->
                     

              <template v-slot:body="props">
                <q-tr
                  :props="props"
                  class="cursor-pointer text-bold text-weight-bolder" v-if="Object.keys(props.row).length"
                >
                  <!------------------ iterating _ body cell-->

                  <q-td auto-width>
                    <q-toggle dense v-model="props.selected" />
                  </q-td>
                  <td
                    :props="props"
                    style="font-size: 0.6em; text-align: justify"
                    class="text-bold text-center"
                    :class="
                      object.name == 'name'
                        ? 'text-center text-weight-bolder'
                        : 'text-center '
                    "
                    v-for="object in props.cols"
                    :key="object.name"
                  >
                    <!-- is it single valued //// string or array of enum or .......-->

                    <q-badge
                      v-if="'type' in object.schema"
                      class="transparent"
                      style="color: blue"
                    >
                      <!-- check if the object has type:"value" .. for string/array-->
                      <div v-if="object.name != 'actions'" class="text-black;">

                      
                        <q-badge
                          v-if="object.name === 'gmStatus'"
                          :style="[
                            nul.includes(
                              props.row[object.name]
                            )
                              ? { 'background-color': 'green' }
                              : { 'background-color': 'red' },
                          ]"
                        >
                          &nbsp;
                        </q-badge>

                        <q-badge
                          v-else
                          :style="[
                            nul.includes(
                              props.row[object.name]
                            )
                              ? {
                                  'text-color': 'white',
                                  'background-color': 'red',
                                }
                              : { color: 'black', 'background-color': 'white' },
                          ]"
                        >
                       
                          

                          <q-card
                            flat
                            bordered
                            v-if="'textarea' in object.schema"
                            :dense="true"
                          >

                                <q-badge v-if="!nul.includes(props.row[object.name])">
                                  <div v-html="props.row[object.name]"></div>

                                </q-badge>
                                <q-badge style="background:red" v-else>ppp </q-badge>

                          </q-card>
                          
                          
                         

                          <div v-else-if="!nul.includes(props.row[object.name])"> 
                                 {{ props.row[object.name] }}
                                                              
                                    
                          </div>
                          
                        </q-badge>

                      </div>

                        <div class="row q-gutter-xs text-dark" v-else  >  
                      
                          <template v-if="__isSSuper && __isStage.includes(props.row._stage_) " > <!-- Registrations Access [ root ; priviledged & Nan_approve_financeAp & cylinderQua-Nan]-->
                            <q-btn
                              color="blue"
                              label="Update"
                              @click="pressEDITItem(props.row)"
                              size="sm"
                              no-caps
                            
                            />
                            <q-btn
                              color="red-7"
                              label="Delete"
                              @click="pressDELItem(props.row)"
                              size="sm"
                              :dense="true"
                              no-caps
                            

                            />
                          </template>
                          <!-- v-if="props.row.companyID == Objprops._companyID" -->
                          <!-- finance could play if ( store_Status is issued(only))---->
                          <template v-else-if="__isStage.includes(props.row._stage_)">
                              <q-btn
                                color="white"
                                label="Update"
                                @click="pressEDITItem(props.row)"
                                size="sm"
                                no-caps                    

                              />
                      
                          </template>
                        </div>

                    </q-badge>


                    <q-badge
                      v-else-if="
                        object['schema'].type === Array"
                      color="grey-4"
                      text-color="black"
                    >
                            <q-badge v-if="!nul.includes(props.row[object.name])"
                                :style="[
                                  !nul.includes(props.row[object.name])
                                    ? { background: 'green' }
                                    : { background: 'red' },
                                ]"
                              >
                                {{ props.row[object.name] }}
                              </q-badge>
                          <q-badge style="background:red" v-else>

                          </q-badge>

                      
                    </q-badge>

                    <q-badge
                      v-else-if="Object.keys(object['schema']).length > 1"
                      class="transparent text-primary row q-gutter-xs col-auto"
                      style="max-width: 20vw"
                      :color="
                        props.row.status == 'Active'
                          ? 'green'
                          : props.row.status == 'Disable'
                          ? 'red'
                          : 'grey'
                      "
                      text-color="primary"
                    >
                      <!--- else it is objects...-->
                      <q-list
                        v-for="(columns, ky) in props.row[object.name]"
                        :key="ky"
                        class="column q-gutter-xs col-auto"
                      >
                        <q-item
                          clickable
                          v-ripple
                          class="rounded-borders col-auto row q-pa-none q-gutter-xs"
                          :class="$q.dark.isActive ? 'bg-red' : 'bg-white'"
                          v-if="'type' in object['schema'][ky]"
                          dense
                        >
                          <q-item-section
                            class="col-auto q-gutter-xs q-pa-none"
                          >
                            <q-item-label class="col-auto q-pa-none">
                              {{ ky }}
                              <q-badge v-if="!nul.includes(columns)"
                                :style="[
                                  !nul.includes(columns)
                                    ? { background: 'green' }
                                    : { background: 'red' },
                                ]"
                              >
                                {{ columns }}
                              </q-badge>

                              <q-badge style="background:red" v-else> </q-badge>
                            </q-item-label>
                          </q-item-section>

                          <q-item-section side> . </q-item-section>
                        </q-item>
                      </q-list>
                    </q-badge>

                  </td>
                
                  <!------Ending------------ iterating _ body cell-->
                </q-tr>

              
              </template>

              <!----------------- top right utilities -->
            </q-table>

            <!------------------- Edit_/Add form box-->

            <!------------------- View form box-->
          </div>

          <!-- Table View ............Ending...-->
        </q-card-section>
      </q-card>

    </div>

    <!--- Profiling...-->

    <!----------------------------------VISUALITH-->
 

   <!----------------------------------VISUALITH-->
   <div
      class="col-xs-12 col-sm-grow col-md-auto col-lg col-xl-grow column"
   
      v-if="showReport"

      style="height: 90vh; z-index: 1000;position: absolute;right:10vw;top:40vh"
    >
      <!--selected-->

      <!----- tab-->
      <div
        class="col-auto shadow-3 rounded-borders text-secondary q-pa-xs q-px-md column transparent"
        style="
          background: rgba(192, 192, 207, 0.493);
          border: 0.5px solid rgba(255, 255, 255, 1);
        "
      >
        <div class="text-bold text-weight-bold text-secondary col-auto">
          Reporting - <q-icon name="print" />
        </div>
        <div
          class="q-py-sm"
          style="
            background: rgba(218, 218, 219, 0.212);
            border: 0.001px solid rgba(0, 0, 255, 0.432);
          "
        >
          <div class="row q-ma-sm q-gutter-sm">
            <q-btn
              id="full-page"
              onclick="window.print()"
              no-caps
              :dense="true"
              size="md"
            >
              Screen</q-btn
            >
            <q-btn @click="exportCSV()" :dense="true" size="sm" no-caps
              >CSV</q-btn
            >
            <q-btn></q-btn>
            <q-btn class="bg-blue"></q-btn>
          </div>

          <div class="q-py-none">
            <ReportForm
            
              :_thisModel="_thisModel"
              :selected="selected"
              :_extraData="{}"
              :_who="_who"
              :_whoreceiver="qserchResult"
            />
          </div>
        </div>
      </div>

      
      
      <!--div
        class="col shadow-2 rounded-borders text-secondary q-pa-none q-px-md column transparent"
        style="
          background: rgba(192, 192, 207, 0.493);
          border: 0.5px solid rgba(255, 255, 255, 1);
        "
      >
        <span class="text-weight-bold  co-auto">
          Key Words <q-icon name="style" />
        </span>
        <div
          class="col-auto transparent q-pa-xs q-gutter-xs column  items-start"
        >
          <q-item
            class="col transparent q-pa-xs  flex row items-start"
            v-for="(status, statusName) in quickFilterOptions"
            :key="statusName"
            :dense="true"
          >
            <q-item-section>
              {{ statusName }}
            </q-item-section>
            <q-icon name="person" />
            <q-item-section side>
              {{ status }}
            </q-item-section>
          </q-item>
        </div>
      </div -->
      
      <q-separator inset dark />
    </div>
  </div>

</template>

<script setup>
//----componenents..
import { csvExport } from "src/composables/reports/csv";
import mainForm from "src/components/mainForm.vue"
import ReportForm from "src/components/reports/ReportForm.vue";
import BChart from "src/components/visualith/BChart2.vue";

//-------------------------------------------------------------Importing System Modules
import { ref, reactive, computed, onMounted,onUnmounted, onBeforeMount, watch } from "vue";
import { exportFile, useQuasar, useMeta } from "quasar";

import _localStorage from "src/services/storeService"

//import print from 'print-js';
import { useRouter, useRoute } from "vue-router";
//import { storeToRefs } from "pinia";
// import  {_isnull,_isempty,_isequ,_isgte,_islte,_isbtn} from "src/composables/validators" 
import  {cp,
    _createTitle,_updateTitle,_readTitle,_deleteTitle,
    } from "src/composables/constVariables"

import {_startofthisYear,_endofthisYear,
  _startofthisMonth,_endofthisMonth } from "src/composables/utils/dateformats"

import { assetStore } from "stores/dataStores/assetStore"; //Asset Store ( Main Store)
import { thisStore } from "stores/dataStores/thisStore"; //Asset Store ( Main Store)
// import { genapiStore } from "src/stores/jstStores/genapiStore";

import { assetSchema } from "src/composables/schemas/procurmentSchemas";

import reportReceipant from "src/components/forms/reportReceipant.vue"
import statusCard from "src/components/statusCards.vue"

import confirmButton from "src/components/buttons/confirmButton.vue"
let confirmObj = ref(null);
let confirmMessage =ref('Are You Sure ?')

import dialogOne from "src/components/dialogs/dialogOne.vue"
const status_thisDetail = ref(null);

import useThisMixin from "src/composables/thisMixin"
var { 
  _this_Rows,
  _this_Details,

        columns,
      _this_Query,
      _this_RowsStatus,
      //-----------//-- returning values
      _thisDefault,
      _this,
      //----------//-- settings
      _is_thisOwner,
       _is_this_netPrice ,
       _is_this_open ,
      // __thisBox_CDialog,
      __thisBox,
      //----------//-- 
      __thisIndex,
      __thisOps,
      __thisOpsStatus,
      //---------//-- functions
      // Reset_this,
      //====================
      __this_foreignBox ,
      //--------
      __this_foreignBoxIndex ,
      __this_foreignBoxOps ,
      __this_foreignBoxOpsStatus ,
      __this_foreignBoxsubOps ,
      //---
      // Reset_this_foreign,
      // __thisBox_UDialog,
      // Reset_this,

} = useThisMixin()

import debugCard from "src/components/debugCards.vue"
import useDebugMixin from "src/composables/debugMixin"
const { 
  Loading,

      DoneMessage,
      KnowthisMessage,
      WarnthisMessage,
      //----------returning values
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

import useDefaulMixin from "src/composables/myMixin"
// Import the mixin
// Use the mixin
let {
  count,
  //------------
      //----------returning values
      _allColumnNames,
      _rolesColumns,
      visibleColumns,

      //---------settings
      Objprops_,
      _thisModel,
      _this_acctype,
      _this_Schema,

      lockedColumns,
      invisibleColumns,
      //----------------functions
      _allColumnName,
      _rolesColumn,
      visibleColumn,

      _thisModels,
      // modal_iss,
      //------preparing the main default and table_design
      _this_Defaulting,

      //------preparing the foreign default and table_design
      foreign_Columns,
      _this_foreignDefaulting,

      //------
      visible_clientColumns,      
} = useDefaulMixin();

import {useAssetFilter} from "src/composables/filters/assetfilter"
var {
  _enableRowFilter, _thisFiltering
} = useAssetFilter()

const $q = useQuasar();
//const $m = useMeta();
const router = useRouter();

const metaData = {
  // sets document title
  title: "YGP  Asset Managment",
  // optional; sets final title as "Index Page - My Website", useful for multiple level meta
  titleTemplate: (title) => `${title} -Db`,
  // JS tags
  icon:"/public/icons/favicon-32x32.jpg", 

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

//-------------------------------------------------------------Importing Defined Modules
// const genapiService = genapiStore(); //import { genapiStore } from "src/stores/jstStores/genapiStore";
//===-----_--------THE MODEL/ MAIN_DATA....
_thisModel.value = "asset"; // the Vue_Page_DataModel (Listing Collection Name)
//  var _thisModelHeader = ref(_thisModel.value+" Managment"); // the Vue_Page_Data_Headers(Descriptions...)
 _this_Schema.value = assetSchema

 const assetService = assetStore();
const _thisService = thisStore();
const _thisapiUrl ='/procurment/asset'
//------- MainPage Data Channel
var Objprops = defineProps({
  _profile: { type: Object, default: () => ({}) }, //user Datas all there is...

  _acctype: { type: Object, default: () => ({}) }, //is the loged_user has privileged_routes...defintions
  
  // _super: { type: Boolean, default: false }

  // _priviledgedFor: { type: Object, default: () => ({})},
    //----------------------empy model total privileges....
  // _modalPriviledges: { type: Object, default: () => ({}) }, //user's privileges on general....with object of privileges =>{'empy':'regAdmin'}
});

Objprops_.value = Objprops
_this_acctype =computed(()=>{
        if(Objprops._acctype ?? false){
          return Objprops._acctype[_thisModel.value] ?? null
        }
        else{return null}
        })   

let _pageSettings=ref({'vw_i':true,showForm:false})
watch(Objprops._pageSetting,(_nowValue, ov) => {
  _pageSettings.value =Object.assign(_pageSettings.value,_nowValue)
  return true
})  
//-------------------
let watch_Rows=ref(null) 
watch_Rows=computed(()=>{ //computer got problem with return value is not in applications
return assetService.getstatus_Rows}) 
watch(watch_Rows,(_nowRows, ov) => {
  // console.log('update founded 2',_nowRows)
  let information = _nowRows
  if(_nowRows == null){ information ='No Data'}
  else if(_nowRows == false){ information ='No Data'}
  else if(_nowRows == true){ information ='Loading New Data..'}
  else if (_nowRows == 'Error Connection'){
    status_timerError(9000,information+' ?','Product & Services')
    return true
  }
  status_timerInformthis(9000,information,'Product & Services')
   return true
  }); 

async function Reset_this(Ops,rowIndex){
    // _fileAttributeName.value=null;
    _fileAsPathIndex.value=null
    
    __thisIndex.value=rowIndex
   __thisOps.value =Ops
   __thisOpsStatus.value=false

    __thisBox.value  = false; //OPen the Box
    if(rowIndex == null){ _this.value = Object.assign({}, _thisDefault.value)
    }else{ _this.value = Object.assign({}, _this_Rows.value[rowIndex]  ) }
    //----assigning Onplay Row
    console.log(_this.value,'ppp', _this_Rows.value)

    return true
  }
//---Access Controlls (Authorizations with permissions)
//columns_filter()-------- which to displayOn REgisterations form
 lockedColumns.value = ["userID","companyID", ""]; //are blacklist of columns tobe not shown during the Registerations..form submitting
let takenControls = ref({
  istakenBy: "takenBy",
  Col: "storeStatus",
  Val: ["taken"],
}); //are blacklist of columns tobe not shown during the Registerations..form submitting
let returnControls = ref({
  isreturnedBy: "returnedBy",
  Col: "storeStatus",
  Val: ["Onstore"],
}); //are blacklist of columns tobe not shown during the Registerations..form submitting




//------column invisiblity on table_
// let visibleColumns = ref([]); //Hold List of In
 invisibleColumns = [
  "_stage_",
  "payDays",
  "pensionRate",
"D1","D2","D3","D4","D5","D6","D7",
"D8","D9","D10","D11","D12","D13","D14",
"D15","D16","D17","D18","D19","D20","D21",
"D22","D23","D24","D25","D26","D27","D28",
"D29","D30"]//defualt hidden columns
if ($q.screen.lt.md) {
  invisibleColumns.push("gmStatus");
  invisibleColumns.push("incomeTax");
  invisibleColumns.push("loan");
  invisibleColumns.push("taxfreeSalary");
  invisibleColumns.push("Y_N");
  
}

//===============================================-----------------------------------
//-----------------------DATAs ROWs--------------
// var rows = ref([{}]); //Data's projected with the Columns variable [ calling function.....Crud_this.readDatas(top_100)]
const pagination = ref({  
        // page: 50,
        rowsPerPage: 10,
        // rowsNumber: 0,
      })

// _this_Schema.value=Object.assign(_this_Schema,{'action':{type:String,default:''}})
columns = computed(() => { 
  if (!_this_acctype.value) {
    return [{}];
  } else {

    // resetColumnDependent();
    let _tableColumn = []; //HOLDING_  all the Columns of the Data_model ( TOTAL Columns)
    let _visibleColsName = [];  ////--HOLDING_ all the "Visible" Columns of the Data_model ( TOTAL Columns)

    let rolesWall = _this_acctype.value.role ?? false
    let capabilityWall = _this_acctype.value.capability ?? false
    let modelRole = _this_acctype.value.roles ?? [] //accstage

    for (let schemaColumn in _this_Schema.value) {
      let _col = { 
        name: schemaColumn,
        schema: _this_Schema.value[schemaColumn],
        label: schemaColumn,
        //sortable: true,
        align: "left",
        //sort: (a, b) => a - b,
      };
      _tableColumn.push(_col); 
      //----------------loging all columns name as normal list format
      _allColumnName(schemaColumn); 
      //---------------loging Visible Columns list(on table)
      invisibleColumns.value.includes(schemaColumn) ? "" : _visibleColsName.push(schemaColumn);
      //----
      if (schemaColumn === "extraColumn" || lockedColumns.value.includes(schemaColumn)) {
              continue;
      } else { //Create and Write
              try{ 
                    if([capabilityWall[0],capabilityWall[2]].includes('2')){  ///if user_ hass full access
                         if(modelRole.includes(schemaColumn)){ //excludes specifed columns
                          continue
                          }else{_rolesColumn(_col) } //gives 
                    }
                    else if(capabilityWall[0] == '1'){ //Registererars (checking create digits will work for writing(updating too))
                        if(modelRole.includes(schemaColumn)){ //excludes specifed columns
                            continue
                          }else{ _rolesColumn(_col);} //gives all other thatn specifiec columns
                        }
                    else if(capabilityWall[2] == '1'){ //user has specified accesss with 1strickes ===['clientFlag','*'] 
                        if(rolesWall.includes(schemaColumn)){ //excludes specifed columns
                          _rolesColumn(_col)
                        }else{ continue} //gives all other thatn specifiec columns
                      }
                    else {
                        continue
                      }
              }catch{}   
      }
    }//grab the actions and it's permissions (create,update,delete) as label
    _tableColumn.push({name:'actions',schema:{type:'String',},label:'actions',value:capabilityWall[0]+capabilityWall[1]+capabilityWall[2]}); 
    _visibleColsName.push('actions')
    // _this_Defaulting();
    _setDefaults()
    visibleColumn(_visibleColsName);

    // _this_foreignDefault()
    return _tableColumn;
    }
  });

async function _setDefaults(){
    // _this_clientModels = ['phone',"userName","geolocation",'location','phoneCode'] //
    // _thisModels = ['phone',"userName","geolocation",'location','userID','phoneCode'] //
    _thisDefault.value = await _this_Defaulting(_thisModels.value)

    ///-----redefine values
    _thisDefault.value['userID']=Objprops._profile.id
    //------==== building columns of thisMoel
    return true
  }

 //---------------------------------------------- Store Syncing === End
 var _this_Query_Meta={} //_trend:'', catagory:'',usage:'New',content:''
//------------------1ry ----Quering and SE_settings
//===============================QUERY_BUILDIMG+++START
//==============Q1
 async function this_Query (_queKey=null,_value=null){
  //-----------Reseting Rows SEtting
  _this_Rows.value=[] 
  //----------------Fetching Queried Rows
  _this_Query.value={}
  // _this_Rows_Sync()
  await Sync_this(assetService,_this_Query.value)
  //-------------------- Preparing Default Rows ( New Row Skeltons)
  // ?
  return true
}
//==Fetching Data ( Store_SyncFetch)
let sync_this=''
_this_Rows = computed(() => { //Updating is comming
  return _this_RowsCompute(assetService.getDatas)
});
function _this_RowsCompute(_Datas) {
  pagination.value.rowsPerPage=10// _pageSettings.value['tableView']=='cards' ? 0 : 3
  return _Datas
}
//syncSetting()

//------------------------------------------SYNCING DATA With Store

 //Operating without setting onplayrowItem ( directlly calling for effect) === active _operations
 let  _this_ActiveOperation = {
      _delRow : async (confirm=null,_onplayrowIndex,itemId) =>{
        //--------------
        if(confirm ==null){//First (Null) Event -- Data Assigning && set confirmObj
          //-----------------------------
          _this.value = {'id':itemId} 
          // __thisIndex.value = _onplayrowIndex
          //--------------
          confirmObj.value=_this_ActiveOperation._delRow; //it carry the _delRow(,,,)... on button response it comes as
          //  _delRow(true/false)..parameter order is mattter.           
          return false;            
        }
        else{
          confirmObj.value=null;
          if(!confirm){return false} //Third (True) Event -- Go ahead or false(closed popup)
        }
        //--------waite for confirmation  
        return await Crud_this.deleteData()
        .then((response) => {
          if (response) {
            this_Query('userID',Objprops._profile.id)
            // _this_Row.splice(__thisIndex.value,1)
          } 
          return true;
        }).catch((error) => { return false; });
      },
      //------------special Operations

      //------------special Operations
}

//------------------
// Return data and methods
async function __thisBox_Dialog(_playrowIndex){
// _fileAttributeName.value=null;
if(_playrowIndex == null){
  await Reset_this('CreateRowItem',null)
  __thisBox.value  = true; 
  return true
}
else{
  await Reset_this('UpdateRowItem',_playrowIndex)
  __thisBox.value  = true; //OPen the Box
  console.log(_playrowIndex,_this.value)
  return true
}
}
//--------------------------------------METHODS & PROCESS
let _fileAttributeName =ref(null)
let _fileAsPathIndex =ref(null)
async function Create_this() {  //UpdateRowItem User DAta with no graphic to update
      //---set--loading row operation
      __thisOpsStatus.value=true
      //is File Encapsulated ( if so ) ... extract the file by choosing ( either it was from folder or from camera_directlly )
      let _fileExistance = _fileAttributeName.value ?? false
      if(_fileExistance){
          //_this.value['file_']={'files':_fileExistance}
          _this.value[_fileExistance]=_fileAsRaw.value
          if(typeof _fileAsRaw.value == 'object'){
            _this.value['file_']={'files':_fileExistance}
          }else{
            _this.value['file_']={'file':_fileExistance}
          }
        }
        //--------set Operational parameters
      _this.value['onplayOps']='CreateRowItem'
      _this.value['onplaySubops'] = 'new'   
      //---Creat the Content... which is with/out of file encapsulations
    return await Crud_this.createData()
        .then(async (response) => {
          if (response) {
            timerDone(5000,_createTitle[2],'Succefully Created')
           __thisBox.value=false;
            return true
          }else{
            timerError(5000,_createTitle[2],_createTitle[0])
          }
          return true; 
        }).catch((error) => {
          timerError(5000,_createTitle[2],_createTitle[0])
          // _fileAttributeName.value=null;
           __thisOpsStatus.value=false;
           __thisBox.value=false;
           return false;
          });
}

async function Update_this() { //UpdateRowItem User DAta with graphic to update or not
      //---set--loading row operation
      __thisOpsStatus.value=true
      //-------------
      let _fileExistance = _fileAttributeName.value ?? false
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
            timerDone(5000,_createTitle[1],'Succefully Updated')
            _this_Rows.value[__thisIndex.value]=Object.assign({},response)
            Reset_this(null,null)
          }else{
            timerError(5000,_updateTitle[1],_updateTitle[0])
          }
            __thisOpsStatus.value=false;
          // _fileAttributeName.value=null;
          return true; 
        }).catch((error) => {
            timerError(5000,_updateTitle[2],_updateTitle[0])
           __thisOpsStatus.value=false;
           __thisBox.value=false;
          //  _fileAttributeName.value=null;
           return false;
          });
}
//----=========================================================================---DATA ---/// ---ROW----CRUD
let createKey = "";
let updateKey = "id";
let delKey = "id";

//----=========================================================================---DATA ---/// ---ROW----CRUD

const Crud_this = {
  createData: async function (objParam={}) {
    //-------Check for Param_Requirents
    try {
      // if (_this.value[createKey] == null) {return false; }
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
          timerDone(5000,_readTitle[1],_readTitle[0]);return response.data;
        } else {
          timerError(5000,_readTitle[2],_readTitle[0]);return false;
        }
      }).catch((error) => {timerError(5000,_readTitle[2],_readTitle[0]);return false;});
  },
  //---------------------------------------------------------------
  readFData: async function (objParam={}) {
    //-------Check for Param_Requirents
    try {
      if (Object.keys(objParam).length ==0) {return false; }
    //-----------Calling for Store Services
    return await _thisService.readFData(_thisapiUrl,objParam).then((response) => {
      if (response.status) {
          timerDone(5000,_readTitle[1],_readTitle[0]);return response.data;  
        } else {
          timerError(5000,_readTitle[2],_readTitle[0]);return false;
        }
      })
      .catch((error) => {timerError(5000,_readTitle[2],_readTitle[0]);return false;});
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
            timerDone(5000,_deleteTitle[1],_deleteTitle[0]);return response.data;
          } else {
            timerError(5000,_deleteTitle[2],_deleteTitle[0]);;return false;
          }
        }).catch((error) => {timerError(5000,_deleteTitle[2],_deleteTitle[0]);return false; });
      
      } catch {return false; }
  },
}
//-----------------End Data Functions
let _contentingliveStatus=ref(25000)
const Sync_this=async (service,query)=>{
  clearInterval(sync_this)
  await service.set_syncQuery(query)
  //-----Fetching Data ( Store_SyncFetch)
  service.set_syncLock(false)
  service.asyncDatas()
  //--------
  setTimeout(function(){
    clearInterval(sync_this)
    sync_this = setInterval(service.asyncDatas, _contentingliveStatus.value)
  }, 5000);

  return true
}
const Fetch_this=async (service,objParam)=>{
    //-------Check for Param_Requirents
    try {
      if (Object.keys(objParam).length ==0) {return false; }
    //-----------Calling for Store Services
    return await service.readFData(objParam).then((response) => {
      if (response.status) {
          return response.data;  
        } else {
          return false;
        }
      })
      .catch((error) => {return false;});
    } catch {return false; }
}
//--------------------------------------------------------------------UTILITIED_FUNCTIONS ( LocalStarage -- Profiling)
//------------------------------------------------------------------------------ Warming UP(BIOS_Process.....POST)
onMounted(async () => {
  assetService.asyncAnualData().then((response) => {
    if (response) {
      //asyncAnualDatas = reactive({ a: 12 });
    }
    return true;
  });

  // clearInterval(sync_this);
  assetService.set_syncLock(true)
  //-------
  //---
  this_Query()
});
onUnmounted(async () =>{
    clearInterval(sync_this)
    return true
})
//------------------------------------------SYNCING DATA With Store

//----------Visible/Filter Rows
//---------.-------------------F--I---L--T--E--R-------------LOCAL SYSTEM Searching...
let _choosemonths =ref([String(new Date().getMonth()+1)])
let _showHideMonfilter =ref(false)

let _monthsfilter= [
        {
          label: 'Jan',
          value: '1'
        },
        {
          label: 'Feb',
          value: '2'
        },
        {
          label: 'Mar',
          value: '3'
        },
        {
          label: 'Apr',
          value: '4'
        },
        {
          label: 'Jun',
          value: '5'
        },
        {
          label: 'Jul',
          value: '6'
        },
        {
          label: 'Aug',
          value: '7'
        },
        {
          label: 'Sep',
          value: '8'
        },
        {
          label: 'Oct',
          value: '9'
        },
        {
          label: 'Nov',
          value: '10'
        },
        {
          label: 'Dec',
          value: '11'
        },
        {
          label: 'Oct',
          value: '12'
        },

      ]

//1)-------------search box filter
let search = ref("");
//2)------- filter latest_% & filter type

//3)--------------Quick_item Filter ( Simple Search/Quick)
let quickFilterOptions = {
  //items_value to be filtered..
  quickOOptions: ["Stored", "Taken", "Issued"],
};
//***************** ALTER THOSE ABOVE LABELS(OPTIONAL) &  THE sS1/2/3(must)*****/

let quickFilter = reactive({
  quickOOptions: { Stored: true, Taken: true, Issued: true },
});
//-------------------------------Custome Filter ---Function
//const showALL=computed(()=>{})//with out return
const filter = computed(() => {
  return {
    search: search.value,
    Stored: quickFilter.quickOOptions.Stored, //StoreStatusFilter
    Taken: quickFilter.quickOOptions.Taken,
    Issued: quickFilter.quickOOptions.Issued,
  };
}); //with out return

function filterMethod(rows, terms) {
 
    // rows contain the entire data
    let lowerSearch = terms.search ? terms.search.toLowerCase() : ""; //holding search bar...value

    const filteredRows = rows.filter((row, i) => {
      let _group0 = true;
      //Gather toggle conditions (Store Status)
      let s1 = true; //If search term exists, convert to lower case and see which rows contain it
      if (lowerSearch != "") {
        _group0 = false;
        let s1_values = Object.values(row);
        let s1_lower = s1_values.map((x) => {
          try {
            return x.toString().toLowerCase();
          } catch {
            return " ";
          }
        });
        for (let val = 0; val < s1_lower.length; val++) {
          if (s1_lower[val].includes(lowerSearch)) {
            _group0 = true;
            break;
          }
        }
      }

        //Assume true in case there is no search
    let _monthfilter = false;
    if (!nul.value.includes(row.updatedAt)) {
        let itemMonth = row.updatedAt.split("/")[0]
        if(_choosemonths.value.length && _choosemonths.value.includes(itemMonth) ){
          _monthfilter =true
        }else if(_choosemonths.value.length == 0){
          _monthfilter=true
        }
    } 
    //check if any of the conditions match
    if(_group0 && _monthfilter){
      return true
    }return false
  });
  //onselected.value=filteredRows
  //filteredRows.length ? notifyit.simple(filteredRows.length + " - product Founded") : ""
  return filteredRows;
}

//----------------------------------------------------------SEARCHING

//-=====================Profiling
//------PROFILE--SELECTED------Profileing of selected data...
let itemDetailColumns = reactive([
  ["date", "createdAt", "id"],
  ["companyID", "name", "pension", "incTax", "loan ", "salary", "netSalary"],
  //["financeStatus", "takenBy", "returnedBy"],
]);

///////////////===========REPORTING
//-------Selected---------- Displaying & Recording Table Data
//---------------SELECTED---------- Displaying & Recording Table Data
let _reportReceipant= ref({})

var selected = ref([]); // it Holds rows LIst as they get selected....
var onselected = ref([_this]); // it Holds rows LIst as they get selected....
var rowSelected = reactive({}); //customezed_row Selected...
//-------Selected---------- Displaying & Recording Table Data
function getSelectedString() {
  //---listen to selected rows & listed in Objects array.
  if (Object.keys(selected.value[0]).length == 0 && selected.value[0] == _this) {
    selected.value.shift();
  }

  rowSelected = selected.value.length === 0 ? _this_Rows.value[0] : selected.value[0];
  return selected.value.length === 0
    ? ""
    : `# ${
        selected.value.length > 1 ? selected.value.length : ""
      } ,selected of ${_this_Rows.value.length}`;
}

function updateSelected() {
  // second ways of listing to selected_rows
  //////consol.log(selected, "Table Selection Happen...&Listening..");
}
//------EXPORT---SELECTED----Reporting Optionss
</script>

<style>
.sticky-table {
  /* height or max-height is important */
  max-height: 100%;
}
.q-table__top,
  .q-table__bottom,
  thead tr:first-child th
    /* bg color is important for th; just specify one */ {
  background-color: rgba(136, 255, 0, 0.719);
}

thead tr th {
  position: sticky;
  z-index: 1;
}

thead tr:first-child th {
  position: sticky;
  top: 0;
}
/* this is when the loading indicator appears */
.q-table--loading thead tr:last-child th {
  /* height of all previous header rows */
  top: 48px;
}

/* prevent scrolling behind sticky top row on focus */
tbody {
  /* height of all previous header rows */
  scroll-margin-top: 48px;
}
</style>
