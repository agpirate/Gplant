<template>
  <q-layout
    view="lHh LpR lFf"
    class="bg-image2 overlay-Glass bg-red"
    v-if="pageLoading"
  >
  ppppppppppppppppppppppppppppppp
    <q-page-container>
      <q-page
        class="flex flex-center text-overline bg-green full-width full-height"
      >
        <div v-if="!loadingError">
          <div>{{ pageLoadingNote }}</div>
          <div><q-spinner-ios size="xl" color="yellow" /></div>
        </div>

        <div v-else class="column">
          <div>{{ pageLoadingNote }}</div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>

  <q-layout view="lHh LpR lFf" class="bg-image2 text-Overly2" v-else>
    <q-header elevated class="transparent">
      <q-toolbar class="g-gutter-sm row fit">
        <q-toolbar-title class="text-bold text-blue">
          <q-chip size="17px" class="text-weight-bolder" style="color:rgb(94, 255, 0) ;background:rgb(1, 1, 49);"
            >Yirgu Gas Plantttttttttttt
          </q-chip>
ssssssssssssssssssssssss
          <q-chip
            removable
            icon="right"
            color="orange"
            text-color="black"
            class="text-caption"
            v-for="today in monthQuote.length"
            :key="today"
          >
            <div class="ellipsis">{{ monthQuote[today] }}</div>
          </q-chip>
        </q-toolbar-title>

        <div class="text-light text-light text-overline">
          <q-btn
            size="10px"
            @click="logout()"
            class="text-white bg-light text-bold"
            >LogOut
          </q-btn>
          {{ timeService.getNow }}
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container class="text-caption overbg-image2 overlay-Glass">
      <RouterView
        :_who="_who"
        :_userID="_userID"
        :_mainRole="_mainRole"
        :_role="_role"
        :_priviledgedFor="_priviledgedFor"
        :_modalPriviledges="userModelSchema['DataPrivilege']"
        :_priviledgedForRoutes="_priviledgedForRoutes"
        :_isPriviledged="_isPriviledged"
      />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";

import { useQuasar } from "quasar";

//import userProfile from "src/components/userProfile.vue"
import { timeStore } from "src/stores/jstStores/serviceStore.js";

import dataschemaskl from "src/composables/schemaDataSkelton";
import { useRouter } from "vue-router";

const $q = useQuasar();
const router = useRouter();

const timeService = timeStore(); // intialize
timeService.timeMachine();
const pageLoading = ref(false);
let pageLoadingNote = ref("");
let loadingError = ref("");
//-------------USER PROFILE_Variables..
let _who = reactive({}); //user Datas all there is...
let _userID = ref("");
let _mainRole = ref("");
let _role = ref("");
let _priviledgedFor = reactive({});
let _priviledgedForRoutes = reactive({});
let _isPriviledged = ref({}); //does it has..... priviledged routes.?
//--------
let _modalPriviledges = reactive({}); //total privileges of this system

//-----------------------
let monthQuote = [
  "we provide quality products, with purpose",
  "we are serving people, at it's finest",
];
///----------SCHEMATICS & DATA MINING...

///--------User Priviledge Skelton

///--------simple(NonRoot) Schema
let userModelSchema = reactive({
  name: {
    type: "String",
    default: "",
  },
  companyID: {
    type: "String",
    default: "",
  },
  gender: {
    type: "String",
    default: "",

    enum: ["", "male", "femal"],
  },
  //img: {
  //  type: String,
  //},
  address: {
    woreda: {
      type: "String",
      default: "",
    },
    city: {
      type: "String",
      default: "",
    },
    phone: {
      type: "String",
      default: "",
    },
    email: {
      type: "String",
      default: "",
    },
  },
  userAuthorization: {
    username: {
      type: "String",
      default: "",
    },
    password: {
      type: "String",
      default: "",
    },
    keyID: {
      type: "String",
      default: "",
    },
  },
  DataPrivilege: {
    rawMaterial: {
      default: [],
      type: Array, // for aaray...values of columns...use only type:array with no enum...(put them on....dataprivileges...)
      //mongoose doesn't use...array with enum
    },
    product: {
      default: [],

      type: Array, // for aaray...values of columns...use only type:array with no enum...(put them on....dataprivileges...)
      //mongoose doesn't use...array with enum
    },
    employee: {
      type: "String",
      default: "",
      enum: ["", "root", "regAdmin", "userAuthorization"],
    },
    customer: {
      type: "String",
      default: "",
      enum: ["", "root", "regAdmin"],
    },
    supplier: {
      type: "String",
      default: "",
      enum: ["", "root", "regAdmin"],
    },
    asset: {
      //aray of privileges which are to be populated from the vue page
      type: "Array",
      default: [],
    },
    payment: {
      type: "String",
      default: "",

      enum: ["", "root", "admin"],
    },
    goods: {
      type: "Array", // for aaray...values of columns...use only type:array with no enum...(put them on....dataprivileges...)
      //mongoose doesn't use...array with enum
    },
  }, // dataPriviledges...Object_Optionals
  employeedate: {
    dateOfBirth: {
      day: {
        type: "Number",
        default: "",
      },
      month: {
        type: "Number",
        default: "",
      },
      year: {
        type: "Number",
        default: "",
      },
    },
    dateOfEmployee: {
      day: {
        type: "Number",
        default: "",
      },
      month: {
        type: "Number",
        default: "",
      },
      year: {
        type: "Number",
        default: "",
      },
    },
    dateOfLeave: {
      day: {
        type: "Number",
        default: "",
      },
      month: {
        type: "Number",
        default: "",
      },
      year: {
        type: "Number",
        default: "",
      },
    },
  },
  salary: {
    grossSalary: {
      type: "Number",
      default: "",
    },
    allowance: {
      transport: {
        type: "Number",
        default: "",
      },
      phone: {
        type: "Number",
        default: "",
      },
      houseRent: {
        type: "Number",
        default: "",
      },
    },
  },

  department: {
    mainRole: {
      type: "String",
      default: "",

      enum: [
        "",
        "engineering",
        "procurement",
        "store",
        "finance",
        "marketing",
        "humanResource",
      ],
    },
    role: { type: "String", default: "", enum: [""] },
  },
});
_modalPriviledges = reactive(userModelSchema["DataPrivilege"]);

//----Local Storage___
const _localStorage = {
  _get: (_item) => {
    return $q.localStorage.getItem(_item);
  },
  _set: (_key, _item) => {
    return $q.localStorage.set(_key, _item);
  },
};
//----------------getSchema--------

//--------------------------------------NOtifier & Loading (InnerLoading)
const loadit = {
  wellcome: async function (notes = "Loading...Weblog....!", period = 9000) {
    $q.loading.show({
      message: notes,
      boxClass: "bg-secondary",
      spinnerColor: "orange",
    });
    // hiding in 3s
    let timer = setTimeout(() => {
      $q.loading.hide();
      timer = void 0;
    }, period);
    return " ";
  },
  process: async function (notes = "wellcom", period = 5000) {
    $q.loading.show({
      message: notes,
      boxClass: "transparent",
      spinnerColor: "orange",
    });
    // hiding in 3s
    let timer = setTimeout(() => {
      $q.loading.hide();
      siteLoading.value = false;
      timer = void 0;
      return "terminating";
    }, period);
  },
};
//---------------------------------------Notifier (pos,act,notes)
//negative,posetive,warning,info
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
};

//--------------------------------------------------------------------Profiling (CHECK AUTHENTICATIONS &&& USER INFORMATIONS)
const _profileInformation = async () => {
  _userID.value = _localStorage._get("_userID"); //check if _it is logged

  if (!_userID.value) {
    return false;
  }

  try {
    //let _userID = _localStorage._get("_userID"); // check if _it is Priviledges_box has options

    _priviledgedFor = reactive(_localStorage._get("_priviledgedFor")); // check if _it is Priviledges_box has options
    _modalPriviledges = reactive(_localStorage._get("_modalPriviledges")); // check if _it is Priviledges_box has options
    _priviledgedForRoutes = reactive(
      _localStorage._get("_priviledgedForRoutes")
    ); // check if _it is Priviledges_box has options
    _mainRole.value = _localStorage._get("_mainRole"); // check if _it is Priviledges_box has options
    _role.value = _localStorage._get("_role"); // check if _it is Priviledges_box has options
    //_thisModelPriviledges.value = _modalPriviledges['blog'];
    _isPriviledged.value = _priviledgedForRoutes.length ? true : false; //--is User(Root||Admin) or Normal posts

    let profile = reactive({});
    for (let profKey in userModelSchema) {
      //let's collect data(persona//profile...)
      // there variable holding the VIp informations to know about user_logedIN
      try {
        profile[profKey] = _localStorage._get(profKey);
        //_who=_who;
      } catch {}
    }
    _who = reactive(profile);
  } catch {}
  return true;
};
//-----------logout
function logout() {
  localStorage.clear();
  return router.push("/");
  //return true
}

//------------------------------------------------------------------------------ Warming UP(BIOS_Process.....POST)
_userID.value = _localStorage._get("_userID"); //check if _it is logged

if (!_userID.value) {
  timerResponse(4000, "wrong credentials !").then((response) => {
    //router.push("/");
    //return false;
  });
}

onMounted(async () => {
  //--------------ON MOUNT
  _userID.value = _localStorage._get("_userID"); //check if _it is logged

  if (!_userID.value) {
    timerResponse(4000, "wrong credentials !").then((response) => {
      //return router.push("/");
      //return false;
    });
  }

  await _profileInformation()
    .then((resp) => {
      if (!resp) {
        timerResponse(4000, "Authentications Failed").then((response) => {
          //return router.push("/");
        });
      }
      notifyit.succes("bottom-letft", "", "Yirgu Gas # Home.." + _who["name"]);
      //userModelSchemaData()
      pageLoading.value = false;
      return true;
    })
    .catch(() => {
      loadingError.value = true;
      timerResponse(3000, "Fatal Authentications Error").then((response) => {
        return router.push("/");
      });
    });
});

async function timerResponse(period = 4000, message = "") {
  pageLoadingNote.value = message;
  setTimeout(() => {
    pageLoading.value = false;
    //console.log("waiting...");
    return true;
  }, 2000);
}
</script>

<style>
/* ===================   layout W x H */
.fit-viewBox {
  height: 100vh;
  width: 100vw;
}

.fit-hbox {
  height: 100vh;
}

.fit-wbox {
  width: 100vw;
}

/*=====================  Background Image Styles              */
.bg-image1 {
  background-image: url(/images/im3.jpg);
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 250p;
  width: 400px;
  border-radius: 25px;
  filter: blur(4px);
  /* Flex Box Method */
  display: flex;
  justify-content: center;
  align-items: center;
}
.bg-image1:hover {
  filter: blur(0);
}

.bg-image2 {
  background-image: url(/yirgupic/plantMachine.jpg);
  background-repeat: repeat;
  filter: blur(0px);
}
.bg-image2:hover {
  filter: blur(0);
}

.bg-image3 {
  background-image: url(/images/im7.jpg);
  background-repeat: no-repeat;

  height: 100vh;
  width: 100vw;
  border-radius: 5px;
  filter: blur(0px);
  /* Flex Box Method */
  display: flex;
  justify-content: center;
  align-items: center;
}

/*===========================    text-Over Backgrounds  */
.text-Overly {
  background-color: rgb(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 20px;
}

.text-Overly2 {
  background-color: rgb(0, 0, 0, 0.5);
  align-items: center;
  color: white;
  font-size: 10px;
}

/*=====================  Fronted_Glass / Blur Styles as OverLay Background... */
.overlay-Glass {
  backdrop-filter: blur(0px);
  background-color: rgba(159, 196, 114, 0.404);
  color: rgb(0, 0, 255);
}

.overlay-Glass:before {
  background: inherit;
}

.overlay-GlassDark {
  background: inherit;
}
</style>
