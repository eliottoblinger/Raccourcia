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
      <div v-if="[1, 2].includes(shortcut.action.id)">
        <div>{{ shortcut.action.name }} {{ shortcut.strategy.name.toLowerCase() }}</div>
        <div v-if="shortcut.strategy.instruction.trim() !== ''" class="flex items-center font-semibold">
          <svg class="w-4 h-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
          </svg>

          {{ shortcut.strategy.instruction }}
        </div>
      </div>

      <div v-if="[3, 4, 5].includes(shortcut.action.id)">
        <div>{{ shortcut.action.name }}</div>
        <div v-if="shortcut.strategy.instruction.trim() !== ''" class="flex items-center font-semibold">
          <svg class="w-4 h-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
          </svg>

          {{ shortcut.strategy.instruction }}
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
              this.shortcut.action,
              this.shortcut.strategy
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
