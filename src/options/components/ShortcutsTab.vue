<template>
  <table class="shadow-md rounded-lg mb-3 w-full text-sm text-left text-gray-500">
    <thead class="text-gray-700 uppercase bg-gray-50 rounded-lg">
    <tr>
      <th class="px-6 py-3" style="width: 25%;">
        Nom
      </th>
      <th class="px-6 py-3" style="width: 25%;">
        Raccourci
      </th>
      <th class="px-6 py-3" style="width: 25%;">
        Action
      </th>
      <th class="px-6 py-3" style="width: 25%;">

      </th>
    </tr>
    </thead>
    <tbody>
    <tr v-if="!this.getShortcuts.length" class="bg-white border-b">
      <td colspan="4" class="px-6 h-16">
        <div class="flex justify-center items-center">
          Aucun raccourci
        </div>
      </td>
    </tr>
    <ShortcutRow v-for="shortcut of this.getShortcuts" :shortcut="shortcut"/>
    </tbody>
  </table>
</template>

<script lang="ts">
import ShortcutRow from './ShortcutRow.vue';
import {mapGetters} from "vuex";

export default {
  name: "ShortcutsTab",
  components: {
    ShortcutRow
  },
  computed: {
    ...mapGetters([
        'getShortcuts'
    ])
  }
}
</script>

<style scoped>

</style>
