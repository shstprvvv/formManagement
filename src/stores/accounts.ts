import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export interface Tag {
  text: string
}

export type AccountType = 'LDAP' | 'Локальная'

export interface Account {
  id: number
  tags: Tag[]
  type: AccountType
  login: string
  password?: string | null
}

// Using a unique key for localStorage to avoid conflicts
const STORAGE_KEY = 'form-management-accounts'

export const useAccountsStore = defineStore('accounts', () => {
  // Initialize state from localStorage
  const accounts = ref<Account[]>(JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'))

  // Watch for changes and persist to localStorage
  watch(
    accounts,
    (newAccounts) => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newAccounts))
    },
    { deep: true },
  )

  function addAccount() {
    accounts.value.push({
      id: Date.now(),
      tags: [],
      type: 'Локальная',
      login: '',
      password: '',
    })
  }

  function updateAccount(updatedAccount: Account) {
    const index = accounts.value.findIndex((acc) => acc.id === updatedAccount.id)
    if (index !== -1) {
      accounts.value[index] = updatedAccount
    }
  }

  function removeAccount(id: number) {
    accounts.value = accounts.value.filter((acc) => acc.id !== id)
  }

  return {
    accounts,
    addAccount,
    updateAccount,
    removeAccount,
  }
})
