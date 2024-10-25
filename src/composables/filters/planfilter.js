
import { ref } from "vue";

const useAssetFilter = () =>{

    let _enableRowFilter=ref(true)
    //------------Setting up all the search attributes

    //-------------the search Engine..
    function _thisFiltering(rows, terms) {

      if(_enableRowFilter.value || !(terms ?? false)){
        return rows
      }// rows contain the entire data
      //============Search Service_ONE(serach Box)
      //------Serialize search input_Value && iterate each row_against it.
      
      const filteredRows = rows.filter((row, i) => {
    
        let _group00 = true;
        let _group0 = false;
        let _group2 = false;
        let _group3 = false;
  
          //------Filter Scheme -Search Box-----------Search field specific matching
          let lowerSearch = terms.search ? terms.search.toLowerCase() : ""; //holding search bar...value
          if (lowerSearch != "") {
            _group00 = false;
            let s1_values = Object.values(row);//row_all_values
    
            let s1_lower = s1_values.map((x) => {//iterate row_Values &&serialize each
              try {return x.toString().toLowerCase();
                } catch {return " ";  }
            });
    
            for (let val = 0; val < s1_lower.length; val++) { //matching row_values agains serch_term
              if (s1_lower[val].includes(lowerSearch)) {
                _group00 = true;
                break;
              }
            }
          }

        //-----------Filter Schema Gather toggle conditions (Store Status)
        _group0 = terms.approved && row.gmStatus == "Vr" ? true : _group0; //holding toggle_quicx search
        _group0 = terms.issued && row.gmStatus == "" ? true : _group0;
    
          //--------------- filtering tech
        if(_group00 || _group0 ){
            return true
          }
          //--------------------
          return false
      });
    return filteredRows;
    }

    return {
        _enableRowFilter,
        _thisFiltering,
    }




}


export { useAssetFilter }