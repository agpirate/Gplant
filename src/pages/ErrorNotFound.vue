<template>
  <div
    class="fullscreen bg-blue text-white text-center q-pa-md flex flex-center"
  >
    <div>
      <div style="font-size: 30vh">
        <q-icon name="warning" color="warning" size="4rem" />
      </div>

      <div class="text-h2" style="opacity: 0.4">4o4 : Routing Error.</div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

import { LocalStorage, useQuasar } from "quasar";
const $q = useQuasar();

//const $m = useMeta();



export default defineComponent({
  name: "ErrorNotFound",
});
</script>
