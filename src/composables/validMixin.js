import { ref,reactive,computed,watch,onUnmounted,onMounted } from "vue";

  // Define your mixin-like functionality
   const useValidMixin = () => {
    // Define reactive state
    let numbericInteger = /^\d+?$/
    let numbericFloat = /^-?\d*(\.?\d+)?$/
    let numericString = /^-?\d*(\.\d+)?$/
    let alphanumericString = /^[a-z0-9]+$/

    let _debugObj =ref({})

    const _checkThis =(value)=>{
      if(Array.isArray(value)){
        return 'array'
      }
      if(typeof value ==='number' && !isNaN(value)){
        return 'number'
      }
      if(typeof value ==='string' ){

        return 'number'
      }
      if(typeof value ==='number' && !isNaN(value)){
        return 'number'
      }
    }
    
    const _valiateThis = (key,value)=>{
      let _message =null
      // let valueis = _checkThis(value)
      if(key == 'username'){ 
        _message = value ? _message : `${key} Required`
        _message = _message ? _message : (alphanumericString.test(value) ? _message : 'alphaNumeric Only.')  
      }
      else if (key == 'phone'){}
      else if (key == 'name'){}
      else if (key == 'firstName'){}
      else if (key == 'lastName'){}
      else if (key == 'quantity'){
        _message = value ? _message : `${key} Required`
        _message = _message ? _message : (alphanumericString.test(value) ? _message : 'Number Only.')  
      }
      else if (key == 'price'){
        _message = value ? _message : `${key} Required`
        _message = _message ? _message : (alphanumericString.test(value) ? _message : 'Number Only.')  
      }

      _debugObj[key]=_message 
      return false
    }

    return {
      _debugObj,


      _valiateThis

    };
  };

  export default useValidMixin;