


<template>

<q-card>
  
  <!----HEADER-TOP Begin-->
     <q-card-section
      style="
        background: rgb(15, 59, 0);
        border: 1px solid rgb(1, 58, 163);
        font-family: Sans-serif;min-width: 50vh;
      "
      class="text-bold"
    >

      <div class="text-h6 text-weight-bold row justify-between">
        <div class="row text-grey-3 text-weight-bold text-h5">
          <div class="text-green" style="text-transform: capitalize;">{{ _thisModel }} -</div>
          Registration Form
        </div>
        <div
          class=" text-green rounded-borders  text-weight-bolder"
        >
          YGP
        </div>
      </div>
    </q-card-section>
    <!---Header-TOP ENDs-->

    <q-separator />

    <q-card-section
      class="scroll shadow-5 text-white"
      style="max-height: 60vh; background: rgb(233, 231, 231)"
    >

      <fieldset class="q-px-md no-border  text-secondary "     >
       <!-------Header_Bottom Begins-->

        <legend>

          <div
            class=" row items-between text-weight-bolder text-green"
            v-if="__thisOps === 'CreateRowItem'"
          >
            <div>@ {{ "ADD New Item  " }}</div>
          </div>
          <div   class=" row items-between text-weight-bolder text-orange" v-else>
            @ {{ "Edit Item  ~" + _this["name"] }}
          </div>
        </legend>
       <!-------Header_Bottom Begins-->

        <q-separator inset></q-separator>

        <q-list>
          <!--------Iterate_Over_ Authorized -->

          <q-item
            v-for="(tier_0obj, index) in _rolesColumns"
            :key="index"
            :set="(tier_0name = tier_0obj.name)"
            class="row"
          >
            <!--- tier_0obj to be Hidden----------------3 stages(blockedColumns takenControllles & returnColumns Status)-->

            <!--- Columns to be Hidden----------------3 stages(blockedColumns takenControllles & returnColumns Status)-->

            <div>

              <!-----does_Schema Has type(single Valued) ?-->
              <q-item-section  v-if="tier_0obj.schema.type ?? false"    >
              <!---setting field set & legend-->
                    <fieldset style="border-radius: 4px 4px; background: rgb(217, 219, 224)"
                        class="rounded-borders"
                        >
                        <legend class="  text-weight-bold" style="color:rgb(0, 23, 85);text-transform: capitalize;">
                            {{ tier_0name }} 
                        </legend>

                        <!---setting field set & legend---End-->
                        <div style=" background: rgb(20, 202, 3)" > 
                        <!--- is the TYPE_ it ARRAY -->

                          <template v-if="tier_0obj.schema['type'] == 'Array'"> 
                            <!--- is the TYPE_ it ARRAY_is Enumuratable -->

                            
                            
                            </template>

                        <template v-else>
                        
                            <template v-if="tier_0obj.schema.enum ?? false">
                                    <q-select
                                    style="min-width: 7vw"
                                    color="secondary"
                                    outlined
                                    dense
                                    v-model="_this[tier_0name]"
                                    :options="tier_0obj.schema.enum"
                                    single
                                    use-chips
                                    stack-label
                                    label-color="black"
                                    class="col  text-weight-bold"
                                    :label="`Select Options -${[tier_0name]}`"
                                    >
                                </q-select>
            
                            </template>
                         
                            <template  v-else-if="tier_0obj.schema.textarea ?? false" >
                                <q-editor
                                dense
                                outlined
                                v-model="_this[tier_0name]"
                                filled
                                autogrow
                                :label="tier_0name"
                                class="col  text-weight-bold"
                                
                                >
                                </q-editor>

                            </template>
                            <template  v-else>
                                
                                <q-input
                                    style="min-width: 7vw"
                                    dense
                                    outlined
                                    v-model="_this[tier_0name]"
                                    :type="tier_0obj.schema.type"
                                    class="col  text-weight-bold"
                                    lazy-rules
                                    :rules="[ val => val && val.length > 0 || 'Please type something']"
                                    
                                >
                                </q-input>

                            </template>

                        </template>

                    
                        <!---final Data(Basic Data_format)-->


                        </div>
                        </fieldset>
              </q-item-section>

              <q-item-section v-else-if="Array.isArray(tier_0obj.schema)">
                {{tier_0obj.schema}}
                <q-item-section >
                        <div class="row">

                          <q-btn unelevated  round outline :dense="true" rounded color="purple"  :label="'# '+_this[tier_0obj.name].length" />

                          <q-btn flat  class="col" :dense="true" color="white" icon="add" label="Create New" @click="pressADDList(tier_0obj.name, tier_0obj.schema)" />

                        </div>
                          
                      </q-item-section>
                      
                <!-- Listing ARRAY REcrods-->
                      <q-scroll-area 
                        class="bg-grey-12  row"
                        style="height: 40vh; width: 100%" v-if="_this[tier_0obj.name].length">

                        
                              <q-item
                                v-for="(_thism, index) in _this[tier_0obj.name]"
                                :key="index" class="col"
                              >   
                              
                              <legend class=" text-orange" style="text-transform: capitalize;">
                                {{ index }} 
                                <q-btn
                                  label="Remove"
                                  class="text-red"
                                  icon="remove"
                                  @click="pressRemoveList(tier_0obj.name, index)"
                                  :dense="true"
                                  size="md"
                                  no-caps
                                />
                              </legend>
                              
                                <q-list  v-for="(columnsG, tier_1name) in tier_0obj.schema" :key="tier_1name" class="col-grow row" 
                              > 
                              {{ columnsG?.type ?? false }} {{ tier_1name?.type ?? false}} kllo
                              <q-item-section
                              v-if="columnsG['type'] ?? false"
                                  :set="(topColumnsName = columns['name'])"
                                  class="text-wight-bold column col"
                                >                             
                                <fieldset
                                    style="border-radius: 4px 4px; background: rgb(217, 219, 224)"
                                    class="rounded-borders col q-pa-none"
                                  >
                                      <legend class="  text-weight-bold" style="color:rgb(0, 23, 85);text-transform: capitalize;">
                                          {{ tier_1name }} 
                                        </legend>
                                
                                      <div style="border-radius: 4px 4px; background: rgb(20, 202, 3)"> 

                                          <template v-if="columnsG['type']  == Array"> 

                                          </template>
                                          <template  v-else>
                      
                                            <q-input
                                                style="min-width: 7vw"
                                                dense
                                                outlined
                                                v-model="_this[tier_0obj.name]"
                                                :type="tier_0obj.schema['type']"
                                                class="col  text-weight-bold"
                                                lazy-rules
                                                :rules="[ val => val && val.length > 0 || 'Please type something']"
                                              />
                                          </template>
                                      </div>
                                    </fieldset>
                                  </q-item-section>

                                  
                                  </q-list> 

                              </q-item>
                            </q-scroll-area>
              </q-item-section>

              <!--- or is it Object _valued TOP columnss-->
              <q-item-section v-else class="column q-gutter-xs col">
                <fieldset class="col q-gutter-xs">
                  <legend class=" text-weight-bolder" style="text-transform: capitalize;">
                    {{ tier_0name }}
                  </legend> 

                  <q-list >
                  <q-item
                   v-for="(columnsG, tier_1name) in tier_0obj.schema"
                    :key="tier_1name"
                    class="col q-gutter-xs row"
                    style="min-width: 7vw"
                  >
                    <div v-if="lockedColumns.includes(tier_1name)"></div>

                    <div v-else class="col q-gutter-xs row">
                      <fieldset
                      style="border-radius: 0px 0px; background: rgb(217, 219, 224);border: 0px;"
                      class="col q-gutter-xs rounded-borders q-pa-none transparent"            >
                    <legend class="  text-weight-bold q-pa-none" style="color:rgb(0, 23, 85);text-transform: capitalize;">
                        {{ tier_1name }} 
                      </legend>

                      <q-item-section  v-if="'type' in columnsG" class="text-wight-bold" >
             
                   <!--is Type_Start-->
                  <div style="border-radius: 4px 4px; background: rgb(20, 202, 3)"> 
                  <!--- is it Enumuratable -->
                  <template v-if="columnsG['type'] == Array"> 

                    <template v-if="'venum' in columnsG">
                        <q-select
                        style="min-width: 7vw"
                        color="secondary"
                        outlined
                        dense
                        v-model="_this[tier_0obj.name][tier_1name]"
                        :options="columnsG.venum"
                        multiple
                        use-chips
                        stack-label
                        label-color="black"
                        class="col  text-weight-bold"
                        :label="` -${[tier_1name]}`"
                      >
                      </q-select>
  
                    </template>
                  </template>

                  <template v-else>
                    <template v-if="'enum' in columnsG">
                            <q-select
                              style="min-width: 7vw"
                              color="secondary"
                              outlined
                              dense
                              v-model="_this[tier_0obj.name][tier_1name]"
                              :options="columnsG.enum"
                              single
                              use-chips
                              stack-label
                              label-color="black"
                              class="col  text-weight-bold"
                              :label="`Select Options -${[tier_1name]}`"
                            >
                          </q-select>
    
                      </template>
                      <template  v-else-if="'vtype' in columnsG" >
                        <q-input
                            style="min-width: 7vw"
                            dense
                            outlined
                            v-model="_this[tier_0obj.name][tier_1name]"
                            :type="columnsG['vtype']"
                            capture="user"
                            class="col  text-weight-bold"
                           
                          >                       
                          </q-input>
                      </template>
                      <template  v-else-if="'textarea' in columnsG" >
                        <q-editor
                          dense
                          outlined
                          v-model="_this[tier_0obj.name][tier_1name]"
                          filled
                          autogrow
                          :label="tier_0obj.name"
                          class="col  text-weight-bold"
                       
                        >
                        </q-editor>

                      </template>
                      <template  v-else>
                        
                        <q-input
                            style="min-width: 7vw"
                            dense
                            outlined
                            v-model="_this[tier_0obj.name][tier_1name]"
                            :type="columnsG['type']"
                            class="col  text-weight-bold"
                            lazy-rules
                            :rules="[ val => val && val.length > 0 || 'Please type something']"
                            
                          >
                            <!--q-badge class="q-mx-xs">
                                            <q-badge
                                              color="blue"
                                              rounded
                                              class="q-mr-sm"
                                              label="...Loading."
                                          /></q-badge-->
                          </q-input>

                      </template>

                  </template>

                </div>
              
              </q-item-section>


              <q-item-section v-else>

                    <fieldset class="col q-gutter-xs">
                      <legend class=" text-weight-bolder" style="text-transform: capitalize;">
                        {{ tier_1name }}
                      </legend>
                      <q-list     
                      >
                      <q-item
                      v-for="(columnsGG, tier_2name) in columnsG"
                        :key="tier_2name"
                        class="col q-gutter-xs row"
                        style="min-width: 7vw"
                      >
                        <div v-if="lockedColumns.includes(tier_2name)"></div>

                        <div v-else class="col q-gutter-xs row">
                          <fieldset
                          style="border-radius: 0px 0px; background: rgb(217, 219, 224);border: 0px;"
                          class="col q-gutter-xs rounded-borders q-pa-none transparent"            >
                        <legend class="  text-weight-bold q-pa-none" style="color:rgb(0, 23, 85);text-transform: capitalize;">
                            {{ tier_2name }} 
                          </legend>

                        <q-item-section  v-if="'type' in columnsGG" class="text-wight-bold" >

                      <!--is Type_Start-->
                      <div style="border-radius: 4px 4px; background: rgb(20, 202, 3)"> 
                      <!--- is it Enumuratable -->
                      <template v-if="columnsG['type'] == Array"> 
                        </template>


                        <template v-else>
                        <template v-if="'enum' in columnsGG">
                                <q-select
                                  style="min-width: 7vw"
                                  color="secondary"
                                  outlined
                                  dense
                                  v-model="_this[tier_0obj.name][tier_1name][tier_2name]"
                                  :options="columnsGG.enum"
                                  single
                                  use-chips
                                  stack-label
                                  label-color="black"
                                  class="col  text-weight-bold"
                                  :label="`Select Options -${[tier_2name]}`"
                                >
                              </q-select>

                          </template>
                          <template  v-else-if="'vtype' in columnsGG" >
                            <q-input
                                style="min-width: 7vw"
                                dense
                                outlined
                                v-model="_this[tier_0obj.name][tier_1name][tier_2name]"
                                :type="columnsGG['vtype']"
                                capture="user"
                                class="col  text-weight-bold"
                                
                              >                       
                              </q-input>
                          </template>
                          <template  v-else-if="'textarea' in columnsGG" >
                            <q-editor
                              dense
                              outlined
                              v-model="_this[tier_0obj.name][tier_1name][tier_2name]"
                              filled
                              autogrow
                              :label="tier_2name"
                              class="col  text-weight-bold"

                            >
                            </q-editor>

                          </template>
                          <template  v-else>
                            
                            <q-input
                                style="min-width: 7vw"
                                dense
                                outlined
                                v-model="_this[tier_0obj.name][tier_1name][tier_2name]"
                                :type="columnsGG['type']"
                                class="col  text-weight-bold"
                                lazy-rules
                                :rules="[ val => val && val.length > 0 || 'Please type something']"
                                
                              >
                               
                              </q-input>

                          </template>

                      </template>


                        </div>

                        </q-item-section>


                        </fieldset>

                    </div>

                    </q-item>


                    </q-list>

                    </fieldset>




                    </q-item-section>

                        
                    </fieldset>
                        </div>
                        </q-item>
                      </q-list>
                    </fieldset>
                </q-item-section>

</div>
</q-item>
</q-list>
        </fieldset>

    </q-card-section>

<q-separator />

        <q-card-actions>
        <q-btn outlined label="CANCEL" color="red" @click="__thisBox = false" />
        <q-btn outlined label="Create" color="green" @click="Create_this()" />
        <q-btn outlined label="Update" color="green" @click="Update_this()" />
        </q-card-actions>

    </q-card>


  </template>
  
  <script setup>

  const props = defineProps({
    _rolesColumns: { type: Object, default: () => ({}) },
    _this: { type: Object, default: () => ({}) },
  });

  const emitCreator = defineEmits(['create']);
  const emitUpdater = defineEmits(['update']);
  function emitCreate(_action) {
    emitCreator('closeButton', _action);
  }
  function emitUpdate(_action) {
    emitUpdater('closeButton', _action);
  }
  </script>
  
  <style scoped>

.notification {
    display: flex;
    flex-flow: column nowrap;
    /* justify-content: flex-start; */
    /* padding: 2px; */
    /* margin-bottom: 10px; */
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    opacity: 0;
    
    transform: translateY(-40px);
    animation: slideIn 0.9s forwards;
}

.notification.info {
    background-color: #007BFF;
    color: white;
}

.notification.error {
    background-color: #FF3B30;
    color: white;
}

.notification h4 {
    
    margin: 0 0 2px 0;
    font-size: 16px;
}

.notification p {
    margin: 0;
    font-size: 14px;
}

@keyframes slideIn {
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes slideOut {
    to {
        opacity: 0;
        transform: translateY(-20px);
    }

}

  div {
    transition: background-color 0.3s ease;
  }


  body {
    font-family: Arial, sans-serif;
    background-color: #f4f4f4;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
}

button {
    padding: 10px 20px;
    font-size: 16px;
    border: none;
    border-radius: 5px;
    background-color: #007BFF;
    color: white;
    cursor: pointer;
    transition: background-color 0.3s;
}

button:hover {
    background-color: #0056b3;
}

.popup {
    /* display: none; */
    display: flex;flex-flow: column wrap;justify-content:center;align-items:center;

    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    justify-content: center;
    align-items: center;
}

.popup-content {
    background: #fff;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 80%;
    max-width: 300px;
    text-align: center;
    animation: fadeIn 0.3s;
}

.popup-content h2 {
    margin-top: 0;
}

.popup-content p {
    color: #666;
    margin: 15px 0;
}

.popup-content .action-btn {
    padding: 10px 20px;
    border-radius: 5px;
    background-color: #28a745;
    color: #fff;
    text-decoration: none;
    transition: background-color 0.3s;
}

.popup-content .action-btn:hover {
    background-color: #218838;
}

.close-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 24px;
    color: #000;
    cursor: pointer;
}

@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}


  </style>

