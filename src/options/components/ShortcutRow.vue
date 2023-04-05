<template>
  <tr class="bg-white border-b h-16">
    <td class="px-6 font-semibold">
      {{ shortcut.name }}
    </td>
    <td class="px-6">
      <div class="flex">
        <KeyboardKey v-for="(keyboardKey, index) in Object.assign([], shortcut.keys)"
                     :keyboard-key="keyboardKey"
                     :index="index"
        />
      </div>
    </td>
    <td class="px-6">
      <div>
        <div class="font-semibold">{{ shortcut.action.value.name }} <span v-if="shortcut.action.value.id === 1">{{ shortcut.action.strategy.name.toLowerCase() }}</span></div>
        <div v-if="shortcut.action.strategy.instruction.trim() !== ''" class="flex items-center">
          <svg class="w-4 h-4 mr-1 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 110-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 01-1.44-4.282m3.102.069a18.03 18.03 0 01-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 018.835 2.535M10.34 6.66a23.847 23.847 0 008.835-2.535m0 0A23.74 23.74 0 0018.795 3m.38 1.125a23.91 23.91 0 011.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 001.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 010 3.46" />
          </svg>

          {{ shortcut.action.strategy.instruction }}
        </div>
        <div v-if="shortcut.action.strategy.withSelectedText" class="flex items-center">
          <svg class="w-4 h-4 mr-1 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zM12 2.25V4.5m5.834.166l-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243l-1.59-1.59" />
          </svg>

          À partir d'un texte sélectionné
        </div>
      </div>
    </td>
    <td class="px-6">
      <div class="flex justify-end relative">
        <button
            ref="dropdownMenuBtn"
            @blur="this.dropdownMenuOpened = false"
            @click="this.toggleDropdownMenu"
            class="rounded-full px-2 py-2 transition duration-150 ease-in-out focus:outline-none
    focus:bg-gray-50"
                type="button" aria-haspopup="true" aria-expanded="true" aria-controls="headlessui-menu-items-117">
          <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
          </svg>
        </button>

        <Transition>
          <div v-if="dropdownMenuOpened"
               ref="dropdownMenu"
               class="absolute z-10 right-0 w-32 mt-10 bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none" aria-labelledby="headlessui-menu-button-1" id="headlessui-menu-items-117" role="menu">
            <div class="py-1">
              <button @mousedown="this.openModal('store')" tabindex="0"
                      class="text-blue-500 flex items-center px-3 py-2 hover:bg-gray-50 transition-all focus:outline-none
    focus:bg-gray-50 w-full" role="menuitem" >
                <svg class="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                </svg>
                Modifier
              </button>
              <button @mousedown="this.openModal('delete')" tabindex="0" class="text-red-500 flex items-center px-3 py-2 hover:bg-gray-50 transition-all focus:outline-none w-full
    focus:bg-gray-50"  role="menuitem" >
                <svg class="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>
                Supprimer
              </button>
            </div>
          </div>
        </Transition>
      </div>
    </td>
  </tr>
</template>

<script>
import KeyboardKey from "./KeyboardKey.vue";
import {mapActions, mapMutations} from "vuex";
import {nextTick} from "vue";
import Modal from "../models/Modal.js";
import Shortcut from "../models/Shortcut.js";

export default {
  name: "ShortcutRow",
  components: {
    KeyboardKey
  },
  props: {
    shortcut: Object
  },
  data(){
    return {
      dropdownMenuOpened: false
    }
  },
  methods: {
    ...mapActions([
      'deleteShortcut'
    ]),
    ...mapMutations([
        'setShortcut',
        'setModal'
    ]),
    async openModal(type){
      await this.toggleDropdownMenu();

      this.setShortcut(
          new Shortcut(
              this.shortcut.id,
              this.shortcut.name,
              Object.assign([], this.shortcut.keys),
              this.shortcut.action
          )
      );

      this.setModal({
        isOpened: true,
        type: type
      });
    },
    async toggleDropdownMenu(){
      this.dropdownMenuOpened = !this.dropdownMenuOpened;

      await nextTick();

      this.dropdownMenuOpened ?
          this.$refs.dropdownMenu.focus() :
          this.$refs.dropdownMenuBtn.blur();
    },
  }
}
</script>

<style scoped>

</style>
