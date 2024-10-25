<template>

<div class="row justify-between items-center  q-gutter-md" v-if="Object.keys((_thisReturn) ?? {}).length">
  <form class="q-gutter-md q-pa-none column  q-ma-none" @submit.prevent="logUser()" id="loginForm">

        
                  <div style="backdrop-filter:blur(15px);width:80%" class="text-weight-bold text-red" v-show="_debugObj['keyID'] ?? false"> {{ _debugObj['keyID'] }}</div>
                  &nbsp;
                  &nbsp;
                   <input
                                style="width:13vw;height:3vh;border:1px solid green;"
                                class="col-1 shadow-20  boxbstyle q-pa-sm q-ma-none"
                                autocomplete="off"
                                v-model="_thisReturn.keyID"
                                label="KeyID"
                                :type="_thisReturn.clearText ?  'text' : 'password'"
                                
                                @keyup.enter="logUser();$event.target.blur();"
                                @input="_validateThis('keyID')"

                                color="lime-11" bg-color="green"
                          
                              />
                              &nbsp;
                              &nbsp;

          
    </form>

</div>
</template>

<script setup>
  {/* import { defineEmits } from 'vue'; */}
import { defineEmits,ref, reactive, onMounted, defineAsyncComponent, computed } from "vue";
import {profileSchema} from "../../composables/schemas/profileSchemas"

  const props = defineProps({
    _this: { type: Object, default: () => ({}) },
    //--------------confirm button
    title: {
      type: String,
      required: true
    },
  });

  let _thisReturn =ref(props._this)
  const emit = defineEmits(['login']);
  
  function logUser() {
    let _isCompleted = (Object.values(_debugObj.value)).every(value  => value == null)
    if(_isCompleted){return emit('login', _thisReturn)}
    else{return false}
  }


// Define reactive state
let _debugObj =ref({})
let _debugMessages =ref(['Filling Required','Invalid Data','Invalid Length'])

async function  _validateThis(field){
  _debugObj.value[field] =null
  let value = _thisReturn.value[field]
  let _fieldRule= profileSchema[field]['rule']
  //------------------
  for(let ruleIndex in _fieldRule){
    let _check = await _isThisRule210(_fieldRule[ruleIndex],value,ruleIndex)
    if(!_check){
      _debugObj.value[field] = _debugMessages.value[ruleIndex]
      break}
  }
  return true
}


//-----------------
let numbericInteger = /^\d+?$/
let numbericFloat = /^-?\d*(\.?\d+)?$/
let numericString = /^-?\d*(\.\d+)?$/
let alphanumericString = /^[a-z0-9]+$/
let alphaString = /^[a-z]+$/
const _isThisRule210 =async (_is,_this,ruleIndex)=>{
  if(ruleIndex == 2){ // is length good 
    return _this.length > _is
  }
  else if( ruleIndex ==1){ // is character familly good
    if(_is == 'numeric'){return !isNaN(_this)    }
    else if(_is == 'stringNumeric'){return numbericInteger.test(_this)}
    else if(_is == 'stringAlphaNumeric'){return alphanumericString.test(_this)}
    else if(_is == 'stringAlpha'){return alphaString.test(_this)}
    else{return false}
       } 
  else{ return _this.length != _is} //is null
}


const _checkThis =(_this)=>{
  if(Array.isArray(_this)){
    return 'array'
  }
  if(typeof _this ==='object' ){

  return 'object'
  }
  if(typeof _this ==='number' && !isNaN(_this)){
    return 'number'
  }
  if(typeof _this ==='string' && !isNaN(_this)){
    return 'string'
  }
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