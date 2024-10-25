<template>
  <q-list class="col column q-gutter-xs shadow-0 transparent fit" style>
    <q-item
      class="column col q-gutter-xs transparent"
      style="background: rgba(253, 253, 255, 0.438)"
    >
      <q-item-section class="col-auto row">
        <div class="q-gutter-sm row justify-between">
          <q-chip
            outline
            color="teal"
            text-color="white"
            icon="bookmark"
            :dense="true"
            class="col-auto"
          >
            Take a Notes
          </q-chip>

          <q-btn
            outline
            :dense="true"
            @click="createNote()"
            class="col-auto q-pa-none q-ma-none"
            size="md"
          >
            +
          </q-btn>
        </div>
      </q-item-section>

      <div
        style="max-height: 15vh; overflow-y: scroll"
        class="col justify-begine"
      >
        <q-item-section
          class="col column q-pa-xs"
          v-for="(item, ky) in notes"
          :key="ky"
        >
          <q-chip
            outline
            square
            color="deep-orange"
            text-color="white"
            icon="directions"
          >
            <q-input
              v-model="notes[ky].name"
              :dense="true"
              class="text-caption"
              :label="'Note' + ky"
            ></q-input>
          </q-chip>

          <q-input
            outlined
            v-model="notes[ky].content"
            autogrow
            :dense="true"
            class="text-caption"
          >
            <template v-slot:append>
                <q-btn round dense flat icon="delete" @click="deleteNote(ky)" />
              
            </template>
          </q-input>
        </q-item-section>
      </div>
    </q-item>
  </q-list>
</template>

<script setup>
import { ref, reactive, onMounted, defineAsyncComponent, computed } from "vue";

let notes = ref([]);

async function createNote() {
  console.log("creating notes");
  notes.value.push({ name: "", content: "" });
}

async function deleteNote(index) {
  notes.value.splice(index, 1);
}
</script>
