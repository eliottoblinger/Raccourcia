<template>
  <dialog class="border-none bg-transparent fixed top-0 left-0 z-10 overflow-hidden w-full h-full flex justify-center items-center">
    <div class="fixed top-0 left-0 inset-0 bg-white-app-700 opacity-75"></div>

    <div class="z-10 overflow-hidden rounded-lg bg-white shadow-xl w-1/2 h-auto">
      <svg class="w-5 h-5 absolute top-0 right-0 mt-3 mr-3 hover:cursor-pointer"
           xmlns="http://www.w3.org/2000/svg"
           fill="none"
           viewBox="0 0 24 24"
           strokeWidth={1.5}
           stroke="currentColor"
           @click="this.closeModal"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
      <div class="p-6">
        <slot />

        <Transition>
          <div class="flex items-center justify-end" v-if="!hideBtns">
            <button type="button"
                    class="bg-gray-200 text-black-app-500 hover:cursor-pointer hover:bg-gray-100
                          transition-all font-medium rounded-lg text-sm px-6 py-1.5 mr-1"
                    @click="this.closeModal">
              Annuler
            </button>

            <button type="button"
                    :class="[this.loading ?
                          'bg-blue-100 shadow-none hover:cursor-default' :
                          'bg-blue-500 hover:cursor-pointer hover:bg-blue-400',
                          'transition-all text-white font-medium rounded-lg text-sm px-6 py-1.5']"
                    @click="submitForm" :disabled="this.loading">
              <svg v-if="this.loading" class="animate-spin h-5 w-5 text-white mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span v-else>{{ this.btnActionText }}</span>
            </button>
          </div>
        </Transition>
      </div>
    </div>
  </dialog>
</template>

<script>
import {mapMutations} from "vuex";

export default {
  name: "VueModal",
  props: {
    submitAction: Function,
    btnActionText: String,
    hideBtns: Boolean | false
  },
  data(){
    return {
      loading: false
    }
  },
  methods: {
    ...mapMutations([
      'resetShortcut',
      'resetModal'
    ]),
    async submitForm(){
      this.loading = true;

      await this.submitAction();

      this.loading = false;

      this.closeModal();
    },
    closeModal(){
      this.resetShortcut();
      this.resetModal();
    }
  }
}
</script>

<style scoped>

</style>
