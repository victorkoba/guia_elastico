<script setup>
import { useId } from 'vue'

// Props tipadas: o Vue avisa no console se alguém passar algo diferente de String.
defineProps({
  nome: { type: String, required: true },
})
// Evento declarado: o pai escuta com @remover e decide o que fazer.
const emit = defineEmits(['remover'])

const id = useId()
</script>

<template>
  <li class="animal">
    <label :for="id">{{ nome }}</label>
    <!-- Campo sem v-model de propósito: o texto fica guardado só no elemento da página -->
    <input :id="id" type="text" placeholder="apelido..." />
    <button type="button" :aria-label="`Remover ${nome}`" @click="emit('remover')">✕</button>
  </li>
</template>

<style scoped>
.animal {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: var(--espaco-1) var(--espaco-2);
  align-items: center;
  padding: var(--espaco-2);
  border-bottom: 0.0625rem solid var(--cor-linha-forte);
}

label {
  grid-column: 1 / -1;
  font-family: var(--fonte-mono);
  color: var(--cor-cota);
}

input {
  min-width: 0;
  padding: var(--espaco-1) var(--espaco-2);
}

button {
  padding: var(--espaco-1) var(--espaco-2);
}
</style>
