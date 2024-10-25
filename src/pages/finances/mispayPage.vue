<template id="full-page">
  <!----------------------------Dialog Schema Form-----START--->
  <q-dialog v-model="__thisBox" v-if="_rolesColumns.length"
    transition-show="scale" transition-hide="scale"
    style="background: rgba(73, 255, 1, 0.342); border: 15px solid rgb(0, 0, 117)"
    persistent
  >
  <mainForm inputColor='white' :_xDisplayDefaulted=_xDisplayDefaulted :_rolesColumns=_rolesColumns :_this=_this :_thisDefault=_thisDefault :__thisOps=__thisOps 
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

  <div class="col row q-pa-xs q-gutter-xs" style="height: 90vh" v-if="_this_acctype ?? false">
    <div
    class="col-grow column rounded"
    style="height: 90vh"
    >
      <q-card class="col bordered column q-pa-none q-ma-none bg-grey-2">
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
          class="q-pa-none col column bordered wrap scroll bg-white"
        >
          <!----------------------------------------- Table View...-->
          <div class="col row">
            <q-table
              class="col text-md text-weight-bold sticky-table transparent"
              :dense="true"
              :rows="rows"
              :columns="columns"

              v-model:pagination="pagination"

              
              row-key="id"
              :selected-rows-label="getSelectedString"
              selection="multiple"
              v-model:selected="selected"
              @update:selected="updateSelected"
              :filterMethod="filterMethod"
              :filter="filter"
              :visible-columns="visibleColumns"
              v-model:loading="rowsLoading"
              no-data-label="Items doesn't Founded !"
              virtual-scroll
              :pagination="pagination"
              :style="[{ background: 'blue' }]"
            >
              <!--style="height: calc(100vh - 50vh)" -->
              <!--template v-slot:loading>
                <q-inner-loading showing color="secondary" />
              </template-->

              <template v-slot:top-left>
                <div class="q-gutter-xs row" v-if="_this_acctype.capability ?? false">
                              
                              <q-btn
                                dense
                                outline
                                class="col-auto"
                                :label="_thisModel+' Managment'"
                              />
                              <q-btn
                                dense
                                color="secondary"
                                class=""
                                :label="'ADD  ' + _thisModel"
                                @click="__thisBox_Dialog(null)"
                                v-if="_this_acctype.capability[0] != '0'"
                              ></q-btn>
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

                <div class="col-3 q-mx-sm">
                  <q-input
                    standout="bg-green"
                   
                    style="min-width: 7vw;max-width:13vw;background: rgba(255, 255, 255, 0.589);border-radius: 5px;"
                    debounce="400"
                    color="green"
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
                  style="font-size: 0.8em; text-align: center;text-transform: capitalize;"
                  class="text-bold text-center  bg-blue-10 text-white fontcstyle"
                  :props="props"
                  ><!--q-icon name="lock_open" size="1.5em" /-->
                  {{
                    typeof props.col.label === "string"
                      ? props.col.label
                      : " "
                  }}
                </q-th>
              </template>

              <template v-slot:body="props" >
               
               <!-- {{ _this_Rows}}  -->
                               <q-tr
                                 :props="props"
                                 class="cursor-pointer text-bold text-weight-bolder" v-if="Object.keys(props.row).length"
                               >
                               <q-tooltip class="bg-indigo" :offset="[10, 10]">
                        
                                 {{props.row['_stage_']}}
                                
                              </q-tooltip>
                                 <!------------------ iterating _ body cell-->
                                 <q-td auto-width>
                                   <q-toggle dense v-model="props.selected" />
                                 </q-td>
               
                                 <td
                                   :props="props"
                                   style="font-size: 0.6em; text-align: justify"
                                   class="col  text-bold text-center fontastyle"
                                   :class="
                                     object.name == 'name'
                                       ? 'text-center text-weight-bolder'
                                       : 'text-center '
                                   "
                                   v-for="object in props.cols"
                                   :key="object.name"
               
                                   
                                 >
                                
                                   <!-- is it single valued //// string or array of enum or .......-->
                                   <template v-if="object.schema ?? false">
                                       <div
                                         v-if="object.schema.type ?? false"
                                         >
                                       
                                         <!-- check if the object has type:"value" .. for string/array-->
                                         <div v-if="object.name != 'actions'" class="text-black;fontastyle">
                            <q-badge v-if="object.name === 'gmStatus'" >
                                    <Label :class="props.row['gmStatus'] ? 'bg-green' : 'bg-red'"> &nbsp; </Label>
                            </q-badge>

                            <div  v-else class="fontbstyle" style="font-size:0.7rem">
                              <q-card  flat bordered   v-if="'textarea' in Object.keys(object.schema ?? {})"     :dense="true"  >

                                        <q-badge v-if="props.row[object.name] ?? false">
                                          <div v-html="props.row[object.name]"></div>
                                        </q-badge>

                                        <q-badge style="background:red" v-else> </q-badge>

                              </q-card>
                              
                              <q-card flat  bordered v-else-if="(['r_Time','d_Time']).includes(object.name)" :dense="true"
                              >
                                        <q-badge v-if="props.row[object.name] ?? false">
                                        {{ props.row[object.name].split('T')[1] }}
                                        </q-badge>
                                        <q-badge style="background:red" v-else> </q-badge>

                              </q-card>

                              <div v-else-if="props.row[object.name] ?? false"> 
                                {{ props.row[object.name] }} 
                              </div>
                            </div>

                          </div>

                          <div class="row q-gutter-xs text-dark" v-else  >  
                            <template v-if="_this_acctype.capability[4] != '0'">
                              <q-btn
                                color="blue"
                                label="Update"
                                @click="__thisBox_Dialog(props.rowIndex)"
                                class="fontastyle"
                                no-caps
                              v-if="_this_acctype.capability[2] != '0' && _this_acctype.accstage.includes(props.row._stage_)"
                              />
                              <q-btn
                                color="red-7"
                                label="Delete"
                                @click="_this_ActiveOperation._delRow(null,props.rowIndex,props.key)"
                                class="fontastyle"
                                :dense="true"
                              v-if="_this_acctype.capability[3] != '0' && _this_acctype.accstage.includes(props.row._stage_)"
                                no-caps
                              />
                            </template>
                            <template v-else-if="props.row.userID == _profile.id">
                              <q-btn
                                color="blue"
                                label="Update"
                                @click="__thisBox_Dialog(props.rowIndex)"
                                class="fontastyle"
                                no-caps
                              v-if="_this_acctype.capability[2] != '0' && _this_acctype.accstage.includes(props.row._stage_)"
                              />
                              <q-btn
                                color="red-7"
                                label="Delete"
                                @click="_this_ActiveOperation._delRow(null,props.rowIndex,props.key)"
                                class="fontastyle"
                                :dense="true"
                              v-if="_this_acctype.capability[3] != '0' && _this_acctype.accstage.includes(props.row._stage_)"
                                no-caps
                              />
                            </template>
                          </div>
               
                                       </div>
               
               
                                       <div
                                         v-else-if="Array.isArray(object.schema)"
                                         color="grey-4"
                                         text-color="black"
                                       >
                                               <q-badge v-if="props.row[object.name] ??false"
                                                 
                                                 >
                                                   {{ props.row[object.name] }}
                                                 </q-badge>
                                             <q-badge style="background:red" v-else>
               
                                             </q-badge>
               
                                         
                                           </div>
               
                                       <div
                                         v-else-if="Object.keys(object['schema']).length"
                                         class=" text-primary row q-gutter-xs col-auto"
                                       
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
                                           class="column q-gutter-xs col-auto" style="font-size:0.7rem"
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
                                                 <q-badge v-if="columns ?? false"
                                                   
                                                 >
                                                   {{ columns }}
                                                 </q-badge>
               
                                                 <q-badge style="background:red" v-else> </q-badge>
                                               </q-item-label>
                                             </q-item-section>
               
                                             <q-item-section side> . </q-item-section>
                                           </q-item>
                                         </q-list>
                                       </div>
                                 </template>
               
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

        <q-card-section class="q-pt-xs col-auto row q-gutter-sm">
          <!----  above table-->
          <div
            class="col-auto rounded-borders text-secondary q-gutter-xs column flex-center"
            style="
              background: rgba(0, 0, 255, 0.068);
              border: 1px solid rgba(0, 0, 255, 0.432);
            "
          ></div>

          <!----- tab-->
          <div
            class="col shadow-3 rounded-borders text-secondary q-pa-xs q-px-md column transparent"
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
             

              <div class="q-py-none column q-gutter-sm " v-if="_pageSettings.showForm" >
                <q-btn class="col-grow bg-blue text-white fontdstyle" @click="_pageSettings.showForm = !_pageSettings.showForm" :dense="true" no-caps>Hide</q-btn>

                <ReportForm    v-if="selected.length"             
                  :_thisModel="_thisModel"
                  :selected="selected"
                  :columns = "columns"
                  :_extraData="{}"
                  :_profile="Objprops._profile"
                  :_whoreceiver="_reportReceipant"
                /><div v-else class="text-red"> No Item Selected.</div>
              </div>
              <div v-else class="q-py-none row q-gutter-sm "> 
                <q-btn class="col-grow bg-blue text-white fontdstyle" @click="_pageSettings.showForm = !_pageSettings.showForm" :dense="true" no-caps>Report Forms</q-btn>
              </div>
            </div>
          </div>

          <div
            class="col shadow-2 rounded-borders text-secondary q-pa-none q-px-md column transparent"
            style="
              background: rgba(192, 192, 207, 0.493);
              border: 0.5px solid rgba(255, 255, 255, 1);
            "
          >
          <span class="text-weight-bold  co-auto row justify-end q-my-sm">
            <div class="col"> 
                  Quick Filter <q-icon name="style" />
                    </div>
              
                  <q-btn-toggle 
                        v-model="_enableRowFilter"
                        toggle-color="green"
                        :options="[
                          {label: 'OFF', value: true},
                          {label: 'ON', value: false},
                        ]"
                        :dense="true" no-caps
                        size="sm"   />

                </span>
                <q-separator inset/>
            <div
              class="col-auto transparent q-pa-xs q-gutter-xs row  items-start"
            >
              <q-item
                class="col transparent q-pa-xs  flex column items-start"
                v-for="(status, statusName) in checkBoxLabel"
                :key="statusName"
                :dense="true"
              >
              <q-separator class="text-bold" inset />

                <div
                  class="col  q-pa-xs q-gutter-xs row  items-start "  style="border:1px solid rgb(173, 173, 173);border-radius: 6px;"
                >
                  <q-item
                    v-for="(state,indx) in status"
                    :key="indx"
                    class="q-pa-none justify-between"
                    :dense="true"
                  > 
                    <q-toggle
                      :color="cp[indx]"
                      :label="state"
                      v-model="checkBoxValue[statusName][state]"
                      val="red"
                      class="q-pa-none"
                      size="xs"
                      :dense="true"
                    />
                  </q-item>
                </div>
              </q-item>
            </div>

            <!--q-card class="q-py-sm transparent shadow-6 q-gutter-xs column col">
              <q-list class="col text-black column q-gutter-none">
                <q-item
                  class="col q-gutter-none q-pa-none column"
                  v-if="qserchResult.length"
                >
                  <q-item-label class="col-auto q-gutter-xs row items-end">
                    <q-badge>{{ searchService }} </q-badge>
                    <div v-if="Object.keys(qserchResult[0]).length">
                      <q-badge rounded color="green" />
                    </div>
                    <div v-else><q-badge rounded color="yellow" /></div>
                  </q-item-label>
                  <q-scroll-area
                    class="rounded-borders shadow-4 bg-grey-3 fit col column q-pa-none items-start contents-start"
                  >
                    <q-item-section
                      class="row q-gutter-xs items-start contents-start q-pa-none"
                    >
                      <--  v-for="search in qserchResult" :key='search'   ->
                      <div
                        v-for="(item, k) in qserchResult"
                        :key="k"
                        class="col fit row q-gutter-xs"
                      >
                        <q-list bordered class="rounded-borders col fit">
                          <q-item
                            clickable
                            v-ripple
                            @click="qserchResultSel(item)"
                            :style="[
                              searchProfile.id === item.id
                                ? { background: 'grey', text: 'white' }
                                : { text: '#FFF' },
                            ]"
                          >
                            <q-item-section avatar>
                              <q-avatar>
                                <img src="~mispays/yirgumini.jpg" />
                              </q-avatar>
                            </q-item-section>

                            <q-item-section>
                              <q-item-label lines="1">{{
                                item[searchProfileKey[0]]
                              }}</q-item-label>
                              <q-item-label lines="2">
                                <span class="text-weight-bold">{{
                                  item[searchProfileKey[1]]
                                }}</span>
                              </q-item-label>
                            </q-item-section>
                            <q-item-section side top class="">
                              {{ item["updatedAt"] }}
                            </q-item-section>
                          </q-item>
                        
                        </q-list>
                      </div>
                    </q-item-section>
                  </q-scroll-area>
                </q-item>
                <q-item class="flex-center flex col" v-else-if="nulQuickSearch">
                  {{ nulQuickSearch }}</q-item
                >
                <q-item class="flex-center flex col" v-else>
                  Quick search panel.
                </q-item>
              </q-list>
            </q-card -->
          </div>
          <q-separator inset dark />
          <div
            class="col-auto shadow-3 rounded-borders text-secondary q-pa-xs q-px-md column transparent"
            style="
              background: rgba(192, 192, 207, 0.493);
              border: 1px solid rgba(255, 255, 255, 1);
            "
          >
           
            <!--  :marker-labels="depthLabel" -->
              <reportReceipant  @result="_reportReceipant=$event"  />
           
            <!--/q-form-->
          </div>
        </q-card-section>
      </q-card>
    </div>
    <!--- Profiling...-->

    <!----------------------------------VISUALITH-->
    <div
    class="col-auto column rounded shadow-2 text-left items-right justify-right" v-show="selected.length > 0"
    style="height: 90vh;z-index: 1000;position: absolute;right: 0px;"
    > 
      <!--selected-->
      <BChart
        class="col"
        :selected="selected"
        :_thisModel="_thisModel"
        columntoAnalysis="miscellenouseExp"
        analysiserColumn="amount"
        :analysiserItemValues="['Onstore', 'taken']"
        :analysiserColumnValues="[
          { label: 'StoreStatus', value: 'amount' },
          { label: 'Quantity', value: 'tQ' },
          { label: 'Cost', value: 'tQC' },
        ]"
        :storeService="mispayService.getyearDatas"
      />
    </div>
  </div>
</template>

<script setup>
//_____________________________________________Modules Definitions
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

import { mispayStore } from "stores/dataStores/mispayStore"; //mispay Store ( Main Store)
import { thisStore } from "stores/dataStores/thisStore"; //mispay Store ( Main Store)
// import { genapiStore } from "src/stores/jstStores/genapiStore";

import { mispaySchema } from "src/composables/schemas/financeSchemas";

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
      // _this_acctype,
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

import {useAssetFilter} from "src/composables/filters/mispayfilter"
var {
  _enableRowFilter, _thisFiltering
} = useAssetFilter()

const $q = useQuasar();
//const $m = useMeta();
const router = useRouter();

const metaData = {
  // sets document title
  title: "YGP  mispay Managment",
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
_thisModel.value = "mispay"; // the Vue_Page_DataModel (Listing Collection Name)
//  var _thisModelHeader = ref(_thisModel.value+" Managment"); // the Vue_Page_Data_Headers(Descriptions...)
 _this_Schema.value = mispaySchema

 const mispayService = mispayStore();
const _thisService = thisStore();
const _thisapiUrl ='/finance/mispay'
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
let _this_acctype = ref(null);
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
return mispayService.getstatus_Rows}) 
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
 lockedColumns.value = ["userID", "department", "position", "companyID"]; //are blacklist of columns tobe not shown during the Registerations..form submitting
 let _xDisplayDefaulted =ref([
  'userID','companyID'
])
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

//-------edit/delete/add filter....controls who see what in what conditions...
//------column invisiblity on table_
// let visibleColumns = ref([]); //Hold List of In
 invisibleColumns.value = [
  "financeStatus",
  "takenBy",
  "returnedBy",
  "supplier",
  "userID",
  "tags",
]; //defualt hidden columns
if ($q.screen.lt.md) {
  invisibleColumns.value.push("storeStatus");
}
// visibleColumns.value = invisibleColumns.value;

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
                if(capabilityWall[0]=='2' || capabilityWall[2] =='2'){  ///if user_ hass full access
                         if(modelRole.includes(schemaColumn)){ //excludes specifed columns
                          continue
                          // _rolesColumn(_col)
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
  await Sync_this(mispayService,_this_Query.value)
  //-------------------- Preparing Default Rows ( New Row Skeltons)
  // ?
  return true
}
//==Fetching Data ( Store_SyncFetch)
let sync_this=''
_this_Rows = computed(() => { //Updating is comming
  return _this_RowsCompute(mispayService.getDatas)
});
function _this_RowsCompute(_Datas) {
  pagination.value.rowsPerPage=_Datas.length > 50 ? _Datas/2: 25 // _pageSettings.value['tableView']=='cards' ? 0 : 3
  // pagination.value.rowsPerPage=10// _pageSettings.value['tableView']=='cards' ? 0 : 3
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
  createData: async function (objParam = {}) {
    //-------Check for Param_Requirents
    console.log(objParam)

    try {
      if (_this.value[createKey] == null) {
        // return false;
      }
      timerLoadevent({ 'createData': 0 }, 0, "Updating...");
      //-----------Calling for Store Services  (_suburl, formData, objParam)
      return await _thisService
        .createData(_thisapiUrl, _this.value, objParam)
        .then((response) => {
          console.log(response)

          if (response.status) {
            return response.data;
          } else {
            timerError(5000, 'Error createData', '...'+response.data);
            return false;
          }
        })
        .catch((e) => {
          console.log(e)
            timerError(5000, 'Error createData', '...'+e);
          return false;
        });
    } catch(e) {
      console.log(e)

            timerError(5000, 'Error createData', '...'+e);
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
    timerLoadevent({ 'updateData': 0 }, 0, "Updating...");

      //-----------Calling for Store Services  (_suburl, formData, objParam)
      return await _thisService
        .updateData(_thisapiUrl, _this.value, objParam)
        .then((response) => {
          if (response.status) {
            return response.data;
          } else {
            timerError(5000, '', 'Error'+response.data);
            return false;
          }
        })
        .catch((e) => {
          timerError(5000, "Item Updated", "Succefully Updated"+e);
          return false;
        });
    } catch(e) {
          timerError(5000, 'Error updateData', '...'+e);
      return false;
    }
  },

  readData: async function () {
    timerLoadevent({ 'readData': 0 }, 0, "Searching...");
    return await _thisService
      .readData(_thisapiUrl)
      .then((response) => {
        if (response.status) {
          return response.data;
        } else {
            timerError(5000, '', 'Error'+response.data);
          return false;
        }
      })
      .catch((e) => {
          timerError(5000, 'Error readData', '...'+e);
        return false;
      });
  },
  //---------------------------------------------------------------
  readFData: async function (objParam = {}) {
    //-------Check for Param_Requirents
    try {
      if (Object.keys(objParam ?? {}).length == 0) {
        return false;
      }
    timerLoadevent({ 'readFData': 0 }, 0, "Searching...");

      //-----------Calling for Store Services
      return await _thisService
        .readFData(_thisapiUrl, objParam)
        .then((response) => {
          if (response.status) {
            return response.data;
          } else {
            timerError(5000, '', 'Error'+response.data);
            return false;
          }
        })
        .catch((e) => {
          timerError(5000, "Error readFData", "Succefully Updated"+e);
          return false;
        });
    } catch(e) {
          timerError(5000, 'Error readFData', '...'+e);
      return false;
    }
  },

  deleteData: async function () {
    //-------Check for Param_Requirents
    try {
      if (_this.value[delKey] == null) {
        return false;
      }
    timerLoadevent({ 'deleteData': 0 }, 0, "Searching...");

      //-----------------
      let objParam = {};
      objParam[delKey] = _this.value[delKey];
      //---------
      return await _thisService
        .deleteData(_thisapiUrl, objParam)
        .then((response) => {
          if (response.status) {
            // timerDone(5000, 'Deleted', '...');
            return response.data;
          } else {
            timerError(5000, '', 'Error'+response.data);
            return false;
          }
        })
        .catch((e) => {
          timerError(5000, "Error deleteData", "Succefully Updated"+e);
          return false;
        });
    } catch(e) {
          timerError(5000, 'Error deleteData', '...'+e);
      return false;
    }
  },
  //------------------filtering & searching for different Model
};

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
  mispayService.asyncAnualData().then((response) => {
    if (response) {
      //asyncAnualDatas = reactive({ a: 12 });
    }
    return true;
  });

  // clearInterval(sync_this);
  mispayService.set_syncLock(true)
  //-------
  //---
  this_Query()
});
onUnmounted(async () =>{
    clearInterval(sync_this)
    return true
})
//----------Visible/Filter Rows
//---------.-------------------F--I---L--T--E--R-------------LOCAL SYSTEM Searching...
//1)-------------search box filter

var lockFilter=ref(true)
let search = ref("");
let filterDays = ref({
        min: 2,
        max: 8
      })
//2)------- filter latest_% & filter type
//3)--------------Quick_item Filter ( Simple Search/Quick)
let quickFilterOptions = {
  //items_value to be filtered..
  quickOOptions: ["prom_", "fuel", "rent", "capReturn", "others"],
};

//***************** ALTER THOSE ABOVE LABELS(OPTIONAL) &  THE sS1/2/3(must)*****/

let quickFilter = reactive({
  quickOOptions: {
    prom_: true,
    fuel: true,
    rent: true,
    capReturn: true,
    others: true,
  },
});
//-------------------------------Custome Filter ---Function
//const showALL=computed(()=>{})//with out return
const filter = computed(() => {
  return {
    search: search.value,
    prom_: quickFilter.quickOOptions.prom_, //StoreStatusFilter
    fuel: quickFilter.quickOOptions.fuel,
    rent: quickFilter.quickOOptions.rent,
    capReturn: quickFilter.quickOOptions.capReturn,
    others: quickFilter.quickOOptions.others,
  };
}); //with out return

function filterMethod(rows, terms) {

  if(lockFilter.value){
    return rows
  }

  // rows contain the entire data
  let lowerSearch = terms.search ? terms.search.toLowerCase() : ""; //holding search bar...value
  const filteredRows = rows.filter((row, i) => {
    let ans = false;
    //Gather toggle conditions (Store Status)
    let sS1 =
      quickFilter.quickOOptions.prom_ && row.miscellenouseExp == "promotion"; //holding toggle_quicx search
    let sS2 = quickFilter.quickOOptions.fuel && row.miscellenouseExp == "fuel";
    let sS3 = quickFilter.quickOOptions.rent && row.miscellenouseExp == "rent";
    let sS4 =
      quickFilter.quickOOptions.capReturn &&
      row.miscellenouseExp == "capitalReturn";
    let sS5 =
      quickFilter.quickOOptions.others && row.miscellenouseExp == "others";

    //let c3 = filterToggle.dinner && row.storeStatus == "dinner";

    //Assume true in case there is no search
    let s1 = true; //If search term exists, convert to lower case and see which rows contain it

    if (lowerSearch != "") {
      s1 = false;
      let s1_values = Object.values(row);
      //list of all values in the row ( evenObjec,string,date,.....).. converting this pandora_values could lead to error..

      let s1_lower = s1_values.map((x) => {
        try {
          return x.toString().toLowerCase();
        } catch {
          return " ";
        }
      });
      for (let val = 0; val < s1_lower.length; val++) {
        if (s1_lower[val].includes(lowerSearch)) {
          s1 = true;
          break;
        }
      }
    }
    //assume row doesn't match
    ans = false;
    //check if any of the conditions match
    if (
      (sS1 && s1) ||
      (sS2 && s1) ||
      (sS3 && s1) ||
      (sS4 && s1) ||
      (sS5 && s1)
    ) {
      // || (c3 && s1)) {
      ans = true;
    }
    console.log(sS1,sS2,sS3,sS4,sS5,ans,'filter')
    return ans;
  });
  notifyit.simple(filteredRows.length + " - Items Founded")
  return filteredRows;
}

//4)------- live_data_fetching...Searching filter (build In)
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
  background-color: rgb(226, 226, 226);
  color: rgb(7, 34, 1);
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
