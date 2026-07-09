<script setup>
import { ref, onMounted } from 'vue'

defineProps({
  msg: String,
})

const count = ref(0)
const rows = ref([])
const error = ref(null)

onMounted(async () => {
  try {
    const res = await fetch('/api/users')
    const data = await res.json()
    if (!res.ok) throw new Error(data.error || 'Request failed')
    rows.value = data.rows
  } catch (err) {
    error.value = err.message
  }
})
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>

  <div class="card">
    <h2>Users from Turso</h2>
    <p v-if="error" class="error">Error: {{ error }}</p>
    <ul v-else-if="rows.length">
      <li v-for="(row, i) in rows" :key="i">{{ JSON.stringify(row) }}</li>
    </ul>
    <p v-else>Loading…</p>
  </div>

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >, the official Vue + Vite starter
  </p>
  <p>
    Install
    <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
    in your IDE for a better DX
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
