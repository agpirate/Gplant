<template>
  <q-page
    class="flex flex-center text-overline bg-white full-width full-height"
    v-if="pageLoading"
  >
    <div v-if="loadingError">
      <div>{{ messagner }}</div>
    </div>

    <div v-else class="column">
      <div>{{ messagner }}</div>
      <div><q-spinner-ios size="xl" color="yellow" /></div>
    </div>
  </q-page>

  <q-page class="column" v-else>
    <div class="col row q-pa-sm q-gutter-x-sm">
      <div class="col-2 column bg-blue">
        <q-card class="col column">
          <q-card-section class="col-auto">
            <q-input
              name="searchPost"
              autocomplete="name"
              v-model="searchPost"
              color="primary"
              label="search.."
              filled
              clearable
              dense
            />
          </q-card-section>

          <q-card-section class="col">
            <q-list bordered separator>
              <q-expansion-item
                group="somegroup"
                icon="font_download"
                label="Blogs"
                default-opened
                header-class="text-secondary"
                :caption="props._mainRole"
              >
                <q-separator />
                <q-card>
                  <q-card-section>
                    

                    <q-list v-if="PostData.length"   active-class="my-menu-link">
                   <q-scroll-area class="text-black transparent" style="height:50vh; width:100%;">

                      <q-item
                       
                        
                        v-for="post of PostData"
                        :key="post.id"
                      >
                        <q-item-section clickable v-ripple :active="selectedPost === post.id" @click="selectedPost = post.id" >
                          <q-item-label clickable  @click="Post_.showPost(post)" >{{ post.header }}</q-item-label>
                        </q-item-section>

                        <q-item-section side >
                          <q-item-label caption>{{
                           post.createdAt.split("T")[0]                          }}</q-item-label>
                           <q-item-label class="q-gutter-xs row"> 
                           


                                                    <q-btn
                                                    flat round color="primary" icon="card_giftcard" 

                                                                      
                                                      dense
                                                    
                                                      size="8px"
                                                      
                                                      label=""
                                                      @click="Post_.showPost(post)"
                                                      
                                                    />



                                                    <q-btn
                                                                      round
                                                      dense
                                                      color="negative"
                                                      size="8px"
                                                      icon="delete"
                                                      label=""
                                                      @click.prevent="
                                                                          Crud_.deleteData(postService, post.id)
                                                                        " no-caps
                                                    />

  
                           </q-item-label>
                          
                        
                        </q-item-section>
                      </q-item>
                    </q-scroll-area>
                     
                    </q-list> 
                  </q-card-section>
                </q-card>
              </q-expansion-item>

      
              

              <q-separator />
            </q-list>
          </q-card-section>

          <q-card-section class="text-caption text-primary">
            Yirgu Gase Blog Platform V1.0 
          </q-card-section>
        </q-card>
      </div>
      <div class="col column" style="background:rgba(255, 255, 255, 0.616)">
        <q-card class="col column transparent" style="background:rgba(255, 255, 255, 0.329)">
          <q-card-section class="col-auto" v-if="Object.keys(activePost).length">
            <q-list class="row justify-between">
              <q-item
                ><q-item-section class="text-bold text-grey-8"
                  > Post @ {{ activePost.mainRole }} 
                </q-item-section></q-item       >

              <q-item class="text-overline"></q-item>
               <q-item>
                     <q-item-section
                  ><q-btn
                    :dense=true
                    color="deep-orange"
                    icon="cloud_upload"
                    style="width: 100px"
                    :size="20"
                    no-caps
                    @click="Post_.showPostForm('reg')"
                  > _+ Post</q-btn>
                </q-item-section>
                <q-item-section side v-if="activePost.userID == props._userID">
                  <q-btn-toggle
                  :dense=true
                    v-model="activePostEdit"
                    spread
                    class="my-custom-toggle"
                    no-caps
                    rounded
                   
                    unelevated
                    toggle-color="primary"
                    color="white"
                    text-color="primary"
                    :options="[
                      { label: 'Edit', value: false },
                      { label: 'View', value: true },
                    ]"
                  />
                </q-item-section>
              </q-item>
            </q-list>

            <q-list bordered padding v-model="activePost">
              <q-item class="row" >
                <q-form
                  @submit="
                    Crud_.createData(
                      postService,
                      onplayRowItemPost,
                      'Edit Post'
                    )
                  "
                  class="col row justify-end"
                >
                <q-item-section top avatar>
                      <q-avatar
                        color="secondary"
                        text-color="white"
                        icon="print"
                      />
                    </q-item-section>

                  <q-item-section class="col column">
                    <q-input
                      standout
                      name="header"
                      autocomplete="name"
                      v-model="activePost.header"
                      color="secondary"
                      :dense="true"
                      clearable
                      placeholder="Header"
                      :readonly="activePostEdit"
                      class="text-bold text-weight-bold"
                    />

                    <q-input
                      name="textarea"
                      autocomplete="contents"
                      v-model="activePost.contents"
                      color="dark"
                      dense="true"
                      placeholder="Content"
                      clearable
                      :readonly="activePostEdit"
                      class="text-overline"
                    />
<div class="q-gutter-xs row"> 
  <q-rating
        v-model="postRate"
        @click="ratePost()"
        max="3"
        size="2em"
        color="yellow"
        icon="star_border"
        icon-selected="star"
        icon-half="star_half"
        no-dimming
      />
   
      <q-chip outline color="negative" text-color="white" icon-right="star">
      {{ activePost.rate[0].length}} 
    </q-chip>

    <q-chip outline color="orange" text-color="white" icon-right="star">
      {{ activePost.rate[1].length}}  <q-icon class="col-atuo q-pa-sm" size="sm" name="star" />
    </q-chip>

    <q-chip outline color="green" text-color="white" icon-right="star">
      {{ activePost.rate[2].length}}  <q-icon class="col-atuo q-pa-sm" size="sm" name="star" /><q-icon class="col-atuo q-pa-sm" size="sm" name="star" />
    </q-chip>

</div>
                   


                    </q-item-section>
                  <q-item-section side top class="col-auto column">
                    <q-item-label caption>{{
                      activePost.updatedAt.split("T")[0]  
                    }}</q-item-label>
                    <q-item-label v-if="!activePostEdit">
                      <q-btn
                        color="secondary"
                        :size="xs"
                        :dense="true"

                        @click.prevent="
                          Crud_.updateData(postService, activePost) 
                        "
                        no-caps
                        >Update</q-btn
                      >



                    </q-item-label>
                  </q-item-section>
                   
                </q-form>
              </q-item>
            </q-list>
          </q-card-section>

          <q-card-section class="col-4" v-else> 
        <div>
        <q-spinner-dots
          color="primary"
          size="4em"
        />
       
      </div>
      <q-item-section
                  ><q-btn
                    dense
                    color="deep-orange"
                    icon="cloud_upload"
                    style="width: 100px"
                    :size="xs"
                    @click="Post_.showPostForm('reg')"
                  > _+ Post</q-btn>
                </q-item-section> 

     </q-card-section>
          <q-separator inset />

          <q-card-section class="col ">
            <q-list class="fit">
              <q-item style="background:rgba(0, 0, 46, 0.26);" class="text-white text-overline rounded-borders shadow-8" :dense="true">
                <q-item-section>Post comments :# {{activeComments.length }}
                </q-item-section>
              </q-item>
              <q-scroll-area style="min-height: 60%" class="bg-grey-4 q-pa-sm flex-center flex text-black" v-if="!activeComments.length"> 
                <div>
        <q-spinner-dots 
          color="primary"
          size="4em"
        />
      
      </div>
                No Comments...
                </q-scroll-area
              >
              <q-scroll-area style="height: 100%" class="bg-white-3 shadow-10 q-pa-sm " v-else>
                <q-item
                  v-for="comment in activeComments"
                  :key="comment"
                  class="row"
                >
                  <q-form
                    @submit="
                      Crud_.createData(
                        commentService,
                        onplayRowItemComm,
                        'Edit Comment'
                      )
                    "
                    class="col row justify-end"
                  >
                    <q-item-section top avatar>
                      <q-avatar
                        color="info"
                        size="sm"
                        text-color="purple"
                        icon="style"
                      />
                    </q-item-section>

                    <q-item-section class="col column">
                 
                 <q-item-label class="text-bold text-weight-bold text-primary">     {{ comment.name }} </q-item-label>
                      <q-input
                        name="name"
                        autocomplete="name"
                        v-model="comment.contents"
                        color="primary"
                        dense
                        clearable
                        readonly
                      />
                    </q-item-section>

                    <q-item-section side top class="col-auto">
                      <q-item-label caption>{{
                        comment.updatedAt.split("T")[0]  
                      }}</q-item-label>
                      


                      <q-btn  size="sm" flat square icon="more_vert"  class="transparent" label="">
                <q-menu transition-show="scale" transition-hide="scale">
                  <q-list>
                    <q-item
                      class="col-auto"
                      clickable
                      @click="Crud_.deleteData(commentService,comment.id)"
                    >
                      <q-item-section class="text-caption col-auto text-red">
                        <q-item-label> Remove</q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item
                      class="col-auto"
                      clickable
                      to="/user/login"
                    
                    >
                    </q-item>
                  </q-list>
                </q-menu>
              </q-btn>


                      

                    </q-item-section>

                   
                  </q-form>
                </q-item>
              </q-scroll-area>
            </q-list>
          </q-card-section>

          <q-separator inset="10px" />
          <q-card-section class="col-auto column " style="background:rgba(255, 255, 255, 0.288);">
            <div class=" col-auto  text-bold row items-center q-gutter-sm q-py-sm  shadow-8" v-if="PostData.length">
             
              <q-btn class="bg-grey-1 text-caption"
                @click="Crud_.createData(commentService, onplayRowItemComm)" :dense="true" no-caps
              >
                Add New Comment..
              </q-btn>
            </div>
            <div class="col-auto q-py-sm">
              <q-editor
                v-model="onplayRowItemComm.contents"
                :definitions="{
                  save: {
                    tip: 'Save your work',
                    icon: 'save',
                    label: 'Save',
                    handler: addComment,
                  },
                  upload: {
                    tip: 'Upload to cloud',
                    icon: 'cloud_upload',
                    label: 'Upload',
                    handler: addComment,
                  },
                }"
              />
            </div>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-2 column  q-gutter-y-sm ">
        <q-card class="q-gutter-xs row justify-between shadow-3 " style="background:rgba(227, 227, 231, 0.219);"> 
           <q-spinner-box
          color="primary"
          size="2em"
          
        />
        <!--q-btn @click="logout()" :dense="true" no-caps class="text-blue bg-grey-1 text-bold fit-height">log-out </q-btn -->
        </q-card>
       
        <q-card v-if="Object.keys(props._priviledgedForRoutes)" flat>

          <q-btn-dropdown
            split
            
            to=""
            color="blue"
            rounded
            label="Dashboards"
            class="fit  text-caption"
            no-caps
            :dense="true"
            style="background:rgb(49, 172, 0)"
          >
            <q-list>
              <q-item
                clickable
                v-close-popup
                v-for="priv in Object.keys(props._priviledgedForRoutes)"
                :key="priv"
              >
                <q-item-section class="fit transparent text-overline">
                  <router-link :to="props._priviledgedForRoutes[priv]">
                    {{ priv }}
                  </router-link>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </q-card>

        <q-card class="q-pa-xs text-bold" > Recent Posts </q-card>

        <q-card>
          <q-card-section v-if="PostData">
            <q-item v-for="recPost in PostData" :key="recPost">
              <router-link  @click="showPost(recPost)">
                <q-icon name="style" /> {{ recPost.header }}
              </router-link>
              <q-item-section> </q-item-section></q-item
          ></q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>

  <!-- popUp Forms-->
  <q-dialog v-model="postForm" >
    <q-card
      class="bg-grey-3 column" style="width: 40vw; height: 50vh"
    >
      <q-card-section class="text-overline " 
        >Add New Post # {{ props._mainRole }}
      </q-card-section>
      <q-card-section class="col column">
        <q-form
          @submit="Crud_.createData(postService, onplayRowItemPost, 'AddPost')"
          class="q-gutter-md col column"
        >
          <q-input
            name="name"
            autocomplete="name"
            v-model="onplayRowItemPost.header"
            color="primary"
            label="postHeader"
            filled
            clearable
            :dense="true"
          />

          <q-input
            v-model="onplayRowItemPost.contents"
            filled
            clearable
            type="textarea"
            color="red-12"
            label="postContent.."
            :dense="true"
            class="col"

          />
          <div>
            <q-btn
              dark-percentage
              type="submit"
              unelevated
              color="orange"
              text-color="grey-9"
              icon="cloud_upload"
              style="width: 100px"
            :dense="true"
 :label="upload"
            />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog> 

  <q-dialog v-model="postLoading" style="width: 35vw; height: 30vh" class="flex flex-center">
    <q-card
      style=" border: 0px solid blue " class="transparent flex flex-center column"
    
    >
 
        <q-card-section class="text-blue text-overline">
          ....Loading Blog 
        </q-card-section>
        <q-spinner-dots
          color="primary"
          size="10em"
        />
        <q-tooltip :offset="[0, 8]">Loading Post</q-tooltip>
      

    </q-card>
  </q-dialog>

  <!-- UserProfile Panel _ Sticky-->
  <q-page-sticky position="bottom-right" :offset="[10, 8]">
    <q-fab
    square
      direction="up"
      vertical-actions-align="right"
      :persistent="true"
      :glossy="true"
      color="amber"
      narrow-indicatorvertical-actions-align="up"
      padding="none sm"
      icon="keyboard_arrow_up"
      class="q-pa-sm"
     
    >
    <template v-slot:label>
        profiel
    </template>
      <div
        class="text-primary q-py-lg"
        style="width: 30vw; height: 63vh"
        v-if="Object.keys(props._who).length"
      >
        <q-card class="my-card" flat bordered>
          <q-card-section>
            <q-list bordered padding>
              <q-item>
                <q-item-section>
                  <q-item-label overline>
                    {{ props._who["name"] }}
                  </q-item-label>
                  <q-item-label caption :lines="2">EmpRating:  </q-item-label>
                  <q-item-label>
                    Depaprtment: {{ props._mainRole }}/{{ props._role }}
                  </q-item-label>
                </q-item-section>
                <q-item-section side top>
                  <q-item-label caption>
                    <q-avatar>
                      <img src="~assets/images/im0.png" /> </q-avatar
                  ></q-item-label>
                </q-item-section>
              </q-item>

              <q-separator spaced />
            </q-list>

            <q-list
              bordered
              class="rounded-borders text-caption"
              style="max-width: 350px"
            >
              <q-item-label header>BasicInfo</q-item-label>
              <q-item
                clickable
                v-ripple
                v-for="i in ['name', 'companyId', 'gender']"
                :key="i"
              >
                <q-item-section>
                  <q-item-label lines="1">{{ i }}</q-item-label>
                </q-item-section>

                <q-item-section side top> {{ props._who[i] }} </q-item-section>
              </q-item>

              <q-separator inset="item" />
            </q-list>

            <q-list
              bordered
              class="rounded-borders text-caption"
              style="max-width: 350px"
            >
              <q-item-label header>Address</q-item-label>

              <q-item
                clickable
                v-ripple
                v-for="item in ['woreda', 'city', 'phone', 'email']"
                :key="item"
              >
                <q-item-section>
                  <q-item-label :lines="1">{{ item }}</q-item-label>

                  <q-item-label caption :lines="2">
                    {{ props._who["address"][item] }}
                  </q-item-label>
                </q-item-section>

                <q-item-section side top> Edit </q-item-section>
              </q-item>

              <q-separator inset="item" />
            </q-list>
          </q-card-section>
        </q-card>
      </div>
    </q-fab>
  </q-page-sticky>


</template>

<script setup>
import { ref, reactive, onMounted, computed, watch } from "vue";
//import moment from "moment";
import { useQuasar,useMeta } from "quasar";

import { authStore } from "stores/authenticatedStore/authStore";
import { timeStore } from "src/stores/jstStores/serviceStore.js";
import dataschemaskl from "src/composables/schemaDataSkelton";
import { useRouter } from "vue-router";
import { postStore } from "src/stores/dataStores/postStore";
import { comtStore } from "src/stores/dataStores/comtStore";


//---------------------Login form
const authService = authStore();

//import userProfile from "src/components/userProfile.vue"
const timeService = timeStore(); // intialize
timeService.timeMachine();

//--utilities_service...
const router = useRouter();
const $q = useQuasar();
//const $m = useMeta();

const metaData = {
  // sets document title
  title: "YGP  Blog",
  // optional; sets final title as "Index Page - My Website", useful for multiple level meta
  titleTemplate: (title) => `${title} - DashBoard`,
  // JS tags,
       link: [
             {
                 rel: "icon",
                 type:"image/*" ,
                 href:("assets/images/im0.jpg")
             }
          ],
       
  script: {
    printJs: {
      type: "application/ld+json",
      innerHTML: `{  }`,
    },
    ldJson: {
      type: "application/ld+json",
      innerHTML: `{ }`,
    },
  },
};
useMeta(metaData);
//------------------Stores___

const commentService = comtStore();
const postService = postStore();
//const favicon = document.getElementById("favicon");   
//favicon.href = "assets/images/im0.jpg";
//_____________________________________________________GLOBAL Variables Definitions

let pageLoading = ref(true);
let messagner = ref("Checking....");

//---Blog Variables
let loadingError = ref(false); //INIT _-loading page State( informations Display)
let activePost = ref({}); //post_clicked for view...
let activePostEdit = ref(true);

let postForm = ref(false);
//===-----Loged USER About // userModelSchema = Object.keys(readData)

//-------------USER PROFILE_Variables..
//-------------USER PROFILE_Variables..
const props = defineProps({
  _who: { type: Object, default: () => ({}), required: true }, //user Datas all there is...
  _userID: { type: String, default: "" }, //(isPowered(logStatus,root,regAdmin))
  _isPriviledged: { type: Object, default: () => ({}), required: true }, //is the loged_user has privileged_routes...defintions
  _mainRole: { type: String, default: "" },
  _role: { type: String, default: "" },
  _priviledgedFor: { type: Object, default: () => ({}), required: true }, //user's privileges on general....with object of privileges =>{'asset':'regAdmin'}
  _priviledgedForRoutes: { type: Object, default: () => ({}), required: true }, //user's privilegs on generl...but with routing..defintions

  //----------------------asset model total privileges....
  _modalPriviledges: { type: Object, default: () => ({}), required: true }, //all model's possible privileges list.....list of objects_priviledges ( {'asset':['regAdmin','root'],'raws'})
});
let stars = ref(7);

let _superCriteria = ["root", "regAdmin"];
//===-----_--------THE MODEL/ MAIN_DATA....
let _thisModel = "asset"; // the Vue_Page_DataModel (Listing Collection Name)
var _thisModelHeader = ref(" Asset Managment"); // the Vue_Page_Data_Headers(Descriptions...)

//---current Modal Specific_privileges_analysis
//let _thisModelPriviledges = ref(props._modalPriviledges[_thisModel]["enum"]); //current model's possible privileges list....objects ( .enum=[1,2,3])
let _thispriviledgedFor = ref("root"); //ref(props._priviledgedFor[_thisModel]); //user's priviledges on current model....string
let _issuperPriviledged = ref(
  //is user as root/regadmin... or status_changer
  _superCriteria.includes(_thispriviledgedFor.value) ? true : false
); //--is User(Root||Admin) or Normal Employeess

//let _isPriviledged = ref(false); //props._priviledgedForRoutes.length ? true : false; //--is User(Root||Admin) or Normal posts

//------------------

let PostData = ref([]);
let postLoading=ref(false)
//postLoading = computed(() => postCount.value ? false : true)
let CommentData = ref([]);

//------
let DeptPostData = ref([]);
let YirguPostData = ref([]);
let PubPostData = ref([]);
//---------------------------------------------- SCHEMAS & DATA MiNNING

//--USER Schema
let userSchema = reactive({
  name: {
    type: "String",
  },
  userAuthorization: {
    username: {
      type: "String",
    },
    password: {
      type: "String",
    },
    keyID: {
      type: "String",
    },
  },
});

//-------UserModelSchema
//---POST Schema
let postModelSchema = reactive({
  header: {
    type: "String",
    default: "",
  },
  contents: {
    type: "String",
    default: "",
  },
  mainRole: { type: "String",default:"" },
  name: {
      type: 'String',
      default: "",
    },
  userID: {
    type: "ObjectID",
    default: '',
    ref: "employees",
  },
  rate:{
      type:'Array',
      default:[[],[],[]]
    }
});
//---COMMENT Schema
let CommentModelSchema = reactive({
  contents: {
    type: "String",
    default: "",
  },
  postID: {
    type: "ObjectID",
    default: '',
  },
  name: {
      type: 'String',default:""
    },
  userID: {
    type: "ObjectID",
    default: '',
    ref: "employees",
  },
});

//-----
let onplayRowItemPost = reactive({}); //---POST Model
let defaultItemPost = reactive({});
let onplayRowItemComm = reactive({}); //---COMMENT Model
let defaultItemComm = reactive({});
let onplayRowItemUser = reactive({}); //--USER Model
let defaultItemUser = reactive({});

//they would be used for updating..value..
let defaultItem = reactive({}); //holds the actual skelton_as data
let onplayRowItem = reactive({}); //the current on play value..hold acual skelton(for new Register) or existing..data for updaing
//-----------------MODEL SCHEMA & DATA Skelton........

_miningUserModel();
async function _miningUserModel() {
  onplayRowItemUser = await dataschemaskl(userSchema);
  defaultItemUser = reactive(onplayRowItemUser);
  return "";
}

_miningPostModel();
async function _miningPostModel() {
  onplayRowItemPost = await dataschemaskl(postModelSchema);
  onplayRowItemPost.userID = props._userID; //auto_default compay_ID(User_currently_loged)...(injecting...GlobalData[User_ID])
  onplayRowItemPost.mainRole = props._mainRole; //auto_default compay_ID(User_currently_loged) (injecting...GlobalData[User_main_Role])
  onplayRowItemPost.name = props._who['name']; //auto_default compay_ID(User_currently_loged) (injecting...GlobalData[User_main_Role])
  //activePost = reactive(Object.assign({}, onplayRowItemPost));
  defaultItemPost = reactive(onplayRowItemPost);
  return "";
}

_miningCommentModel();
async function _miningCommentModel() {
  onplayRowItemComm = await dataschemaskl(CommentModelSchema);
  onplayRowItemComm.userID = props._userID; //auto_default compay_ID(User_currently_loged) (injecting...GlobalData[User_ID])
  onplayRowItemComm.name = props._who['name'];
  defaultItemComm = reactive(onplayRowItemComm);
  return "";
}

/////////////////////BLOGING
//--Fetching Data
//let syncState = ref(5000);
let activeComments = ref([]);
let watchActivePost=ref(false)

//------------------------------------------SYNCING DATA With Store
let postCount = ref(0);
let firstLoad=true
//-----------------------

PostData = computed( () => {
  let syncPosts =  postService.getDatas;
  let countsyncPosts = syncPosts.length;
  notifyit.info("New post arrived!");
  
  if (syncPosts === 0 ) {
    return [];
  } 

  try {
    if (countsyncPosts != postCount.value) {
      setpostCounter(countsyncPosts);
      if(firstLoad){Post_.showPost(syncPosts[0])}
      notifyit.info("New post arrived!");
      return syncPosts;
    }
  } catch {}
  firstLoad=false
  return syncPosts;
});

function setpostCounter(countedPosts) {
  postCount.value = countedPosts;
}

let selectedPost= ref(0);
const Post_ = {
  //PostList_Selected
  showPost: async function (post) {

    activeComments.value=[]
    watchActivePost.value=true
    postForm.value = false;
    activePost.value = post; //reactive(Object.assign({}, post));
    onplayRowItemComm.postID = post.id; //Inject the comment_filed ( postID)
    
    //fetchComments(activePost.value.userID);
    return true;
  },
  //PopUp Post_Form(Registering/Updating)
  showPostForm: async function (Ops = "reg") {
    postForm.value = false;
    if (Ops == "reg") {
      postForm.value = true; //then turns popUp "ON"
      onplayRowItemPost = reactive(defaultItemPost); //to register new post..return to defaultData_Scheltone
    } else {
      //ignore it ( since it is already holding_selected_to be showed_item..from "Post_.showPost()")
      onplayRowItemPost = reactive(activePost.value);
    }
    return true;
  },
};


//------------------------------------------SYNCING DATA With Store

async function getComs(){
  return await commentService.readFData({ postID: actPostID }).then((response) => {
      let comments = response["data"];
     if(comments.length){
      activeComments.value = comments ; 
      watchActivePost.value=false
     }      
    });
}

setInterval(async () => {
    if(watchActivePost.value){
    //syncState.value=300000
    activeComments.value= []
    let actPostID = activePost.value["id"];
    console.log("YYYYYYYYYYYYYY", actPostID);
    await commentService.readFData({ postID: actPostID }).then((response) => {
      let comments = response["data"];
     if(comments.length){
            activeComments.value = comments ; 
    watchActivePost.value=false
     }

    });
    
    //console.log(activeComments.value["data"], "activeComments......");
    }
  return true;
}, 30000); //set it to zero/# to stop/Synchronizing...

//---------------------Syncing.....DATA---controlle syncing (on || off)

//ModalData-Syncs
//const asyncCrud_ = {
  //since they are puteds_as_object..they won't require...ignitore..
 // asyncPost: postService.asyncDatas(15000), //sync every 10 seconds...as default
  //asyncComment: commentService.asyncDatas(60000), //sync every 10 seconds...as default
//};

//------------------------------------------SYNCING DATA With Store

async function set_defaultRowItems() {
  onplayRowItemUser = reactive(defaultItemUser);
  onplayRowItemPost = reactive(defaultItemPost);
  onplayRowItemComm = reactive(defaultItemComm);
  return true;
}


async function addComment() {
  //watchActivePost.value=true;
  await Crud_.createData(commentService, onplayRowItemComm).then((response) =>{
   
   //activeComments.value.push(onplayRowItemComm)
   
    //getComs()
   return true
  })
  watchActivePost.value=true
 // activeComments.value.push(onplayRowItemComm);
  return true;
}

let postRate=ref(3);

async function ratePost(){
  let rateAssign=postRate.value-1

  console.log(postRate.value,"active post rating....",activePost.value.rate)
  for ( let ratesIndex in [0,1,2]){

  let  idExisted = false
  console.log(activePost.value.rate[ratesIndex].includes(props._userID))
  try{
      if(activePost.value.rate[ratesIndex].includes(props._userID)){
     idExisted = activePost.value.rate[ratesIndex].indexOf(props._userID);
  }
}

  catch{}
  
  console.log(idExisted,"isID Existed",ratesIndex,rateAssign)
  if(ratesIndex === rateAssign){

    //let userExisted = activePost.value.rate[ratesIndex].indexOf(props._userID);
  console.log(idExisted,"Match Existed 333333",ratesIndex,rateAssign)

     if(idExisted){
      activePost.value.rate[ratesIndex].splice(idExisted,1)
     }
     else{
      console.log('insierting,,,')
      activePost.value.rate[ratesIndex].push(props._userID)}

  }
  else{
    if(idExisted){

    activePost.value.rate[ratesIndex].splice(idExisted,1)

    }

  }}

    Crud_.updateData(postService, activePost.value);
  return true;
} 

//ModalCrudOps
//----=========================================================================---DATA ---/// ---ROW----CRUD
let createKey = "contents";
let updateKey = "id";
let delKey = "id";
//ModalCrudOps
const Crud_ = {
  createData: async function (dbModel, onplayRowItem, message = "Create") {
    //return false or data
    try {
      if (!onplayRowItem[createKey]) {
        //Data Is Manadatory
        notifyit.warn("Error Create # with No createKey");
        return false;
      }
    } catch {
      notifyit.warn("Error Create # with No createKey");
      return false;
    }
    console.log("Cruding ...Create", message, onplayRowItem);
    let objParam = { [createKey]: onplayRowItem[createKey] };
    return await dbModel
      .createData(onplayRowItem, objParam)
      .then((response) => {
        if (response) {
          notifyit.succes("..!");
          set_defaultRowItems();
          if(dbModel=postService){ PostData.value.push(response["data"])}
          else{{ activeComments.value.push(response["data"])}}
          
          return response["data"];
        } else {
          notifyit.warn("Error  New post..!");
          return false;
        }
      })
      .catch(() => {
        return false;
      });
  },
  readData: async function (dbModel, message = "Read") {
    //return false or data
    return await dbModel
      .readData()
      .then((response) => {
        if (response) {
          set_defaultRowItems();
          return response["data"];
        } else {
          return false;
        }
      })
      .catch(() => {
        return false;
      });
  },
  readFData: async function (dbModel, objParam, message = "Read Filter") {
    //return false or data
    try {
      if (!Object.keys(objParam).length) {
        //Object_parameters{k:v} Mandatory
        notifyit.warn("Error Filtering # with No Parameters");
        return false;
      }
    } catch {
      notifyit.warn("Error readFData # with No Parameters");
      return false;
    }

    return await dbModel
      .readFData(objParam)
      .then((response) => {
        console.log("data filter Result", response);
        if (response) {
          //set_defaultRowItems();
          return response["data"];
        } else {
          return false;
        }
      })
      .catch(() => {
        return false;
      });
  },
  updateData: async function (dbModel, onplayRowItem, message = "Updating") {
    //return false or data
    try {
      if (!onplayRowItem[updateKey]) {
        notifyit.warn("Error Update # with No updateKey");
        return false;
      }
    } catch {
      notifyit.warn("Error Update # with No UpdateKey");
      return false;
    }

    let objParam = {};
    objParam[updateKey] = onplayRowItem[updateKey];
    return await dbModel
      .updateData(onplayRowItem, objParam)
      .then((response) => {
        if (response) {
          notifyit.succes("post Succefully Updated..!");
          PostData.value.push(onplayRowItem)

          set_defaultRowItems();
          return response["data"];
        } else {
          notifyit.succes("Error Updating post !");

          return false;
        }
      })
      .catch(() => {
        notifyit.succes("Error Updating post !");
        return false;
      });
  },
  deleteData: async function (dbModel, ItemId, message = "Deleting") {
    //return false or data
    if (!ItemId) {
      //ItemID is mandatory
      notifyit.warn("Error Deleted # with No ItemID");
      return false;
    }
    let objParam = {};
    objParam[delKey] = ItemId;
    return await dbModel
      .deleteData(objParam)
      .then((response) => {
        if (response) {
          set_defaultRowItems();

          return response["data"];
        } else {
          return false;
        }
      })
      .catch(() => {
        return false;
      });
  },
};
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
function logout() {
  localStorage.clear();
  router.push("/");
  return true
}
//---timeFormater
async function _formatDate(value) {
  if (value) {

    return value.split("T")[0]  //.split('-');
  }
}

//-----------------NOtifier & Loading (InnerLoading)

/////////////////////////////////////////////////////////-------------------loading & notify services


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
      type: "info",
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
      spinner: false,
      group: "my-group", //identical messages with of same group..with show label_count..
      progress: true,
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
      pageLoading.value = false;
      timer = void 0;
      return "terminating";
    }, period);
  },
};
//----- & Loading (InnerLoading)

//---------------Profile_setup

const _profileInformation = async () => {
  //check if _it is logged
  //return false;
 // if (!props._userID ){;// && props._isPriviledged) {
 //   notifyit.warn('Authenticate Please...?')
  //  return false;
 // }
 // _thisModelPriviledges.value = props._modalPriviledges['blog'];
  return true
}

//---------------------..........POST ( loading...profile_checking)
onMounted(async () => {
  //--------------ON MOUNT
  return await _profileInformation()
    .then((resp) => {
      if (!resp) {
        timerResponse(4000, "Wellcome to Blog...").then((response) => {
          router.push("/");
          return false;
        });
      }
      pageLoading.value = false;

      return true;
    })
    .catch(() => {
      //wellcomeLoading("Authentications Error..Redirecting Home!",5000)
      loadingError.value = true; //display error messages...
      timerResponse(3000, "re-authenticate please...").then((response) => {
        router.push("/");
        return false
      });
    });
});

//with auto_fired...saying of "checking..."
async function timerResponse(period = 4000, message = "") {
  //handle the page_loading (time & message)
  messagner.value = message;
  setTimeout(() => {
    pageLoading.value = true;
    //console.log("waiting...");
  }, period);
}
</script>
