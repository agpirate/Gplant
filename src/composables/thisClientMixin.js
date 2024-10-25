import { ref,reactive,computed,watch,onUnmounted,onMounted } from "vue";
import { saleitClientSchema } from "src/composables/schemas/saleitSchemas";


  // Define your mixin-like functionality
   const useClientMixin = () => {
    let _this_clientSchema=ref(saleitClientSchema)
 
    let _clientQuery =ref({})
    // Define reactive state
    let _this_clientColumns = ref([]);
    let visibleColumns_client = ref([]);
    let invisibleColumns_client =ref(['geolocation','userID','phoneCode','saleitID'])

    let _this_clientRows = ref([]); //Data's projected with the Columns variable [ calling function.....Crud_this.readDatas(top_100)]
    let _thisDefault_client=ref({})
    let _this_clientforeign = ref({}); //the selected row_actual_Data..as object
    let _is_clientOwner=ref(false)


    return {
      _this_clientSchema,

      _clientQuery,
      
      _this_clientColumns,
      visibleColumns_client,
      invisibleColumns_client,

      _this_clientRows,
      _thisDefault_client,
      _this_clientforeign,
      _is_clientOwner
    };
  };

  export default useClientMixin;