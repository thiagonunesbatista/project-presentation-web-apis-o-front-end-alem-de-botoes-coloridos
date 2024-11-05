<template>
  <section class="flex flex-col gap-5">
    <VBtn class="w-full" @click="askNotificationPermission">
      Pedir permissão de Notificação
    </VBtn>

    <VTextField
      v-model="inputNotification"
      label="Texto da Notificação"
      class="w-full"
    />

    <VTextField
      v-model="notificationIcon"
      label="Icone da notificação (opcional)"
      class="w-full"
    />

    <VBtn class="w-full" @click="handleNotificationSubmit">
      Enviar Notificação
    </VBtn>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";

import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const inputNotification = ref("");

const notificationIcon = ref("");

const askNotificationPermission = async () => {
  try {
    await Notification.requestPermission();

    sendNotification("Permissão de notificação concedida!");
  } catch (error) {
    console.log(error);
    toast("Erro ao utilizar o Wake Lock", {
      autoClose: 2000,
      type: "error"
    });
  }
};

const handleNotificationSubmit = () => sendNotification();

const sendNotification = (notificationText?: string) => {
  if (inputNotification.value.length > 0) {
    const notificationResponse = new Notification(
      notificationText || inputNotification.value,
      {
        ...(notificationIcon.value && { icon: notificationIcon.value })
      }
    );

    const tenSecondsInMs = 10 * 1000;

    setTimeout(() => {
      notificationResponse.close();
    }, tenSecondsInMs);
  }
};
</script>
