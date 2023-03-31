<template>
  <div class="relative z-10 overflow-hidden" aria-labelledby="modal-title" role="dialog" aria-modal="true">
    <div class="fixed inset-0 bg-white-app-700 bg-opacity-75 transition-opacity"></div>

    <div class="fixed inset-0 z-10 overflow-hidden">
      <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all w-1/2 sm:max-w-lg">
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
      </div>
    </div>
  </div>
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
