
import { ref } from "vue";

const useAssetFilter = () =>{

    let _enableRowFilter=ref(true)
    //------------Setting up all the search attributes
    console.log(_enableRowFilter.value)

    //-------------the search Engine..
    function _thisFiltering(rows, terms) {

      if(_enableRowFilter.value){
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
        //-----------Filter Schema Gather toggle conditions (Store Status)
        let _cat = row.plantgoods ?? false
        if(_cat == "Acetylene" ){ _group0 = terms.c2h2 }
        else if(_cat == "Oxygen"){ _group0 = terms.o2 }
        else if(_cat == "Co2"){ _group0 = terms.c02 }
        else if(_cat == "reuseable"){ _group0 = terms.useable }
        else if(_cat == "Facilities"){ _group0 = terms.facility }
        else{_group0=true}
        //-----------Filter Schema (Stor Status)-----
        let Issued = false;
        let stored = false;
        let taken = false;
        if (row.storeStatus ?? false) {
          Issued = row.storeStatus["status"] ? false: true
          //--------
          stored = row.storeStatus["Onstore"] && !Issued ? true : false;
          taken = row.storeStatus["taken"]  ? true : false
        } //is sold(onStore zero) ? no or yes
    
        _group2 = terms.Issued && Issued ? true : _group2;
        _group2 = terms.Stored && stored ? true : _group2;
        _group2 = terms.Sold && taken ? true : _group2;


        let Payed = false;
        let Credit = false;
        if ((row.storeStatus ?? false) && taken) {
          Payed = row.tQCtp ? true : false;
          Credit =  row.tQCtr  ? true : false;
        } //is sold(onStore zero) ? no or yes
   
        _group3 = (terms.Payed && Payed) ? true : _group3 ;
        _group3 = (terms.Credit && Credit) ? true : _group3 ;
        _group3 = (terms.all) ? true : _group3 ;
    
        //------Days Filter
        let _dayfilter = false;
        let filterDays = terms.filterDays ?? false
        if (row.updatedAt && filterDays) {
          let updatedAt = row.updatedAt.split("/")

          let itemMonth = Number(updatedAt[0])
          let itemDay = Number(updatedAt[1])

          if(itemMonth >= (new Date().getMonth())+1){
          if(itemDay >= (new Date().getDate() - filterDays.max)){
            _dayfilter =true
            } 
          else  if(filterDays.max == 2 || filterDays.max == 8){
            _dayfilter=true
            }
          }     
        }else{_dayfilter = true} 
          //--------------- filtering tech
          console.log(_group00,_group0, _group2, _group3)

        if(_group00 && (_group0 && _group2 && _group3 && _dayfilter)){
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