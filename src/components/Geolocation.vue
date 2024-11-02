<template>
  <div class="flex flex-col gap-3 items-center">
    <VBtn class="w-full" @click="handleGeolocation">
      Capturar Geolocalização
    </VBtn>

    <VCheckbox
      v-model="openMapOnNewTab"
      label="Abrir link do mapa em nova aba?"
    />

    <template v-if="geolocationData.latitude && geolocationData.longitude">
      <p>Latitude: {{ geolocationData.latitude }}</p>

      <p>Longitude: {{ geolocationData.longitude }}</p>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

type savedGeolocation = {
  latitude: number | null;
  longitude: number | null;
};

const geolocationData = ref<savedGeolocation>({
  latitude: null,
  longitude: null
});

const openMapOnNewTab = ref(false);

const handleGeolocation = () => {
  const isGeolocationAvailableOnTheBrowser = navigator.geolocation;

  if (!isGeolocationAvailableOnTheBrowser) {
    toast(
      "A funcionalidade de geolocalização não está disponível no seu navegador!",
      {
        autoClose: 2000,
        type: "error"
      }
    );

    return;
  }

  navigator.geolocation.getCurrentPosition(
    handleGeolocationSuccess,
    handleGeolocationFailure
  );
};

function handleGeolocationSuccess(position: GeolocationPosition) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  geolocationData.value.latitude = latitude;
  geolocationData.value.longitude = longitude;

  if (openMapOnNewTab.value) {
    const geolocationMapUrl = `https://gps-coordinates.org/my-location.php?lat=${latitude}&lng=${longitude}`;
    window.open(geolocationMapUrl, "_blank");
  }
}

function handleGeolocationFailure() {
  toast("Não foi possível obter a geolocalização", {
    autoClose: 2000,
    type: "error"
  });
}
</script>
