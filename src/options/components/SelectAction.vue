<template>
  <div class="relative w-1/2 mr-2">
    <button type="button" @click="this.dropdownOpened = true" aria-haspopup="listbox" aria-expanded="true" aria-labelledby="listbox-label"
            class="w-full rounded-lg cursor-pointer relative border border-gray-300 bg-white px-3 py-1.5 text-left focus:outline-none transition ease-in-out duration-150">
      <div class="flex items-center space-x-3">
        <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt=""
             class="flex-shrink-0 h-5 w-5 rounded-full" />
        <div class="text-sm">
            {{ this.shortcut.action.value.name }}
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
          <div class="flex items-center space-x-3">
            <img src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2&amp;w=256&amp;h=256&amp;q=80" alt=""
                 class="flex-shrink-0 h-5 w-5 rounded-full" />

            <span class="block truncate" :class="[this.isActionSelected(action) ? 'font-semibold' : 'font-normal']">
                {{ action.name }}
              </span>
          </div>

          <span v-show="this.isActionSelected(action)" class="absolute inset-y-0 right-0 flex items-center pr-4">
              <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
              </svg>
            </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
export default {
  name: 'SelectAction',
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
      this.dropdownOpened = false;
      this.shortcut.action.value = action;
      this.shortcut.setStrategy();
    },
    isActionSelected(action){
      return this.shortcut.action.value.id === action.id;
    }
  },
}
</script>

<style scoped>
</style>
