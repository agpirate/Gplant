<template>
  <router-view />
</template>

<script>
import { defineComponent } from "vue";
import { onMounted } from "vue";
import { useQuasar } from "quasar";


export default defineComponent({
  name: "App",
  setup() {
    // ...
    const $q = useQuasar();
    onMounted(() => {
      $q.onSSRHydrated();
    });
  },
});
</script>
