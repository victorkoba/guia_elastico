<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <article>
    <p class="leitura">PRANCHA ?? · DESAFIO</p>
    <h1>Desafio</h1>

    <p class="pergunta">
      No laboratório "Celular com e sem meta viewport" (seção 01), com a caixa
      <strong>desmarcada</strong>, o texto do site de exemplo foi escrito com 16px de fonte. Com que
      tamanho, em px, ele realmente aparece na tela do aparelho? Mostre a conta.
    </p>
    <p>
      Dica: leia a "Viewport de layout" no laboratório e meça a tela do aparelho no código da
      <RouterLink to="/por-que">seção 01</RouterLink>.
    </p>

    <details>
      <summary>Ver a resposta</summary>
      <p>
        Sem a meta tag, a página é montada em <strong>980px</strong> e encolhida para caber nos
        <strong>245px</strong> do aparelho: 245 ÷ 980 = <strong>0,25</strong>. Tudo fica a um quarto do
        tamanho: 16px × 0,25 = <strong>4px</strong>. Ilegível! Marcando a caixa, a viewport passa a ter
        245px, não há redução e o texto volta aos 16px.
      </p>
    </details>
  </article>
</template>

<style scoped>
.pergunta {
  font-size: var(--texto-m);
  padding: var(--espaco-3);
  border: 0.125rem dashed var(--cor-cota);
}

details {
  margin-top: var(--espaco-4);
  padding: var(--espaco-3);
  background: var(--cor-papel-escuro);
}

summary {
  cursor: pointer;
  font-family: var(--fonte-mono);
  color: var(--cor-cota);
}
</style>
