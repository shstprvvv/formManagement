<script setup lang="ts">
import { useAccountsStore } from '@/stores/accounts'
import Button from 'primevue/button'
import AccountRow from './AccountRow.vue' // Import the new component

const store = useAccountsStore()
</script>

<template>
  <div class="account-form-container">
    <div class="header">
      <h1>Учетные записи</h1>
      <Button
        icon="pi pi-plus"
        aria-label="Добавить учетную запись"
        @click="useAccountsStore().addAccount"
      />
    </div>

    <div class="info-message">
      <i class="pi pi-info-circle" style="font-size: 1.2rem"></i>
      <span
        >Для указания нескольких меток для одной пары логин/пароль используйте разделитель ;</span
      >
    </div>

    <div class="account-list">
      <div class="account-list-header">
        <label>Метки</label>
        <label>Тип записи</label>
        <label>Логин</label>
        <label>Пароль</label>
        <span />
        <!-- Empty span for delete button column -->
      </div>

      <div v-if="store.accounts.length === 0" class="empty-state">
        Нет учетных записей. Нажмите "+", чтобы добавить новую.
      </div>
      <AccountRow v-for="account in store.accounts" :key="account.id" :account="account" />
    </div>
  </div>
</template>

<style scoped>
.account-form-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
}

h1 {
  font-size: 2rem;
  font-weight: 600;
  margin: 0;
}

.info-message {
  background-color: #eff6ff;
  color: #1d4ed8;
  border: 1px solid #93c5fd;
  padding: 1rem;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 2rem;
}

.account-list-header {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 50px;
  gap: 1rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #e5e7eb;
  font-weight: 600;
  color: #6b7280;
}

.empty-state {
  text-align: center;
  padding: 2rem;
  color: #6b7280;
  font-style: italic;
}
</style>
