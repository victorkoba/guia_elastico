<script setup>
import { ref, watch } from 'vue'
import { useViewportStore } from '../../stores/viewport'

const viewport = useViewportStore()

const valor = ref(1.5)
const unidade = ref('rem')
const raiz = ref(parseFloat(getComputedStyle(document.documentElement).fontSize))
const fontePai = ref(20)
const larguraPai = ref(300)
const resultado = ref(0)
const sonda = ref(null)

const referencia = {
  rem: () => `fonte da raiz (html) = ${raiz.value}px`,
  em: () => `fonte do elemento pai = ${fontePai.value}px`,
  '%': () => `largura do pai = ${larguraPai.value}px`,
  vw: () => `1% da largura da janela (${viewport.largura}px)`,
  vh: () => `1% da altura da janela "grande" (barras do navegador escondidas)`,
  dvh: () => `1% da altura visível agora (${viewport.altura}px)`,
  ch: () => `largura do caractere "0" na fonte mono de ${fontePai.value}px`,
}

// Quem converte é o próprio navegador: aplicamos a medida num elemento invisível e lemos a largura.
// rem é a exceção, porque aqui ele é simulado pelo controle "fonte da raiz".
watch(
  [valor, unidade, raiz, fontePai, larguraPai, () => viewport.largura, () => viewport.altura],
  () => {
    resultado.value =
      unidade.value === 'rem'
        ? Number(valor.value) * raiz.value
        : sonda.value.getBoundingClientRect().width
  },
  { flush: 'post', immediate: true },
)
</script>

<template>
  <div class="lab">
    <h3>Conversor de unidades</h3>

    <div class="controles">
      <label>
        Valor
        <input v-model.number="valor" type="number" step="0.25" min="0" class="numero" />
      </label>
      <label>
        Unidade
        <select v-model="unidade">
          <option v-for="(_, u) in referencia" :key="u">{{ u }}</option>
        </select>
      </label>
    </div>

    <p class="resultado">
      {{ valor }}{{ unidade }} = <strong class="leitura">{{ Number.isFinite(resultado) ? +resultado.toFixed(2) : '—' }}px</strong>
    </p>
    <p class="explica">Referência: {{ referencia[unidade]() }}</p>

    <div class="controles">
      <label>
        Fonte da raiz (simula a configuração do navegador): {{ raiz }}px
        <input v-model.number="raiz" type="range" min="10" max="32" />
      </label>
      <label>
        Fonte do pai: {{ fontePai }}px
        <input v-model.number="fontePai" type="range" min="10" max="40" />
      </label>
      <label>
        Largura do pai: {{ larguraPai }}px
        <input v-model.number="larguraPai" type="range" min="100" max="1200" step="10" />
      </label>
    </div>

    <div class="comparacao">
      <p :style="{ fontSize: '16px' }">Texto em 16px: não muda.</p>
      <p :style="{ fontSize: raiz + 'px' }">Texto em 1rem: acompanha a raiz.</p>
    </div>

    <!-- Área de medição: invisível e com overflow escondido para não criar rolagem lateral -->
    <div class="area-medicao" aria-hidden="true">
      <div :style="{ width: larguraPai + 'px', fontSize: fontePai + 'px' }">
        <span ref="sonda" class="sonda" :style="{ width: valor + unidade }"></span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.numero {
  width: 6rem;
}

.resultado {
  font-size: var(--texto-m);
  font-family: var(--fonte-mono);
  margin-bottom: 0;
}

.explica {
  margin-top: 0;
  color: var(--cor-texto-suave);
  font-size: 0.875rem;
}

.comparacao {
  border-top: var(--borda);
}

.comparacao p {
  margin: var(--espaco-2) 0;
  line-height: 1.3;
}

.area-medicao {
  position: relative;
  height: 0;
  overflow: hidden;
  visibility: hidden;
}

.area-medicao > div {
  position: absolute;
}

.sonda {
  display: block;
  font-family: var(--fonte-mono);
}
</style>
