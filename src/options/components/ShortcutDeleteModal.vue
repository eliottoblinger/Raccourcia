<template>
  <VueModal
      v-if="this.getModal.isOpened && this.getModal.type === 'delete'"
      :submit-action="async () =>  await this.deleteShortcut()"
      btn-action-text="Supprimer"
  >
    <ShortcutDeleteConfirmation/>
  </VueModal>
</template>

<script>
import VueModal from "./VueModal.vue";
import ShortcutDeleteConfirmation from "./ShortcutDeleteConfirmation.vue";
import {mapActions, mapGetters} from "vuex";

export default {
  name: "ShortcutDeleteModal",
  components: {
    ShortcutDeleteConfirmation,
    VueModal
  },
  computed: {
    ...mapGetters([
      'getModal'
    ])
  },
  methods: {
    ...mapActions([
      'deleteShortcut'
    ])
  }
}
</script>

<style scoped>

</style>
