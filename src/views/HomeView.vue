<script setup>
import { RouterLink } from 'vue-router'
import { secoes } from '../router'
</script>

<template>
  <section>
    <p class="leitura">PRANCHA 00 · ESCALA: QUALQUER TELA</p>
    <h1>Guia Elástico</h1>
    <p>
      Um guia prático para desenhar páginas que funcionam no celular, no tablet e no monitor gigante.
      Cada seção tem uma explicação curta, código comentado, a resposta da pergunta-guia e pelo menos
      um <strong>laboratório</strong>: mexa nos controles e veja o conceito acontecer.
    </p>
    <p>
      Repare no selo amarelo no canto da tela: ele mostra a largura da janela e o breakpoint ativo.
      Redimensione a janela (ou gire o celular) e acompanhe.
    </p>

    <ol class="indice">
      <li v-for="secao in secoes" :key="secao.path">
        <RouterLink :to="secao.path">
          <span class="leitura">{{ secao.numero }}</span>
          {{ secao.titulo }}
        </RouterLink>
      </li>
    </ol>
  </section>
</template>

<style scoped>
.indice {
  list-style: none;
  padding: 0;
  display: grid;
  gap: var(--espaco-3);
}

.indice a {
  display: block;
  padding: var(--espaco-3);
  border: var(--borda);
  color: var(--cor-texto);
  text-decoration: none;
  font-family: var(--fonte-titulo);
  font-size: var(--texto-m);
  text-transform: uppercase;
}

.indice a:hover {
  border-color: var(--cor-cota);
}

@media (min-width: 36em) {
  .indice {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
