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

  <div class="col row q-pa-xs q-gutter-xs" v-if="_this_acctype ?? false">
    <div
      class="col-xs-12  col  column rounded"
      style="height: 90vh"
    >
      <q-card class="col bordered column q-pa-none q-ma-none bg-white">
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
          <div class="col row transparent">
            <q-table
              class="col text-md text-weight-bold sticky-table "
              :dense="true"
              :rows="_this_Rows"
              :columns="columns"
              v-model:pagination="pagination"

              row-key="id"
              :selected-rows-label="getSelectedString"
              selection="multiple"
              v-model:selected="selected"
              @update:selected="updateSelected"
         
              :filterMethod="_thisFiltering"
              :filter="filter"

              :visible-columns="visibleColumns"
              v-model:loading="rowsLoading"
              no-data-label="Items doesn't Founded !"
              virtual-scroll
              :pagination="pagination"
              :style="[{ background: 'grey-10' }]"
              header-classes="bg-white"
              color="green"
            >
              <!--style="height: calc(100vh - 50vh)" -->
              <!--template v-slot:loading>

                <q-inner-loading showing color="secondary" />
              </template-->

              <template v-slot:top-left>
                <div class="q-gutter-xs row" v-if="_this_acctype?.capability ?? false">
                              
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
                  <q-select
                    v-model="invisibleColumns"
                    multiple
                    outlined
                    :dense="true"
                    options-dense
                    :display-value="$q.lang.table.columns"
                    emit-value
                    map-options
                    :options="columns"
                    option-value="name"
                    options-cover
                    style="min-width: 100px"
                    class=""
                    size="xs"
                  />
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
                  style="font-size: 0.8em; text-align: center center;text-transform: capitalize;"
                  class="text-bold text-center bg-grey-5 text-black"
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

        <q-card-section class="q-pt-xs col-auto row q-gutter-sm" >
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
            class="col-3 shadow-3 rounded-borders text-secondary q-pa-xs q-px-md column transparent"
            style="
              background: rgba(192, 192, 207, 0.493);
              border: 0.5px solid rgba(255, 255, 255, 1);max-width: 20vw;
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
    <div
    class=" column rounded shadow-2 text-left items-right justify-right" v-if="selected.length > 0"
    style="height: 90vh;z-index: 1000;position: absolute;right: 0px;"
    > 
    <q-card
        class="flat text-primary q-gutter-col-xs col column"
        v-if="selected[0]"
        :set="(itemDetail = selected[selected.length - 1])"
      >
        <q-card-section class="q-gutter-col-xs fit q-ma-none q-pa-none">
          <!-- profiling of selected items  [itemDetailColumns[0]]-->

          <q-card class="col-auto q-pa-none q-ma-none" style="" flat bordered>
            <!-- itemDetail -->

            <q-card-section class="fit">

              <div class="row no-wrap items-center">
                <div class="col  ellipsis">
                  {{ itemDetail["customerName"] }}
                </div>
                <div
                  class="col-auto text-grey  q-pt-md row no-wrap items-center"
                >
                  {{ itemDetail["tags"] }}
                </div>
              </div>

              <q-rating size="18px" v-model="stars" :max="5" color="primary" />
              <span class=" text-grey q-ml-sm">
                {{ itemDetail["rate"] }}</span
              >
            </q-card-section>

            <q-card-section class="q-pt-none row q-gutter-xs ">
              <q-chip
                dense
                class="col-6"
                icon="alarm"
                :label="itemDetail['createdAt']"
              />
              <q-chip dense icon="directions">{{ itemDetail["id"] }}</q-chip>
            </q-card-section>

            <q-separator />
          </q-card>

          <!-- One Dimentional Columns-->
          <q-card class="col q-my-xs shadow-4" flat bordered>
            <q-card-section class="q-pa-none q-ma-none full-width">
              <q-list bordered class="rounded-borders" style="">
                <template v-for="item of itemDetailColumns[1]" :key="item">
                  <q-item clickable v-ripple>
                    <q-item-section>
                      <q-item-label lines="1" style="text-transform:capitalize;font-weight: bold;"> {{ item }}</q-item-label>
                      <q-item-label lines="2" class="text-secondary">
                        {{ itemDetail[item] }} 
                      </q-item-label>
                    </q-item-section>

                    <q-item-section side>
                      <q-icon name="info" color="green" />
                    </q-item-section>
                  </q-item>

                  <q-separator inset="item" />
                </template>
              </q-list>
            </q-card-section>
          </q-card>

          <!--end profiling-->

          <!-- 2D columns _value-->

          <q-card class="col q-py-sm column" flat>
            <q-card-section
              v-for="item of itemDetailColumns[2]"
              :key="item"
              class="row q-gutter-xs q-ma-none q-pa-none col fit"
            >
              <q-btn color="positive" dense :label="item" class="col color-primary fit">
                <q-menu
                  transition-show="scale"
                  transition-hide="scale"
                  class="row col-atuo"
                  style="max-width:7vw"
                >
                  <q-card
                    v-for="(ite, k) in itemDetail[item]"
                    :key="ite"
                    class="column  col-auto q-pa-xs q-ma-xs"                   
                   
                  >
                    <q-item class="col-auto" style="max-width:10vw">
                      <q-item-section top>
                        <div
                          v-if="typeof ite == 'object'"
                          class=" q-gutter-xs " style="max-width:10vw"
                        >
                          <div lines="1" v-for="(it, kk) of ite" :key="it" class="col">
                            <q-breadcrumbs class="text-light">
                              <q-breadcrumbs-el :label="kk" icon="info" />
                            </q-breadcrumbs>

                            <q-item-label class="q-px-lg">
                              <span class="text-posetive"> {{ it }} </span>
                            </q-item-label>
                          </div>
                        </div>
                        <div v-else class=" q-gutter-xs column" style="max-width:7vw">
                          <q-item-label lines="1">
                            <span class="text-weight-medium"> {{ k }}</span>
                          </q-item-label>
                          <q-item-label >
                            <span >
                              {{ itemDetail[item][k] }}
                            </span>
                          </q-item-label>
                        </div>
                      </q-item-section>
                    </q-item>
                  </q-card>
                </q-menu>
              </q-btn>
            </q-card-section>
          </q-card>

        </q-card-section>
      </q-card>

    </div>

    <!----------------------------------VISUALITH-->
  </div>
</template>

<script setup>
//_____________________________________________Modules Definitions
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

import { custStore } from "stores/dataStores/custStore"; //cust Store ( Main Store)
import { thisStore } from "stores/dataStores/thisStore"; //cust Store ( Main Store)
// import { genapiStore } from "src/stores/jstStores/genapiStore";

import { customerSchema } from "src/composables/schemas/saleSchemas";

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

import {useAssetFilter} from "src/composables/filters/custfilter"
var {
  _enableRowFilter, _thisFiltering
} = useAssetFilter()

const $q = useQuasar();
//const $m = useMeta();
const router = useRouter();

const metaData = {
  // sets document title
  title: "YGP  cust Managment",
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
_thisModel.value = "customer"; // the Vue_Page_DataModel (Listing Collection Name)
//  var _thisModelHeader = ref(_thisModel.value+" Managment"); // the Vue_Page_Data_Headers(Descriptions...)
 _this_Schema.value = customerSchema

 const custService = custStore();
const _thisService = thisStore();
const _thisapiUrl ='/sale/cust'
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
return custService.getstatus_Rows}) 
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
lockedColumns.value =["userID","companyID"]// ref([ "userID","companyID"]); //are blacklist of columns tobe not shown during the Registerations..form submitting
let _xDisplayDefaulted =ref([
  'userID','companyID','_Stage_'
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

//------column invisiblity on table_
// let visibleColumns = ref([]); //Hold List of In
 invisibleColumns.value = [
  "feedback",
  "_stage_",
  "address",
  "userID",
  "tags",
  "customerBankAccount",
  "socielMedia",
  "companyID",
  "_stage_",
]; //defualt hidden columns

if ($q.screen.lt.lg) {
  invisibleColumns.value.push("gmStatus");
  invisibleColumns.value.push("notes");
  // invisibleColumns.value.push("customerName");
  invisibleColumns.value.push("rateit");

}

// visibleColumns.value = invisibleColumns.value;

//===============================================-----------------------------------
const pagination = ref({  
        // page: 50,
        rowsPerPage: 10,
        // rowsNumber: 0,
      })

// _this_Schema.value=Object.assign(_this_Schema,{'action':{type:String,default:''}})
columns = computed(() => { 
console.log('loging column',Objprops._acctype, _this_Schema.value,_this_acctype.value)

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
    _thisDefault.value['companyID']=Objprops._profile.companyID
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
  await Sync_this(custService,_this_Query.value)
  //-------------------- Preparing Default Rows ( New Row Skeltons)
  // ?
  return true
}
//==Fetching Data ( Store_SyncFetch)
let sync_this=''
_this_Rows = computed(() => { //Updating is comming
  return _this_RowsCompute(custService.getDatas)
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
            _this_Rows.value.push(response)
            timerDone(5000,_createTitle[2],'Succefully Created')
           __thisBox.value=false;
            return $r.push('/play/playservice')
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
  custService.asyncAnualData().then((response) => {
    if (response) {
      //asyncAnualDatas = reactive({ a: 12 });
    }
    return true;
  });

  // clearInterval(sync_this);
  custService.set_syncLock(true)
  //-------
  //---
  this_Query()
});
onUnmounted(async () =>{
    clearInterval(sync_this)
    return true
})
//---------.-------------------F--I---L--T--E--R-------------LOCAL SYSTEM Searching...
//1)-------------search box filter

var lockFilter=ref(true)
let search = ref("");
let filterDays = ref({
        min: 2,
        max: 9
      })
//2)------- filter latest_% & filter type
//3)--------------Quick_item Filter ( Simple Search/Quick)
let checkBoxLabel = {
  //items_value to be filtered..
  group_I: ["A", "AA", "AAA","Others"],
  group_II: ["Oxygen","Acetylene","CarbonDioxyed",'N2_gas','N2_liquid',"Mixed",],
};

//***************** ALTER THOSE ABOVE LABELS(OPTIONAL) &  THE sS1/2/3(must)*****/

let checkBoxValue = reactive({
  group_I: { A: true, AA: true, AAA: true ,Others:true},
  group_II: {Oxygen:true,Acetylene:true,CarbonDioxyed:true,N2_liquid:true,N2_gas:true,Mixed:true },
});
//-------------------------------Custome Filter ---Function
//const showALL=computed(()=>{})//with out return
const filter = computed(() => {
  return {
    search: search.value,
    A: checkBoxValue.group_I.A, //StoreStatusFilter
    AA: checkBoxValue.group_I.AA,
    AAA: checkBoxValue.group_I.AAA,
    Others: checkBoxValue.group_I.Others,
    //-----------
    Oxygen: checkBoxValue.group_II.Oxygen,
    Acetylene: checkBoxValue.group_II.Acetylene,
    CarbonDioxyed: checkBoxValue.group_II.CarbonDioxyed,
    N2_liquid: checkBoxValue.group_II.N2_liquid,
    N2_gas: checkBoxValue.group_II.N2_gas,
    Mixed: checkBoxValue.group_II.Mixed,
  };
}); //with out return


//4)------- live_data_fetching...Searching filter (build In)

//-=====================Profiling
//------PROFILE--SELECTED------Profileing of selected data...
let itemDetailColumns = reactive([
  ["date", "customerTIN", "rateit"],
  ["customerName", "customerTIN", "customerID","customerOF", "cylinders","rateit","reminderDays"],
  ["customerBankAccount", "feedback", "address", "socielMedia"],
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
  background-color: rgb(6, 39, 83);
  color: rgb(55, 255, 5);
}

thead tr th {
  position: sticky;
  z-index: 1;
}

thead tr:first-child th {
  position: sticky;
  top: 0;
  background-color: rgb(0, 110, 255);

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
