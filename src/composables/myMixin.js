import { ref,reactive,computed,watch,onUnmounted,onMounted } from "vue";
import {schemaSklt} from "src/composables/schemaSklts";
// import { saleitSchema } from "src/composables/schemas/saleitSchemas";
// import {useQuasar, useMeta } from "quasar";
  
  // const $q = useQuasar();

  // Define your mixin-like functionality
   const useDefaulMixin = () => {
    // Define reactive state
    let count = ref(0);
    let Objprops_=ref('')
    let _thisModel=ref('')
    let _this_Schema =ref('')
    //---------
    let _iss=ref('')
    //-----
    let _allColumnNames = ref([]); //Actual OuterMost Table_Column_Names [Top(Layer_1] _Columns _Name_List]
    let _rolesColumns = ref([]); //Filtered/Authorized_Table_Columns ++Descriptions for Editing/Adding.... but not Viewing
    let lockedColumns = ref([ "userID","userName",'time','action']); //are blacklist of _this_clientColumns tobe not shown during the Registerations..form submitting
    let visibleColumns = ref([]); //column invisiblity on table_
    let invisibleColumns=ref('')

  
    //----foreignDefaulting and columns
    // _this_Schema.value=saleitSchema
    
    // let lockedColumns = ref([ "userID","userName"]); //are blacklist of columns tobe not shown during the Registerations..form submitting
    let visible_clientColumns =ref([])
    // Define methods


    //---------modalColumns ( columns require syncing_of liveData)
    let _thisModels = ref([]) //
    // var _this_acctype =ref({})
 
    // async function _set
    const _allColumnName = async (schemaColumn) => _allColumnNames.value.push(schemaColumn); //Holding topLayer Name of Columns
    const _rolesColumn = async (_col) =>  _rolesColumns.value.push(_col);  //( Object List of author__this_clientColumns Details)
    const visibleColumn = async (visibleCols) =>  visibleColumns.value = visibleCols; //.slice[0,_allColumnNames.value.length]
    //------------------------------------------
    async function _this_Defaulting(_this_clientModels) {
      if (!_rolesColumns.value.length) {
        // _thisDefault_client.value={};      
        return {};
      }  

      console.log(_this_clientModels,'modelColumns_0000000000000')
      
      return await schemaSklt(_rolesColumns.value).then(async (_this_Sckelton)=>{
        // _thisDefault_client.value= await _modal_Defaulting(_this_Sckelton);
        for (let kkey of _this_clientModels) { //modify column's updateable data
          _this_Sckelton[kkey] = Objprops_.value._profile[kkey] ?? ''
          }
        return _this_Sckelton;
      }).catch((error)=>{
        // _thisDefault_client.value={};
        return {} })
    }
  
    //---------------------
    let foreign_Columns =async (_schema,invisibleColumns=[]) =>{
        let _tableColumn = []; //HOLDING_  all the ---"Columns"--- of the Data_model ( TOTAL Columns)
        let _visibleColsName = [];  ////--HOLDING_ all the ---"Visible" Columns"---- of the Data_model ( TOTAL Columns)
        console.log(_schema,'schemmmmmmmmmmmmmmmmmmmmmmmmmmmaaa')
        for (let schemaColumn in _schema) {
          //----------------loging all _this_clientColumns_ as table _this_clientColumns_format
          let _col = { name: schemaColumn,schema: _schema[schemaColumn], }; //the q-table format of Column Definitions... && Hold Every Columns
          _tableColumn.push(_col); 
          //----------------loging all _this_clientColumns name as normal list format
          // await _allColumnName(schemaColumn); 
          //---------------loging Visible Columns list(on table)
          invisibleColumns.includes(schemaColumn) ? "" : _visibleColsName.push(schemaColumn);
          //----
          //----------------loging Role Based  && whitelisted Columns-Start
          //------------------------roleBase Columns-End
        }
        // let _models = await _this_foreignDefaulting(_visibleColsName)
        return [_tableColumn,_visibleColsName]
    }

   async function _this_foreignDefaulting(_thisModels) { //should excute once on boot or on changing location(geolocation)
    //------------------------Useable Values
      let _thisDefault={}
      for (let kkey of _thisModels) { //modify column's updateable data
        _thisDefault[kkey] = Objprops_.value._profile[kkey] ?? ''
      }
      return _thisDefault
    }

    // Return data and methods
    return {
      count,
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
      //-------
      _thisModels,
      // modal_iss,
      //--------
      //------preparing the main default and table_design
      _this_Defaulting,

      //------preparing the foreign default and table_design
      foreign_Columns,
      _this_foreignDefaulting,

      //-----
      visible_clientColumns,
    };
  };

  export default useDefaulMixin;