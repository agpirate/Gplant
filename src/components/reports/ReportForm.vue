<template>
  <!------------Print HTML_formated...data driven..-->
  <!---------------lettter form-->

  <q-dialog
    style="height: 50vh; width: 100vw"
    v-model="LetterForm"
    class="q-pa-md row"
  >
    <q-card id="printSalary" class="col-auto row q-pa-none q-ma-none">
      <q-card-section style="" class="col">
        <div>
          <q-list class="q-pa-none">
            <q-item cass="justify-between q-pa-none col-auto fit">
              <q-item-section avatar>
                <q-avatar>
                  <img onclick="window.print()" src="/yirgumini.jpg" />
                </q-avatar>
              </q-item-section>
              <q-item-section
                class="col text-weight-bolder  q-gutter-column col-auto fit"
                style="color:green"
              >
                <q-badge
                  class="text-weight-bolder text-h5 text-bold transparent " style="color:green"
                >
                  ይርጉ ጋዝ ፕላንት ሓላ/ዝተ/ው/ማ
                </q-badge>

                <q-badge
                  class="text-weight-bolder text-h5 text-bold transparent " style="color:green"
                >
                  Yirgu Gas Plant PLC
                </q-badge>
              </q-item-section>
            </q-item>
            <q-item class="justify-start q-pa-none bg">
              <q-item-section class="q-pa-none col-auto fit">
                <q-separator
                size="0px"

                  style="border: 3px solid rgb(209, 209, 209);padding:0px;margin:0px;"
                  
                />
                <q-separator
                  color="white"
                  size="1px"
                  class="text-bold text-secondary"
                  inset
                />
                <q-separator
                size="0px"
                  style="border: 8px solid rgb(32, 161, 0);padding:0px;margin:0px;"
                  
                />
              </q-item-section>
            </q-item>
          </q-list>
        </div>
        <div
          style="font-size: 15px; color: rgb(6, 6, 99); width: 100%"
          class=" row justify-end"
        >
          <q-list class="q-gutter-xs row fit" @click="_xtoolBar()">
            <q-item-section class="text-bold text-secondary col-auto column">
              <img
                src="/yirgubcode.gif"
                :ratio="4 / 4"
                :height="100"
                style="height: 50px; max-width: 50px"
              />
            </q-item-section>
            <q-item-section class="col"> </q-item-section>

            <q-item-section
              class="text-bold text-secondary q-gutter-sm items-start"
              side
            >
              <div class="q-gutter-xs row items-center col-auto">
                Ref.No : <q-input :dense="true" v-model="refNo" width="10px" />
                <br />
              </div>

              <q-badge class=" bg-white text-black text-bold"
                >Date : {{ thisDate }}
              </q-badge>
            </q-item-section>
          </q-list>
        </div>
        <div class="col-auto"></div>
        <!------------body-->

        <q-editor
          class="col"
          style="border: 0px solid blue"
          v-model="letterBody"
          :dense="$q.screen.lt.md"
          :toolbar="letterTools"
          :fonts="{
            arial: 'Arial',
            arial_black: 'Arial Black',
            comic_sans: 'Comic Sans MS',
            courier_new: 'Courier New',
            impact: 'Impact',
            lucida_grande: 'Lucida Grande',
            times_new_roman: 'Times New Roman',
            verdana: 'Verdana',
          }"
        />
        <!-------------------Footer-->
        <div class="justify-center q-mt-md rounded-radius rounded">
          <q-list> </q-list>
        </div>
        <div>
          <q-list class="q-pa-none">
            <q-item class="justify-start q-pa-none bg q-gutter-xs column">
              <q-item-section class="q-pa-none col-auto fit">
                <q-separator
                size="0px"
                  style="border: 8px solid rgb(32, 161, 0);padding:0px;margin:0px;"
                  
                />
                <q-separator
                  color="white"
                  size="1px"
                  class="text-bold text-secondary"
                  inset
                />
                <q-separator
                size="0px"

                  style="border: 3px solid rgb(209, 209, 209);padding:0px;margin:0px;"
                  
                />
           
         
              </q-item-section>

              <q-item-section class="q-pa-none col-auto fit">
              <q-item>
                <q-item-section>
                  +251-928 777 999 +251-926 333 999  yirgugas@gmail.com
                </q-item-section>
                <q-item-section side>
                  Regional Health Buero  Street,Mekelle
                </q-item-section>
              </q-item>
            </q-item-section>


            </q-item>
           

          </q-list>
        </div>
        <!--------------Foooter END-->
      </q-card-section>
    </q-card>
  </q-dialog>

  <!--------------------------------------------------------FORM_1-->

  <!-------------------------FORM_1  List:------ END-->
  <q-dialog
    style="height: 100vh; width: 100vw"
    v-model="listForm"
    class="q-pa-md  bg-green column"
  >
    <div
      id="printSalary"
      class=" q-ma-none row bg-white"
      style="height: 100vh; min-width: 50vw"
    >
      <div style="min-width:30vw;height:100vh" class=" col">
        <div class="">
          <q-list>
            <q-item cass="justify-between">
              <q-item-section avatar>
                <q-avatar>
                  <img
                    id="mybutton"
                    onclick="window.print()"
                    src="/yirgumini.jpg"
                  />
                </q-avatar>
              </q-item-section>
              <q-item-section class="col text-overline text-secondary column">
                <q-list class="q-gutter-none q-pa-none q-ma-none">
                  <q-item
                    class="q-pa-none column q-gutter-xs text-weight-bolder text-green"
                  >
                    <q-item-section> ይርጉ ጋዝ ፕላንት ሓላ/ዝተ/ው/ማ </q-item-section>
                    <q-item-section> Yirgu Gas Plant P.L.C </q-item-section>
                  </q-item>
                </q-list>
              </q-item-section>
              <q-item-section side> Date: __/___/____ </q-item-section>
            </q-item>
          </q-list>
        </div>
        <div   class="q-pa-none col-auto " >
          <q-separator
                size="0px"

                  style="border: 3px solid rgb(209, 209, 209);padding:0px;margin:0px;"
                  
                />
                <q-separator
                  color="white"
                  size="1px"
                  class="text-bold text-secondary"
                  inset
                />
                <q-separator
                size="0px"
                  style="border: 8px solid rgb(32, 161, 0);padding:0px;margin:0px;"
                  
                />
        </div>

        <div
          style="font-size: 15px; color: rgb(6, 6, 99);"
          class=" row justify-end col-auto"
        >
          Ref/No : __________
        </div>
        <div class="justify-end col-grow row" style="height:50vh;max-width: 100vw;" >
           <q-table
          :title="listForm"
          title-class="text-bold text-blue-9"
          table-class="bg-grey-1 text-black"
          class="my-sticky-header-table col bg-blue"
          flat
          bordered
          :ref="tableRef"
          :dense="true"
          :rows="selectedDatas"
          separator="cell"
          row-key="No"
          style=" border: 2px solid black;background: green;"
          virtual-scroll
          :virtual-scroll-item-size="48"
          :virtual-scroll-sticky-size-start="48"
          :pagination="pagination"
          no-data-label="I can't find any data 😞"
          hide-pagination
        >
          <template v-slot:body-cell="props">
            <q-td
              :props="props"
              :class="
                props.row.name == 'Total'
                  ? 'bg-accent text-white'
                  : 'bg-white text-black'
              "
              style="border: 1.5px solid black"
            >
              {{ props.value }}
            </q-td>
          </template>
          <template v-slot:top>
            <q-list class="q-gutter-xs row fit">
              <q-item-section class="text-bold text-secondary"
                > Reporting {{ reportRecieverID }} Item's List
              </q-item-section>
              <q-item-section class="text-bold text-secondary">
              </q-item-section>
              <q-item-section class="text-primary" side-top
                ><q-badge class=" bg-white text-black"
                  >Date : {{ thisDate }}
                </q-badge>
              </q-item-section>
            </q-list>

            <div></div>
            <div></div>
            <q-space />
          </template>

          <template v-slot:bottom-row>
            <q-tr>
              <q-td :colspan="Object.keys(activeColumn).length + 1" />
            </q-tr>

            <q-tr>
              <q-td :colspan="Object.keys(activeColumn).length - 1"> </q-td>
              <q-td class="text-h4 text-weight-bolder"> Subtotal</q-td>
              <q-td> {{ subtotal["Total"] }} </q-td>
            </q-tr>

            <!--q-tr>
              <q-td :colspan="Object.keys(activeColumn).length - 1"> </q-td>
              <q-td class="text-h4 text-weight-bolder col-auto">
                VAT ( 10%)</q-td
              >
              <q-td> {{  vatPerc  }} </q-td>
            </q-tr>

            <q-tr>
              <q-td :colspan="Object.keys(activeColumn).length - 1"> </q-td>
              <q-td class="text-h4 text-weight-bolder col-auto">
                Grand Total</q-td
              >
              <q-td> {{ (Number(subtotal['Total']) * vatPerc).toFixed(1)}} </q-td>
            </q-tr-->
          </template>

          <!--template v-slot:bottom-row>

            <q-tr class="bg-green-1">
      <q-td class="text-bold">
        Total:
      </q-td>
      <q-td />
      <q-td class="text-center">
        {{ sumBy(props.row, 'ss') }}
      </q-td>
    </q-tr>
  </template-->

          <!--template v-slot:bottom> 

          </template-->
        </q-table>
        </div>
       

        <!-------------------Footer-->
        <div class="justify-center q-mt-md rounded-radius rounded">
          <q-pagination
            v-model="pagination.page"
            color="grey-8"
            :max="pagesNumber"
            size="sm"
          />
          page #1 <q-td colspan="10%"> </q-td>
        </div>
        <div>
          <q-list>
            <q-item>
              <q-item-section class=" justify-between">
                <q-item-label icon="verified_user" class="text-bold">
                  produced by:</q-item-label
                >
                <q-item-label>
                  {{ _profile["department"] }} @
                  {{ _profile["position"] }}
                </q-item-label>
                <q-item-label  lines="2">
                  {{ _profile["name"] }} :___________________
                </q-item-label>
              </q-item-section>

              <q-item-section side>
                <q-item-label icon="user" class="text-bold">
                  Receipant ;:-</q-item-label
                >
                <q-item-label>
                  {{ __whoprofile["dep"] }} @
                  {{ __whoprofile["id"] }}
                </q-item-label>
                <q-item-label  lines="2">
                  {{ __whoprofile["name"] }}:_______
                </q-item-label>
              </q-item-section>
            </q-item>

            <q-item class="items-center q-gutter-xs justify-center q-pa-none">
              <q-item-section class="text-bold col-2 q-pa-none">
              </q-item-section>
              
              <q-item-section class="q-pa-none  self-start column">
                <q-item-label>  &nbsp;</q-item-label>
                <q-item-label>authorized By: ( Name ) : _______________ ... ________</q-item-label>
               
              </q-item-section>
              <q-item-section class="text-bold col-2 q-pa-none">
              </q-item-section>
            </q-item>

            <q-item class="q-px-md">
              <q-list class="q-pa-none">
            <q-item class="justify-start q-pa-none bg q-gutter-xs column">
              <q-item-section class="q-pa-none col-auto " style="max-width: 100%;">
                <q-separator
                size="0px"
                  style="border: 8px solid rgb(32, 161, 0);padding:0px;margin:0px;"
                  
                />
                <q-separator
                  color="white"
                  size="1px"
                  class="text-bold text-secondary"
                  inset
                />
                <q-separator
                size="0px"

                  style="border: 3px solid rgb(209, 209, 209);padding:0px;margin:0px;"
                  
                />
           
              </q-item-section>
              <q-item-section class="q-pa-none col-auto ">
              <q-item>
                <q-item-section>
                  +251-928 777 999 +251-926 333 999  yirgugas@gmail.com
                </q-item-section>
                <q-item-section side>
                  Regional Health Buero  Street,Mekelle
                </q-item-section>
              </q-item>
            </q-item-section>
            
            </q-item>
           
          </q-list>
            </q-item>
          </q-list>
        </div>
        <!--------------Foooter END-->
      </div>

    </div>
  </q-dialog>

  <!-------------------------FORM_2 Receipt:------ END-->
  <q-dialog
    style="height: 50vh; width: 100vw" v-model="receiptForm" class="q-pa-md row">
    <q-card
      id="printSalary"
      class="row q-pa-none q-ma-none"
      style="height: 100vh; width: 100vw"
    >
      <q-card-section style="width: 100%;height:100vh">
        <div>
          <q-list>
            <q-item cass="justify-between">
              <q-item-section avatar>
                <q-avatar>
                  <img
                    id="mybutton"
                    onclick="window.print()"
                    src="/yirgumini.jpg"
                  />
                </q-avatar>
              </q-item-section>
              <q-item-section class="col text-overline text-secondary column">
                <q-list class="q-gutter-none q-pa-none q-ma-none">
                  <q-item
                    class="q-pa-none column q-gutter-xs text-weight-bolder text-green"
                  >
                    <q-item-section> ይርጉ ጋዝ ፕላንት ሓላ/ዝተ/ው/ማ </q-item-section>
                    <q-item-section> Yirgu Gas Plant P.L.C </q-item-section>
                  </q-item>
                </q-list>
              </q-item-section>
              <q-item-section side> Date: __/___/____ </q-item-section>
            </q-item>
          </q-list>
        </div>
        <div   class="q-pa-none col-auto " >
          <q-separator
                size="0px"

                  style="border: 3px solid rgb(209, 209, 209);padding:0px;margin:0px;"
                  
                />
                <q-separator
                  color="white"
                  size="1px"
                  class="text-bold text-secondary"
                  inset
                />
                <q-separator
                size="0px"
                  style="border: 8px solid rgb(32, 161, 0);padding:0px;margin:0px;"
                  
                />
        </div>

        <div
          style="font-size: 15px; color: rgb(6, 6, 99);"
          class=" row justify-end col-auto"
        >
          Ref/No : __________
        </div>
        <div class="justify-end row col" style="height:50vh;" >
           <q-table
          :title="activeForm"
          title-class="text-bold text-blue-9"
          table-class="bg-grey-1 text-black"
          class="my-sticky-header-table col"
          flat
          bordered
          :ref="tableRef"
          :dense="true"
          :rows="selectedDatas"
          separator="cell"
          row-key="No"
          style="height: 55vh; border: 2px solid black"
          virtual-scroll
          :virtual-scroll-item-size="48"
          :virtual-scroll-sticky-size-start="48"
          :pagination="pagination"
          no-data-label="I can't find any data 😞"
          hide-pagination
        >
          <template v-slot:body-cell="props">
            <q-td
              :props="props"
              :class="
                props.row.name == 'Total'
                  ? 'bg-accent text-white'
                  : 'bg-white text-black'
              "
              style="border: 1.5px solid black"
            >
              {{ props.value }}
            </q-td>
          </template>
          <template v-slot:top>
            <q-list class="q-gutter-xs row fit">
              <q-item-section class="text-bold text-secondary"
                >Reporting {{ reportRecieverID }} Item's Receipt
              </q-item-section>
              <q-item-section class="text-bold text-secondary">
              </q-item-section>
              <q-item-section class="text-primary" side-top
                ><q-badge class=" bg-white text-black"
                  >Date : {{ thisDate }}
                </q-badge>
              </q-item-section>
            </q-list>

            <div></div>
            <div></div>
            <q-space />
          </template>

          <template v-slot:bottom-row>
            <q-tr>
              <q-td :colspan="Object.keys(activeColumn).length + 1" />
            </q-tr>

            <q-tr>
              <q-td :colspan="Object.keys(activeColumn).length - 1"> </q-td>
              <q-td class="text-h4 text-weight-bolder"> Subtotal</q-td>
              <q-td> {{ subtotal["Price"] }} </q-td>
            </q-tr>

            <q-tr>
              <q-td :colspan="Object.keys(activeColumn).length - 1"> </q-td>
              <q-td class="text-h4 text-weight-bolder col-auto">
                VAT ( {{ vatPerc * 100 }}) %</q-td
              >
              <q-td> {{ Number(subtotal["Vat"])}} </q-td>
            </q-tr>

            <q-tr>
              <q-td :colspan="Object.keys(activeColumn).length - 1"> </q-td>
              <q-td class="text-h4 text-weight-bolder col-auto">
                Grand Total</q-td
              >
              <q-td>
                {{
                  (
                    Number(subtotal["Total"]) 
                  ).toFixed(1)
                }}
              </q-td>
            </q-tr>
          </template>

          <!--template v-slot:bottom-row>

            <q-tr class="bg-green-1">
      <q-td class="text-bold">
        Total:
      </q-td>
      <q-td />
      <q-td class="text-center">
        {{ sumBy(props.row, 'ss') }}
      </q-td>
    </q-tr>
  </template-->

          <!--template v-slot:bottom> 

          </template-->
        </q-table>
      </div>
        <!-------------------Footer-->
        <div class="justify-center q-mt-md rounded-radius rounded">
          <q-pagination
            v-model="pagination.page"
            color="grey-8"
            :max="pagesNumber"
            size="sm"
          />
          page #1 <q-td colspan="10%"> </q-td>
        </div>
        <div>
          <q-list>
            <q-item>
              <q-item-section class="fit justify-between">
                <q-item-label icon="verified_user" class="text-bold">
                  produced by:</q-item-label
                >
                <q-item-label>
                  {{ _profile["department"] }} @
                  {{ _profile["position"] }}
                </q-item-label>
                <q-item-label  lines="2">
                  {{ _profile["name"] }} :___________________
                </q-item-label>
              </q-item-section>

              <q-item-section side>
                <q-item-label icon="user" class="text-bold">
                  Receipant ;:-</q-item-label
                >
                <q-item-label>
                  {{ __whoprofile["dep"] }} @
                  {{ __whoprofile["id"] }}
                </q-item-label>
                <q-item-label  lines="2">
                  {{ __whoprofile["name"] }}:__________
                </q-item-label>
              </q-item-section>
            </q-item>

            <q-item class="items-center q-gutter-xs justify-center q-pa-none">
              <q-item-section class="text-bold col-2 q-pa-none">
              </q-item-section>
             
              <q-item-section class="q-pa-none self-start column">
                <q-item-label>  &nbsp;</q-item-label>
                <q-item-label>authorized By: ( Name ) : _______________ ... ________</q-item-label>
               
              </q-item-section>

              <q-item-section class="text-bold col-2 q-pa-none">
              </q-item-section>
            </q-item>

            <q-item class="q-px-md">
              <q-list class="q-pa-none">
            <q-item class="justify-start q-pa-none bg q-gutter-xs column">
              <q-item-section class="q-pa-none col-auto fit">
                <q-separator
                size="0px"
                  style="border: 8px solid rgb(32, 161, 0);padding:0px;margin:0px;"
                  
                />
                <q-separator
                  color="white"
                  size="1px"
                  class="text-bold text-secondary"
                  inset
                />
                <q-separator
                size="0px"

                  style="border: 3px solid rgb(209, 209, 209);padding:0px;margin:0px;"
                  
                />
           
         
              </q-item-section>
              <q-item-section class="q-pa-none col-auto fit">
              <q-item>
                <q-item-section>
                  +251-928 777 999 +251-926 333 999  yirgugas@gmail.com
                </q-item-section>
                <q-item-section side>
                  Regional Health Buero  Street,Mekelle
                </q-item-section>
              </q-item>
            </q-item-section>
            
            </q-item>

           
          </q-list>
            </q-item>
          </q-list>
        </div>
        <!--------------Foooter END-->
      </q-card-section>
    </q-card>
  </q-dialog>
  <!---------------------------------------------------->

  <!-------------------------FORM_3  Finance-->
  <q-dialog
    style="height: 50vh; width: 100vw" v-model="financeForm" class="q-pa-md row">
    <q-card
      id="printSalary"
      class="row q-pa-none q-ma-none"
      style="height: 100vh; width: 100vw"
    >
      <q-card-section style="width: 100%;height:100vh">
        <div>
          <q-list>
            <q-item cass="justify-between">
              <q-item-section avatar>
                <q-avatar>
                  <img
                    id="mybutton"
                    onclick="window.print()"
                    src="/yirgumini.jpg"
                  />
                </q-avatar>
              </q-item-section>
              <q-item-section class="col text-overline text-secondary column">
                <q-list class="q-gutter-none q-pa-none q-ma-none">
                  <q-item
                    class="q-pa-none column q-gutter-xs text-weight-bolder text-green"
                  >
                    <q-item-section> ይርጉ ጋዝ ፕላንት ሓላ/ዝተ/ው/ማ </q-item-section>
                    <q-item-section> Yirgu Gas Plant P.L.C </q-item-section>
                  </q-item>
                </q-list>
              </q-item-section>
              <q-item-section side> Date: __/___/____ </q-item-section>
            </q-item>
          </q-list>
        </div>
        <div   class="q-pa-none col-auto " >
          <q-separator
                size="0px"

                  style="border: 3px solid rgb(209, 209, 209);padding:0px;margin:0px;"
                  
                />
                <q-separator
                  color="white"
                  size="1px"
                  class="text-bold text-secondary"
                  inset
                />
                <q-separator
                size="0px"
                  style="border: 8px solid rgb(32, 161, 0);padding:0px;margin:0px;"
                  
                />
        </div>

        <div
          style="font-size: 15px; color: rgb(6, 6, 99);"
          class=" row justify-end col-auto"
        >
          Ref/No : __________
        </div>
        <div class="justify-end row col" style="height:50vh;" >
           <q-table
          :title="activeForm"
          title-class="text-bold text-grey-2"
          table-class="bg-grey-1 text-black"
          class="my-sticky-header-table col"
          flat
          bordered
          :ref="tableRef"
          :dense="true"
          :rows="selectedDatas"
          separator="cell"
          row-key="No"
          style="height: 55vh; border: 2px solid black"
          virtual-scroll
          :virtual-scroll-item-size="48"
          :virtual-scroll-sticky-size-start="48"
          :pagination="pagination"
          no-data-label="I can't find any data 😞"
          hide-pagination
        >
          <template v-slot:body-cell="props">
            <q-td
              :props="props"
              :class="
                props.row.name == 'Total'
                  ? 'bg-accent text-white'
                  : 'bg-white text-black'
              "
              style="border: 1.5px solid black"
            >
              {{ props.value }}
            </q-td>
          </template>

          <template v-slot:top>
            <q-list class="q-gutter-xs row fit">
              <q-item-section class="text-bold text-secondary col"
                >Reporting {{ reportRecieverID }} Item's Finance Status
              </q-item-section>
              <q-item-section class="text-bold text-secondary col-auto">
              </q-item-section>
              <q-item-section class="text-primary col-auto" side-top
                ><q-badge class=" bg-white text-black"
                  >Date : {{ thisDate }}
                </q-badge>
              </q-item-section>
            </q-list>

            <div></div>
            <div></div>
            <q-space />
          </template>

          <template v-slot:bottom-row>
            <q-tr>
              <q-td :colspan="Object.keys(activeColumn).length + 1"> </q-td>
            </q-tr>
            <q-tr>
              <q-td :colspan="3" />
              <q-td :colspan="2"> Sold goods </q-td>
              <q-td> {{ subtotal.G_Inc }}</q-td>
            </q-tr>

            <q-tr>
              <q-td :colspan="3" />
              <q-td :colspan="2">Sold products </q-td>
              <q-td> {{ subtotal.P_Inc }} </q-td>
            </q-tr>

            <q-tr>
              <q-td :colspan="Object.keys(activeColumn).length + 1">
                Cash paid for
              </q-td>
            </q-tr>

            <q-tr>
              <q-td :colspan="3" />
              <q-td :colspan="2" class="text-h4 text-weight-bolder">
                purchase</q-td
              >
              <q-td>{{ subtotal.P_Exp }} </q-td>
            </q-tr>

            <q-tr>
              <q-td :colspan="3" />
              <q-td :colspan="2" class="text-h4 text-weight-bolder">
                Wedges</q-td
              >
              <q-td> {{ subtotal.M_Exp }} </q-td>
            </q-tr>

            <q-tr>
              <q-td :colspan="3" />
              <q-td :colspan="2" class="text-h4 text-weight-bolder">
                Income Tax</q-td
              >
              <q-td>{{ subtotal.Tax }} </q-td>
            </q-tr>

            <q-tr>
              <q-td :colspan="3" />
              <q-td :colspan="2" class="text-h4 text-weight-bolder">
                Annual Income</q-td
              >
              <q-td> {{ subtotal.Net }}</q-td>
            </q-tr>

            <q-tr>
              <q-td :colspan="Object.keys(activeColumn).length - 1"> </q-td>
            </q-tr>
          </template>
        </q-table>
</div>
        <!-------------------Footer-->
        <div class="justify-center q-mt-md rounded-radius rounded">
          <q-pagination
            v-model="pagination.page"
            color="grey-8"
            :max="pagesNumber"
            size="sm"
          />
          page #1 <q-td colspan="10%"> </q-td>
        </div>
        <div>
          <q-list>
            <q-item>
              <q-item-section class="fit justify-between">
                <q-item-label icon="verified_user" class="text-bold">
                  produced by:</q-item-label
                >
                <q-item-label>
                  {{ _profile["department"] }} @
                  {{ _profile["position"] }}
                </q-item-label>
                <q-item-label  lines="2">
                  {{ _profile["name"] }} :___________________
                </q-item-label>
              </q-item-section>

              <q-item-section side>
                <q-item-label icon="user" class="text-bold">
                  Receipant ;:-</q-item-label
                >
                <q-item-label>
                  {{ __whoprofile["dep"] }} @
                  {{ __whoprofile["id"] }}
                </q-item-label>
                <q-item-label  lines="2">
                  {{ __whoprofile["name"] }} :___________________
                </q-item-label>
              </q-item-section>
            </q-item>

            <q-item class="items-center q-gutter-xs justify-center q-pa-none">
              <q-item-section class="text-bold col-2 q-pa-none">
              </q-item-section>
            
              <q-item-section class="q-pa-none self-start row">
                <q-item-label>  &nbsp;</q-item-label>
                <q-item-label>authorized By: ( Name ) : _______________ ... ________</q-item-label>
               
              </q-item-section>

              <q-item-section class="text-bold col-2 q-pa-none">
              </q-item-section>
            </q-item>

            <q-item class="q-px-md">
          <q-list class="q-pa-none">
            <q-item class="justify-start q-pa-none bg q-gutter-xs column">
              <q-item-section class="q-pa-none col-auto fit">
                <q-separator
                size="0px"
                  style="border: 8px solid rgb(32, 161, 0);padding:0px;margin:0px;"
                  
                />
                <q-separator
                  color="white"
                  size="1px"
                  class="text-bold text-secondary"
                  inset
                />
                <q-separator
                size="0px"

                  style="border: 3px solid rgb(209, 209, 209);padding:0px;margin:0px;"
                  
                />
           
         
              </q-item-section>

              <q-item-section class="q-pa-none col-auto fit">
              <q-item>
                <q-item-section>
                  +251-928 777 999 +251-926 333 999  yirgugas@gmail.com
                </q-item-section>
                <q-item-section side>
                  Regional Health Buero  Street,Mekelle
                </q-item-section>
              </q-item>
            </q-item-section>

            </q-item>
          </q-list>
            </q-item>
          </q-list>
        </div>
        <!--------------Foooter END-->
      </q-card-section>
    </q-card>
  </q-dialog>

  <!------------------------------------------ -->
  <div v-if="selected.length" class="column">

      <div class="row q-gutter-sm"> 
        <q-btn id="full-page"  onclick="window.print()"  no-caps :dense="true"  size="md"> Screen Shoot</q-btn>
        <q-btn @click="exportCSV()" :dense="true" size="sm" no-caps>Export as CSV</q-btn>
      </div>

        <div v-if="exportType.length">
          <div
            class="q-pa-none rounded-borders text-bold"
            :class="$q.dark.isActive ? 'text-primary' : 'text-secondary'"
          >
          
            <q-option-group
              name="reportType"
              v-model="prefexType"
              :options="exportType"
              color="primary"
              inline
              class=""
            />
          </div>

          <div class="q-pa-sm q-gutter-sm row">
            <div class="q-gutter-xs row q-pa-sm items-start flex-center">

              <div class="q-gutter-xs q-pa-sm"> 
                <q-btn
                :dense="true" no-caps
                class="col"
                label="Export"
                glossy
                color="purple"
                style="width:9vw"
                @click="_reportSelected(prefexType)"
              />
                <div
                  v-if="Object.keys(props._whoreceiver).length !== 0"
                  class=" text-bold"
                >
                  <q-badge rounded color="green text-bold" />
                  {{ __whoprofile['name'] }}
                </div>
                <div v-else class="">
                  <q-badge rounded color="red" /> [Receipent Status] 
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          <stickyNote />
        </div>

  </div>
</template>

<script setup>
import stickyNote from "src/components/stickyNote.vue";
import { ref, reactive, onMounted, defineAsyncComponent, computed } from "vue";
import { exportFile, useQuasar, useMeta } from "quasar";

import axios from "axios";

const $q = useQuasar();

//------------

const nul = [null, undefined, false, "", [], {}, NaN];
//------------

//if( typeof window != undefined)
const props = defineProps({
 // _schemaColumns: { type: Array, default: () => [], required: false }, //fetch_basic schema of the base table
  _thisModel: { type: String, default: "", required: false }, //fetch_basic schema of the base table
  selected: { type: Array, default: () => [], required: false }, //fetch the selected datas.....
  columns: { type: Object, default: () => ({}), required: false }, //
  
  _extraData: { type: Object, default: () => ({}), required: false }, //
  _profile: { type: Object, default: () => ({}), required: false }, //the profile informations of user_loged
  _whoreceiver: { type: Object, default: () => ({}), required: false }, //the profile informations of user_loged
});

//----------------------------------------Columns
let thisDate = new Date()
  .toLocaleString("en-US", {
    timeZoneName: "short",
  })
  .split("GM")[0];

//reconstruct the data(rows)..with appended index_value
let tableRef = ref("");
let loading = ref(false);
let attenRows = ref([]);

////////////////////////paginations Style--attendance
const pagination = ref({
  sortBy: "desc",
  descending: false,
  page: 1,
  rowsPerPage: 10,
  // rowsNumber: xx if getting data from a server
});
const pagesNumber = computed(() =>
  Math.ceil(attenRows.value.length / pagination.value.rowsPerPage)
);

//attenRows.value.forEach((row, index) => {
//adding index_columns_value in each row ( x1000)
// row.index = index;
//});
var refNo = ref("");
var letterBody = ref("");
var letterTools = ref([]);
var letterTool = ref([
  [
    {
      label: $q.lang.editor.align,
      icon: $q.iconSet.editor.align,
      fixedLabel: true,
      list: "only-icons",
      options: ["left", "center", "right", "justify"],
    },
    {
      label: $q.lang.editor.align,
      icon: $q.iconSet.editor.align,
      fixedLabel: true,
      options: ["left", "center", "right", "justify"],
    },
  ],
  ["bold", "italic", "strike", "underline", "subscript", "superscript"],
  ["token", "hr", "link", "custom_btn"],
  ["print", "fullscreen"],
  [
    {
      label: $q.lang.editor.formatting,
      icon: $q.iconSet.editor.formatting,
      list: "no-icons",
      options: ["p", "h1", "h2", "h3", "h4", "h5", "h6", "code"],
    },
    {
      label: $q.lang.editor.fontSize,
      icon: $q.iconSet.editor.fontSize,
      fixedLabel: true,
      fixedIcon: true,
      list: "no-icons",
      options: [
        "size-1",
        "size-2",
        "size-3",
        "size-4",
        "size-5",
        "size-6",
        "size-7",
      ],
    },
    {
      label: $q.lang.editor.defaultFont,
      icon: $q.iconSet.editor.font,
      fixedIcon: true,
      list: "no-icons",
      options: [
        "default_font",
        "arial",
        "arial_black",
        "comic_sans",
        "courier_new",
        "impact",
        "lucida_grande",
        "times_new_roman",
        "verdana",
      ],
    },
    "removeFormat",
  ],
  ["quote", "unordered", "ordered", "outdent", "indent"],

  ["undo", "redo"],
  ["viewsource"],
]);
async function _xtoolBar() {
  if (letterTools.value.length) {
    letterTools.value = [];
  } else {
    letterTools.value = letterTool.value;
  }
  return;
}
///////////////////////Selected style-attendance
let attenSelected = ref([]);

//----------------Salary Report

//forms_POP_uP_Flags
//
let requireInput = ref(false); //provide inputValues to print
let valueRequired = ref([]); //provide inputValues to print
//--------------

const vatPerc = 0.15;
//let receiptForm = ref(false); //template(html_form options One)
let salaryForm = ref(false); //template(html_form options One)
let listForm = ref(false); //template(html_form options One)
let receiptForm = ref(false); //template(html_form options One)
let financeForm = ref(false); //template(html_form options One)

//-----
let LetterForm = ref(false); //template(html_form options One)
//------------
let nextPage = ref(0);
let lastPage = 0;

function scrollTo({ to, ref }) {
  const lastIndex = attenRows.value.length - 1;

  if (loading.value !== true && nextPage.value < lastPage && to === lastIndex) {
    loading.value = true;
    setTimeout(() => {
      nextPage.value++;
      nextTick(() => {
        ref.refresh();
        loading.value = false;
      });
    }, 500);
  }
}

//--------------------------------------REPORTING COntrollers
//---prepared_Receiving _body
const whoreciverOps = ref([
  { label: "Employee", value: "Employee" },
  { label: "Supplier", value: "Supplier" },
  { label: "Customer", value: "Customer" },
]);
var whoreciever = ref("Employee");
var whorecieverApi = ref("");

var reportRecieverID = ref("");
var __whoprofile = ref({});
var reportRecieverName = ref("");

var profiles = {
    asset: { Name: "assetName", ID: "assetID" },
    employee: { Name: "name", ID: "companyID" },
    customer: { Name: "customerName", ID: "customerID" },
    supplier: { Name: "supplierName", ID: "supplierID" },
  };

var _modalName = "employee";//props._whoreceiver['modelName']

  const _name=profiles[_modalName].Name

  const _id=profiles[_modalName].ID

__whoprofile = computed(() => {
  //_modalName = props._whoreceiver['modelName']

  return {
     name: props._whoreceiver['Name'],
     id: props._whoreceiver["ID"],
      idKey:'id',
      modalName:props._whoreceiver['modelName'],
  };
});

//-------------------------------------
const exportType = computed(() => {
  if (props._thisModel === "asset") {
    return [
      //Options which report to do..
      { label: "Asset Delivery", value: "assetD" },
      { label: "Asset Withdraw", value: "assetW" },
      { label: "Asset Return", value: "assetR" },
      { label: "Letter Head", value: "letter" },
    ];
  } else if (props._thisModel === "goods") {
    return [
      //Options which report to do..
      { label: "Goods Delivery", value: "goodsD" },
      { label: "Goods Withdraw", value: "goodsW" },
      { label: "Goods Return", value: "goodsR" },
      { label: "Goods Receipt", value: "goodssale" },
      { label: "Letter Head", value: "letter" },
    ];
  } else if (props._thisModel === "rawmaterial") {
    return [
      //Options which report to do..
      { label: "Raw Delivery", value: "rawD" },
      { label: "Raw Withdraw", value: "rawW" },
      { label: "Letter Head", value: "letter" },
    ];
  } else if (props._thisModel === "product") {
    return [
      //Options which report to do..
      { label: "product Delivery", value: "productD" },
      { label: "Product Withdraw", value: "productW" },
      { label: "Product Receipt", value: "productsale" },
      { label: "Letter Head", value: "letter" },
    ];
  } else if (props._thisModel === "statment") {
    return [
      //Options which report to do..
      { label: "Income Statement", value: "stat" },
      { label: "Letter Head", value: "letter" },
      //{ label: "Product Withdraw", value: "productW"},
      //{ label: "Product Receipt", value: "productR"},
    ];
  } else if (props._thisModel === "employee") {
    return [
      //Options which report to do..
      //{ label: "Employee Attendance", value: "attend" },
      { label: "Employee Salary", value: "salary" },
      { label: "Letter Head", value: "letter" },
      //{ label: "Product Receipt", value: "productR"},
    ];
  } else if (props._thisModel === "attendance") {
    return [
      //Options which report to do..
      { label: "Employee Payroll", value: "attend" },
      { label: "Letter Head", value: "letter" },
      //{ label: "Employee Salary", value: "salary"},
      //{ label: "Product Receipt", value: "productR"},
    ];
  }
  else if (props._thisModel === "customer") {
    return [
      //Options which report to do..
      { label: "Customer List", value: "cust" },
      { label: "Letter Head", value: "letter" },
      //{ label: "Employee Salary", value: "salary"},
      //{ label: "Product Receipt", value: "productR"},
    ];
  }


  return [];
});

const prefexType = ref("asset"); //selecte what to report

let selectedDatas = ref([]); //the items_list
let selectedDatas1 = ref([]); //the items_list
let selectedDatas2 = ref([]); //the items_list
let selectedDatas3 = ref([]); //the items_list
let selectedDatas4 = ref([]); //the items_list
//let subtotalColumns = [];
let subtotal = {};
let itemtotal = { num: 0, column: "itemQuantity" };
let vattotal = { num: 0, column: "itemQuantity", optionPerc: 10 };
let grandTotal = { num: 0, column: "itemQuantity" };
//---------------
let activeColumn = reactive({}); //the items_key:value ( columns_data...)
let activeForm = ref("");
let specColumns = ref({});

async function _reportSelected(exformat) {
  if (exformat == "assetD") {
    //
    // export the lists/form datas as pdf
    reportRecieverID.value = "procurment";
    __whoprofile.value = {
      name: props._whoreceiver["name"],
      dep: props._whoreceiver["department"],
      pos: props._whoreceiver["position"],
      id: props._whoreceiver["companyID"],
      idKey: "companyID",
    };
    listForm.value = true; //poping up
    var result = exportType.value.find((item) => item.value === exformat);
    activeForm.value = result["label"];
    activeColumn = {
      assetName: "",
      model: "",
      ItemQs: "",
      cost: "",
      Total: ["ItemQs", "cost", "*"],
    };

    subtotal = { cost: 0, ItemQs: 0, Total: 0 };
  }
  if (exformat == "assetW") {
    //
    // export the lists/form datas as pdf
    reportRecieverID.value = "procurment";
    __whoprofile.value = {
      name: props._whoreceiver["name"],
      dep: props._whoreceiver["department"],
      pos: props._whoreceiver["position"],
      id: props._whoreceiver["companyID"],
      idKey: "companyID",
    };
    listForm.value = true; //poping up
    var result = exportType.value.find((item) => item.value === exformat);
    activeForm.value = result["label"];
    activeColumn = {
      assetName: "",
      model: "",
      Quantity: ["takenBy.quantity", ""],
      Total: ["takenBy.quantity", ""],
    };

    subtotal = { Quantity: 0, Total: 0 };

    //specColumns.value={'Total':['takenBy.quantity',cost'}
  }
  if (exformat == "assetR") {
    // export the lists/form datas as pdf
    reportRecieverID.value = "procurment";
    __whoprofile.value = {
      name: props._whoreceiver["name"],
      dep: props._whoreceiver["department"],
      pos: props._whoreceiver["position"],
      id: props._whoreceiver["companyID"],
      idKey: "companyID",
    };

    listForm.value = true; //poping up
    var result = exportType.value.find((item) => item.value === exformat);
    activeForm.value = result["label"];
    activeColumn = {
      assetName: "",
      model: "",
      Quantity: ["returnedBy.quantity", ""],
      Total: ["returnedBy.quantity", ""],
    };
    //specColumns.value={'Total':['takenBy.quantity',cost'}
    subtotal = { Quantity: 0, Total: 0 };
  }
  if (exformat == "letter") {
    //
    // export the lists/form datas as pdf
    reportRecieverID.value = "procurment";
    __whoprofile.value = {
      name: props._whoreceiver["name"],
      dep: props._whoreceiver["department"],
      pos: props._whoreceiver["position"],
      id: props._whoreceiver["companyID"],
      idKey: "companyID",
    };

    LetterForm.value = true; //poping up
    var result = exportType.value.find((item) => item.value === exformat);
    activeForm.value = result["label"];
    activeColumn = {
      assetName: "",
      model: "",
      Quantity: ["returnedBy.quantity", ""],
    };
    //specColumns.value={'Total':['takenBy.quantity',cost'}
    //subtotal = {  Quantity: 0, Total: 0 };
  }
  //-------------------------------------------------------------------------------------ASSETS

  if (exformat == "rawD") {
    //
    // export the lists/form datas as pd
    reportRecieverID.value = "RawMaterials";
    __whoprofile.value = {
      name: props._whoreceiver["name"],
      dep: props._whoreceiver["department"],
      pos: props._whoreceiver["position"],
      id: props._whoreceiver["companyID"],
      idKey: "companyID",
    };

    listForm.value = true; //poping up
    var result = exportType.value.find((item) => item.value === exformat);
    activeForm.value = result["label"];
    activeColumn = {
      rawType: "",
      rawName: "",
      Total: ["tQ", ""],
    };
    subtotal = { Total: 0 };
  }
  if (exformat == "rawW") {
    //
    // export the lists/form datas as pdf
    reportRecieverID.value = "WD RamMaterials";
    __whoprofile.value = {
      name: props._whoreceiver["name"],
      dep: props._whoreceiver["department"],
      pos: props._whoreceiver["position"],
      id: props._whoreceiver["companyID"],
      idKey: "companyID",
    };

    listForm.value = true; //poping up
    var result = exportType.value.find((item) => item.value === exformat);
    activeForm.value = result["label"];
    activeColumn = {
      rawType: "",
      rawName: "",
      Total: ["takenBy.quantity", ""],
    };
    subtotal = { Total: 0 };
  }

  //----------------------------------------------------------GOOODS
  if (exformat == "goodsD") {
    //
    // export the lists/form datas as pdf
    reportRecieverID.value = "Goods";
    __whoprofile.value = {
      name: props._whoreceiver["name"],
      dep: props._whoreceiver["department"],
      pos: props._whoreceiver["position"],
      id: props._whoreceiver["companyID"],
      idKey: "companyID",
    };

    listForm.value = true; //poping up
    var result = exportType.value.find((item) => item.value === exformat);
    activeForm.value = result["label"];
    activeColumn = {
      goodsName: "",
      ItemQs: "",
      cost: "",
      Total: ["tQC", ""],
    };
    subtotal = { cost: 0, ItemQs: 0, Total: 0 };
  }

  if (exformat == "goodsW") {
    //
    // export the lists/form datas as pdf
    reportRecieverID.value = "WD Goods";
    __whoprofile.value = {
      name: props._whoreceiver["name"],
      dep: props._whoreceiver["department"],
      pos: props._whoreceiver["position"],
      id: props._whoreceiver["companyID"],
      idKey: "companyID",
    };

    listForm.value = true; //poping up
    var result = exportType.value.find((item) => item.value === exformat);
    activeForm.value = result["label"];
    activeColumn = { goodsName: "", Total: ["saleStatus.ItemQs", ""] };
    subtotal = { Total: 0 };
  }
  if (exformat == "goodsR") {
    // export the lists/form datas as pdf
    reportRecieverID.value = "WR Goods";
    __whoprofile.value = {
      name: props._whoreceiver["name"],
      dep: props._whoreceiver["department"],
      pos: props._whoreceiver["position"],
      id: props._whoreceiver["companyID"],
      idKey: "companyID",
    };

    receiptForm.value = true; //poping up
    let arrayIndex = "";
    var result = exportType.value.find((item) => item.value === exformat);
    activeForm.value = result["label"];

    activeColumn = { goodsName: "", Total: ["saleStatus.ItemQs", ""] };
    subtotal = { Total: 0 };
  }

  if (exformat == "goodssale") {
    //
    // export the lists/form datas as pdf
    reportRecieverID.value = "GooDs";
    __whoprofile.value = {
      name: props._whoreceiver["customerName"],
      dep: props._whoreceiver["department"],
      pos: props._whoreceiver["position"],
      id: props._whoreceiver["customerID"],
      idKey: "customerID",
    };

    receiptForm.value = true; //poping upp
    var result = exportType.value.find((item) => item.value === exformat);
    activeForm.value = result["label"];
    let arrayIndex = "";
    activeColumn = {
      goodsName: "",
      receiptNo: "",
      paymentMethod: "",
      uPrice: ["saleStatus.unitPrice", ""],
      Qtity: ["saleStatus.ItemQs", ""],
      Vat: ["saleStatus.vat", ""],
      Price: ["saleStatus.Price", ""],
      Total: ["saleStatus.prplusVat", ""],

    };
    subtotal = { cost: 0, Quantity: 0, Total: 0 };
  }

  if (exformat == "productD") {
    //
    // export the lists/form datas as pdf
    reportRecieverID.value = "Products Delivery";
    __whoprofile.value = {
      name: props._whoreceiver["name"],
      dep: props._whoreceiver["department"],
      pos: props._whoreceiver["position"],
      id: props._whoreceiver["companyID"],
      idKey: "companyID",
    };

    listForm.value = true; //poping up
    var result = exportType.value.find((item) => item.value === exformat);
    activeForm.value = result["label"];
    activeColumn = {
      product: ["productName", ""],
      cylSerial: "",
      cylOwner: "",
      Qunatity: ["quantity", ""],
      Total: 1,
    };
    subtotal = { quantity: 0, Total: 0 };
  }
  if (exformat == "productsale") {
    // export the lists/form datas as pdf
    reportRecieverID.value = "Product Sales";
    __whoprofile.value = {
      name: props._whoreceiver["name"],
      dep: props._whoreceiver["department"],
      pos: props._whoreceiver["position"],
      id: props._whoreceiver["customerID"],
      idKey: "customerID",
    };

    receiptForm.value = true; //poping up
    var result = exportType.value.find((item) => item.value === exformat);
    activeForm.value = result["label"];
    activeColumn = {
      Name: ["productName", ""],
      Serial: ["cylSerial",""],
      Productset: ["cylOwner",""],
      uPrice: ["saleStatus.unitPrice", ""],
      Qtity: ["saleStatus.ItemQs", ""],
      Vat: ["saleStatus.vat", ""],
      Price: ["saleStatus.Price", ""],
      Total: ["saleStatus.prplusVat", ""],
    };

    subtotal = { Q_tity: 0,Price:0,Vat:0,Total: 0 };
  }

  if (exformat == "attend") {
    // export the lists/form datas as pdf
    reportRecieverID.value = "Attendances";
    __whoprofile.value = {
      name: props._whoreceiver["name"],
      dep: props._whoreceiver["department"],
      pos: props._whoreceiver["position"],
      id: props._whoreceiver["companyID"],
      idKey: "companyID",
    };

    listForm.value = true; //poping up
    var result = exportType.value.find((item) => item.value === exformat);
    activeForm.value = result["label"];
    activeColumn = {
      name: "",
      companyID: "",
      "G.salary": ["tQC", ""],
      pension: "",
      incTax: "",
      advancePay: "",
      netSalary: "tQC",
    };
    
    subtotal = { incTax: 0, netSalary: 0, Total: 0 };

    //specColumns.value={'Total':['takenBy.quantity',cost'}
  }
  if (exformat == "salary") {
    //
    // export the lists/form datas as pdf
    reportRecieverID.value = "Salary ";
    __whoprofile.value = {
      name: props._whoreceiver["name"],
      dep: props._whoreceiver["department"],
      pos: props._whoreceiver["position"],
      id: props._whoreceiver["companyID"],
      idKey: "companyID",
    };

    listForm.value = true; //poping up
    var result = exportType.value.find((item) => item.value === exformat);
    activeForm.value = result["label"];
    activeColumn = {
      companyID: "",
      TaxableSalary: ["taxableSalary",""],
      inTaxableSalary: ["taxfreeSalary",""],
      NetSalary: ["netSalary",""],
      Total: ["netSalary",""],

    };

    subtotal = {NetSalary: 0, Total:0 };

    //specColumns.value={'Total':['takenBy.quantity',cost'}
  }

  if (exformat == "stat") {
    financeForm.value = true; //poping up
    reportRecieverID.value = "Statments";
    __whoprofile.value = {
      name: props._whoreceiver["name"],
      dep: props._whoreceiver["department"],
      pos: props._whoreceiver["position"],
      id: props._whoreceiver["companyID"],
      idKey: "companyID",
    };


    var result = exportType.value.find((item) => item.value === exformat);
    activeForm.value = result["label"];
    activeColumn = {
      //-------------------
      P_Exp: ["PD_Exp", "RL_Exp","Mis_Exp","+"], //ordinary ++ miscelenouse
      Monthly_Expense: ["Mon_Exp", ""], //ordinary ++ miscelenouse

      G_Inc: ["PD_G_Inc", "RL_G_Inc", "+"], //goods total income(paied+payable)
      P_Inc: ["PD_P_Inc", "RL_P_Inc", "+"], //products total income(paid + payable)

      C_Inc: ["Cap_Inc", ""], //capital contributions
      //---------------------
      Tax: ["incomeTax", ""],

      Net: ["Income", "Expense","+"], //ordinary ++ miscelenouse

      // Date: ["updatedAt", ""],
    };
    subtotal = {
      G_Inc: 0,
      P_Inc: 0,
      C_Inc: 0,
      Tax: 0,
      P_Exp: 0,
      M_Exp: 0,
      Net: 0,
    };
  }

  if (exformat == "rec") {
    // export the lists/form datas as doc
    reportRecieverID.value = "";
    __whoprofile.value = {
      name: props._whoreceiver["name"],
      dep: props._whoreceiver["department"],
      pos: props._whoreceiver["position"],
      id: props._whoreceiver["companyID"],
      idKey: "companyID",
    };

    receiptForm.value = true;
    var result = exportType.value.find((item) => item.value === exformat);
    activeForm.value = result["label"];
    activeColumn = { assetName: "", model: "", tags: "", storeStatus: "" };
  }

  if (exformat == "fin") {
    // export the lists/form datas as doc
    reportRecieverID.value = "Finance";
    __whoprofile.value = {
      name: props._whoreceiver["name"],
      dep: props._whoreceiver["department"],
      pos: props._whoreceiver["position"],
      id: props._whoreceiver["companyID"],
      idKey: "companyID",
    };

    financeForm.value = true;
    var result = exportType.value.find((item) => item.value === exformat);
    activeForm.value = result["label"];
    activeColumn = { assetName: "", model: "", tags: "", storeStatus: "" };
  }


  if (exformat == "cust") {
    // export the lists/form datas as doc
    reportRecieverID.value = "Customer";
    __whoprofile.value = {
      name: props._whoreceiver["customerName"],
      dep: props._whoreceiver["customerName"],
      pos: props._whoreceiver["customerName"],
      id: props._whoreceiver["customerID"],
      idKey: "customerID",
    };

    listForm.value = true;
    var result = exportType.value.find((item) => item.value === exformat);
    activeForm.value = result["label"];
    activeColumn = { customerID: "", customerOF: "", rateit: "" };
  }

  analysisReporting();
  return true;
}

//////////////////////////////////////////////////////////////////////////////////FORM_ONE ==--- salary style---attendance
//-----Selected----Reporting Options

/////////////////////////////////////////////////////Organize DaTAS....& analysis................#

async function analysisReporting() {
  let itemsSkeltonData = []; //list of selected object value

  for (let items in props.selected) {
    //list of items (index in itemList)
    let itemData = props.selected[items]; //values of every items as dic(obj_form)

    let itemskelton = {}; //{ No: String(parseInt(items) + 1) }; //activeColumn;
    itemskelton = { No: String(parseInt(items)) }; //activeColumn;
    //console.log(props.selected,items,'loged repor')


         for (let key in activeColumn) {
      //item_key:value sckelton.....--- {'cost':['cost.unitcost','total'] } ,....}
      let activeValue = activeColumn[key]; //holds the--valueOf keys -----------['cost.unitcost','totals'] of 'cost'_key
      ////console.log('totalkeys',key ,typeof activeValue )

      try {
        //console.log(activeValue,'totalkeys11111000111111',activeValue,itemskelton,)

        if (Array.isArray(activeValue)) {
          let arrayLength = activeValue.length;
          try {
            //if aarayed values is only...nestedValue Indicator...simple grap with no computed(operators)
            if (arrayLength === 2) {
              //['a.b','']
              let indexOneav = "";
              let value1 = 0;
              try {
                indexOneav = activeValue[0].split("."); //['name.age'] or ['name']
              } catch {
                indexOneav = activeValue;
              }

              if (Array.isArray(itemData[indexOneav[0]])) {
                let __who = __whoprofile.value;
                valueRequired.value.push(__whoprofile.value.id);

                let zindex = 0;
                let kkey = __whoprofile.value.id;
                let idkkey = __whoprofile.value.idKey;
               
                console.log(kkey, "kkey", itemData[indexOneav[0]]);//&& kkey

                if (!nul.includes(itemData[indexOneav[0]]) ) {
                  for (let index in itemData[indexOneav[0]]) {
                    if (kkey != itemData[indexOneav[0]][index][idkkey]) {
                      zindex = index;
                      valueRequired.value.push(
                        itemData[indexOneav[0]][index][indexOneav[0]]
                      );

                      value1 =
                        indexOneav.length == 1
                          ? itemData[indexOneav[0]]
                          : itemData[indexOneav[0]][zindex][indexOneav[1]];
                    }
                  }
                } else {
                  value1 =
                    indexOneav.length == 1
                      ? itemData[indexOneav[0]]
                      : itemData[indexOneav[0]][0][indexOneav[1]];
                }

                valueRequired.value.push(value1);
              } else {
                value1 =
                  indexOneav.length == 1
                    ? itemData[indexOneav[0]]
                    : itemData[indexOneav[0]][indexOneav[1]];
              }

              //--------

              value1 = nul.includes(value1) ? 0 : value1;

              itemskelton[key] = value1; // itemData[activeValue[0]]
              ////console.log("valuewwww2DDDDDDDDDDDDDDw",itemskelton)
            } else if (arrayLength === 3) {
              //['a.b','a.b','+']
              let indexOneav = activeValue[0].split("."); //['name.age'] or ['name']
              let indexTwoav = activeValue[1].split("."); //second_array_value
              let value1 =
                indexOneav.length == 1
                  ? itemData[indexOneav[0]]
                  : itemData[indexOneav[0]][indexOneav[1]];
              //let value2= indexOneav.length == 1 ? itemData[indexTwoav[0]] : itemData[indexTwoav[0]][indexTwoav[1]]
              let value2 =
                indexTwoav.length == 1
                  ? itemData[indexTwoav[0]]
                  : itemData[indexTwoav[0]][indexTwoav[1]];

              value1 = nul.includes(value1) ? 0 : value1;
              value2 = nul.includes(value2) ? 0 : value2;
              //console.log(value1,value2,indexTwoav,itemData[indexTwoav[0]],value2,itemData[indexTwoav[0][indexTwoav[1]]],'662D1111111111111111111111122266')

              if (activeValue[2] === "+") {
                //activeValue[arrayLength-1]
                itemskelton[key] = Number(value1) + Number(value2);
              } else {
                itemskelton[key] = Number(value1) * Number(value2);
              }
            } else {
              //['a.b','a.b','g.c''+']
              let indexOneav = activeValue[0].split("."); //['name.age'] or ['name']
              let indexTwoav = activeValue[1].split("."); //second_array_value
              let indexThreeav = activeValue[2].split("."); //second_array_value
              let value1 =
                indexOneav.length == 1
                  ? itemData[indexOneav[0]]
                  : itemData[indexOneav[0]][indexOneav[1]];
              let value2 =
                indexTwoav.length == 1
                  ? itemData[indexTwoav[0]]
                  : itemData[indexTwoav[0]][indexTwoav[1]];
              let value3 =
                indexThreeav.length == 1
                  ? itemData[indexThreeav[0]]
                  : itemData[indexThreeav[0]][indexThreeav[1]];

              value1 = nul.includes(value1) ? 0 : value1;
              value2 = nul.includes(value2) ? 0 : value2;
              value3 = nul.includes(value3) ? 0 : value3;

              if (activeValue[3] === "+") {
                //activeValue[arrayLength-1]
                itemskelton[key] = parseInt(
                  Number(value1) + Number(value2) + Number(value3)
                ).toFixed(2);
              } else {
                itemskelton[key] = parseInt(
                  Number(value1) * Number(value2) * Number(value3)
                ).toFixed(2);
              }
            }
          } catch {
            itemskelton[key] = 0;
          }
          //----------------------------------------------------
        } else if (typeof activeValue == "number") {
          itemskelton[key] = activeValue;
        } else {
          itemskelton[key] = itemData[key];
        }
        //console.log(itemskelton,'itemSkelton',activeColumn)//
      } catch {
        itemskelton[key] = "-";
      }

      if (Object.keys(subtotal).includes(key)) {
        if (nul.includes(subtotal[key])) {
          subtotal[key] = 0;
        } else if (!nul.includes(itemskelton[key])) {
          subtotal[key] = parseInt(
            Number(subtotal[key]) + Number(itemskelton[key])
          ).toFixed(2);
        }
      } //if so add into subtotals
    

   //console.log()
    itemsSkeltonData[items] = itemskelton;

    }
 
   

  }

  selectedDatas.value = itemsSkeltonData; //itemsDatas //noColRow
  subtotal["no"] = itemsSkeltonData.length + 1;
  selectedDatas.value.push(subtotal);
  return true;
}

function wrapCsvValue(val, formatFn, row) {
  let formatted = formatFn !== void 0 ? formatFn(val, row) : val;
  formatted = (formatted === void 0 || formatted === null) ? "" : String(formatted);
  formatted = formatted.split('"').join('""');
  return `"${formatted}"`;
}

async function exportCSV(data = "") {
  // naive encoding to csv format
  const content = [props.columns.map((col) => wrapCsvValue(col.label))]
    .concat(
      props.selected.map((row) =>
      props.columns
          .map((col) =>
            wrapCsvValue(
              typeof col.field === "function" ? col.field(row) : row[col.field === void 0 ? col.name : col.field],
              col.format,  row
            )
          )
          .join(",")
      )
    )
    .join("\r\n");

  const status = exportFile( " sheet.csv", content, "text/csv");

  if (status !== true) {

  }
  return true;
}
async function exportJSON(data = "") {
  exportFile(_thisModel + " sheet.json", _this_Rows.value, "text/json");
}
//////////////////////////////////////////////////////////////////////////////////////////FORM_There....#

onMounted(() => {
  //tableRef.value = scrollTo(50);
});
</script>

<style>
.my-sticky-header-table {
  /* height or max-height is important */
  height: 410px;
}
.q-table__top,
  .q-table__bottom,
  thead tr:first-child th /* bg color is important for th; just specify one */ {
  background-color: rgba(0, 105, 243, 0.103);
}
thead tr th {
  position: sticky;
  z-index: 1;
}
/* this will be the loading indicator */
thead tr:last-child th {
  /* height of all previous header rows */
  top: 0;
}
thead tr:first-child th {
  top: 48px;
}
/* prevent scrolling behind sticky top row on focus */
tbody {
  /* height of all previous header rows */
  scroll-margin-top: 48px;
}

@page {
  size: A4;
  margin: 0;
}
@media print {
  .page {
    margin: 0;
    border: initial;
    border-radius: initial;
    width: initial;
    min-height: initial;
    box-shadow: initial;
    background: initial;
    page-break-after: always;
  }
}
</style>
