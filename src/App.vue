<template>
  <div class="flex flex-col w-full max-w-[600px] mx-auto px-5">
    <div
      v-if="!choosenOption?.id"
      class="flex flex-col items-center justify-center gap-5"
    >
      <h1 class="text-4xl md:text-6xl text-center">Escolha a Web Api</h1>

      <VBtn
        v-for="currentOption of menuOptions"
        @click="changeChoosenOption(currentOption)"
        >{{ currentOption.title }}</VBtn
      >
    </div>

    <div v-else class="flex flex-col items-center justify-center gap-6">
      <h2 class="text-3xl md:text-5xl">{{ choosenOption.title }}</h2>

      <component :is="choosenOption.component" class="w-full" />
    </div>

    <VFab
      v-if="choosenOption"
      variant="flat"
      :absolute="true"
      class="absolute right-6 bottom-6 md:right-5 md:bottom-5"
      @click="() => changeChoosenOption()"
    >
      Voltar
    </VFab>
  </div>
</template>

<script setup lang="ts">
import type { Component } from "vue";

import { ref } from "vue";

const choosenOption = ref<optionItem | null>(null);

import LocalStorage from "./components/LocalStorage.vue";
import SessionStorage from "./components/SessionStorage.vue";

const menuOptions = ref<optionItem[]>([
  {
    id: "local-storage",
    title: "Local Storage",
    component: LocalStorage
  },
  {
    id: "session-storage",
    title: "Session Storage",
    component: SessionStorage
  }
]);

type optionItem = {
  id: string;
  title: string;
  component: Component;
};

const changeChoosenOption = (option?: optionItem) => {
  if (option) {
    choosenOption.value = option;
    return;
  }

  choosenOption.value = null;
};
</script>
