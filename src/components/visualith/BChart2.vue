<template>
  <q-list class="col column q-gutter-xs q-pa-sm shadow-3 "   style="background-image: url('/src/assets/yirgumini.jpg');background-size: cover;">
    <q-item
      class="col column q-pa-none shadow-8 " style="background-color: rgba(255, 255, 255, 0.911);"
    
    >
      <q-item-section class="col column q-pa-xs">
        <div class="col column text-white">
          <Bar
          style="height: 100%; width: 100%"
            color="white"
            class="col text-white"
            :data="BarData"
            :options="BarOption"
          />

          <div class="col-grow row q-gutter-sm items-center">
            <div class="col column">
              <q-select
                name="Item Analysis"
                v-model="columnItemtoAnalysis"
                :options="columnItemstoAnalysis"
                color="primary"
                outlined
                label="Item to Analysis"
                :dense="true"
                class="col"
              />
            </div>

            <div class="col-auto">
              <q-btn-toggle
                v-model="active_analysiserColumnValue"
                no-caps
                color="green"
                text-color="black"
                toggle-color="blue"
                toggle-text-color="white"
                :dense="true"
                class="text-caption"
                :options="props.analysiserColumnValues"
              />
            </div>

            <div class="col q-gutter-xs text-caption">
              <div class="transparent col-auto">
                | Column :
                {{ active_analysiserColumnValue.toUpperCase() }}
              </div>
              <div class="transparent col-auto row items-center">
                | Data :
                <div class="text-overline text-green q-px-sm">
                  {{ columnItemtoAnalysis }}
                </div>
              </div>
            </div>
          </div>

        </div>
      </q-item-section>
    </q-item>

    <q-item
      class="col column q-pa-none shadow-8" style="background-color: rgba(255, 255, 255, 0.911);"
    >
      <q-item-section class="col column q-pa-xs">
        <div class="col column">
          <Line
            style="height: 100%; width: 100%"
            class="col"
            :data="LineData"
            :options="LineOption"
          />
        </div>
      </q-item-section>
    </q-item>

    <q-item
      class="col q-pa-xs text-light row q-gutter-xs"
      style="background: rgba(14, 28, 97, 0.555)"
    >
      <q-card class="col column">
        <q-card-section class="">
          <q-item-label class="text-h6"> {{ anuBuyPlan }}</q-item-label>

                <q-item-label caption class="green text-bold">
                  Planed Quantity</q-item-label
                >
        </q-card-section>
        <q-separator inset />
        <q-card-section class="q-pt-none">
          <q-knob
            show-value
            font-size="12px"
            v-model="anuBouPlan"
            size="45px"
            :thickness="0.35"
            color="orange"

            :min="1"
            :max="anuBuyPlan"

            :step="1"

            track-color="green"
            class="text-black q-ma-md"

          >
            {{ AnnualnetPerformance }} %
          </q-knob>
          <span class="text-caption"> Monthly Performance</span>
        </q-card-section>
        <q-separator inset />

        <q-card-section>
          <q-item-label class="text-h6"> {{ anuBouPlan }} </q-item-label>
                <q-item-label caption class="green text-bold">Annual Quantity Recorded</q-item-label>
        </q-card-section>
      </q-card>

      <q-card class="col column">
        <q-card-section class="col column">
          <q-item class="text-bold q-gutter-sm"> Performace Rate </q-item>
          <q-item class="text-bold q-gutter-sm">
            <q-chip class="text-caption text-success">
              {{ new Date().getDate() }} Days, of this month</q-chip
            >
          </q-item>
          <q-item class="col-auto text-h4 text-weight-bolder flex-center flex">
            {{ AnnualnetPerformance }} %

            <q-tooltip
              anchor="center middle"
              self="top middle"
              :offset="[10, 10]"
              class="bg-blue"
              >Monthly Performance Rates
            </q-tooltip>
          </q-item>
        </q-card-section>
        <q-card-section class="wrap col-auto text-h6">
          {{ new Date().toDateString() }}
        </q-card-section>
      </q-card>
    </q-item>
  </q-list>

  <!------------ line Chart-->
</template>

<script setup>
import { ref, reactive, computed } from "vue";
import { Bar, PolarArea, Pie, Line } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  RadialLinearScale,
  ArcElement,
  PointElement,
  LineElement,
  registerables
} from "chart.js";
// import { Chart, registerables } from 'chart.js';
ChartJS.register(...registerables)
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  RadialLinearScale,
  ArcElement,

  PointElement,
  LineElement
);
//------------------DATA

//if( typeof window != undefined)
const props = defineProps({
  selected: { type: Array, default: () => [], required: false }, ////selected_items(from q-table)

  _thisModel: { type: String, default: "", required: false }, //'AssetName'_column to analysis {'assetName'}//column_name
  anualPlanQuan: { type: String, default: "", required: false }, //'AssetName'_column to analysis {'assetName'}//column_name

  columntoAnalysis: { type: String, default: "", required: false }, //'AssetName'_column to analysis {'assetName'}//column_name // the column_name used as id_ to catagorized items
  analysiserColumn: { type: String, default: "", required: false }, // 'StoreStatus'_column as analysiser {'StoreStatus'} //the actuall_value to analysis
  analysiserItemValues: { type: Array, default: () => [],  required: false }, // 'StoreStatus's posible values_ ['onStore',"taken"]

  analysiserColumnValues: { type: Array, default: () => [{}], required: false }, //posisble value of analysiser_column ...'{'storeStatus',Quantity,Cost} of given (Catagories(Onstore / taken))

  storeService: { type: Object, default: () => ({}), required: false }, //{'jan':{},'fab':{}...}
});

//--------------------------
let columnItemstoAnalysis = ref([]);
let columnItemtoAnalysis = [] //grab all list_item of top-10

//------------------performance measurements..#
let annuBuyPer = ref(0);

let anuBouPlan = ref(0);
let anuBuyPlan = ref(2000);//props.anualPlanQuan);

let plantPerformance = ref(50);
let AnnualnetPerformance = ref(0);

async function performance(planQuantity, recordedQuan) {

  anuBouPlan.value = recordedQuan
  anuBuyPlan.value = planQuantity
  AnnualnetPerformance.value = ((recordedQuan * 100) / anuBuyPlan.value).toFixed(2) 
  return ;
}

columnItemstoAnalysis = computed(() => { //START HERE
  //selected_item
  let selecteds = props.selected;
  let selectedItem = [];
  for (let item of selecteds) {
    selectedItem.push(item[props.columntoAnalysis]); //PUSH ALL SELECTED ROWS.....(IT EGNITE ALL THE TASK OR START ON BOOT)
  }
  columnItemtoAnalysis=selectedItem[0]
     annualAnalysis(props.storeService); //ORANIZE ALL AVAILABLE DATAS FROM STORE...WITH IN THIS YEAR....

  return selectedItem;
});

const nul = ref([null, undefined, false, "", [], {}, NaN, "NaN"]);

///------ _allAnualItem
const labelMonths = [
  "Jan",
  "Feb",
  "Mar",
  "Ap",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

let active_analysiserColumnValue = ref(props.analysiserColumnValues[0].value); //default

let yearData_ = ref([]);
yearData_ = computed(() => {
  annualAnalysis(props.storeService);
  return true;
});

//----------automatic fetch & analysis of current_year_all_datas

var ColumnLabel = props.analysiserColumnValues[1].value; //"tI"; //item['ColumnI'] //select the first value(onStore_values) & compute the taken
var CColumnLabel = props.analysiserColumnValues[2].value; //["measurmentTwo"]; // "tX"; //item['ColumnI'] //select the first value(onStore_values) & compute the taken
//--------------
var ColumnILabel = props.analysiserItemValues[0][0]; //"tIGs"; //Insteadof(tQs) item['ColumnI'] //select the first value(onStore_values) & compute the taken
var CColumnILabel = props.analysiserItemValues[0][1]; //InstedOf(tQCs) =>item['ColumnI'] //select the first value(onStore_values) & compute the taken

var ColumnIILabel = props.analysiserItemValues[1][0]; //"tIPr"; //Insteadof(tQt) item['ColumnII'] //select the first value(onStore_values) & compute the taken
var CColumnIILabel = props.analysiserItemValues[1][1]; //Insteadof(tQCt) =>item['ColumnII'] //select the first value(onStore_values) & compute the taken
//=================
let monthsinItems = reactive({});
let yearinmonths = reactive({});
let yearinmonth = reactive({}); //{}
let yearin = reactive({});
//--
yearin[ColumnLabel] = 0;
yearin[CColumnLabel] = 0;

async function annualAnalysis(yearData_) {
  //OnMounted....Store bring {'jan':{}}
  yearinmonth[ColumnLabel] = reactive([]); //Then organize them  {'jan':{'itemOne':{props.analysiserItemValues[0]:{'itQuantity':[],'tQC':[]}}}...}
  yearinmonth[CColumnLabel] = reactive([]);
  //console.log(yearData_,'yearData')
  var annualRecords = props.storeService;
  for (var monthIndex in annualRecords) {
    //{1:[{},{}],2:[{},{}]}  ( year's DATA) ( iterate each months)

    let arrayIndex = monthIndex - 1;
    let month = labelMonths[arrayIndex];

    monthsinItems[month] = {}; //=> item's storeStatus in months(Quant vs Cost)..

    yearinmonths[month] = reactive({}); //item in months(Quant vs Cost)..
    yearinmonth[month] = reactive({}); //=> Qunatity vs Cost per_months..
    yearinmonth[month][ColumnLabel] = 0; //=> Qunatity vs Cost per_months..
    yearinmonth[month][CColumnLabel] = 0; //=> Qunatity vs Cost per_months..

    ////console.log(annualRecords, yearinmonth, "Record Month of", month);
    for (let items in annualRecords[monthIndex]) {
      //being use variable as it's as reactive.....would bring more reactiity... ( month's DATA) ( iterate each items of the month)
      //(items/month..iterations)
      var item = annualRecords[monthIndex][items];
      var iteratItem = item[props.columntoAnalysis]; //'assetName'
            //---
      if (iteratItem != props._thisModel) {
        // continue
      }
      

      var status_ = []; // Object.keys(item[props.analysiserColumn]);

      let Column = 0; //item_total_Quantity -TQ
      let CColumn = 0; //item_total_Cost -TQC

      var StatuOne = status_[0]; //status_I
      var ColumnI = 0; //item_total_Quantity [status_I_] -TQ
      var CColumnI = 0; //item_total_Cost [status_I_] -TQC

      //---
      var StatuTwo = status_[1]; //status_II
      var ColumnII = 0; //item_total_Quantity [status_II_]-TQ
      var CColumnII = 0; //item_total_Cost [status_II_] -TQC

      if (!nul.value.includes(item[ColumnLabel])) {
        Column = Number(item[ColumnLabel]);
      }
      if (!nul.value.includes(item[CColumnLabel])) {
        CColumn = Number(item[CColumnLabel]);
      }

      if (!nul.value.includes(item[ColumnILabel])) {
        ColumnI = Number(item[ColumnILabel]);
      }
      if (!nul.value.includes(item[CColumnILabel])) {
        CColumnI = Number(item[CColumnILabel]);
      }

      if (!nul.value.includes(item[ColumnIILabel])) {
        ColumnII = Number(item[ColumnIILabel]);
      }
      if (!nul.value.includes(item[CColumnIILabel])) {
        CColumnII = Number(item[CColumnIILabel]);
      }


      var Unitcost = 0;
      Unitcost = CColumn / Column;

      if (!nul.value.includes(monthsinItems[month][iteratItem])) {
        try {
          //storeStatus is neww
          if (Object.keys(monthsinItems[month][iteratItem])) {
          } else {
          }
        } catch {
          //if no of keys

          //monthsinItems[month][iteratItem] = {};
          monthsinItems[month][iteratItem][ColumnLabel] = 0;
          monthsinItems[month][iteratItem][ColumnILabel] = 0;
          monthsinItems[month][iteratItem][ColumnIILabel] = 0;
          monthsinItems[month][iteratItem][CColumnLabel] = 0;
          monthsinItems[month][iteratItem][CColumnILabel] = 0;
          monthsinItems[month][iteratItem][CColumnIILabel] = 0;
        }
      } else {
        monthsinItems[month][iteratItem] = reactive({});
        monthsinItems[month][iteratItem][ColumnLabel] = 0;
        monthsinItems[month][iteratItem][ColumnILabel] = 0;
        monthsinItems[month][iteratItem][ColumnIILabel] = 0;
        monthsinItems[month][iteratItem][CColumnLabel] = 0;
        monthsinItems[month][iteratItem][CColumnILabel] = 0;
        monthsinItems[month][iteratItem][CColumnIILabel] = 0;

        ////console.log(monthsinItems[month][iteratItem], "existed months-1");
      }

      try {
        monthsinItems[month][iteratItem][ColumnLabel] += Number(Column); //  item's #Staus x12(cost - datasets)
      } catch {}

      try {
        monthsinItems[month][iteratItem][CColumnLabel] += Number(CColumn); //  item's #Staus x12(cost - datasets)
      } catch {}
      //-----------------------------
      try {
        monthsinItems[month][iteratItem][ColumnILabel] += Number(ColumnI);
        //  item's #status  x1(cost - datasets)
      } catch {}

      try {
        monthsinItems[month][iteratItem][CColumnILabel] += Number(CColumnI);
        //  item's #status  x1(cost - datasets)
      } catch {}

      try {
        monthsinItems[month][iteratItem][ColumnIILabel] += Number(ColumnII);
        //  item's #Staus x12(cost - datasets)
      } catch {}

      try {
        monthsinItems[month][iteratItem][CColumnIILabel] += Number(CColumnII);
        //  item's #status  x1(cost - datasets)
      } catch {}

      //console.log(monthsinItems, "Months In Items...");
      // }

      try {
        //create the nested Object if it doesn't exited ( items/months,) or leave it..

        yearinmonths[month][iteratItem];

        if (!nul.value.includes(yearinmonths[month][iteratItem][ColumnLabel])) {
        } else {
          //yearinmonths[month][iteratItem] = reactive({})
          yearinmonths[month][iteratItem][ColumnLabel] = 0;
          yearinmonths[month][iteratItem][CColumnLabel] = 0;
        }
      } catch {
        //if List/Object doesn't exists redefine/Initialize it....

        yearinmonths[month][iteratItem] = reactive({});
        yearinmonths[month][iteratItem][ColumnLabel] = 0;
        yearinmonths[month][iteratItem][CColumnLabel] = 0;
      }
      try {
        yearinmonths[month][iteratItem][ColumnLabel] += Number(Column); // 1x12 (datasets)
      } catch {}
      try {
        yearinmonths[month][iteratItem][CColumnLabel] += Number(CColumn); // 1x12 datasets
      } catch {}

      yearinmonth[month][ColumnLabel] += Number(Column); //total_Quantity/months of year
      yearinmonth[month][CColumnLabel] += Number(CColumn); //total_CColumn/months of year

      yearin[ColumnLabel] += Number(Column); //total_Quantity/year
      yearin[CColumnLabel] += Number(CColumn); //total_Cost/year
    }

    //Every_months...

    yearinmonth[ColumnLabel].push(yearinmonth[month][ColumnLabel]); //total_items Quantity per every months of any type
    yearinmonth[CColumnLabel].push(yearinmonth[month][CColumnLabel]); //total_items Cost per every months of any type
    
  }

  var nowMonths = new Date().getMonth();
  if(!nul.value.includes(yearinmonth[labelMonths[nowMonths]])){

    await performance(1200,yearinmonth[labelMonths[nowMonths]][ColumnLabel]);

  }

 //console.log(monthsinItems,"monthsinItemssss"    );

  return yearin;
}

//-----------------------------years_data_fetche&analyssis -----------------------END


//items_based_data analysiser
//( after the data has been organized and stored into reactive_vars on selecting(columns))
//it would build the bar and line graphf.........
//BAR-DATASET-------

const BarData = computed(() => {
  let ActvanalysiserColumnLabel = active_analysiserColumnValue.value; //watch...for labelMeasure [changing..]
  let ActvanalysiserColumnLabels = [];
  let datasets_ = [];

  //storeFlags
  let OneNetC = {};
  OneNetC[ColumnLabel] = []; // { ColumnLabel: [], CColumnLabel: [] };
  OneNetC[CColumnLabel] = []; // { ColumnLabel: [], CColumnLabel: [] };

  let TwoNetC = {};
  TwoNetC[ColumnLabel] = []; // { ColumnLabel: [], CColumnLabel: [] };
  TwoNetC[CColumnLabel] = []; // { ColumnLabel: [], CColumnLabel: [] };

  //let issueds ={'tQ':[],'tQC':[]};

  let NetC = {}; //{ ColumnLabel: [] };
  NetC[ColumnLabel] = []; // { ColumnLabel: [] };
  let NetCC = {}; //{ CColumnLabel: [] };
  NetCC[CColumnLabel] = []; // { CColumnLabel: [] };

  //------------------------------------------------------------------
  var selectedItem = columnItemtoAnalysis; //selected item to view

  var BarDataSet = [];

  for (let iteratItem in monthsinItems) {
    //iterate...12 months of multiple_items of every months :[0:{'item1':{'issued':[1,2]}},1:{'item1':{'issued':[1,2]}}]

    //let month=iteratItem
    let Column = 0;
    let CColumn = 0;

    let ColumnI = 0;
    let CColumnI = 0;

    let ColumnII = 0;
    let CColumnII = 0;

    let MainCatValue = monthsinItems[iteratItem][selectedItem];

    try {
      Column = Number(MainCatValue[ColumnLabel]);
      CColumn = Number(MainCatValue[CColumnLabel]);
    } catch {}

    try {
      ColumnI = Number(MainCatValue[ColumnILabel]);
      CColumnI = Number(MainCatValue[CColumnILabel]);
    } catch {}

    try {
      ColumnII = Number(MainCatValue[ColumnIILabel]);
      CColumnII = Number(MainCatValue[CColumnIILabel]);
    } catch {}

    //Items_status_total_Quantity&Cost
    OneNetC[ColumnLabel].push(ColumnI); //MainCatValue#/item
    OneNetC[CColumnLabel].push(CColumnI);

    TwoNetC[ColumnLabel].push(ColumnII); //taken#/item
    TwoNetC[CColumnLabel].push(CColumnII);

    ///console.log(TwoNetC, OneNetC, MainCatValue, "dddddddddddddddd");
    //items_total_Quantity(issued+onStore+taken #) /item

    NetC[ColumnLabel].push(Column);

    //items_total_Cost
    NetCC[CColumnLabel].push(CColumn);

    
  }
  //theItem-selected of monthItem_values ( reorganized as tQ/tQC of status_I-II and total_tQ & tQC)
  //LineDataset['tQ'] = LineDataset['tQ']  + monthsinItems[iteratItem][everyitem]['tQ']
  var dataExtractor = [];

  if (ActvanalysiserColumnLabel === props.analysiserColumnValues[0].value) { //show boh status
    ActvanalysiserColumnLabels = props.analysiserItemValues; //["Onstore", "taken"];
    dataExtractor = props.analysiserItemValues; //["Onstore", "taken"];
    BarDataSet = [OneNetC, TwoNetC];
  } else if ( //show total quantity of given item
    ActvanalysiserColumnLabel === props.analysiserColumnValues[1].value
  ) {
    ActvanalysiserColumnLabels = props.analysiserColumnValues[1].value;
    dataExtractor = ["NetC"];

    BarDataSet = [NetC];
  } else { //show total cost of given item
    ActvanalysiserColumnLabels = props.analysiserColumnValues[2].value;
    dataExtractor = ["NetCC"];
    BarDataSet = [NetCC];
  }

  let colorPlates = [
    ["red", "orange"],
    ["blue ", "green"],
    ["violet", "indigo"],
    ["black", "Cyan"],
    "Yellow ",
  ]; //["#EF5350","#8BC34A","#69F0AE","#FFC107","#FFD600","#4E342E","#F44336","#E91E63","#9C27B0","#F50057"];
  //var colors = ["#EF5350","#8BC34A","#69F0AE","#FFC107","#FFD600","#4E342E","#F44336","#E91E63","#9C27B0","#F50057"];

  let setCounter = 0;
  for (let index in BarDataSet) {
    let labelName = nul.value.includes(ActvanalysiserColumnLabels[setCounter])
      ? setCounter
      : ActvanalysiserColumnLabels[setCounter];

    if (!nul.value.includes(BarDataSet[index][ColumnLabel])) {
      datasets_.push({
        label: labelName + "(Quat.)", //"A",
        data: BarDataSet[index][ColumnLabel],
        borderColor: colorPlates[setCounter][0],
        backgroundColor: colorPlates[setCounter][0],
        borderWidth: 0,
        borderRadius: 0.5,
        borderSkipped: true,
        pointBackgroundColor: colorPlates[setCounter][0],
        borderWidth: 1,
        pointBorderColor: colorPlates[setCounter][0],
       // stack: "Stack " + String(index),
      });
    }
    if (!nul.value.includes(BarDataSet[index][CColumnLabel])) {
      datasets_.push({
        label: labelName + "(Cos.)", //"A",
        data: BarDataSet[index][CColumnLabel],
        borderColor: colorPlates[setCounter][1],
        backgroundColor: colorPlates[setCounter][1],
        borderWidth: 0,
        borderRadius: 0.5,
        borderSkipped: true,
        pointBackgroundColor: colorPlates[setCounter][1],
        borderWidth: 1,
        pointBorderColor: colorPlates[setCounter][1],
       // stack: "Stack " + String(index+1),
      });
    }

    setCounter += 1;
  }

 //console.log(datasets_, "LineDataset of Bar");

  return { labels: labelMonths, datasets: datasets_ };
});

const MultiLineData = computed(() => {
  let ActvanalysiserColumnLabel = active_analysiserColumnValue.value; //watch...for labelMeasure [changing..]
  let ActvanalysiserColumnLabels = [];
  let datasets_ = [];

  //storeFlags
  let OneNetC = {};
  OneNetC[ColumnLabel] = []; // { ColumnLabel: [], CColumnLabel: [] };
  OneNetC[CColumnLabel] = []; // { ColumnLabel: [], CColumnLabel: [] };

  let TwoNetC = {};
  TwoNetC[ColumnLabel] = []; // { ColumnLabel: [], CColumnLabel: [] };
  TwoNetC[CColumnLabel] = []; // { ColumnLabel: [], CColumnLabel: [] };

  //let issueds ={'tQ':[],'tQC':[]};

  let NetC = {}; //{ ColumnLabel: [] };
  NetC[ColumnLabel] = []; // { ColumnLabel: [] };
  let NetCC = {}; //{ CColumnLabel: [] };
  NetCC[CColumnLabel] = []; // { CColumnLabel: [] };

  //------------------------------------------------------------------
  var selectedItem = columnItemtoAnalysis; //selected item to view

  var BarDataSet = [];

  for (let iteratItem in monthsinItems) {
    //iterate...12 months of multiple_items of every months :[0:{'item1':{'issued':[1,2]}},1:{'item1':{'issued':[1,2]}}]

    //let month=iteratItem
    let Column = 0;
    let CColumn = 0;

    let ColumnI = 0;
    let CColumnI = 0;

    let ColumnII = 0;
    let CColumnII = 0;

    for (let iteratItemm in monthsinItems[iteratItem]) {
      let MainCatValue = monthsinItems[iteratItem][iteratItemm]; //[selectedItem];

      try {
        Column += Number(MainCatValue[ColumnLabel]);
        CColumn += Number(MainCatValue[CColumnLabel]);
      } catch {}

      try {
        ColumnI += Number(MainCatValue[ColumnILabel]);
        CColumnI += Number(MainCatValue[CColumnILabel]);
      } catch {}

      try {
        ColumnII += Number(MainCatValue[ColumnIILabel]);
        CColumnII += Number(MainCatValue[CColumnIILabel]);
      } catch {}
    }

    //Items_status_total_Quantity&Cost
    OneNetC[ColumnLabel].push(ColumnI); //MainCatValue#/item
    OneNetC[CColumnLabel].push(CColumnI);

    TwoNetC[ColumnLabel].push(ColumnII); //taken#/item
    TwoNetC[CColumnLabel].push(CColumnII);

    //console.log(TwoNetC, OneNetC, MainCatValue, "dddddddddddddddd");
    //items_total_Quantity(issued+onStore+taken #) /item

    NetC[ColumnLabel].push(Column);

    //items_total_Cost
    NetCC[CColumnLabel].push(CColumn);
  }

  //LineDataset['tQ'] = LineDataset['tQ']  + monthsinItems[iteratItem][everyitem]['tQ']
  var dataExtractor = [];

  ActvanalysiserColumnLabels = props.analysiserItemValues; //["Onstore", "taken"];
  dataExtractor = props.analysiserItemValues; //["Onstore", "taken"];
  BarDataSet = [OneNetC, TwoNetC, NetC, NetCC];
  //BarDataSet = [NetC];
  //BarDataSet = [NetCC];

  let colorPlates = [
    ["red", "orange"],
    ["blue ", "green"],
    ["violet", "indigo"],
    ["black", "Cyan"],
    "Yellow ",
  ];

   //["#EF5350","#8BC34A","#69F0AE","#FFC107","#FFD600","#4E342E","#F44336","#E91E63","#9C27B0","#F50057"];
  //var colors = ["#EF5350","#8BC34A","#69F0AE","#FFC107","#FFD600","#4E342E","#F44336","#E91E63","#9C27B0","#F50057"];

  let setCounter = 0;
  for (let index in BarDataSet) {
    let labelName = nul.value.includes(ActvanalysiserColumnLabels[setCounter])
      ? setCounter
      : ActvanalysiserColumnLabels[setCounter];

    if (!nul.value.includes(BarDataSet[index][ColumnLabel])) {
      datasets_.push({
        label: labelName + "(inc)", //"A",
        data: BarDataSet[index][ColumnLabel],
        borderColor: colorPlates[setCounter][0],
        backgroundColor: colorPlates[setCounter][0],
        borderWidth: 0,
        borderRadius: 0.5,
        borderSkipped: true,
        pointBackgroundColor: colorPlates[setCounter][0],
        borderWidth: 1,
        pointBorderColor: colorPlates[setCounter][0],
        stack: "Stack " + String(index),
      });
    }

    if (!nul.value.includes(BarDataSet[index][CColumnLabel])) {
      datasets_.push({
        label: labelName + "(exp)", //"A",
        data: BarDataSet[index][CColumnLabel],
        borderColor: colorPlates[setCounter][1],
        backgroundColor: colorPlates[setCounter][1],
        borderWidth: 0,
        borderRadius: 0.5,
        borderSkipped: true,
        pointBackgroundColor: colorPlates[setCounter][1],
        borderWidth: 1,
        pointBorderColor: colorPlates[setCounter][1],
        stack: "Stack " + String(index+1),
      });
    }

    setCounter += 1;
  }
 //console.log(datasets_, "LineDataset of Bar");

  return { labels: labelMonths, datasets: datasets_ };
});

//LINE-DATASET-------
const LineData = computed(() => {
  var NetC = ref([]);
  var NetCC = ref([]);

  try {
    NetC.value = yearinmonth[ColumnLabel]; //extract the years in list of months (ItemQ)
  } catch {}

  try {
    NetCC.value = yearinmonth[CColumnLabel]; ////extract the years in list of months (total cost)
  } catch {}

  var lineDsets = [
    {
      label: ColumnLabel,
      data: NetC.value,
      borderColor: "red",
      yAxisID: "y",
      //fill: true,
    },
    {
      label: CColumnLabel,
      data: NetCC.value,
      borderColor: "blue",
      yAxisID: "y",
      //fill: true,
    },
  ];

  return { labels: labelMonths, datasets: lineDsets };
});

//-----------------CHART---DATA OPtions
const BarOption = {
  animation: {
    onComplete: () => {
      delayed = true;
    },
    delay: (context) => {
      let delay = 0;
      if (context.type === "data" && context.mode === "default" && !delayed) {
        delay = context.dataIndex * 300 + context.datasetIndex * 100;
      }
      return delay;
    },
  },
  plugins: {
    title: {
      display: true,
      text:
        props._thisModel.toLocaleUpperCase() +
        " - Items " +
        props.analysiserColumn +
        " Analysis",
    },
    tooltip: {
      enabled: false,
      position: "nearest",
    },
    legend: {
      position: "top",
      fontColor: 'white',
      labels: {
        usePointStyle: true,
      },
    },
  },
  responsive: true,
  interaction: {
    intersect: false,
  },
  scales: {
    x: {
      stacked: true,
      ticks: {
        // For a category axis, the val is the index so the lookup via getLabelForValue is needed
        callback: function (val, index) {
          // Hide every 2nd tick label
          return index % 2 === 0 ? this.getLabelForValue(val) : "";
        },
        color: "blue",
        size:"20px"
        
      },
    },
    y: {
      stacked: true,
      ticks: {
        // For a category axis, the val is the index so the lookup via getLabelForValue is needed
        callback: function (val, index) {
          // Hide every 2nd tick label
          return index % 2 === 0 ? this.getLabelForValue(val) : "";
        },
        color: "blue",
      },
    },
  },
};

let delayed = true;

const LineOption = {
  animation: {
    onComplete: () => {
      delayed = true;
    },
    delay: (context) => {
      let delay = 0;
      if (context.type === "data" && context.mode === "default" && !delayed) {
        delay = context.dataIndex * 300 + context.datasetIndex * 100;
      }
      return delay;
    },
  },
  plugins: {
    title: {
      display: true,
      text:
        ColumnLabel +
        " vs " +
        CColumnLabel +
        "Anaual Analsis (" +
        props._thisModel +
        ")",
    },
  },

  interaction: {
    intersect: true,
  },
  scales: {
    x: {
      display: true,
      ticks: {
        // For a category axis, the val is the index so the lookup via getLabelForValue is needed
        callback: function (val, index) {
          // Hide every 2nd tick label
          return index % 1 === 0 ? this.getLabelForValue(val) : "";
        },
        color: "primary",
      },
      
      title: {
        display: true,
        text: props._thisModel.toUpperCase() + " Annual  Analysis",
        color: "black",
        font: {
          family: "Comic Sans MS",
          size: 10,
          weight: "bold",
          lineHeight: 1.2,
        },
        padding: { top: 0, left: 0, right: 0, bottom: 0 },
      },
    },
    y: {
      stacked: true,
    },
  },
};

//----------------
</script>
