<template>
  <section class="flex flex-col gap-5">
    <p v-if="!hasDeviceVibrationApi">
      Esse dispositivo não possui suporte à Vibration Api
    </p>

    <VBtn class="w-full" @click="handleVibrate"> Vibrar </VBtn>

    <VBtn class="w-full" @click="handleVibratePattern">
      Vibrar - Padrão Definido
    </VBtn>
  </section>
</template>

<script setup lang="ts">
import { computed } from "vue";

const hasDeviceVibrationApi = computed(() => {
  return navigator.vibrate;
});

const handleVibrate = () => {
  navigator.vibrate(200);
};

const handleVibratePattern = () => {
  navigator.vibrate([300, 1000, 300]);
};
</script>
