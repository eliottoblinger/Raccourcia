<template>
  <div>
    <div class="flex items-start mb-6">
      <div class="relative flex h-4 w-4 mr-2">
        <svg class="w-6 h-6 text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
        </svg>
      </div>

      <div>
        <h3 class="text-base font-semibold leading-6 text-gray-900">
          Êtes-vous sûr de vouloir supprimer ce raccourci?
        </h3>
        <p class="text-sm text-gray-500">
          Vous ne pourrez pas le récupérer par la suite.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ShortcutDeleteConfirmation"
}
</script>

<style scoped>

</style>
