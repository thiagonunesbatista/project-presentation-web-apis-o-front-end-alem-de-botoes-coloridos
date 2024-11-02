<template>
  <div class="flex flex-col gap-28">
    <form
      @submit="handleRegisterSubmit"
      class="flex flex-col items-center justify-center"
    >
      <VTextField v-model="fieldName" label="Nome" class="w-full" />

      <VTextField v-model="userRandomText" label="Valor" class="w-full" />

      <VCheckbox
        v-model="needToParseToSaveValue"
        label="O Valor é um Objeto ou Array?"
      />

      <VBtn type="submit">{{ saveActionMessage }}</VBtn>
    </form>

    <hr />

    <form
      @submit="handleSearchSubmit"
      class="flex flex-col items-center justify-center"
    >
      <VTextField
        v-model="searchFieldName"
        label="Campo que deseja buscar"
        class="w-full"
      />

      <VCheckbox
        v-model="needToParseToGetSavedValue"
        label="O Valor é um Objeto ou Array?"
      />

      <div class="flex flex-col gap-3">
        <VBtn type="submit">{{ searchActionMessage }}</VBtn>

        <VBtn @click="openSameUrlOnNewTab" class="">
          Abrir a mesma página em outra aba
        </VBtn>

        <VBtn @click="resetSearchForm" class="">
          Limpar Formulário de Busca
        </VBtn>

        <h2 class="text-xl" v-if="searchResult">
          Resultado da busca: {{ searchResult }}
        </h2>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

const props = defineProps({
  storageType: {
    type: String,
    default: "localStorage"
  }
});

const saveActionMessage = computed(() => {
  if (props.storageType === "localStorage") {
    return "Salvar dados no Local Storage";
  }

  return "Salvar dados no Session Storage";
});

const searchActionMessage = computed(() => {
  if (props.storageType === "localStorage") {
    return "Buscar campo no Local Storage";
  }

  return "Buscar campo no Session Storage";
});

const fieldName = ref("");
const userRandomText = ref("");
const needToParseToSaveValue = ref(false);

const searchFieldName = ref("");
const searchResult = ref("");
const needToParseToGetSavedValue = ref(false);

const handleRegisterSubmit = (event: Event) => {
  event.preventDefault();

  if (fieldName.value.length > 0 && userRandomText.value.length > 0) {
    const valueToSave = needToParseToSaveValue.value
      ? JSON.stringify(userRandomText.value)
      : userRandomText.value;

    if (props.storageType === "localStorage") {
      writeToLocalStorage(valueToSave);
      return;
    }

    writeToSessionStorage(valueToSave);
  }
};

const writeToLocalStorage = (valueToSave: string) => {
  localStorage.setItem(fieldName.value, valueToSave);
  resetSubmitForm();
};

const writeToSessionStorage = (valueToSave: string) => {
  sessionStorage.setItem(fieldName.value, valueToSave);
  resetSubmitForm();
};

const resetSubmitForm = () => {
  needToParseToSaveValue.value = false;
  userRandomText.value = "";
  fieldName.value = "";
};

const resetSearchForm = () => {
  needToParseToGetSavedValue.value = false;
  searchFieldName.value = "";
};

const handleSearchSubmit = (event: Event) => {
  event.preventDefault();

  if (searchFieldName.value.length > 0) {
    let dataFromStorage;

    if (props.storageType === "localStorage") {
      dataFromStorage = localStorage.getItem(searchFieldName.value);
    } else {
      dataFromStorage = sessionStorage.getItem(searchFieldName.value);
    }

    if (needToParseToGetSavedValue.value && dataFromStorage) {
      dataFromStorage = JSON.parse(dataFromStorage);
    }

    let resultMessage = "nenhum valor encontrado para essa chave.";

    if (dataFromStorage) {
      resultMessage = `o valor encontrado foi ${dataFromStorage}`;
    }

    searchResult.value = resultMessage;
  }
};

const openSameUrlOnNewTab = () => {
  window.open(window.location.href, "_blank");
};
</script>
