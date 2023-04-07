<template>
  <div class="relative md:mb-0 sm:mb-3 w-1/2 mr-2" v-click-outside="closeDropdown">
    <button type="button" @click="openDropdown" aria-haspopup="listbox" aria-expanded="true" aria-labelledby="listbox-label"
            class="w-full rounded-lg cursor-pointer relative border border-gray-300 bg-white px-3 py-1.5 text-left transition ease-in-out duration-150">
      <div class="flex items-center space-x-2 text-blue-500 font-semibold">
        <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round"
                :d="this.shortcut.action.value.svg" />
        </svg>

        <div class="text-sm">
            {{ this.shortcut.action.value.name }} <span v-if="this.shortcut.action.value.id === 1" class="text-yellow-500 ml-3 text-[10px] uppercase">premium</span>
        </div>
      </div>
      <span class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <svg class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="none" stroke="currentColor">
              <path d="M7 7l3-3 3 3m0 6l-3 3-3-3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </span>
    </button>

    <div v-show="dropdownOpened" class="absolute mt-1 w-full rounded-md bg-white shadow-lg z-10">
      <ul tabindex="-1" role="listbox" aria-labelledby="listbox-label"
          class="max-h-56 rounded-lg py-1 text-sm overflow-auto focus:outline-none">

        <li v-for="action in this.getActions
                  .sort((a, b) => a.name.localeCompare(b.name))" :key="action.id"
            tabindex="0" @click="select(action)" :id="action.id" role="option"
            :class="[this.isActionSelected(action) ? 'text-blue-500' : '', 'hover:text-white cursor-default select-none relative py-1.5 px-3 cursor-pointer hover:bg-blue-500 focus:outline-none focus:text-white focus:bg-blue-500']">
          <div class="flex items-center space-x-2">
            <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round"
                    :d="action.svg" />
            </svg>

            <span class="block truncate" :class="[this.isActionSelected(action) ? 'font-semibold' : 'font-semibold']">
                {{ action.name }} <span v-if="action.id === 1" class="text-yellow-500 ml-3 text-[10px] uppercase">premium</span>
              </span>
          </div>

          <div v-show="this.isActionSelected(action)" class="absolute inset-y-0 right-0 flex items-center pr-4">
            <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
              </svg>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import vClickOutside from 'click-outside-vue3'
import {mapGetters} from "vuex";

export default {
  name: 'SelectAction',
  directives: {
    clickOutside: vClickOutside.directive
  },
  data() {
    return {
      dropdownOpened : false
    }
  },
  computed: {
    ...mapGetters([
      'getActions',
      'getShortcut'
    ]),
    shortcut: {
      get(){
        return this.getShortcut;
      },
      set(value){
        this.setShortcut(Object.assign({}, value))
      }
    }
  },
  methods: {
    select(action) {
      this.closeDropdown();
      this.shortcut.action.value = action;
      this.shortcut.setStrategy();
    },
    isActionSelected(action){
      return this.shortcut.action.value.id === action.id;
    },
    openDropdown(){
      this.dropdownOpened = true;
    },
   closeDropdown(){
      this.dropdownOpened = false;
    }
  },
}
</script>

<style scoped>
</style>
