import { ref } from 'vue'
import { defineStore } from 'pinia'

// Os mesmos breakpoints das media queries do CSS (em "em", para acompanhar a fonte do usuário).
const BREAKPOINTS = [
  { nome: 'lg', query: '(min-width: 64em)' },
  { nome: 'md', query: '(min-width: 48em)' },
  { nome: 'sm', query: '(min-width: 36em)' },
]

export const useViewportStore = defineStore('viewport', () => {
  const largura = ref(0)
  const altura = ref(0)
  const breakpoint = ref('base')

  function atualizar() {
    largura.value = window.innerWidth
    altura.value = window.innerHeight
    breakpoint.value = BREAKPOINTS.find((b) => matchMedia(b.query).matches)?.nome ?? 'base'
  }
  atualizar()
  window.addEventListener('resize', atualizar)

  return { largura, altura, breakpoint }
})
