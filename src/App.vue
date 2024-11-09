<template>
  <div class="flex flex-col w-full max-w-[600px] mx-auto px-5 py-16">
    <div
      v-if="!choosenOption?.id"
      class="flex flex-col items-center justify-center gap-5"
    >
      <h1 class="text-4xl md:text-6xl text-center">Escolha a Web Api</h1>

      <VBtn
        v-for="currentOption of menuOptions"
        @click="changeChoosenOption(currentOption)"
        class="w-full max-w-[300px] transition-all hover:scale-110"
      >
        {{ currentOption.title }}
      </VBtn>
    </div>

    <div
      v-else
      class="flex flex-col items-center justify-center gap-6 w-full max-w-[500px] mx-auto"
    >
      <h2 class="text-3xl md:text-5xl">{{ choosenOption.title }}</h2>

      <component :is="choosenOption.component" class="w-full" />
    </div>

    <VFab
      v-if="choosenOption"
      variant="flat"
      :absolute="true"
      class="fixed right-4 bottom-4 md:right-5 md:bottom-5"
      @click="() => changeChoosenOption()"
    >
      Voltar
    </VFab>
  </div>
</template>

<script setup lang="ts">
import type { Component } from "vue";

import { shallowRef, ref, markRaw } from "vue";

const choosenOption = ref<optionItem | null>(null);

import Clipboard from "./components/Clipboard.vue";
import Geolocation from "./components/Geolocation.vue";
import IntersectionObserverApi from "./components/IntersectionObserverApi.vue";
import LocalStorage from "./components/LocalStorage.vue";
import NotificationsDesktop from "./components/NotificationsDesktop.vue";
import SessionStorage from "./components/SessionStorage.vue";
import Vibration from "./components/Vibration.vue";
import WakeLock from "./components/WakeLock.vue";
import WebSpeech from "./components/WebSpeech.vue";

const menuOptions = shallowRef<optionItem[]>([
  {
    id: "local-storage",
    title: "Local Storage",
    component: markRaw(LocalStorage)
  },
  {
    id: "session-storage",
    title: "Session Storage",
    component: markRaw(SessionStorage)
  },
  {
    id: "clipboard",
    title: "Clipboard",
    component: markRaw(Clipboard)
  },
  {
    id: "geolocation",
    title: "Geolocalização",
    component: markRaw(Geolocation)
  },
  {
    id: "vibration",
    title: "Vibração",
    component: markRaw(Vibration)
  },
  {
    id: "wake-lock",
    title: "Wake Lock",
    component: markRaw(WakeLock)
  },
  {
    id: "notifications",
    title: "Notifications API (Desktop)",
    component: markRaw(NotificationsDesktop)
  },
  {
    id: "web-speech",
    title: "WebSpeech",
    component: markRaw(WebSpeech)
  },
  {
    id: "intersection-observer",
    title: "Intersection Observer",
    component: markRaw(IntersectionObserverApi)
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
