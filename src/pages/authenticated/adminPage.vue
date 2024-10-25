<template>
  <q-page class="column">
    <!-- make the page to hold all Height /Even q-Page could do... full cover background-->
    <div
      class="col row justify-evenly text-white text-overline items-center fronted-glass"
      style="backdrop-filter: blur(15px)"
    >
      <!-- flex will build row_layouts center on mid with given padding/magine-->

      <q-card
        v-for="(rootCard, top) in rootCards"
        :key="top"
        class="q-ma-xs col-md-2 col-sm-4 col-xs-12 my-box cursor-pointer q-hoverable text-dark"
        style="
          background: lightgray;
          border: 0.2px solid rgba(17, 17, 230, 0.514);
          min-height: 20vh;
        "
        v-ripple
      >
        <q-card-section>
          {{ Divisions[top] }} {{ timeService.getNow }}
        </q-card-section>
        <q-card-section class="q-gutter-sm">
          <q-btn
            no-caps
            class="text-md"
            size="sm"
            v-for="(model, topG) in rootCard"
            :key="`btn_size_sq_${topG}`"
            color="primary"
            :label="` ${topG}`"
            :to="`${model[0]}`"
          />

          <q-separator inset />
          <br />
        </q-card-section>
      </q-card>
    </div>
    <div class="q-ma-sm text-bold text-primary">{{ timeService.getNow }}</div>
  </q-page>
</template>

<script setup>
import { ref, reactive, computed } from "vue";

import { timeStore } from "src/stores/jstStores/serviceStore.js";
import { useRouter } from "vue-router";
const router = useRouter();

const timeService = timeStore(); // intialize

//---------imported Componenets

//---------variables
let Divisions = {
  proc: "Procurment Divisions Model",
  humd: "Human Resource & Development Divisions",
  sale: "Sale Divisions",
};
let rootCards = reactive({
  proc: {
    asset: ["proc/asset", "rawmatterias", ""],
    rawmatterial: ["proc/raw", "rawmatterias2", ""],
  },

  humd: {
    asset: ["/assets", "rawmatterias", ""],
    rawmatterial: ["humd/assets", "rawmatterias2", ""],
  },

  sale: {
    pay: ["humd/assets", "rawmatterias", ""],
  },
});

//------------POST Process

//---liveTimer

/*
<HomeLoading
    v-if="dataLoc[0].isLoading"
    :typeLoading="dataLoc[0].typeLoading"
  >
  </HomeLoading>

  <div v-show="!dataLoc[0].isLoading" class="row window-height">
const dataLoc = reactive([
  { isLoading: true, typeLoading: "anny" }, //annoymouse, login/signup
]);
onMounted(async () => {
  setTimeout(function () {
    dataLoc[0].isLoading = false;
  }, 3000);
});


//--------
import { useTimeserStore } from "src/stores/utilServices";
const timeStore = useTimeserStore();
timeStore.updateTime(); // {{ timeStore.getNow }}



*/
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
  background-image: url(assets/images/im3.jpg);
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

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
  background-image: url("~assets/images/im3.jpg");
  background-repeat: repeat;
}
.bg-image2:hover {
  filter: blur(0);
}

/*===========================    text-Over Backgrounds  */
.text-Overly {
  background-color: rgb(0, 0, 0, 0.5);
  width: 100%;
  height: 40%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 20px;
}

/*=====================  Fronted_Glass / Blur Styles as OverLay Background... */
.overlay-Glass {
  backdrop-filter: blur(15px);
  background-color: rgba(0, 110, 255, 0.158);
  color: rgb(0, 0, 255);
}

.overlay-Glass:before {
  background: inherit;
}

.overlay-GlassDark {
  background: inherit;
}
</style>
