<script setup>
import { useViewportStore } from '../stores/viewport'

// O estado vem do Pinia: qualquer componente lê a mesma largura sem duplicar listeners.
const viewport = useViewportStore()
</script>

<template>
  <!-- aria-live desligado: anunciar cada pixel do resize atrapalharia leitores de tela -->
  <aside class="selo" aria-label="Largura atual da janela">
    <span>{{ viewport.largura }}px</span>
    <strong>{{ viewport.breakpoint }}</strong>
  </aside>
</template>

<style scoped>
.selo {
  position: fixed;
  right: var(--espaco-2);
  bottom: var(--espaco-2);
  z-index: 20;
  display: flex;
  gap: var(--espaco-2);
  padding: var(--espaco-1) var(--espaco-2);
  font-family: var(--fonte-mono);
  font-size: 0.75rem;
  color: var(--cor-papel-escuro);
  background: var(--cor-cota);
  box-shadow: 0.25rem 0.25rem 0 var(--cor-papel-escuro);
  pointer-events: none;
}

strong {
  text-transform: uppercase;
}
</style>
