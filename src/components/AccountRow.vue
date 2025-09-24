<script setup lang="ts">
import type { Account } from '@/stores/accounts'
import { useAccountsStore } from '@/stores/accounts'
import { ref, watch, computed } from 'vue'

import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Select from 'primevue/select'
import Password from 'primevue/password'

const props = defineProps<{
  account: Account
}>()

const store = useAccountsStore()
const localAccount = ref<Account>({ ...props.account })

// State for validation
const isLoginInvalid = ref(false)
const isPasswordInvalid = ref(false)

// Watch for prop changes to update local state if needed (e.g., from external updates)
watch(
  () => props.account,
  (newAccount) => {
    localAccount.value = { ...newAccount }
  },
  { deep: true },
)

const accountTypes = ref([
  { label: 'Локальная', value: 'Локальная' },
  { label: 'LDAP', value: 'LDAP' },
])

const tagsAsString = computed({
  get: () => localAccount.value.tags.map((t) => t.text).join('; '),
  set: (value: string) => {
    localAccount.value.tags = value
      .split(';')
      .map((s) => s.trim())
      .filter(Boolean)
      .map((text) => ({ text }))
  },
})

function validate() {
  isLoginInvalid.value = !localAccount.value.login

  if (localAccount.value.type === 'Локальная') {
    isPasswordInvalid.value = !localAccount.value.password
  } else {
    isPasswordInvalid.value = false // Reset password validation if not applicable
  }

  return !isLoginInvalid.value && !isPasswordInvalid.value
}

function handleUpdate() {
  if (validate()) {
    if (localAccount.value.type === 'LDAP') {
      localAccount.value.password = null
    }
    store.updateAccount(localAccount.value)
  }
}

function handleRemove() {
  store.removeAccount(props.account.id)
}
</script>

<template>
  <div class="account-row">
    <InputText
      v-model="tagsAsString"
      placeholder="XXX; YYYYYY"
      @blur="handleUpdate"
      maxlength="50"
    />
    <Select
      v-model="localAccount.type"
      :options="accountTypes"
      optionLabel="label"
      optionValue="value"
      @change="handleUpdate"
    />
    <InputText
      v-model="localAccount.login"
      placeholder="Значение"
      @blur="handleUpdate"
      maxlength="100"
      :class="{ 'p-invalid': isLoginInvalid }"
    />
    <Password
      v-if="localAccount.type === 'Локальная'"
      v-model="localAccount.password"
      placeholder="Значение"
      @blur="handleUpdate"
      maxlength="100"
      :feedback="false"
      toggleMask
      :class="{ 'p-invalid': isPasswordInvalid }"
      inputClass="w-full"
    />
    <div v-else class="password-placeholder"></div>

    <Button
      icon="pi pi-trash"
      severity="danger"
      text
      rounded
      aria-label="Удалить"
      @click="handleRemove"
    />
  </div>
</template>

<style scoped>
.account-row {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 50px;
  gap: 1rem;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid #e5e7eb;
}

.password-placeholder {
  height: 44px; /* Match the height of the Password input for alignment */
  background-color: #f3f4f6;
  border-radius: 6px;
}

/* PrimeVue component overrides */
:deep(.p-inputtext),
:deep(.p-select),
:deep(.p-password) {
  width: 100%;
}
:deep(.p-password .p-inputtext) {
  width: 100%;
}
</style>
