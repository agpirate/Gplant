async function qschemaDataSkelton(schemaData) {
  //onplayRowItem Scheleton of Data...Imaging acording the authorized_columns schema
  let onplayRowItem = {};

  let topcolumnName; //require with qtable_schema..
  let columnValue;

  let columns = schemaData; //iterating with values...at first & require temptopcolumnName
  for (let column of columns) {
    //Iterating Over List of Columns Details_Object

    if (typeof column.name === "string") {
      topcolumnName = column["name"];
    } //----------rechecking...if it has proper name
    else {
      return null;
    } //Handling Error....it would return loop_wise returns ( returns/loop)

    let tempCols = column["schema"]; //columns[topcolumnName]
    if ("type" in tempCols) {
      //----------- Column is Single_valued.....

      onplayRowItem[topcolumnName] = ""; //Registering column_name      { the Name  }

      onplayRowItem[topcolumnName] = tempCols.default;
    } 
   else if (Array.isArray(tempCols)) {
     //----------------------ARRRRRRRRRRRRRRAAAAAAAAAAYYYYYYYYYY
     let index=0
     onplayRowItem[topcolumnName]=[]; //Registering the Object_name

      let columnsG = tempCols[0];

      if ("type" in tempCols) {
        //----is String L2
        onplayRowItem[topcolumnName].push(tempCols.default); //Registering the Object_name
      } 
      
      else {

      onplayRowItem[topcolumnName].push({}) ;//= []; //Registering the Object_namee

      for (let topcolumnNameG in columnsG) {
        tempCols = columnsG[topcolumnNameG];

        onplayRowItem[topcolumnName][index][topcolumnNameG]="";//{topcolumnNameG:""} ;//= []; //Registering the Object_name

        if ("type" in tempCols) {
          
          //----is String L2
          onplayRowItem[topcolumnName][index][topcolumnNameG]=tempCols.default;;//{topcolumnNameG:""} ;//= []; //Registering the Object_name
          //console.log('isObject & type',onplayRowItem)
        } 
        
        else {
          //-----------is Object (Layer_3)
          //onplayRowItem[topcolumnName]=[{topcolumnNameG:{}}];
    
          onplayRowItem[topcolumnName][index][topcolumnNameG]={};
          onplayRowItem[topcolumnName].push({a:12});
          let columnsGG = tempCols;
          for (let topcolumnNameGG in columnsGG) {
            //--------is String L3
            //onplayRowItem[topcolumnName][0][topcolumnNameG]={};
            tempCols = columnsGG[topcolumnNameGG];

            if ("type" in tempCols) {
             // onplayRowItem[topcolumnName][0][topcolumnNameG][topcolumnNameGG] = "";
            
             // onplayRowItem[topcolumnName][0][topcolumnNameG][topcolumnNameGG] = tempCols.default;
            } 

          }
        }
        
      //console.log('OPPPPPPPPPPPPPPPPPP',onplayRowItem,)

      }

    }
     //--------------------AAAAAAARRRRRRRRRRRRRRRRRAAAAAAAAAAAAAAAAAAYYYYYYYYY
    
   } 
    else {
      //----------- Column is Object ( multiValued...).....
      onplayRowItem[topcolumnName] = {}; //Registering the Object_name

      let columnsG = tempCols;

      for (let topcolumnNameG in columnsG) {
        tempCols = columnsG[topcolumnNameG];

        if ("type" in tempCols) {
          //----is String L2
          
          onplayRowItem[topcolumnName][topcolumnNameG] = "";
 
          onplayRowItem[topcolumnName][topcolumnNameG] = tempCols.default;
          ////console.log(column.name)
        } else {
          //-----------is Object (Layer_3)

          onplayRowItem[topcolumnName][topcolumnNameG] = {};

          let columnsGG = tempCols;
          for (let topcolumnNameGG in columnsGG) {
            //--------is String L3

            tempCols = columnsGG[topcolumnNameGG];
            if ("type" in tempCols) {
              onplayRowItem[topcolumnName][topcolumnNameG][topcolumnNameGG] =
                "";
            
              onplayRowItem[topcolumnName][topcolumnNameG][topcolumnNameGG] =
                tempCols.default;
            } else {
              //-----------is Object (Layer_3)
              onplayRowItem[topcolumnName][topcolumnNameG][topcolumnNameGG] =
                "";

              let columnsGGG = tempCols;
              for (let topcolumnNameGGG in columnsGGG) {
                //--------is String L3

                let tempCols = columnsGGG[topcolumnNameGG];
                if ("type" in tempCols) {
                  onplayRowItem[topcolumnName][topcolumnNameG][topcolumnNameGG][
                    topcolumnNameGGG
                  ] = "";
               
                  onplayRowItem[topcolumnName][topcolumnNameG][topcolumnNameGG][
                    topcolumnNameGGG
                  ] = tempCols.default;
                } else {
                  onplayRowItem[topcolumnName][topcolumnNameG][topcolumnNameGG][
                    topcolumnNameGGG
                  ] = "";

                  let columnsGGGG = tempCols;
                  for (let topcolumnNameGGGG in columnsGGGG) {
                    //--------is String L3

                    let tempCols = columns[topcolumnNameGGGG];
                    if ("type" in tempCols) {
                      onplayRowItem[topcolumnName][topcolumnNameG][
                        topcolumnNameGG
                      ][topcolumnNameGGG][topcolumnNameGGGG] = "";
                    
                      onplayRowItem[topcolumnName][topcolumnNameG][
                        topcolumnNameGG
                      ][topcolumnNameGGG][topcolumnNameGGGG] = tempCols.default;
                    }
                  }
                  ////console.log(cols,col,column)
                  // onplayRowItem[column.name] = "nm"
                  //onplayRowItem[column][col]= value
                }
              }
            }
          }
          ////console.log(cols,col,column)
          // onplayRowItem[column.name] = "nm"
          //onplayRowItem[column][col]= value
        }
      }
    }
  }

  //console.log('onplayRowItem')
  //defaultItem = Object.assign({},onplayRowItem)
  return onplayRowItem;
}

export default qschemaDataSkelton;
