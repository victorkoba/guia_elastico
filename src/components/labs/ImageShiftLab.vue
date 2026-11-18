<script setup>
import { ref, nextTick, onMounted, onBeforeUnmount } from 'vue'

const comDimensoes = ref(false)
const src = ref(null)
const texto = ref(null)
const pulo = ref(null)
let temporizador
let antes = 0

// Simula uma rede lenta: o src só é definido depois de 1,5 s.
function carregar() {
  clearTimeout(temporizador)
  src.value = null
  pulo.value = null
  nextTick(() => {
    antes = texto.value.offsetTop
    temporizador = setTimeout(() => {
      src.value = `${import.meta.env.BASE_URL}planta.svg?v=${Date.now()}` // ?v= fura o cache
    }, 1500)
  })
}

function aoCarregar() {
  pulo.value = texto.value.offsetTop - antes
}

onMounted(carregar)
onBeforeUnmount(() => clearTimeout(temporizador))
</script>

<template>
  <div class="lab">
    <h3>A imagem que empurra o texto</h3>
    <div class="controles">
      <label>
        <input v-model="comDimensoes" type="checkbox" @change="carregar" />
        width="800" height="450" no &lt;img&gt;
      </label>
      <button type="button" @click="carregar">Recarregar</button>
    </div>
    <p class="leitura" aria-live="polite">
      <template v-if="pulo === null">Carregando a imagem...</template>
      <template v-else>O texto se moveu {{ pulo }}px quando a imagem chegou.</template>
    </p>

    <div class="pagina">
      <h4>Notícia de exemplo</h4>
      <img
        :key="comDimensoes"
        :src="src"
        :width="comDimensoes ? 800 : null"
        :height="comDimensoes ? 450 : null"
        alt="Planta de uma casa desenhada em azul"
        @load="aoCarregar"
      />
      <p ref="texto">
        Este é o parágrafo que a pessoa já estava lendo. Sem width e height, ele pula para baixo quando
        a imagem termina de carregar. Com as dimensões, o espaço já estava reservado.
      </p>
    </div>
  </div>
</template>

<style scoped>
.pagina {
  padding: var(--espaco-3);
  color: #1d2433;
  background: #f4f7ff;
}

h4 {
  margin: 0 0 var(--espaco-2);
  font-family: var(--fonte-titulo);
  font-size: var(--texto-m);
}

img {
  display: block;
  width: 100%;
  height: auto; /* com width/height no HTML, o navegador calcula a proporção 800/450 antes de baixar */
  background: #d5ddf0;
}

p {
  margin-bottom: 0;
}
</style>
