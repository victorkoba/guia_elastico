<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'

const largura = ref(700)
const modo = ref('grid')
const justify = ref('flex-start')
const align = ref('stretch')
const wrap = ref(true)

const caixa = ref(null)
const larguraReal = ref(0)
const colunas = ref(0)

// Medimos o resultado de verdade: a largura que sobrou e quantas colunas o navegador criou.
let observador
function medir() {
  larguraReal.value = Math.round(caixa.value.clientWidth)
  colunas.value = getComputedStyle(caixa.value).gridTemplateColumns.split(' ').length
}
onMounted(() => {
  observador = new ResizeObserver(medir)
  observador.observe(caixa.value)
})
onBeforeUnmount(() => observador.disconnect())
watch(modo, medir, { flush: 'post' })

// Largura mínima para n colunas: n cards de 14rem (224px) + (n - 1) gaps de 1rem (16px)
const minimoPara = (n) => n * 224 + (n - 1) * 16
</script>

<template>
  <div class="lab">
    <h3>Grid ou Flex: arraste a largura</h3>

    <div class="controles">
      <label>
        Largura do contêiner: {{ largura }}px
        <input v-model.number="largura" type="range" min="200" max="1000" step="4" />
      </label>
      <label>
        <input v-model="modo" type="radio" value="grid" /> grid auto-fit
      </label>
      <label>
        <input v-model="modo" type="radio" value="flex" /> flex
      </label>
    </div>

    <div v-if="modo === 'flex'" class="controles">
      <label>
        justify-content
        <select v-model="justify">
          <option>flex-start</option>
          <option>center</option>
          <option>space-between</option>
          <option>space-around</option>
        </select>
      </label>
      <label>
        align-items
        <select v-model="align">
          <option>stretch</option>
          <option>flex-start</option>
          <option>center</option>
          <option>flex-end</option>
        </select>
      </label>
      <label><input v-model="wrap" type="checkbox" /> flex-wrap: wrap</label>
    </div>

    <p class="leitura">
      Largura real: {{ larguraReal }}px<span v-if="larguraReal < largura"> (limitada pela tela)</span>
      <template v-if="modo === 'grid'">
        · {{ colunas }} coluna{{ colunas > 1 ? 's' : '' }} · próxima em {{ minimoPara(colunas + 1) }}px
      </template>
    </p>

    <div
      ref="caixa"
      class="caixa"
      :class="modo"
      :style="{
        width: largura + 'px',
        justifyContent: modo === 'flex' ? justify : null,
        alignItems: modo === 'flex' ? align : null,
        flexWrap: modo === 'flex' ? (wrap ? 'wrap' : 'nowrap') : null,
      }"
    >
      <div v-for="n in 5" :key="n" class="card" :style="{ minHeight: 3 + (n % 3) + 'rem' }">
        {{ n }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.caixa {
  max-width: 100%; /* nunca maior que a tela: sem rolagem horizontal */
  gap: 1rem;
  padding: 0;
  outline: 0.125rem dashed var(--cor-cota);
  overflow: hidden; /* no flex sem wrap, os cards excedentes ficam cortados aqui dentro */
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));
}

.flex {
  display: flex;
}

.card {
  display: grid;
  place-items: center;
  font-family: var(--fonte-mono);
  font-size: var(--texto-m);
  color: var(--cor-papel-escuro);
  background: var(--cor-texto-suave);
  border: 0.125rem solid var(--cor-texto);
}

.flex .card {
  flex: 0 1 8rem;
}
</style>
