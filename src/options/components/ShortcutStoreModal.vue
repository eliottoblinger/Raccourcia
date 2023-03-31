<template>
 <VueModal
     v-if="this.getModal.isOpened && this.getModal.type === 'store'"
     :submit-action="submitForm"
     btn-action-text="Sauvegarder"
     :hide-btns="!this.areKeysSelected || !this.areKeysSelectedValid"
 >
   <ShortcutForm/>
 </VueModal>
</template>

<script>
import ShortcutForm from "./ShortcutForm.vue";
import VueModal from "./VueModal.vue";
import {mapActions, mapGetters} from "vuex";

export default {
  name: "ShortcutStoreModal",
  components: {
    VueModal,
    ShortcutForm,
  },
  computed: {
    ...mapGetters([
      'getModal',
      'getShortcut',
      'areKeysSelected',
      'areKeysSelectedValid'
    ])
  },
  methods: {
    ...mapActions([
      'storeShortcut'
    ]),
    async submitForm(){
      const method = this.getShortcut.id ? 'update' : 'create';

      try{
        await this.storeShortcut(method);
      }catch(e){
        console.log(e)
      }
    },
  }
}
</script>
