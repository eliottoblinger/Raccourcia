<template>
  <div class="h-10 min-w-10 mr-3 flex items-center">
    <div v-if="index !== 0" class="mr-3 font-bold">
      +
    </div>
    <button
        class="overflow-hidden relative h-8 px-1 rounded flex justify-center shadow align-center bg-gradient-to-b from-gray-50 to-gray-400 pt-[2px] transition-all duration-75 top-0 active:top-1">
      <div class="w-full h-8 absolute -top-[2px] left-0 flex items-center justify-between blur-sm">
        <div class="h-6 w-6 bg-gray-200 flex-shrink-0 rotate-45 -left-5 relative"></div>
        <div class="h-6 w-6 bg-gray-200 flex-shrink-0 rotate-45 -right-5 relative"></div>
      </div>
      <div class="relative h-5 border border-gray-100 flex items-center bg-gradient-to-b from-gray-200 to-gray-50 flex p-1 rounded">
        <span class="leading-none text-xs">{{ keyboardKey.toUpperCase() }}</span>
      </div>
    </button>
  </div>
</template>

<script>
export default {
  name: "KeyboardKey",
  props: {
    keyboardKey: String,
    index: Number
  }
}
</script>

<style scoped>

</style>
