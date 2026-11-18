<script setup>
import { ref } from 'vue'

const comMeta = ref(false)
</script>

<template>
  <div class="lab">
    <h3>Celular com e sem meta viewport</h3>
    <div class="controles">
      <label>
        <input v-model="comMeta" type="checkbox" />
        &lt;meta name="viewport" content="width=device-width"&gt;
      </label>
    </div>
    <p class="leitura">
      Viewport de layout: {{ comMeta ? '245px (a largura do aparelho)' : '980px (largura virtual)' }}
    </p>

    <!-- shortcut: medidas em px fixos porque a escala 245/980 = 0,25 só fecha em px; não é layout real. -->
    <div class="aparelho" aria-hidden="true">
      <div class="pagina" :class="comMeta ? 'mobile' : 'desktop'">
        <div class="barra">MINHA LOJA</div>
        <div class="cards">
          <div v-for="n in 3" :key="n" class="card">Produto {{ n }}</div>
        </div>
        <p>Texto do site com 16px de fonte.</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.aparelho {
  width: 245px;
  height: 380px;
  margin-inline: auto;
  overflow: hidden;
  border: 6px solid var(--cor-texto);
  border-radius: 18px;
  background: #fff;
}

.pagina {
  color: #222;
  font-size: 16px;
  transform-origin: top left;
}

/* Sem a meta tag: o navegador desenha a página em 980px e encolhe tudo para caber */
.desktop {
  width: 980px;
  transform: scale(0.25);
}

.desktop .cards {
  grid-template-columns: repeat(3, 1fr);
}

.mobile {
  width: 245px;
}

.barra {
  padding: 8px;
  color: #fff;
  background: #c0392b;
  font-weight: 600;
}

.cards {
  display: grid;
  gap: 8px;
  padding: 8px;
}

.card {
  height: 60px;
  padding: 8px;
  background: #f1c40f;
}

.pagina p {
  padding: 0 8px;
}
</style>
