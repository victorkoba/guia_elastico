<script setup>
defineProps({
  codigo: { type: String, required: true },
  arquivo: { type: String, default: '' },
})
</script>

<template>
  <figure class="bloco">
    <figcaption v-if="arquivo">{{ arquivo }}</figcaption>
    <pre><code>{{ codigo.trim() }}</code></pre>
  </figure>
</template>

<style scoped>
.bloco {
  margin: var(--espaco-4) 0;
  border: 0.0625rem solid var(--cor-linha-forte);
  background: var(--cor-codigo);
}

figcaption {
  padding: var(--espaco-1) var(--espaco-3);
  font-family: var(--fonte-mono);
  font-size: 0.75rem;
  color: var(--cor-papel-escuro);
  background: var(--cor-texto-suave);
}

pre {
  margin: 0;
  padding: var(--espaco-3);
  /* Quebra a linha em vez de criar rolagem horizontal no celular */
  white-space: pre-wrap;
  overflow-wrap: anywhere;
  font-size: 0.8125rem;
  line-height: 1.5;
}

code {
  background: none;
  padding: 0;
}
</style>
