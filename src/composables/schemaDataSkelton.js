async function schemaDataSkelton(schemaData) {
  //onplayRowItem Scheleton of Data...Imaging acording the authorized_columns schema
  let onplayRowItem = {};

  let columnName;
  let columnValue;

  let columns = schemaData;
  //console.log(schemaData,"999999999999999999")
  for (let topcolumnName in columns) {
    //Iterating Over List of Columns Details_Object
    let tempCols = columns[topcolumnName]; //the value Base

    if ("type" in tempCols) {
      //----------- Column is Single_valued.....
      try{tempCols.default}catch{
        tempCols['default']=''
      }
      onplayRowItem[topcolumnName] = "";

      onplayRowItem[topcolumnName] = tempCols.default;

    } else {
      //----------- Column is Object ( multiValued...).....
      onplayRowItem[topcolumnName] = {}; //Registering the Object_name
      //let cols = column.schema;
      let columnsG = tempCols;
      for (let topcolumnNameG in columnsG) {
        tempCols = columnsG[topcolumnNameG]; //the value G+
        
        if ("type" in tempCols) {
          //----is String L2

          onplayRowItem[topcolumnName][topcolumnNameG] = " ";
          try{tempCols.default}catch{
            tempCols['default']=''
          }
          onplayRowItem[topcolumnName][topcolumnNameG] = tempCols.default;
          //////console.log(column.name)
        } 
        else if (Array.isArray(tempCols)) {

          //----------------------ARRRRRRRRRRRRRRAAAAAAAAAAYYYYYYYYYY
          let index=0
          onplayRowItem[topcolumnName]=[]; //Registering the Object_name
     
           let columnsG = tempCols[0];
     
           if ("type" in tempCols) {
             //----is String L2
             console.log('isType',columnsG,)
             onplayRowItem[topcolumnName].push(tempCols.default); //Registering the Object_name
           } 
           
           else {
     
           onplayRowItem[topcolumnName].push({}) ;//= []; //Registering the Object_name
     
           for (let topcolumnNameG in columnsG) {
             tempCols = columnsG[topcolumnNameG];
     
             onplayRowItem[topcolumnName][index][topcolumnNameG]="";//{topcolumnNameG:""} ;//= []; //Registering the Object_name
     
             if ("type" in tempCols) {
               //----is String L2
               onplayRowItem[topcolumnName][index][topcolumnNameG]=tempCols.default;;//{topcolumnNameG:""} ;//= []; //Registering the Object_name
               console.log('isObject & type',onplayRowItem)
             } 
             
             else {
               //-----------is Object (Layer_3)
               //onplayRowItem[topcolumnName]=[{topcolumnNameG:{}}];
               console.log('isObject & object',onplayRowItem)
               
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
             
           console.log('OPPPPPPPPPPPPPPPPPP',onplayRowItem,)
     
           }
     
         }
          //--------------------AAAAAAARRRRRRRRRRRRRRRRRAAAAAAAAAAAAAAAAAAYYYYYYYYY
         
        } 
        else {
          //-----------is Object (Layer_3)
          onplayRowItem[topcolumnName][topcolumnNameG] = {};

          let columnsGG = tempCols;
          for (let topcolumnNameGG in columnsGG) {
            //--------is String L3

            tempCols = columnsGG[topcolumnNameGG]; //the value G+
            if ("type" in tempCols) {
              onplayRowItem[topcolumnName][topcolumnNameG][topcolumnNameGG] =
                "";
                try{tempCols.default}catch{
                  tempCols['default']=''
                }
              onplayRowItem[topcolumnName][topcolumnNameG][topcolumnNameGG] =
                tempCols.default;
            } else {
              onplayRowItem[topcolumnName][topcolumnNameG][topcolumnNameGG] =
                {}; //Registering the Object_name

              //let cols = column.schema;
              let columnsGGG = tempCols;
              for (let topcolumnNameGGG in columnsGGG) {
                let tempCols = columnsGGG[topcolumnNameGGG]; //the value G+
                if ("type" in tempCols) {
                  //----is String L2
                  try{tempCols.default}catch{
                    tempCols['default']=''
                  }
                  onplayRowItem[topcolumnName][topcolumnNameG][topcolumnNameGG][
                    topcolumnNameGGG
                  ] = {}; //Registering the Object_name

                  onplayRowItem[topcolumnName][topcolumnNameG][topcolumnNameGG][
                    topcolumnNameGGG
                  ] = tempCols.default; //Registering the Object_name
                }
                /////
                else {
                  onplayRowItem[topcolumnName][topcolumnNameG][topcolumnNameGG][
                    topcolumnNameGGG
                  ] = {}; //Registering the Object_name

                  //let cols = column.schema;
                  let columnsGGGG = tempCols;
                  for (let topcolumnNameGGGG in columnsGGGG) {
                    let tempCols = columns[topcolumnNameGGGG]; //the value G+
                    if ("type" in tempCols) {
                      //----is String L2
                      try{tempCols.default}catch{
                        tempCols['default']=''
                      }
                      onplayRowItem[topcolumnName][topcolumnNameG][
                        topcolumnNameGG
                      ][topcolumnNameGGG][topcolumnNameGGGG] = ""; //Registering the Object_name

                      onplayRowItem[topcolumnName][topcolumnNameG][
                        topcolumnNameGG
                      ][topcolumnNameGGG][topcolumnNameGGGG] = tempCols.default; //Registering the Object_name
                    }
                    /////
                    else {
                      onplayRowItem[topcolumnName][topcolumnNameG][
                        topcolumnNameGG
                      ][topcolumnNameGGG][topcolumnNameGGGG] = {}; //Registering the Object_name

                      //let cols = column.schema;
                      let columnsGGGGG = tempCols;
                      for (let topcolumnNameGGGGG in columnsGGGGG) {
                        let tempCols = columnsGGGGG[topcolumnNameGGGGG]; //the value G+
                        if ("type" in tempCols) {
                          //----is String L2
                          try{tempCols.default}catch{
                            tempCols['default']=''
                          }
                          onplayRowItem[topcolumnName][topcolumnNameG][
                            topcolumnNameGG
                          ][topcolumnNameGGG][topcolumnNameGGGG][
                            topcolumnNameGGGGG
                          ] = ""; //Registering the Object_name

                          onplayRowItem[topcolumnName][topcolumnNameG][
                            topcolumnNameGG
                          ][topcolumnNameGGG][topcolumnNameGGGG][
                            topcolumnNameGGGGG
                          ] = tempCols.default; //Registering the Object_name
                        }
                        /////
                        /////
                      }
                      //////console.log(cols,col,column)
                      // onplayRowItem[column.name] = "nm"
                      //onplayRowItem[column][col]= value
                    }
                  }
                }
              }
              //////console.log(cols,col,column)
              // onplayRowItem[column.name] = "nm"
              //onplayRowItem[column][col]= value
            }
          }
        }
      }
      //_log(onplayRowItem)
      //defaultItem = Object.assign({},onplayRowItem)
    }
  }

  return onplayRowItem;
}

export default schemaDataSkelton;
