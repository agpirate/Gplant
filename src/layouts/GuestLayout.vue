<template>
    <!-- <div v-if="Loadingevent.main ?? false"
    style="height:100vh;padding:0px;margin:0px;
    display:flex;flex-flow:row nowrap;justify-content:center;align-items: center;"
    >{{  Loadingpage }} {{ Loadingevent}}
    ppp {{ Loadingpage.content}}
    <div>Loading .... </div>

</div> -->
  <q-layout view="lHh LpR lFf" class="bg-image3 fit" style="height: 90vh" >

    <q-header elevated style="" class="text-primary">
      <q-toolbar
        class="text-white text-weight-bolder text-h4"
        style="background: rgb(0, 99, 0)"
      >
        <q-toolbar-title class="text-weight-bolder" style="font-family: ubuntu;color:white"> Yirgu Gas Plant </q-toolbar-title>
        <!-- <div class="text-overline">
          <q-btn> contacts </q-btn>
          <q-btn> About Us </q-btn>
        </div> -->
        <div class="text-overline"> 
          {{ new Date().toDateString() }}
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container class="col">
      <router-view />
    </q-page-container>

  </q-layout>


</template>

<script setup>
import { ref } from "vue"
import useDebugMixin from "src/composables/debugMixin"
const { 
  Loadingpage,
      Loadingevent,
      // Loading,

      // DoneMessage,
      // KnowthisMessage,
      // WarnthisMessage,
      //----------returning values
      // timerLoadpage,
      timerLoadevent,
      // timerLoad,

      // timerDone,
      // timerInformthis,
      // timerError
} = useDebugMixin()
// timerLoadevent({ main: 1 }, 2000, "....");

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
  background-image: url(/images/im10.jpg);
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 100vh;
  width: 100vw;
  border-radius: 5px;
  filter: blur(0px);
  /* Flex Box Method */
  display: flex;
  justify-content: center;
  align-items: center;
}
.bg-image1:hover {
  filter: blur(0);
}

.bg-image2 {
  background-image: url(/images/im2.jpg);
  background-repeat: repeat;
}
.bg-image2:hover {
  filter: blur(0);
}

.bg-image3 {
  background-image: url(/yirgupic/yirgulogin.svg);
  background-repeat: repeat;
  background-size: cover;
}

.bg-image3:hover {
  filter: blur(2);
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
  font-size: 10px;
}

/*=====================  Fronted_Glass / Blur Styles as OverLay Background... */
.overlay-Glass {
  backdrop-filter: blur(15px);
  background-color: rgba(3, 17, 43, 0.144);
  color: rgb(45, 180, 4);
}

.overlay-Glass:before {
  background: inherit;
}

.overlay-GlassDark {
  background: inherit;
}
</style>
