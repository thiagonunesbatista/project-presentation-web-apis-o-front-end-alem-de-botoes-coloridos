<template>
  <section class="flex flex-col gap-5">
    <p v-if="!hasWakeLockSupport">
      Esse dispositivo não possui suporte à Wake Lock API
    </p>

    <template v-else>
      <VBtn class="w-full" @click="handleWakeLock"> Ativar Wake Lock </VBtn>

      <VBtn class="w-full" @click="removeWakeLock">
        Desativar o Wake Lock
      </VBtn>
    </template>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const wakeLockInstance = ref<WakeLockSentinel | null>(null);

const hasWakeLockSupport = computed(() => {
  return navigator.wakeLock;
});

const handleWakeLock = async () => {
  try {
    wakeLockInstance.value = await navigator.wakeLock.request("screen");

    toast("Wake Lock Ativado", {
      autoClose: 2000,
      type: "success"
    });
  } catch (error) {
    console.log(error);
    toast("Erro ao utilizar o Wake Lock", {
      autoClose: 2000,
      type: "error"
    });
  }
};

const removeWakeLock = async () => {
  await wakeLockInstance.value?.release();

  wakeLockInstance.value = null;

  toast("Wake Lock Desativado", {
    autoClose: 2000,
    type: "success"
  });
};
</script>
