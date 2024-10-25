<style>
/*
 * Loading Dots
 * Can we use pseudo elements here instead :after?
 */
.loading span {
  display: inline-block;
  vertical-align: middle;
  width: 0.6em;
  height: 0.6em;
  margin: 0.19em;
  background: #007db6;
  border-radius: 0.6em;
  animation: loading 1s infinite alternate;
}

/*<q-input
 * Dots Colors
 * Smarter targeting vs nth-of-type?
 */
.loading span:nth-of-type(2) {
  background: #008fb2;
  animation-delay: 0.2s;
}
.loading span:nth-of-type(3) {
  background: #009b9e;
  animation-delay: 0.4s;
}
.loading span:nth-of-type(4) {
  background: #00a77d;
  animation-delay: 0.6s;
}
.loading span:nth-of-type(5) {
  background: #00b247;
  animation-delay: 0.8s;
}
.loading span:nth-of-type(6) {
  background: #5ab027;
  animation-delay: 1s;
}
.loading span:nth-of-type(7) {
  background: #a0b61e;
  animation-delay: 1.2s;
}

/*
 * Animation keyframes
 * Use transition opacity instead of keyframes?
 */
@keyframes loading {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
<template>
  <q-page class="flex flex-center column" v-if="loadingPage">
    <div>
      <span class="text-bold"
        >Yirgu Gas Plant -
        <span class="text-overline">Registeration </span></span
      >
    </div>
    <div>
      <q-spinner-orbit size="sm" color="blue" />
    </div>
  </q-page>

  <q-page
    class="row flex flex-center text-blue"
    v-else
    style="background: rgba(209, 209, 209, 0.253)"
  >
    <q-card class="column col-4 q-px-lg" flat bordered style="min-width: 250px">
      <q-card-section class="text-h6 text-blue q-gutter-sm row justify-even">
        Registered Employee List
        <q-btn
          class="color-blue col-auto text-caption"
          :dense="true"
          to="/"
          lable="SignIn"
          >LogOut
        </q-btn>

        <q-btn
          class="color-blue col-auto text-caption"
          :dense="true"
          to="/user/blog"
          lable="SignIn"
          >GoTo blog
        </q-btn>

        <q-fab
          :label="_who['name']"
          icon="user"
          color="purple"
          padding="none xl"
        >
          <!--q-fab-action padding="3px" external-label color="primary" @click="onClick" icon="mail" label="Email" /-->
          <q-card
            style="
              font-size: medium;
              font-family: Georgia, 'Times New Roman', Times, serif;
              background-color: rgba(255, 255, 255, 0);
              border: 0.2px solid rgba(255, 255, 255, 0.247);
              width: 10vw;
            "
          >
            userName ; {{ _who.name }}
          </q-card>
        </q-fab>
      </q-card-section>
      <q-card-section
        classs="col"
        style="min-height: 60vh; width: 100%"
        class="bg-grey-3 text-black shadow-4 rounded-borders"
      >
        <q-item class="text-bold">
          Employees Names:-
          <div class="text-caption text-secondary q-px-xs">
            {{ employees.length + "  #Employees registered" }}
          </div>
        </q-item>

        <q-separator color="blue" inset />

        <q-scroll-area
          style="height: 60vh; width: 100%"
          v-if="employees.length !== 0"
        >
          <q-item
            v-for="(employee, ind) in employees"
            :key="employee.id"
            class="row"
          >
            <q-item-section
              :style="[
                activeEmployee.id === employee.id
                  ? { background: 'grey', text: 'black' }
                  : { text: '#FFF' },
              ]"
            >
              <q-item clickable @click="selectEmployee(employee)">
                #{{ ind + 1 }} {{ employee.name }}</q-item
              >
            </q-item-section>
            <q-item-section side>
              <q-btn round size="xs" icon="print" class="transparent" label="">
                <q-menu transition-show="scale" transition-hide="scale">
                  <q-list>
                    <q-item
                      class="col-auto"
                      clickable
                      @click="Crud_.deleteData(employee.id)"
                    >
                      <q-item-section class="text-caption col-auto text-red">
                        <q-item-label> Delete</q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item class="col-auto" clickable to="/user/login">
                      <q-item-section class="text-caption col-auto text-red">
                        <q-item-label> Sign In</q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-btn>
            </q-item-section>
            <q-separator spaced />
          </q-item>
        </q-scroll-area>

        <div
          style="height: 60vh; width: 100%"
          class="column flex flex-center"
          v-else
        >
          <span class="text-caption"> Waiting....</span>
          <q-spinner-tail color="blue-grey" />
        </div>
      </q-card-section>
    </q-card>

    <q-card class="col-5">
      <q-tabs
        v-model="AEmode"
        dense
        class="col text-grey justify"
        active-color="primary"
        indicator-color="secondary"
        wide-indicator
      >
        <q-tab name="Register" label="Register Employee" />
        <q-tab name="Update" label="Update Employee" />
      </q-tabs>

      <q-separator />

      <q-tab-panels
        v-model="AEmode"
        animated
        style="width: 100%; min-height: 65vh"
        class="col"
      >
        <q-tab-panel name="Update" class="col">
          <q-card-section class="text-bold">
            <q-item>
              <q-item-section>
                <q-item-label>Updating Employee Data ! </q-item-label>
                <q-item-label class="text-negative text-bold" v-if="Object.keys(activeEmployee).length > 0">
                  * {{ activeEmployee.name }} *
                </q-item-label>
              </q-item-section>

              <q-item-section class="col-auto row">
                <q-btn
                  class="color-blue col-auto"
                  @click="Crud_.updateData(activeEmployee)"
                  lable="update"
                >
                  Update
                </q-btn>
              </q-item-section>
            </q-item>
          </q-card-section>

          <q-card-section v-if="Object.keys(activeEmployee).length > 0">
            <q-scroll-area
              class="rounded-borders outlined column shadow-1 text-overline text-light"
              style="width: 100%; height: 70vh; background: rgb(255, 255, 255)"
            >
              <q-list class="q-gutter-xs rounded-borders outlined">
                <q-item
                  v-for="(columns, topColumnName) in employeeSchema"
                  :key="topColumnName"
                  class="rounded-borders outlined column shadow-1 text-overline text-light"
                  :set="(tempCols = 'columns')"
                  style="background: rgb(255, 255, 255)"
                >
                  <template v-if="topColumnName == 'departmentt'">
                    <q-item-section
                      class="col-auto"
                      style="
                        overflow: auto;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                      "
                    >
                      {{ topColumnName.toUpperCase() }}
                    </q-item-section>
                    <q-item-section class="column q-gutter-xs">
                      <q-select
                        color="secondary"
                        outlined
                        dense
                        v-model="activeEmployee[topColumnName]['department']"
                        :options="
                          employeeSchema[topColumnName]['department']['enum']
                        "
                        single
                        use-chips
                        stack-label
                        label-color="orange"
                        :label="`Choose Options -${[topColumnName]}`"
                        >department:
                      </q-select>

                      <q-select
                        color="secondary"
                        outlined
                        dense
                        v-model="activeEmployee[topColumnName]['position']"
                        :options="
                          roles[activeEmployee[topColumnName]['department']]
                        "
                        single
                        use-chips
                        stack-label
                        label-color="orange"
                        :label="`Choose Options -${[topColumnName]}`"
                      >
                        Role:
                      </q-select>
                    </q-item-section>
                  </template>

                  <template v-else>
                    <!-----  Single Valued Data Columns TOP Column-->
                    <q-item-section
                      class="col-3"
                      style="
                        overflow: auto;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                      "
                    >
                      {{ topColumnName.toUpperCase() }}
                    </q-item-section>
                    <q-item-section class="col" v-if="'type' in columns">
                      <!--- is it Enumuratable -->
                      <template v-if="'enum' in columns">
                        <!-----& is it multiple item selectable...options  [multiple select Enums]-->
                        <template v-if="columns['type'] == 'Array'">
                          <q-select
                            color="secondary"
                            outlined
                            dense
                            v-model="activeEmployee[topColumnName]"
                            :options="columns.enum"
                            multiple
                            use-chips
                            stack-label
                            label-color="orange"
                            :label="`Choose Options -${[topColumnName]}`"
                          >
                          </q-select>
                        </template>

                        <!---------or single item selectable...Options  [ single select Enums]-->
                        <template v-else>
                          <q-select
                            color="secondary"
                            outlined
                            dense
                            v-model="activeEmployee[topColumnName]"
                            :options="columns.enum"
                            single
                            use-chips
                            stack-label
                            label-color="orange"
                            :label="`Select Options -${[topColumnName]}`"
                            :rules="[
                              (val) =>
                                (val && val.length > 0) || 'Choose One !',
                            ]"
                          >
                          </q-select>
                        </template>
                      </template>

                      <!--- is it Non Enumuratable // Single Input -->
                      <template v-else>
                        <q-input
                          dense
                          filled
                          v-model="activeEmployee[topColumnName]"
                          :type="columns['type']"
                          :rules="employeeSchema[topColumnName][ruleset]"
                        >
                        </q-input>
                      </template>
                    </q-item-section>

                    <!--- or is it Object _valued TOP Columns-->
                    <q-item-section class="col" v-else>
                      <q-list
                        v-for="(columnsG, topColumnNameG) in columns"
                        :key="topColumnNameG"
                        class="col column text-overline text-light"
                        style="width: 100%"
                      >
                        <q-item class="row" v-if="'type' in columnsG">
                          <template v-if="'enum' in columnsG">
                            <q-item text-caption class="col-3">
                              {{ topColumnNameG }}</q-item
                            >
                            <template v-if="columnsG['type'] == 'Array'">
                              <q-select
                                style="min-width: 10vw"
                                color="secondary"
                                outlined
                                dense
                                v-model="
                                  activeEmployee[topColumnName][topColumnNameG]
                                "
                                :options="columnsG.enum"
                                multiple
                                use-chips
                                stack-label
                                label-color="orange"
                                :label="`Choose Options -${topColumnNameG}`"
                              >
                              </q-select>
                            </template>

                            <template v-else>
                              <q-select
                                style="min-width: 10vw"
                                color="secondary"
                                outlined
                                dense
                                v-model="
                                  activeEmployee[topColumnName][topColumnNameG]
                                "
                                :options="columnsG.enum"
                                single
                                use-chips
                                stack-label
                                label-color="cyan"
                                :label="`Select Options -${topColumnNameG}`"
                                :rules="[
                                  (val) =>
                                    (val && val.length > 0) || 'Choose One !',
                                ]"
                              >
                              </q-select>
                            </template>
                          </template>

                          <template v-else>
                            <q-input
                              dense
                              outlined
                              v-model="
                                activeEmployee[topColumnName][topColumnNameG]
                              "
                              :type="columnsG['type']"
                              :label="topColumnNameG"
                            >
                            </q-input>
                          </template>
                        </q-item>

                        <q-item v-else class="col row">
                          <fieldset class="col row">
                            <legend class="text-captions">
                              {{ topColumnNameG.toUpperCase() }}
                            </legend>

                            <q-list
                              v-for="(columnsGG, topColumnNameGG) in columnsG"
                              :key="topColumnNameGG"
                              class="col column text-overline text-light"
                            >
                              <q-item
                                v-if="'type' in columnsGG"
                                class="col row"
                              >
                                <template v-if="'enum' in columnsGG">
                                  <q-item text-caption class="col">
                                    {{ topColumnNameGG }}</q-item
                                  >
                                  <template v-if="columnsGG['type'] == 'Array'">
                                    <q-select
                                      style="min-width: 10vw"
                                      color="secondary"
                                      outlined
                                      dense
                                      v-model="
                                        activeEmployee[topColumnName][
                                          topColumnNameG
                                        ][topColumnNameGG]
                                      "
                                      :options="columnsGG.enum"
                                      multiple
                                      use-chips
                                      stack-label
                                      label-color="orange"
                                      :label="`Choose Options -${topColumnNameGG}`"
                                    >
                                    </q-select>
                                  </template>
                                  <template v-else>
                                    <q-select
                                      style="min-width: 10vw"
                                      color="secondary"
                                      outlined
                                      dense
                                      v-model="
                                        activeEmployee[topColumnName][
                                          topColumnNameG
                                        ][topColumnNameGG]
                                      "
                                      :options="columnsGG.enum"
                                      single
                                      use-chips
                                      stack-label
                                      label-color="cyan"
                                      :label="`Select Options -${topColumnNameGG}`"
                                      :rules="[
                                        (val) =>
                                          (val && val.length > 0) ||
                                          'Choose One !',
                                      ]"
                                    >
                                    </q-select>
                                  </template>
                                </template>
                                <template v-else>
                                  <q-input
                                    style="min-width: 10vw"
                                    dense
                                    outlined
                                    v-model="
                                      activeEmployee[topColumnName][
                                        topColumnNameG
                                      ][topColumnNameGG]
                                    "
                                    :type="columnsGG['type']"
                                    :label="topColumnNameGG"
                                  >
                                  </q-input>
                                </template>
                              </q-item>
                              <!----fffffff-->
                              <q-item v-else class="row col">
                                <fieldset class="col">
                                  <legend class="text-captions">
                                    {{ topColumnNameGG.toUpperCase() }}
                                  </legend>

                                  <q-list
                                    v-for="(
                                      columnsGGG, topColumnNameGGG
                                    ) in columnsGG"
                                    class="col row text-overline text-light"
                                    :key="topColumnNameGGG"
                                  >
                                    <q-item
                                      class="col"
                                      v-if="'type' in columnsGGG"
                                    >
                                      <template v-if="'enum' in columnsGGG">
                                        <template
                                          v-if="columnsGGG['type'] == 'Array'"
                                        >
                                          <q-select
                                            style="min-width: 10vw"
                                            color="secondary"
                                            outlined
                                            dense
                                            v-model="
                                              activeEmployee[topColumnName][
                                                topColumnNameG
                                              ][topColumnNameGG][
                                                topColumnNameGGG
                                              ]
                                            "
                                            :options="columnsGGG.enum"
                                            multiple
                                            use-chips
                                            stack-label
                                            label-color="orange"
                                            :label="`Choose Options -${topColumnNameGGG}`"
                                          >
                                          </q-select>
                                        </template>
                                        <template v-else>
                                          <q-select
                                            style="min-width: 10vw"
                                            color="secondary"
                                            outlined
                                            dense
                                            v-model="
                                              activeEmployee[topColumnName][
                                                topColumnNameG
                                              ][topColumnNameGG][
                                                topColumnNameGGG
                                              ]
                                            "
                                            :options="columnsGGG.enum"
                                            single
                                            use-chips
                                            stack-label
                                            label-color="cyan"
                                            :label="`Select Options -${topColumnNameGGG}`"
                                            :rules="[
                                              (val) =>
                                                (val && val.length > 0) ||
                                                'Choose One !',
                                            ]"
                                          >
                                          </q-select>
                                        </template>
                                      </template>
                                      <template v-else>
                                        <q-input
                                          style="min-width: 10vw"
                                          dense
                                          outlined
                                          v-model="
                                            activeEmployee[topColumnName][
                                              topColumnNameG
                                            ][topColumnNameGG][topColumnNameGGG]
                                          "
                                          :type="columnsGGG['type']"
                                          :label="topColumnNameGGG"
                                        >
                                        </q-input>
                                      </template>
                                    </q-item>

                                    <q-item
                                      class="text-overline col"
                                      style=""
                                      v-else
                                    >
                                      <!------- D3 Form-->
                                      Woo ! Depth (D4)- is not supported
                                    </q-item>
                                  </q-list>
                                </fieldset>
                              </q-item>

                              <!---->
                            </q-list>
                          </fieldset>
                        </q-item>
                      </q-list>
                    </q-item-section>
                  </template>
                </q-item>

                <q-separator />
              </q-list>
            </q-scroll-area>
          </q-card-section>

          <q-card-section class="flex flex-center col" v-else>
            Select Employees Name To Edit ?
          </q-card-section>
        </q-tab-panel>
        <!-------------------------------REGISTRATIONS Begine-->

        <q-tab-panel name="Register">
          <q-card-section class="text-bold">
            <q-item>
              <q-item-section>
                <q-item-label>register Data New Employee ! </q-item-label>
              </q-item-section>
              <q-item-section class="row">
                <q-checkbox v-model="privilegeMode">
                  <span class="text-primary"> Privileges</span>
                </q-checkbox>
              </q-item-section>
              <q-item-section>
                <q-btn @click="Crud_.createData()" lable="register Employee">
                  register Employee
                </q-btn>
              </q-item-section>
            </q-item>
          </q-card-section>

          <q-card-section v-if="onplayRowItem">
            <q-scroll-area style="width: 100%; height: 70vh">
              <q-list class="q-gutter-xs rounded-borders outlined">
                <q-item
                  v-for="(columns, topColumnName) in employeeSchema"
                  :key="topColumnName"
                  class="rounded-borders outlined column shadow-1 text-overline text-light"
                  :set="(tempCols = 'columns')"
                  style="background: rgba(253, 253, 253, 0.877)"
                >
                  <template v-if="topColumnName == 'DataPrivilege'">
                    <div
                      class="col row q-gutter-xs wrap q-pa-sm"
                      v-if="privilegeMode"
                    >
                      <q-item-section class="col-auto">
                        {{ topColumnName.toUpperCase() }}
                      </q-item-section>

                      <q-item-section
                        class="col-2"
                        v-for="(columnsG, topColumnNameG) in columns"
                        :key="topColumnNameG"
                        style="width: 100%"
                      >
                        <!--q-select
                          color="secondary"
                          outlined
                          dense
                          v-model="onplayRowItem[topColumnName][topColumnNameG]"
                          :options="
                            employeeSchema[topColumnName][topColumnNameG][
                              'enum'
                            ]
                          "
                          single
                          use-chips
                          stack-label
                          label-color="orange"
                          :label="`Choose DataPrivileges On -${[
                            topColumnNameG,
                          ]}`"
                        >
                        </q-select-->

                        <!-----& is it multiple item selectable...options  [multiple select Enums]-->
                        <template v-if="columnsG['type'] == 'Array'">
                          <q-select
                            color="secondary"
                            outlined
                            dense
                            v-model="
                              onplayRowItem[topColumnName][topColumnNameG]
                            "
                            :options="
                              employeeSchema[topColumnName][topColumnNameG][
                                'enum'
                              ]
                            "
                            multiple
                            use-chips
                            stack-label
                            label-color="blue"
                            :label="`Choose Options -${[topColumnNameG]}`"
                          >
                          </q-select>
                        </template>

                        <!---------or single item selectable...Options  [ single select Enums]-->
                        <template v-else>
                          <q-select
                            color="secondary"
                            outlined
                            dense
                            v-model="
                              onplayRowItem[topColumnName][topColumnNameG]
                            "
                            :options="
                              employeeSchema[topColumnName][topColumnNameG][
                                'enum'
                              ]
                            "
                            single
                            use-chips
                            stack-label
                            label-color="orange"
                            :label="`Select Options -${[topColumnNameG]}`"
                            :rules="[
                              (val) =>
                                (val && val.length > 0) || 'Choose One !',
                            ]"
                          >
                          </q-select>
                        </template>

                        <!--- is it Non Enumuratable // Single Input -->
                      </q-item-section>
                    </div>
                  </template>

                  <template v-else>
                    <q-item-section
                      class="col-3"
                      style="
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                      "
                    >
                      {{ topColumnName.toUpperCase() }}
                    </q-item-section>

                    <!-----  Single Valued Data Columns TOP Column-->
                    <q-item-section class="col" v-if="'type' in columns">
                      <!--------------------------------D1-BBBBBBBBBBBBBBBBB-->
                      <!--- is it Enumuratable -->
                      <template v-if="'data' in columns">
                        <q-file
                          color="teal"
                          filled
                          v-model="onplayRowItem[topColumnName]"
                          :label="`Upload -${[topColumnName]}`"
                        >
                          <template v-slot:prepend>
                            <q-icon name="cloud_upload" />
                          </template>
                        </q-file>
                      </template>
                      <template v-else-if="'enum' in columns">
                        <!-----& is it multiple item selectable...options  [multiple select Enums]-->
                        <template v-if="columns['type'] == 'Array'">
                          <q-select
                            color="secondary"
                            outlined
                            dense
                            v-model="onplayRowItem[topColumnName]"
                            :options="columns.enum"
                            multiple
                            use-chips
                            stack-label
                            label-color="orange"
                            :label="`Choose Options -${[topColumnName]}`"
                          >
                          </q-select>
                        </template>

                        <!---------or single item selectable...Options  [ single select Enums]-->
                        <template v-else>
                          <q-select
                            color="secondary"
                            outlined
                            dense
                            v-model="onplayRowItem[topColumnName]"
                            :options="columns.enum"
                            single
                            use-chips
                            stack-label
                            label-color="orange"
                            :label="`Select Options -${[topColumnName]}`"
                            :rules="[
                              (val) =>
                                (val && val.length > 0) || 'Choose One !',
                            ]"
                          >
                          </q-select>
                        </template>
                      </template>

                      <!--- is it Non Enumuratable // Single Input -->
                      <template v-else>
                        <q-input
                          dense
                          filled
                          v-model="onplayRowItem[topColumnName]"
                          :type="columns['type']"
                          :rules="employeeSchema[topColumnName][ruleset]"
                        >
                        </q-input>
                      </template>
                    </q-item-section>

                    <!--- or is it Object _valued TOP Columns-->
                    <q-item-section class="col column" v-else>
                      <!--------------------------------D2-BBBBBBBBBBBBBBBBB-->
                      <q-list
                        v-for="(columnsG, topColumnNameG) in columns"
                        :key="topColumnNameG"
                        style="width: 100%"
                        class="col column"
                      >
                        <q-item class="col row" v-if="'type' in columnsG">
                          <template v-if="'enum' in columnsG">
                            <q-item text-caption class="col">
                              {{ topColumnNameG }}</q-item
                            >
                            <template v-if="columnsG['type'] == 'Array'">
                              <q-select
                                class="col"
                                color="secondary"
                                outlined
                                dense
                                v-model="
                                  onplayRowItem[topColumnName][topColumnNameG]
                                "
                                :options="columnsG.enum"
                                multiple
                                use-chips
                                stack-label
                                label-color="orange"
                                :label="`Choose Options -${topColumnNameG}`"
                              >
                              </q-select>
                            </template>

                            <template v-else>
                              <q-select
                                class="col"
                                color="secondary"
                                outlined
                                dense
                                v-model="
                                  onplayRowItem[topColumnName][topColumnNameG]
                                "
                                :options="columnsG.enum"
                                single
                                use-chips
                                stack-label
                                label-color="cyan"
                                :label="`Select Options -${topColumnNameG}`"
                                :rules="[
                                  (val) =>
                                    (val && val.length > 0) || 'Choose One !',
                                ]"
                              >
                              </q-select>
                            </template>
                          </template>

                          <template v-else>
                            <q-input
                              class="col"
                              dense
                              outlined
                              v-model="
                                onplayRowItem[topColumnName][topColumnNameG]
                              "
                              :type="columnsG['type']"
                              :label="topColumnNameG"
                            >
                            </q-input>
                          </template>
                        </q-item>

                        <q-item v-else class="col column q-py-md">
                          <!--------------------------------D3-BBBBBBBBBBBBBBBBB-->
                          <fieldset
                            class="col-12 row no-borders"
                            style="
                              min-height: 8vh;
                              border: 0 none;
                              font-family: Arial;
                            "
                          >
                            <legend class="text-captions text-black">
                              {{ topColumnNameG }}
                            </legend>

                            <q-list
                              v-for="(columnsGG, topColumnNameGG) in columnsG"
                              :key="topColumnNameGG"
                              class="col column"
                            >
                              <q-item
                                v-if="'type' in columnsGG"
                                class="col column"
                              >
                                <template v-if="'enum' in columnsGG">
                                  <q-item text-caption class="col">
                                    {{ topColumnNameGG }}</q-item
                                  >
                                  <template v-if="columnsGG['type'] == 'Array'">
                                    <q-select
                                      class="col"
                                      style="min-width: 10vw"
                                      color="secondary"
                                      outlined
                                      dense
                                      v-model="
                                        onplayRowItem[topColumnName][
                                          topColumnNameG
                                        ][topColumnNameGG]
                                      "
                                      :options="columnsG.enum"
                                      multiple
                                      use-chips
                                      stack-label
                                      label-color="orange"
                                      :label="`Choose Options -${topColumnNameGG}`"
                                    >
                                    </q-select>
                                  </template>

                                  <template v-else>
                                    <q-select
                                      class="col"
                                      style="min-width: 10vw"
                                      color="secondary"
                                      outlined
                                      dense
                                      v-model="
                                        onplayRowItem[topColumnName][
                                          topColumnNameG
                                        ][topColumnNameGG]
                                      "
                                      :options="columnsG.enum"
                                      single
                                      use-chips
                                      stack-label
                                      label-color="cyan"
                                      :label="`Select Options -${topColumnNameGG}`"
                                      :rules="[
                                        (val) =>
                                          (val && val.length > 0) ||
                                          'Choose One !',
                                      ]"
                                    >
                                    </q-select>
                                  </template>
                                </template>

                                <template v-else>
                                  <q-input
                                    class="col"
                                    dense
                                    outlined
                                    v-model="
                                      onplayRowItem[topColumnName][
                                        topColumnNameG
                                      ][topColumnNameGG]
                                    "
                                    :type="columnsG['type']"
                                    :label="topColumnNameGG"
                                  >
                                  </q-input>
                                </template>
                              </q-item>
                              <!----fffffff-->
                              <q-item class="col row" v-else>
                                <!--------------------------------D4-BBBBBBBBBBBBBBBBB-->
                                <fieldset class="col row">
                                  <legend class="text-captions">
                                    {{ topColumnNameGG }}
                                  </legend>

                                  <q-list
                                    v-for="(
                                      columnsGGG, topColumnNameGGG
                                    ) in columnsGG"
                                    :key="topColumnNameGGG"
                                    class="col row"
                                  >
                                    <q-item
                                      v-if="'type' in columnsGGG"
                                      class="row"
                                    >
                                      <template v-if="'enum' in columnsGGG">
                                        <template
                                          v-if="columnsGGG['type'] == 'Array'"
                                        >
                                          <q-select
                                            class="col"
                                            style="min-width: 10vw"
                                            color="secondary"
                                            outlined
                                            dense
                                            v-model="
                                              onplayRowItem[topColumnName][
                                                topColumnNameG
                                              ][topColumnNameGG][
                                                topColumnNameGGG
                                              ]
                                            "
                                            :options="columnsGGG.enum"
                                            multiple
                                            use-chips
                                            stack-label
                                            label-color="orange"
                                            :label="`Choose Options -${topColumnNameGGG}`"
                                          >
                                          </q-select>
                                        </template>

                                        <template v-else>
                                          <q-select
                                            class="col"
                                            style="min-width: 10vw"
                                            color="secondary"
                                            outlined
                                            dense
                                            v-model="
                                              onplayRowItem[topColumnName][
                                                topColumnNameG
                                              ][topColumnNameGG][
                                                topColumnNameGGG
                                              ]
                                            "
                                            :options="columnsGGG.enum"
                                            single
                                            use-chips
                                            stack-label
                                            label-color="cyan"
                                            :label="`Select Options -${topColumnNameGGG}`"
                                            :rules="[
                                              (val) =>
                                                (val && val.length > 0) ||
                                                'Choose One !',
                                            ]"
                                          >
                                          </q-select>
                                        </template>
                                      </template>

                                      <template v-else>
                                        <q-input
                                          class="col"
                                          style="min-width: 10vw"
                                          dense
                                          outlined
                                          v-model="
                                            onplayRowItem[topColumnName][
                                              topColumnNameG
                                            ][topColumnNameGG][topColumnNameGGG]
                                          "
                                          :type="columnsGGG['type']"
                                          :label="topColumnNameGGG"
                                        >
                                        </q-input>
                                      </template>
                                    </q-item>

                                    <q-item v-else>
                                      <!--------------------------------D5-BBBBBBBBBBBBBBBBB-->

                                      <fieldset class="col row">
                                        <legend class="text-captions">
                                          {{ topColumnNameGGG }}
                                        </legend>

                                        <q-list
                                          v-for="(
                                            columnsGGGG, topColumnNameGGGG
                                          ) in columnsGGG"
                                          :key="topColumnNameGGGG"
                                          class="col row"
                                        >
                                          <q-item
                                            class="col"
                                            v-if="'type' in columnsGGGG"
                                          >
                                            <template
                                              v-if="'enum' in columnsGGGG"
                                            >
                                              <template
                                                v-if="
                                                  columnsGGGG['type'] == 'Array'
                                                "
                                              >
                                                <q-select
                                                  style="min-width: 10vw"
                                                  color="secondary"
                                                  outlined
                                                  dense
                                                  v-model="
                                                    onplayRowItem[
                                                      topColumnName
                                                    ][topColumnNameG][
                                                      topColumnNameGG
                                                    ][topColumnNameGGG][
                                                      topColumnNameGGGG
                                                    ]
                                                  "
                                                  :options="columnsGGG.enum"
                                                  multiple
                                                  use-chips
                                                  stack-label
                                                  label-color="orange"
                                                  :label="`Choose Options -${topColumnNameGGGG}`"
                                                >
                                                </q-select>
                                              </template>

                                              <template v-else>
                                                <q-select
                                                  style="min-width: 10vw"
                                                  color="secondary"
                                                  outlined
                                                  dense
                                                  v-model="
                                                    onplayRowItem[
                                                      topColumnName
                                                    ][topColumnNameG][
                                                      topColumnNameGG
                                                    ][topColumnNameGGG][
                                                      topColumnNameGGGG
                                                    ]
                                                  "
                                                  :options="columnsGGGG.enum"
                                                  single
                                                  use-chips
                                                  stack-label
                                                  label-color="cyan"
                                                  :label="`Select Options -${topColumnNameGGGG}`"
                                                  :rules="[
                                                    (val) =>
                                                      (val && val.length > 0) ||
                                                      'Choose One !',
                                                  ]"
                                                >
                                                </q-select>
                                              </template>
                                            </template>

                                            <template v-else>
                                              <q-input
                                                style="min-width: 10vw"
                                                dense
                                                outlined
                                                v-model="
                                                  onplayRowItem[topColumnName][
                                                    topColumnNameG
                                                  ][topColumnNameGG][
                                                    topColumnNameGGG
                                                  ][topColumnNameGGGG]
                                                "
                                                :type="columnsGGG['type']"
                                                :label="topColumnNameGGGG"
                                              >
                                              </q-input>
                                            </template>
                                          </q-item>

                                          <q-item
                                            class="text-overline"
                                            style=""
                                            v-else
                                          >
                                            <!------- D3 Form-->
                                            Woo ! Depth (D4)- is not supported
                                          </q-item>
                                        </q-list>
                                      </fieldset>
                                    </q-item>
                                  </q-list>
                                </fieldset>
                              </q-item>

                              <!---->
                            </q-list>
                          </fieldset>
                        </q-item>
                      </q-list>
                    </q-item-section>
                  </template>
                </q-item>

                <q-separator />
              </q-list>
            </q-scroll-area>
          </q-card-section>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>

    <!----     --->
  </q-page>

  <q-page-sticky position="bottom-left" :offset="[18, 18]">
    <q-fab
      label="YG _ registerData Employees"
      vertical-actions-align="left"
      color="blue"
      padding="none xl"
      direction="down"
    >
      <!--q-fab-action padding="3px" external-label color="primary" @click="onClick" icon="mail" label="Email" /-->
    </q-fab>
  </q-page-sticky>
</template>

<script setup>
import { onMounted, reactive, ref, watch, computed } from "vue";
import { useQuasar } from "quasar";
import { employeeSchema } from "src/composables/modelSchemas";

import dataschemaskl from "src/composables/schemaDataSkelton";


//---------------------Login form
import { profileStore } from "stores/authenticatedStore/profileStore";

const $q = useQuasar();

const profileService = profileStore();

let loadingPage = ref(true);
var AEmode = ref("Register");
var privilegeMode = ref(false);

let loadingError = ref(false); //INIT _-loading page State( informations Display)
let pageLoading = ref(true);

let pageLoadingNote = ref("");
pageLoadingNote.value = "Yirgu Gas Plant";

//-------------USER PROFILE_Variables..
let _who = reactive({}); //user Datas all there is...
let _userID = ref("");
let _department = ref("");
let _role = ref("");
let _priviledgedFor = reactive({});
let _priviledgedForRoutes = reactive({});
let _isPriviledged = ref(false); //does it has..... priviledged routes.?
//--------
let _modalPriviledges = reactive({}); //total privileges of this system

let roles = {
  "": [""],
  engineering: ["", "Oxygen", "Carbondioxide", "Acetylene"],
};
/*
  procurement: ["empy", "supplier", "goods", "rawMaterials"],
  store: ["***", "empy", "supplier", "product", "rawMaterials"],
  finance: ["***", "empy", "rawMaterials", "goods", "payment"],

  marketing: ["***", "product", "goods", "customer"],
  humanResource: ["***", "employee"],

  */
//-----
var todday = () => Math.floor(Date.now() / 1000);
//-------------------
let employees = ref([]);
let activeEmployee = ref({});

let defaultRowItem = reactive({});
let onplayRowItem = reactive({}); //employeeSchema Data skelton-----[update, registerData godMode]


miningModelSchematic();
async function miningModelSchematic() {
  onplayRowItem = reactive(await dataschemaskl(employeeSchema));
  //onplayRowItem = reactive(defaultRowItem);
  defaultRowItem = reactive(onplayRowItem);
  console.log(onplayRowItem, "MiningModel Data of ModelSchema");
  return "";
}

async function selectEmployee(employee) {
  //activeEmployee.value = employee;
  activeEmployee.value = employee; //reactive(Object.assign({}, employee));
  //console.log("employee has been selected", employee);

  return true;
}
//--Fetching Data

//------------------------------------------SYNCING DATA With Store

let rowsCount = ref(0);
employees = computed(() => {
  let data = profileService.getDatas;
  let dataCount = data.length;

  if (data.length === 0) {
    setDLoading(true);
    return [{}];
  } else {
  }

  try {
    if (dataCount != rowsCount.value) {
      notifyit.info("New Item Arrived..");
      setCounter(dataCount);
      setDLoading(false);

      data.forEach((row, index) => {
        row.index = index;
      });

      return data;
    }
  } catch {}

  return data;
});

function setCounter(num) {
  rowsCount.value = num;
}
//---------------------Syncing.....DATA---controlle syncing (on || off)

//ModalData-Syncs
const asyncCrud_ = {
  //since they are puteds_as_object..they won't require...ignitore..
  //asyncEmp: profileService.asyncDatas(15000), //sync every 10 seconds...as default
  //asyncComment: commentService.asyncDatas(5000),
  //sync every 10 seconds...as default
};

//------------------------------------------SYNCING DATA With Store

//ModalCrudOps
//----=========================================================================---DATA ---/// ---ROW----CRUD
let nul = ["", null, undefined, "undefined", false];
let createKey = ["name", "compayID", "keyID"];
let updateKey = ["name", , "id"];
let delKey = "id";
//ModalCrudOps
const Crud_ = {
  createData: async function () {
    // notifyit.warn("Error Create # with null fullname or keyid",onplayRowItem[createKey[0]]);
    console.log(onplayRowItem["keyID"].length, "user");
    try {
      //if (nul.includes(onplayRowItem['name']) || onplayRowItem['userAuthorization']['keyID'].length < 6) {
      if (
        nul.includes(onplayRowItem["name"]) ||
        onplayRowItem["keyID"].length < 6 ||
        nul.includes(onplayRowItem["companyID"]) ||
        nul.includes(onplayRowItem["keyID"])
      ) {
        //Data Is Manadatory
        notifyit.info("name, keyID and companyID are required!");
        return false;
      }
    } catch {
      notifyit.info("name, keyID and companyID are required!");
      return false;
    }

    let objParam = { ["name"]: onplayRowItem["name"] }; //[name_ used to check if adding named_items is already existed/not...let's assume _id:_name_value paired for convetional
    objParam = { ["keyID"]: onplayRowItem["keyID"] }; //[name_ used to check if adding named_items is already existed/not...let's assume _id:_name_value paired for convetional
    objParam = { ["companyID"]: onplayRowItem["companyID"] }; //[name_ used to check if adding named_items is already existed/not...let's assume _id:_name_value paired for convetional
    // objParam = { [createKey[1]]: onplayRowItem[createKey[1]] }; //[name_ used to check if adding named_items is already existed/not...let's assume _id:_name_value paired for convetional

    //objParam[createKey] = formData[createKey]  //[name_ used to check if adding named_items is already existed/not...let's assume _id:_name_value paired for convetional
    return await profileService
      .createData(onplayRowItem, objParam)
      .then((response) => {
        if (response) {
          return true;
        } else {
          notifyit.warn("Error Creating # with No Parameters");

          return false;
        }
      })
      .catch(() => {
        notifyit.warn("Error Creating # with No Parameters");
        return false;
      });
  },

  readData: async function () {
    // null
    ////console.log("readData Requested with")
    return await profileService
      .readData()
      .then((response) => {
        if (response) {
          return true;
        } else {
          return false;
        }
      })
      .catch(() => {
        return false;
      });
  },
  readFData: async function (objParam) {
    //params(id:id,other:other)
    try {
      if (!Object.keys(objParam).length) {
        //Object_parameters{k:v} Mandatory
        notifyit.warn("Error Deleted # with No Parameters");
        return false;
      }
    } catch {
      notifyit.warn("Error readFData # with No Parameters");
      return false;
    }

    return await profileService
      .readFData(objParam)
      .then((response) => {
        if (response) {
          return true;
        } else {
          return false;
        }
      })
      .catch(() => {
        return false;
      });
  },
  updateData: async function (employee) {
    // notifyit.warn("Error Create # with null fullname or keyid",onplayRowItem[createKey[0]]);
    console.log(employee["keyID"].length, "user");
    try {
      if (nul.includes(employee["name"]) || employee["keyID"].length < 6) {
        //Data Is Manadatory
        notifyit.warn("Error Create # with null fullname or keyid");
        return false;
      }
    } catch {
      notifyit.warn("Error Create # with null fullname or keyid");
      return false;
    }

    let objParam = { ["name"]: employee["name"] }; //[name_ used to check if adding named_items is already existed/not...let's assume _id:_name_value paired for convetional
    objParam = { ["keyID"]: employee["keyID"] }; //[name_ used to check if adding named_items is already existed/not...let's assume _id:_name_value paired for convetional
    objParam = { ["id"]: employee["id"] }; //[name_ used to check if adding named_items is already existed/not...let's assume _id:_name_value paired for convetional
    
    return await profileService
      .updateData(employee, objParam)
      .then((response) => {
        if (response) {
          notifyit.succes("Employees Succefully Updated..!");
          return true;
        } else {
          notifyit.succes("Error Updating Employees !");
          return false;
        }
      })
      .catch(() => {
        notifyit.succes("Error Updating Employees !");
        return false;
      });
  },

  deleteData: async function (ItemId) {
    if (!ItemId) {
      //ItemID is mandatory
      notifyit.warn("Error Deleted # with No ItemID");
      return false;
    }
    let objParam = {};
    objParam[delKey] = ItemId;
    return await profileService
      .deleteData(objParam)
      .then((response) => {
        if (response) {
          notifyit.succes("Succefully Deleted...");

          return true;
        } else {
          notifyit.warn("Error Deleted # with No ItemID");

          return false;
        }
      })
      .catch(() => {
        notifyit.warn("Error Deleted # with No ItemID");

        return false;
      });
  },
};
//-----------------End Data Functions

//----------------------------Utilities Funtions
//----Local Storage___
const _localStorage = {
  _get: (_item) => {
    return $q.localStorage.getItem(_item);
  },
  _set: (_key, _item) => {
    return $q.localStorage.set(_key, _item);
  },
};
//----logout

//---timeFormater
async function _formatDate(value) {
  if (value) {
    return value.split("-");
  }
}

/////////////////////////////////////////////////////////-------------------loading & notify services
async function setDLoading(status) {
  //handle qtable data-loading---flags
  //rowsLoading.value = status;
  loadingPage.value = false;
}

let loaditwellcome = ref(false);
watch(loaditwellcome, (currentValue, oldValue) => loadit.wellcome());

//---NOTIFY
let notifyitWarn = ref(false);
let notifyitInfo = ref(false);
let notifyitSucces = ref(false);
//watch(warningDisplay, (currentValue, oldValue) => _confirmDialog());
const notifyit = {
  info: (notes = "", position = "bottom-right", actions = "", period = 700) => {
    $q.notify({
      //type: "info",
      message: "",
      position,
      actions: actions
        ? [
            {
              label: actions,
              color: "black",
              handler: () => {
                return true;
              },
            },
          ]
        : null,
      timeout: period,
      spinner: false,
      html:true,
      caption: "<div style='background:transparent;color:white;width:15vw;'><p style='border-radius:10px;border:1.3px solid blue;padding:5px;margine-left:5px;background-grey'> Update Detected</p>" + notes+" </div>",
      spinner: false,
      group: "my-group", //identical messages with of same group..with show label_count..
      progress: true,
      classes:'flat'
    });
  },
  warn: (notes = "", position = "bottom-right", actions = "", period = 700) => {
    $q.notify({
      type: "negative",
      message: notes,
      position,
      actions: actions
        ? [
            {
              label: actions,
              color: "orange",
              handler: () => {
                return true;
              },
            },
          ]
        : null,
      timeout: period,
      html: true,
      caption: "",
    });
  },
  succes: (
    notes = "",
    position = "bottom-right",
    actions = "",
    period = 700
  ) => {
    $q.notify({
      type: "positive",
      message: notes,
      position,
      actions: actions
        ? [
            {
              label: actions,
              color: "black",
              handler: () => {
                return true;
              },
            },
          ]
        : null,
      timeout: period,
      html: true,
      caption: "",
    });
  },
  simple: (notes = "", position = "top-center", actions = "Ok", period = 1000) => {
    $q.notify({
      //type: "info",
      color:"black",
      textColor:"white",
      message: "",
      position:"top",
      actions: actions
        ? [
            {
              label: actions,
              color: "red",
              handler: () => {
                return true;
              },
            },
          ]
        : null,
      timeout: period,
      spinner: false,
      html:true,
      caption: "<p style='border-radius:10px;border:1.3px solid blue;padding:5px;margine-left:5px;font-size:1rem'>" + notes+ "</p>" ,
      spinner: false,
      group: "my-group", //identical messages with of same group..with show label_count..
      progress: true,
     // classes:'flat'
    });
  },
};
//------DIALOGS

let dialogAlert = ref(false);
let confirmationRequire = ref(false);
let dialogPrompt = ref(false);
//watch(confirmationRequire, (currentValue, oldValue) => _confirmDialog());
const dialog = {
  alert: async function (message) {
    $q.dialog({
      title: "Alert",
      message: message,
    })
      .onOk(() => {
        // //console.log('OK')
      })
      .onCancel(() => {
        // //console.log('Cancel')
      })
      .onDismiss(() => {
        // //console.log('I am triggered on both OK and Cancel')
      });
  },

  confirm: async function (message) {
    console.log("confirmation dialog is up");
    $q.dialog({
      title: "Confirm",
      message: message,
      cancel: true,
      persistent: true,
    })
      .onOk(() => {
        confirmationRequire.value = true;
        //console.log(">>>> OK");
        return "ok";
      })
      .onOk(() => {
        //console.log(">>>> second OK catcher");
        return "ok2";
      })
      .onCancel(() => {
        confirmationRequire.value = false;
        //console.log(">>>> Cancel");
        return "cancel";
      })
      .onDismiss(() => {
        //console.log("I am triggered on both OK and Cancel");
        return "dismiss";
      });
  },

  prompt: async function (message) {
    $q.dialog({
      title: "",
      message: message,
      prompt: {
        model: "",
        type: "text", // optional
      },
      cancel: true,
      persistent: true,
    })
      .onOk((data) => {
        // //console.log('>>>> OK, received', data)
      })
      .onCancel(() => {
        // //console.log('>>>> Cancel')
      })
      .onDismiss(() => {
        // //console.log('I am triggered on both OK and Cancel')
      });
  },
};
const loadit = {
  process: async function (notes = "wellcom", period = 5000) {
    $q.loading.show({
      message: notes,
      boxClass: "transparent",
      spinnerColor: "orange",
    });
    // hiding in 3s
    let timer = setTimeout(() => {
      $q.loading.hide();
      //siteLoading.value = false;
      timer = void 0;
      return "terminating";
    }, period);
  },
};

//----- & Loading (InnerLoading)
//----------------------------Utilities Funtions

//--------------------------------------------------------------------Profiling (CHECK AUTHENTICATIONS &&& USER INFORMATIONS)
//--------------------------------------------------------------------Profiling (CHECK AUTHENTICATIONS &&& USER INFORMATIONS)
const _profileInformation = async () => {
  _userID.value = _localStorage._get("_userID"); //check if _it is logged
  return true;
  if (!_userID.value) {
    return false;
  }
  //setting the choose model datapriviledges_list...DPrivileges Wall
  //_modalPriviledges = employeeSchema["DataPrivileges"]; //total_current_model_privileges
  // _localStorage._set("_modalPriviledges", employeeSchema["DataPrivileges"]); //Registering the _models_priviledges_all

  try {
    //let _userID = _localStorage._get("_userID"); // check if _it is Priviledges_box has options
    _priviledgedFor = reactive(_localStorage._get("_priviledgedFor")); // check if _it is Priviledges_box has options
    _priviledgedForRoutes = reactive(
      _localStorage._get("_priviledgedForRoutes")
    ); // check if _it is Priviledges_box has options
    _department.value = ref(_localStorage._get("_department")); // check if _it is Priviledges_box has options
    _role.value = ref(_localStorage._get("_position")); // check if _it is Priviledges_box has options
    _isPriviledged.value = Object.keys(_priviledgedForRoutes).length
      ? true
      : false;

    let profile = reactive({});

    for (let profKey in employeeSchema) {
      //let's collect data(persona//profile...)
      // there variable holding the VIp informations to know about user_logedIN
      try {
        profile[profKey] = _localStorage._get(profKey);
        //_who=_who;
      } catch {}
    }
    _who = reactive(profile);
    if (_priviledgedFor.includes("root")) {
      return true;
    } else {
      //is powerless user...
      //notifyit.succes("Authentications as Employeeess");
      return false;
      //return true; //router.push("/blog");
    }
  } catch {
    return false; //router.push("/blog"); //if something Wrong return to HOME}
  }
};
//------------------------------------------------------------------------------ Warming UP(BIOS_Process.....POST)

onMounted(async () => {
  //--------------ON MOUNT

  await _profileInformation()
    .then((resp) => {
      if (resp) {
        timerResponse(4000, "Authentications Failed").then((response) => {
          //router.push("/");
          loadingPage.value = false;
          return false;
        });
      }
      //wellcomeNotifier('bottom-right','','Yirgu Gas # '+_who['name'])
      //employeeSchemaData()
      loadingPage.value = false;
      return true;
    })
    .catch(() => {
      //wellcomeLoading("Authentications Error..Redirecting Home!",5000)
      //loadingError.value = true;
      timerResponse(3000, "Fatal Authentications Error").then((response) => {
        //router.push("/");
      });
    });
});

async function timerResponse(period = 4000, message = "") {
  pageLoadingNote.value = message;
  setTimeout(() => {
    loadingPage.value = false;
    //console.log("waiting...");
    return true;
  }, 2000);
}
</script>
