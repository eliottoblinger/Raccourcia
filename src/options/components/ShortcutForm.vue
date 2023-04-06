<template>
  <div>
    <div ref="keysRecording" class="flex items-start focus-visible:outline-none"
         @keydown="onKeyDown"
         @keyup="onKeyUp"
         tabindex="-1">
      <div class="relative flex mt-2 h-3 w-3 mr-3">
        <div class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></div>
        <div class="relative inline-flex rounded-full h-3 w-3 bg-red-500"></div>
      </div>
      <div>
        <h3 class="text-base font-semibold leading-6 text-gray-900">
          Enregistrement de votre raccourci
        </h3>
        <p class="text-sm text-gray-500">
          Appuyez simultanément sur deux ou trois touches afin de définir votre raccourci.
        </p>
      </div>
    </div>
    <Transition>
      <div class="flex justify-center my-3" v-if="this.shortcut.keys.length">
        <KeyboardKey v-for="(keyboardKey, index) in this.shortcut.keys"
                     :keyboard-key="keyboardKey"
                     :index="index"
        />
      </div>
    </Transition>
    <Transition>
      <div v-if="this.keysSelected">
        <div class="flex justify-center mb-3">
          <p class="text-xs inline-block text-gray-500 underline hover:cursor-pointer"
             @click="this.resetKeys">
            Recommencer l'enregistrement
          </p>
        </div>

        <div class="text-xs bg-red-50 text-red-500 mt-6 px-3 py-1.5 rounded flex items-center" v-if="!this.keysSelectedValid">
          <svg class="w-5 h-5 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
          </svg>

          <div class="font-bold">
            Raccourci déjà existant, veuillez recommencer l'enregistrement.
          </div>
        </div>

        <div v-else>
          <div  class="flex items-start mb-3">
            <div class="relative flex h-5 w-5 mr-1">
              <svg class="w-6 h-6 text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zM12 2.25V4.5m5.834.166l-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243l-1.59-1.59" />
              </svg>
            </div>
            <div class="w-full">
              <h3 class="text-base font-semibold leading-6 text-gray-900">
                Définition de l'action
              </h3>
              <p class="text-sm text-gray-500 mb-3">
                Définissez une action pour votre raccourci.
              </p>

              <div class="md:flex md:items-center mb-3">
                <SelectAction/>

                <ul v-if="[1, 2].includes(this.shortcut.action.value.id)"
                    class="flex sm:w-full md:w-1/2"
                    @change="this.shortcut.action.strategy.instruction = ''"
                >
                  <li v-for="strategy of this.strategies" class="w-1/2 mr-2">
                    <input type="radio" :id="strategy" name="strategy" :value="strategy" class="hidden peer"
                           v-model="this.shortcut.action.strategy.name">
                    <label :for="strategy" class="flex font-semibold items-center justify-center w-full px-3 py-1.5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer peer-checked:border-blue-500 peer-checked:text-blue-500">
                      {{ strategy }}
                    </label>
                  </li>
                </ul>
              </div>

              <div v-if="this.shortcut.action.strategy.name === 'Prédéfinie'">
                 <textarea
                     v-if="this.shortcut.action.value.id === 1"
                     class="bg-gray-50
                      border border-gray-300 focus:outline-none text-gray-900 text-sm rounded-lg block
                      w-full px-3 py-1.5 mb-3"
                     style="resize: none;"
                     placeholder="Ex : Résume moi ce texte"
                     v-model="this.shortcut.action.strategy.instruction"
                 />

                <input
                    v-if="this.shortcut.action.value.id === 2"
                    class="bg-gray-50
                      border border-gray-300 focus:outline-none text-gray-900 text-sm rounded-lg block
                      w-9/12 px-3 py-1.5 mb-3"
                    placeholder="Ex : https://www.gmail.com/"
                    v-model="this.shortcut.action.strategy.instruction"
                />
              </div>

              <div v-if="this.shortcut.action.value.id === 1" class="flex items-center">
                <p class="text-sm text-gray-500 mr-3">
                  À partir d'un texte sélectionné
                </p>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" class="sr-only peer" v-model="this.shortcut.action.strategy.withSelectedText">
                  <div class="w-8 h-4 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:left-[6px] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-blue-500"></div>
                </label>
              </div>
            </div>
          </div>

          <div class="flex items-start mb-3">
            <div class="relative flex h-4 w-4 mt-1 mr-2">
              <svg class="w-6 h-6 text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
              </svg>
            </div>

            <div>
              <h3 class="text-base font-semibold leading-6 text-gray-900">
                Nom (facultatif)
              </h3>
              <p class="text-sm text-gray-500 mb-3">
                Définissez un nom afin de gérer vos raccourcis plus facilement.
              </p>

              <input type="text" class="bg-gray-50
                    border border-gray-300 focus:outline-none text-gray-900 text-sm rounded-lg block
                    w-64 px-3 py-1.5 mb-3"
                     placeholder="Ex : Résumer un texte"
                     v-model="this.shortcut.name"
              />
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script>
import {mapActions, mapGetters, mapMutations} from "vuex";
import KeyboardKey from "./KeyboardKey.vue";
import SelectAction from "./SelectAction.vue";
import throwErrorIfShortcutAlreadyExists from "../utils/errors/throwErrorIfShortcutAlreadyExists.js";

export default {
  name: "ShortcutForm",
  components: {
    KeyboardKey,
    SelectAction
  },
  data(){
    return {
      strategies: [
        'Libre',
        'Prédéfinie'
      ]
    }
  },
  mounted(){
    if(!this.shortcut.id)
      this.$refs.keysRecording.focus();
    else
      this.keysSelectedValid = true;
  },
  watch: {
    async keysSelected(value){
      if(!value){
        this.keysSelectedValid = false;
        return;
      }

      const { shortcuts } = await chrome.storage.sync.get(["shortcuts"]);

      try{
        throwErrorIfShortcutAlreadyExists(shortcuts, this.shortcut);
        this.keysSelectedValid = true;
      }catch(e){
        this.keysSelectedValid = false;
      }
    }
  },
  computed: {
    ...mapGetters([
        'getShortcut',
        'areKeysSelected',
        'areKeysSelectedValid',
        'isKeyup'
    ]),
    shortcut: {
      get(){
        return this.getShortcut;
      },
      set(value){
        this.setShortcut(Object.assign({}, value))
      }
    },
    keyup: {
      get(){
        return this.isKeyup;
      },
      set(value){
        this.setKeyup(value)
      }
    },
    keysSelected(){
      return this.areKeysSelected;
    },
    keysSelectedValid: {
      get(){
        return this.areKeysSelectedValid;
      },
      set(value){
        this.setKeysSelectedValid(value);
      }
    }
  },
  methods: {
    ...mapActions([
        'storeShortcut'
      ]
    ),
    ...mapMutations([
        'setShortcut',
        'setKeysSelectedValid',
        'setKeyup'
      ]
    ),
    resetKeys(){
      this.shortcut.keys = [];
      this.$refs.keysRecording.focus();
    },
    onKeyDown(e){
      e.preventDefault();
      e.stopPropagation();

      if(this.keysSelected && !this.keysSelectedValid)
        this.resetKeys();

      if(!this.shortcut.keys.includes(e.key) && !this.keysSelected){
        this.keyup = false;
        this.shortcut.keys.push(e.key);
      }
    },
    onKeyUp(){
      this.keyup = true;

      if(this.shortcut.keys.length === 1)
        this.shortcut.keys = [];
    },
  }
}
</script>

<style scoped>

</style>
