<template>
  <!------------Print HTML_formated...data driven..-->
  <!---------------lettter form-->

  <q-dialog
    style="height: 50vh; width: 100vw"
    v-model="LetterForm"
    class="q-pa-md column fit"
  >
    <q-card
      id="printSalary"
      class="row q-pa-none q-ma-none column"
      style="height: 100vh; width: 100vw"
    >
      <q-card-section style="width: 100%" class="col column">
        <div>
          <q-list class="q-pa-none">
            <q-item cass="justify-between q-pa-none col-auto fit">
              <q-item-section avatar>
                <q-avatar>
                  <img onclick="window.print()" src="~assets/yirgumini.jpg" />
                </q-avatar>
              </q-item-section>
              <q-item-section
                class="col text-weight-bolder text-green q-gutter-column col-auto fit"
              >
                <q-badge
                  class="text-weight-bolder text-h5 text-bold transparent text-green"
                >
                  ይርጉ ጋዝ ፕላንት ሓላ/ዝተ/ው/ማ
                </q-badge>

                <q-badge
                  class="text-weight-bolder text-h5 text-bold transparent text-green"
                >
                  Yirgu Gas Plant PLC
                </q-badge>
              </q-item-section>
            </q-item>
            <q-item class="justify-start q-pa-none bg">
              <q-item-section class="q-pa-none col-auto fit">
                <q-separator
                  color="grey-5"
                  size="3px"
                  class="text-bold text-secondary"
                  inset
                />
                <q-separator
                  color="white"
                  size="1px"
                  class="text-bold text-secondary"
                  inset
                />
                <q-separator
                  color="green"
                  size="7px"
                  class="text-bold text-weight-bolder text-secondary"
                  inset
                />
              </q-item-section>
            </q-item>
          </q-list>
        </div>
        <div
          style="font-size: 15px; color: rgb(6, 6, 99); width: 100%"
          class="text-overline row justify-end"
        >
          <q-list class="q-gutter-xs row fit" @click="_xtoolBar()">
            <q-item-section class="text-bold text-secondary col-auto column">
              <img
                src="~assets/yirgubcode.gif"
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

              <q-badge class="text-overline bg-white text-black text-bold"
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
                <q-separator  style="" color="green" size="7px" inset />
                <q-separator color="white" size="1px" class="" inset />
                <q-separator color="grey-5" size="3px" inset />
              </q-item-section>
            </q-item>
            <q-item-section class="q-pa-none col-auto fit">
              <q-item>
                <q-item-section>
                  +251-928 777 999 +251-926 333 999 E-mail: yirgugas@gmail.com
                </q-item-section>
                <q-item-section side>
                  Ayder,Hamiday,
                </q-item-section>
              </q-item>
            </q-item-section>
          </q-list>
        </div>
        <!--------------Foooter END-->
      </q-card-section>
    </q-card>
  </q-dialog>

  <!-------------------------------------------------------FORM_1-->

  <!-------------------------FORM_1 :------ END-->
  <q-dialog
    style="height: 50vh; width: 100vw"
    v-model="listForm"
    class="q-pa-md column"
  >
    <q-card
      id="printSalary"
      class="row q-pa-none q-ma-none"
      style="height: 100vh; width: 100vw"
    >
      <q-card-section style="width: 100%">
        <div>
          <q-list>
            <q-item cass="justify-between">
              <q-item-section avatar>
                <q-avatar>
                  <img
                    id="mybutton"
                    onclick="window.print()"
                    src="~assets/yirgumini.jpg"
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
        <div
          style="font-size: 15px; color: rgb(6, 6, 99); width: 100%"
          class="text-overline row justify-end"
        >
          Ref/No : __________
        </div>
        <q-table
          :title="listForm"
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
                >store Form # item withdrawel
              </q-item-section>
              <q-item-section class="text-bold text-secondary">
              </q-item-section>
              <q-item-section class="text-primary" side-top
                ><q-badge class="text-caption bg-white text-black"
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

        <!-------------------Footer-->
        <div class="justify-center q-mt-md rounded-radius rounded">
          <q-pagination
            v-model="pagination.page"
            color="grey-8"
            :max="pagesNumber"
            size="sm"
          />
          Page_ <q-td colspan="10%"> </q-td>
        </div>
        <div>
          <q-list>
            <q-item>
              <q-item-section class="fit justify-between">
                <q-item-label icon="verified_user" class="text-bold">
                  produced by:</q-item-label
                >
                <q-item-label>
                  {{ props._who["department"] }} @
                  {{ props._who["position"] }}
                </q-item-label>
                <q-item-label caption lines="2">
                  {{ props._who["name"] }} :___________________
                </q-item-label>
              </q-item-section>

              <q-item-section side>
                <q-item-label icon="user" class="text-bold">
                  Receipant ;:-</q-item-label
                >
                <q-item-label>
                  {{ props._who["department"] }} @
                  {{ __whoprofile["id"] }}
                </q-item-label>
                <q-item-label caption lines="2">
                  {{ __whoprofile["name"] }}
                </q-item-label>
              </q-item-section>
            </q-item>

            <q-item class="items-center q-gutter-xs justify-center q-pa-none">
              <q-item-section class="text-bold col-2 q-pa-none">
              </q-item-section>
              <q-item-section
                class="text-bold q-pa-none self-begin q-gutter-xs"
              >
                authorized by ;
              </q-item-section>
              <q-item-section class="q-pa-none self-start">
                <q-item-label> Name </q-item-label>
                <q-item-label> ____________________ </q-item-label>
              </q-item-section>
              <q-item-section class="text-bold col-2 q-pa-none">
              </q-item-section>
            </q-item>

            <q-item class="q-px-md">
              <q-btn-group :dense="true" class="text-caption" size="xs">
                <q-btn
                  :dense="true"
                  push
                  color="purple"
                  label="yirgugase@facebook"
                  class="text-caption"
                  size="xs"
                />
              </q-btn-group>

              <q-btn
                :dense="true"
                label="yirgu#auto / facebook@yirgugases"
                class="fit text-caption"
              >
              </q-btn>
            </q-item>
          </q-list>
        </div>
        <!--------------Foooter END-->
      </q-card-section>
    </q-card>
  </q-dialog>

  <!-------------------------FORM_2 :------ END-->
  <q-dialog
    style="height: 50vh; width: 100vw"
    v-model="receiptForm"
    class="q-pa-md column"
  >
    <q-card
      id="printSalary"
      class="row q-pa-none q-ma-none"
      style="height: 100vh; width: 100vw"
    >
      <q-card-section style="width: 100%">
        <div>
          <q-list>
            <q-item cass="justify-between">
              <q-item-section avatar>
                <q-avatar>
                  <img
                    id="mybutton"
                    onclick="window.print()"
                    src="~assets/yirgumini.jpg"
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
        <div
          style="font-size: 15px; color: rgb(6, 6, 99); width: 100%"
          class="text-overline row justify-end"
        >
          Ref/No : __________
        </div>
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
                >store Form # item withdrawel
              </q-item-section>
              <q-item-section class="text-bold text-secondary">
              </q-item-section>
              <q-item-section class="text-primary" side-top
                ><q-badge class="text-caption bg-white text-black"
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

            <q-tr>
              <q-td :colspan="Object.keys(activeColumn).length - 1"> </q-td>
              <q-td class="text-h4 text-weight-bolder col-auto">
                VAT ( 10%)</q-td
              >
              <q-td> {{ vatPerc }} </q-td>
            </q-tr>

            <q-tr>
              <q-td :colspan="Object.keys(activeColumn).length - 1"> </q-td>
              <q-td class="text-h4 text-weight-bolder col-auto">
                Grand Total</q-td
              >
              <q-td>
                {{ (Number(subtotal["Total"]) * vatPerc).toFixed(1) }}
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

        <!-------------------Footer-->
        <div class="justify-center q-mt-md rounded-radius rounded">
          <q-pagination
            v-model="pagination.page"
            color="grey-8"
            :max="pagesNumber"
            size="sm"
          />
          Page_ <q-td colspan="10%"> </q-td>
        </div>
        <div>
          <q-list>
            <q-item>
              <q-item-section class="fit justify-between">
                <q-item-label icon="verified_user" class="text-bold">
                  produced by:</q-item-label
                >
                <q-item-label>
                  {{ props._who["department"] }} @
                  {{ props._who["position"] }}
                </q-item-label>
                <q-item-label caption lines="2">
                  {{ props._who["name"] }} :___________________
                </q-item-label>
              </q-item-section>

              <q-item-section side>
                <q-item-label icon="user" class="text-bold">
                  Receipant ;:-</q-item-label
                >
                <q-item-label>
                  {{ props._who["department"] }} @
                  {{ __whoprofile["id"] }}
                </q-item-label>
                <q-item-label caption lines="2">
                  {{ __whoprofile["name"] }}
                </q-item-label>
              </q-item-section>
            </q-item>

            <q-item class="items-center q-gutter-xs justify-center q-pa-none">
              <q-item-section class="text-bold col-2 q-pa-none">
              </q-item-section>
              <q-item-section
                class="text-bold q-pa-none self-begin q-gutter-xs"
              >
                authorized by ;
              </q-item-section>
              <q-item-section class="q-pa-none self-start">
                <q-item-label> Name </q-item-label>
                <q-item-label> ____________________ </q-item-label>
              </q-item-section>
              <q-item-section class="text-bold col-2 q-pa-none">
              </q-item-section>
            </q-item>

            <q-item class="q-px-md">
              <q-btn-group :dense="true" class="text-caption" size="xs">
                <q-btn
                  :dense="true"
                  push
                  color="purple"
                  label="yirgugase@facebook"
                  class="text-caption"
                  size="xs"
                />
              </q-btn-group>

              <q-btn
                :dense="true"
                label="yirgu#auto / facebook@yirgugases"
                class="fit text-caption"
              >
              </q-btn>
            </q-item>
          </q-list>
        </div>
        <!--------------Foooter END-->
      </q-card-section>
    </q-card>
  </q-dialog>
  <!---------------------------------------------------->

  <!-------------------------FORM_3-->
  <q-dialog v-model="financeForm">
    <q-card
      id="printSalary"
      class="row q-pa-none q-ma-none"
      style="height: 100vh; width: 100vw"
    >
      <q-card-section style="width: 100%">
        <div>
          <q-list>
            <q-item cass="justify-between">
              <q-item-section avatar>
                <q-avatar>
                  <img
                    id="mybutton"
                    onclick="window.print()"
                    src="~assets/yirgumini.jpg"
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
        <div
          style="font-size: 15px; color: rgb(6, 6, 99); width: 100%"
          class="text-overline row justify-end"
        >
          Ref/No : __________
        </div>
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
                >Finance Report - Operational Cash Flow
              </q-item-section>
              <q-item-section class="text-bold text-secondary col-auto">
              </q-item-section>
              <q-item-section class="text-primary col-auto" side-top
                ><q-badge class="text-caption bg-white text-black"
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
              <q-td :colspan="2" />
              <q-td> Sold goods </q-td>
              <q-td> </q-td>
            </q-tr>

            <q-tr>
              <q-td :colspan="2" />
              <q-td> Sold products </q-td>
              <q-td> </q-td>
            </q-tr>

            <q-tr>
              <q-td :colspan="Object.keys(activeColumn).length + 1">
                Cash paid for
              </q-td>
            </q-tr>

            <q-tr>
              <q-td :colspan="2" />
              <q-td class="text-h4 text-weight-bolder"> purchase</q-td>
              <q-td> </q-td>
            </q-tr>

            <q-tr>
              <q-td :colspan="2" />
              <q-td class="text-h4 text-weight-bolder"> Wedges</q-td>
              <q-td> </q-td>
            </q-tr>

            <q-tr>
              <q-td :colspan="2" />
              <q-td class="text-h4 text-weight-bolder"> Income Tax</q-td>
              <q-td> </q-td>
            </q-tr>

            <q-tr>
              <q-td :colspan="2" />
              <q-td class="text-h4 text-weight-bolder"> Utilitiy</q-td>
              <q-td> </q-td>
            </q-tr>

            <q-tr>
              <q-td :colspan="2" />
              <q-td class="text-h4 text-weight-bolder"> Administration</q-td>
              <q-td> </q-td>
            </q-tr>

            <q-tr>
              <q-td :colspan="Object.keys(activeColumn).length - 1"> </q-td>
            </q-tr>
          </template>
        </q-table>

        <!-------------------Footer-->
        <div class="justify-center q-mt-md rounded-radius rounded">
          <q-pagination
            v-model="pagination.page"
            color="grey-8"
            :max="pagesNumber"
            size="sm"
          />
          Page_ <q-td colspan="10%"> </q-td>
        </div>
        <div>
          <q-list>
            <q-item>
              <q-item-section class="fit justify-between">
                <q-item-label icon="verified_user" class="text-bold">
                  produced by:</q-item-label
                >
                <q-item-label>
                  {{ props._who["department"] }} @
                  {{ props._who["position"] }}
                </q-item-label>
                <q-item-label caption lines="2">
                  {{ props._who["name"] }} :___________________
                </q-item-label>
              </q-item-section>

              <q-item-section side>
                <q-item-label icon="user" class="text-bold">
                  Receipant ;:-</q-item-label
                >
                <q-item-label>
                  {{ props._who["department"] }} @
                  {{ __whoprofile["id"] }}
                </q-item-label>
                <q-item-label caption lines="2">
                  {{ __whoprofile["name"] }} :___________________
                </q-item-label>
              </q-item-section>
            </q-item>

            <q-item class="items-center q-gutter-xs justify-center q-pa-none">
              <q-item-section class="text-bold col-2 q-pa-none">
              </q-item-section>
              <q-item-section
                class="text-bold q-pa-none self-begin q-gutter-xs"
              >
                authorized by ;
              </q-item-section>
              <q-item-section class="q-pa-none self-start">
                <q-item-label> Name </q-item-label>
                <q-item-label> ____________________ </q-item-label>
              </q-item-section>
              <q-item-section class="text-bold col-2 q-pa-none">
              </q-item-section>
            </q-item>

            <q-item class="q-px-md">
              <q-btn-group :dense="true" class="text-caption" size="xs">
                <q-btn
                  :dense="true"
                  push
                  color="purple"
                  label="yirgugase@facebook"
                  class="text-caption"
                  size="xs"
                />
              </q-btn-group>

              <q-btn
                :dense="true"
                label="yirgu#auto / facebook@yirgugases"
                class="fit text-caption"
              >
              </q-btn>
            </q-item>
          </q-list>
        </div>
        <!--------------Foooter END-->
      </q-card-section>
    </q-card>
  </q-dialog>

  <!------------------------------------------ -->
  <div v-if="exportType.length">
    <div
      class="q-pa-none rounded-borders text-bold"
      :class="$q.dark.isActive ? 'text-primary' : 'text-secondary'"
    >
      Report Data | Forms :
      <q-option-group
        name="reportType"
        v-model="prefexType"
        :options="exportType"
        color="primary"
        inline
        class="text-caption"
      />
    </div>
    <div class="q-pa-sm q-gutter-sm row">
      <div class="q-gutter-xs row q-pa-sm items-start flex-center">
        <q-btn
          dense
          class="text-caption col"
          label="Export Report"
          glossy
          color="purple"
          @click="_reportSelected(prefexType)"
        />
        <div class="q-gutter-xs q-pa-sm">
          <div
            v-if="Object.keys(props._whoreceiver).length !== 0"
            class="text-overline text-bold"
          >
            <q-badge rounded color="green text-bold" />
            {{ __whoprofile["name"] }}
          </div>
          <div v-else class="text-caption">
            <q-badge rounded color="yellow" /> [Receipent Status]
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, defineAsyncComponent, computed } from "vue";
import { useQuasar } from "quasar";

import axios from "axios";

const API_URL = "http://192.168.1.6:9100/";
const serviceApi = axios.create({ baseURL: API_URL, timeout: 7000 });

const $q = useQuasar();

//------------

const nul = [null, undefined, false, "", [], {}, NaN];
//------------

//if( typeof window != undefined)
const props = defineProps({
  _schemaColumns: { type: Array, default: () => [], required: false }, //fetch_basic schema of the base table
  _thisModel: { type: String, default: "", required: false }, //fetch_basic schema of the base table
  selected: { type: Array, default: () => [], required: false }, //fetch the selected datas.....
  _extraData: { type: Object, default: () => ({}), required: false }, //
  _who: { type: Object, default: () => ({}), required: false }, //the profile informations of user_loged
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

const vatPerc = 0.1;
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

__whoprofile = computed(() => {
  return {
    name: props._whoreceiver["name"],
    id: props._whoreceiver["companyID"],
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
      { label: "Goods Receipt", value: "goodsR" },
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
      id: props._whoreceiver["companyID"],
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
  }
  if (exformat == "assetW") {
    //
    // export the lists/form datas as pdf
    reportRecieverID.value = "procurment";
    __whoprofile.value = {
      name: props._whoreceiver["name"],
      id: props._whoreceiver["companyID"],
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
    //specColumns.value={'Total':['takenBy.quantity',cost'}
  }
  if (exformat == "assetR") {
    //
    // export the lists/form datas as pdf
    reportRecieverID.value = "procurment";
    __whoprofile.value = {
      name: props._whoreceiver["name"],
      id: props._whoreceiver["companyID"],
    };

    listForm.value = true; //poping up
    var result = exportType.value.find((item) => item.value === exformat);
    activeForm.value = result["label"];
    activeColumn = {
      assetName: "",
      model: "",
      Quantity: ["returnedBy.quantity", ""],
    };
    //specColumns.value={'Total':['takenBy.quantity',cost'}
  }
  if (exformat == "letter") {
    //
    // export the lists/form datas as pdf
    reportRecieverID.value = "procurment";
    __whoprofile.value = {
      name: props._whoreceiver["name"],
      id: props._whoreceiver["companyID"],
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
  }
  //-------------------------------------------------------------------------------------ASSETS

  if (exformat == "rawD") {
    //
    // export the lists/form datas as pd
    reportRecieverID.value = "procurment";
    __whoprofile.value = {
      name: props._whoreceiver["name"],
      id: props._whoreceiver["companyID"],
    };

    listForm.value = true; //poping up
    var result = exportType.value.find((item) => item.value === exformat);
    activeForm.value = result["label"];
    activeColumn = {
      rawType: "",
      rawName: "",
      itemQuantity: ["tQ", ""],
      Totalcost: ["tQC", ""],
    };
  }
  if (exformat == "rawW") {
    //
    // export the lists/form datas as pdf
    reportRecieverID.value = "procurment";
    __whoprofile.value = {
      name: props._whoreceiver["name"],
      id: props._whoreceiver["companyID"],
    };

    listForm.value = true; //poping up
    var result = exportType.value.find((item) => item.value === exformat);
    activeForm.value = result["label"];
    activeColumn = {
      rawType: "",
      rawName: "",
      withdrawquantity: ["takenBy.quantity", ""],
    };
  }

  //----------------------------------------------------------GOOODS
  if (exformat == "goodsD") {
    //
    // export the lists/form datas as pdf
    reportRecieverID.value = "procurment";
    __whoprofile.value = {
      name: props._whoreceiver["name"],
      id: props._whoreceiver["companyID"],
    };

    listForm.value = true; //poping up
    var result = exportType.value.find((item) => item.value === exformat);
    activeForm.value = result["label"];
    activeColumn = {
      goodsName: "",
      ItemQs: "",
      cost: "",
      Total: ["tQC", "*"],
    };
  }

  if (exformat == "goodsW") {
    //
    // export the lists/form datas as pdf
    reportRecieverID.value = "procurment";
    __whoprofile.value = {
      name: props._whoreceiver["name"],
      id: props._whoreceiver["companyID"],
    };

    listForm.value = true; //poping up
    var result = exportType.value.find((item) => item.value === exformat);
    activeForm.value = result["label"];
    let arrayIndex = "";
    activeColumn = { goodsName: "", Quantity: ["saleStatus.soldQuantity", ""] };
  }
  if (exformat == "goodssale") {
    //
    // export the lists/form datas as pdf
    reportRecieverID.value = "procurment";
    __whoprofile.value = {
      name: props._whoreceiver["customerName"],
      id: props._whoreceiver["customerID"],
    };

    receiptForm.value = true; //poping up
    var result = exportType.value.find((item) => item.value === exformat);
    activeForm.value = result["label"];
    let arrayIndex = "";
    activeColumn = { goodsName: "", Quantity: ["saleStatus.soldQuantity", ""] };
  }
  if (exformat == "goodsR") {
    // export the lists/form datas as pdf
    reportRecieverID.value = "procurment";
    __whoprofile.value = {
      name: props._whoreceiver["name"],
      id: props._whoreceiver["companyID"],
    };

    receiptForm.value = true; //poping up
    let arrayIndex = "";
    var result = exportType.value.find((item) => item.value === exformat);
    activeForm.value = result["label"];
    activeColumn = {
      goodsName: "",
      Quantity: ["saleStatus.soldQuantity", ""],
      UnitPrice: ["saleStatus.itemPrice", ""],
      Total: ["saleStatus.soldQuantity", "saleStatus.itemPrice", "*"],
    };
  }
  if (exformat == "productD") {
    //
    // export the lists/form datas as pdf
    reportRecieverID.value = "procurment";
    __whoprofile.value = {
      name: props._whoreceiver["name"],
      id: props._whoreceiver["companyID"],
    };

    receiptForm.value = true; //poping up
    var result = exportType.value.find((item) => item.value === exformat);
    activeForm.value = result["label"];
    activeColumn = {
      plantName: "",
      cylinderSerial: "",
      "ItemQuantit(m3)": ["ItemQs", ""],
      cylinderOwner: "",
    };
  }
  if (exformat == "productsale") {
    //
    // export the lists/form datas as pdf
    reportRecieverID.value = "procurment";
    __whoprofile.value = {
      name: props._whoreceiver["name"],
      id: props._whoreceiver["companyID"],
    };

    receiptForm.value = true; //poping up
    var result = exportType.value.find((item) => item.value === exformat);
    activeForm.value = result["label"];
    activeColumn = {
      plantName: "",
      cylinderSerial: "",
      "ItemQuantit(m3)": ["ItemQs", ""],
      cylinderOwner: "",
    };
  }

  if (exformat == "attend") {
    //
    // export the lists/form datas as pdf
    reportRecieverID.value = "procurment";
    __whoprofile.value = {
      name: props._whoreceiver["name"],
      id: props._whoreceiver["companyID"],
    };

    receiptForm.value = true; //poping up
    var result = exportType.value.find((item) => item.value === exformat);
    activeForm.value = result["label"];
    activeColumn = {
      name: "",
      companyID: "",
      "G.salary": ["tQC", ""],
      pension: "",
      incTax: "",
      advancePay: "",
      netSalary: "",
    };
    //specColumns.value={'Total':['takenBy.quantity',cost'}
  }
  if (exformat == "salary") {
    //
    // export the lists/form datas as pdf
    reportRecieverID.value = "procurment";
    __whoprofile.value = {
      name: props._whoreceiver["name"],
      id: props._whoreceiver["companyID"],
    };

    receiptForm.value = true; //poping up
    var result = exportType.value.find((item) => item.value === exformat);
    activeForm.value = result["label"];
    activeColumn = {
      name: "",
      companyID: "",
      GrossSalary: [
        "salary.grossSalary",
        "salary.allowance",
        "salary.topUp",
        "+",
      ],
    };
    //specColumns.value={'Total':['takenBy.quantity',cost'}
  }

  if (exformat == "stat") {
    receiptForm.value = true; //poping up
    reportRecieverID.value = "procurment";
    __whoprofile.value = {
      name: props._whoreceiver["name"],
      id: props._whoreceiver["companyID"],
    };

    var result = exportType.value.find((item) => item.value === exformat);
    activeForm.value = result["label"];
    activeColumn = {
      Income: ["tIP", ""],
      IncomeRevable: ["tIR", ""],
      CapitalCont: ["capInc", ""],
      Expense: ["tXP", ""],
      ExpensePayable: ["tXR", ""],
    };
  }

  if (exformat == "rec") {
    // export the lists/form datas as doc
    reportRecieverID.value = "procurment";
    __whoprofile.value = {
      name: props._whoreceiver["name"],
      id: props._whoreceiver["companyID"],
    };

    receiptForm.value = true;
    var result = exportType.value.find((item) => item.value === exformat);
    activeForm.value = result["label"];
    activeColumn = { assetName: "", model: "", tags: "", storeStatus: "" };
  }

  if (exformat == "fin") {
    // export the lists/form datas as doc
    reportRecieverID.value = "procurment";
    __whoprofile.value = {
      name: props._whoreceiver["name"],
      id: props._whoreceiver["companyID"],
    };

    financeForm.value = true;
    var result = exportType.value.find((item) => item.value === exformat);
    activeForm.value = result["label"];
    activeColumn = { assetName: "", model: "", tags: "", storeStatus: "" };
  }
  analysisReporting();
  return true;
}
//////////////////////////////////////////////////////////////////////////////////FORM_ONE ==--- salary style---attendance
//-----Selected----Reporting Options

/////////////////////////////////////////////////////Organize DaTAS....& analysis................#

async function analysisReporting() {
  let itemsSkeltonData = []; //list of selected object value
  subtotal = { cost: 0, ItemQs: 0, Total: 0 };

  for (let items in props.selected) {
    //list of items (index in itemList)
    let itemData = props.selected[items]; //values of every items as dic(obj_form)

    let itemskelton = {}; //{ No: String(parseInt(items) + 1) }; //activeColumn;
    itemskelton = { No: String(parseInt(items) + 1) }; //activeColumn;

    for (let key in activeColumn) {
      //item_key:value sckelton.....--- {'cost':['cost.unitcost','total'] } ,....}
      let activeValue = activeColumn[key]; //holds the--valueOf keys -----------['cost.unitcost','totals'] of 'cost'_key
      // console.log('totalkeys',key ,typeof activeValue )

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
                console.log(kkey, "kkey", props._whoreceiver[kkey]);

                if (!nul.includes(itemData[indexOneav[0]]) && kkey) {
                  for (let index in itemData[indexOneav[0]]) {
                    console.log(kkey, "kkey2", props._whoreceiver[kkey]);

                    if (
                      kkey == itemData[indexOneav[0]][index][kkey]
                    ) {
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
              // console.log("valuewwww2DDDDDDDDDDDDDDw",itemskelton)
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
        //console.log(itemskelton,'itemSkelton',activeColumn)
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
    }

    itemsSkeltonData[items] = itemskelton;
  }

  selectedDatas.value = itemsSkeltonData; //itemsDatas //noColRow
  subtotal["no"] = itemsSkeltonData.length + 1;
  //selectedDatas.value.push(subtotal);
  return true;
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
