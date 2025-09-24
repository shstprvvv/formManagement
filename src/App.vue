<script setup lang="ts">
import AccountForm from './components/AccountForm.vue'
// This component will now only serve as a wrapper.
</script>

<template>
  <main>
    <AccountForm />
  </main>
</template>

<style>
/* Resetting default styles and setting a base font */
body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  background-color: #f8f9fa;
  color: #495057;
}

main {
  padding: 2rem;
}
</style>
