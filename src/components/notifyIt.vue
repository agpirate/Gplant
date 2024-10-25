
<template>

</template>

<script setup>

import { exportFile, useQuasar, useMeta } from "quasar";

const $q = useQuasar();

const props = defineProps({

  position: { type: String, default: "", required: false }, //'AssetName'_column to analysis {'assetName'}//column_name
  actions: { type: String, default: "", required: false }, //'AssetName'_column to analysis {'assetName'}//column_name // the column_name used as id_ to catagorized items
  notes: { type: String, default: "", required: false }, // 'StoreStatus'_column as analysiser {'StoreStatus'} //the actuall_value to analysis
  period: { type: String, default: "", required: false }, // 'StoreStatus'_column as analysiser {'StoreStatus'} //the actuall_value to analysis
});

let notes =ref(props.notes)
let position =ref(props.position)
let actions =ref(props.actions)
let period =ref(props.period)

const notifyit = {
   // info: (notes = "", position = "bottom-right", actions = "", period = 700) => {
    info: () => {
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
    warn: () => {
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

  
</script>
