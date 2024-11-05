<template>
  <div class="flex flex-col items-center gap-5">
    <VTextField
      v-model="textToCopy"
      label="Texto que deseja copiar"
      class="w-full"
    />

    <VBtn class="w-full" @click="handleCopyText">
      Adicionar Texto ao Clipboard
    </VBtn>

    <VBtn class="w-full" @click="handleReadClipboard">
      Ler Texto do Clipboard
    </VBtn>

    <h2 v-if="textReadFromClipboard">
      Texto Lido do Clipboard:<br />
      {{ textReadFromClipboard }}
    </h2>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const textToCopy = ref("");
const textReadFromClipboard = ref("");

const handleCopyText = async () => {
  if (textToCopy.value.length > 0) {
    await navigator.clipboard.writeText(textToCopy.value);

    toast("Texto copiado com Sucesso!", {
      autoClose: 2000,
      type: "success"
    });
  }
};

const handleReadClipboard = async () => {
  const textFromUserClipboard = await navigator.clipboard.readText();

  textReadFromClipboard.value = textFromUserClipboard;
};
</script>
