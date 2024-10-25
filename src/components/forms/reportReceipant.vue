<template>
     <q-separator :class="nulQuickSearch ? 'bg-red q-my-sm' : 'bg-green q-my-sm'" />
<div>
    <div class="q-pa-sm rounded-borders" :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-2'" style="min-width:15vw;"
              > 
              
      <q-input  v-model="searchWord" debounce="1000"  filled placeholder="search receipant by ?"
           stack-label  :dense="true"  >

         <template v-slot:append>
             <q-icon name="search" />
         </template>

          </q-input>
                <q-option-group  name="accepted_genres"
                  v-model="searchKey" :options="searchBy"
                  type="checkbox" color="primary"
                  inline :dense="true"
                  size="xs"  class=""
                />
              </div>
              <div class="q-gutter-sm row q-pa-xs">
               
                <q-separator dark vertical inset></q-separator>
               
                <q-btn
                  @click="this_reportQuery('/profileapi/profile', 'employee', {})"
                  label=""
                  no-caps
                  :dense="true"
                  class="text-green text-weight-bold"
                  size="md"
                >
                  Employee</q-btn
                >
                <q-btn
                  @click="this_reportQuery('/sale/cust', 'customer', {})"
                  label=""
                  no-caps
                  :dense="true"
                  class="text-green text-weight-bold"
                  size="md"
                >
                  Customer</q-btn
                >
                <q-btn
                  @click="this_reportQuery('/procurment/supplier', 'supplier', {})"
                  label=""
                  no-caps
                  :dense="true"
                  class="text-green text-weight-bold"
                  size="md"
                >
                  Supplier</q-btn
                >
              </div>
            </div>

</template>

<script setup>
  {/* import { defineEmits } from 'vue'; */}
import { defineEmits,ref, reactive, onMounted, defineAsyncComponent, computed } from "vue";
// import {profileSchema} from "../../composables/schemas/profileSchemas"
import { thisStore } from "src/stores/dataStores/thisStore"; //Asset Store ( Main Store)
const _thisService = thisStore();

import {_startofthisYear,_endofthisYear,
  _startofthisMonth,_endofthisMonth } from "src/composables/utils/dateformats"

const props = defineProps({
  _this: { type: Object, default: () => ({}) },
  //--------------confirm button
  title: {
    type: String,
    required: true
  },
});

let _thisReturn =ref({})
const emit = defineEmits(['result']);

//--------------------
let searchProfile = ref({});
let searchProfileKey = ref([]);

let fetchService = reactive({});
let searchDate = ref("");

//-------
// var _thisReturn = ref({});
var nulQuickSearch = ref(false);
var latSearchDepth = ref(100);

let searchWord = ref("");
let searchKey = ref([]);
let searchBy = ref([{ label: "Name", value: "Name" }, { label: "ID", value: "ID" }]);

var reportModals = {
    asset: { Name: "assetName", ID: "assetID" },
    employee: { Name: "name", ID: "companyID" },
    customer: { Name: "customerName", ID: "customerID" },
    supplier: { Name: "supplierName", ID: "supplierID" },
  };

  async function this_reportQuery(_thisapiUrl = "", modelName = "", paramObj = {}){

  nulQuickSearch.value = "...searching";

  _thisReturn.value = {};

  let profilName = reportModals[modelName];
  // searchProfileKey.value = Object.values(profilName); //extract the 'Assets' object... as list of values as ['assetName','assetID']
  // let seaKey = searchWord.value;

  //Creating Params
  if (searchKey.value.length && searchWord.value.length) {
    fetchService = {};
    for (let item in searchKey.value) {
      let skey = searchKey.value[item];
      let kkey = profilName[skey];
      fetchService[kkey] = searchWord.value;
    }
  } else {nulQuickSearch.value = "please select search key..";return null;
  }

  if(Object.keys(fetchService).length == 0){return null}
  //Adding Additional Filtering Params
  fetchService["updatedAt"] = {$gte: _startofthisYear,$lt: searchDate.value};
  fetchService["returnWat"] = {};
  //-------- Feaching Datas
  let details = await Fetch_this(_thisapiUrl,fetchService)
  if(details && details.length){
          _thisReturn.value['Name'] =  details[0][profilName['Name']];       
          _thisReturn.value['ID'] = details[0][profilName['ID']];       
          _thisReturn.value['modelName'] = modelName;
          nulQuickSearch.value = null
          return emit('result', _thisReturn.value)
    }else{
      nulQuickSearch.value = "No Data";return null;
    }
}

const Fetch_this=async (_thisapiUrl,objParam)=>{
  //-------Check for Param_Requirents 
  try {
    if (Object.keys(objParam).length ==0) {return false; }
    //-----------Calling for Store Services
    return await _thisService.readFData(_thisapiUrl,objParam).then((response) => {
      if (response.status) {
          return response.data;  
        } else {
          return false;
        }
      })
      .catch((error) => {return false;});
    } catch {return false; }
}
  </script>


<style>

.btn {
  padding: 0px 0px;
  font-size: 16px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

.btn-dense {
  padding: 10px 10px;
  font-size: 16px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

/* Primary Styling */
.btn-primary {
  background-color: #007bff;
  color: white;
}

.btn-primary:hover {
  background-color: #0056b3;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}


/* Secondary Styles */
.btn-secondary {
  background-color: #6c757d;
  color: white;
}

.btn-secondary:hover {
  background-color: #5a6268;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

/* thri Style */
.btn-outline {
  background-color: transparent;
  color: #007bff;
  border: 2px solid #007bff;
}

.btn-outline:hover {
  background-color: #007bff;
  color: white;
}

/* general Style */
.btn-rounded {
  background-color: #28a745;
  color: white;
  border-radius: 50px;
}

.btn-rounded:hover {
  background-color: #218838;
}

.btn-icon {
  display: flex;
  align-items: center;
  gap: 10px;
  background-color: #17a2b8;
  color: white;
}

.btn-icon:hover {
  background-color: #138496;
}


</style>