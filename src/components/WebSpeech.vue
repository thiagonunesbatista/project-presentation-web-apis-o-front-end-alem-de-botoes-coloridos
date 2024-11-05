<template>
  <section class="flex flex-col gap-5">
    <VTextField v-model="textToRead" label="Texto para ler" class="w-full" />

    <VBtn
      class="w-full"
      @click="handleReadText"
      :disabled="textToRead.length === 0"
    >
      Ler Texto
    </VBtn>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";

const textToRead = ref("");

const handleReadText = () => {
  if ("speechSynthesis" in window) {
    const utterance = new SpeechSynthesisUtterance(textToRead.value);

    utterance.rate = 1;
    utterance.volume = 1;
    utterance.pitch = 1;

    const availableVoices = window.speechSynthesis.getVoices();
    const brazilianPortugueseVoice = availableVoices.find(
      voice => voice.lang === "pt-BR"
    );

    if (brazilianPortugueseVoice) {
      utterance.voice = brazilianPortugueseVoice;
      utterance.lang = "pt-BR";
    }

    window.speechSynthesis.speak(utterance);
  }
};
</script>
