<script setup>
// Molde de toda seção: explicação (slot padrão), pergunta-guia + resposta e fontes.
defineProps({
  numero: { type: String, required: true },
  titulo: { type: String, required: true },
  pergunta: { type: String, required: true },
  fontes: { type: Array, required: true }, // [{ titulo, url }]
})
</script>

<template>
  <article>
    <header class="cabecalho">
      <span class="numero">{{ numero }}</span>
      <h1>{{ titulo }}</h1>
    </header>

    <slot />

    <section class="pergunta" aria-labelledby="titulo-pergunta">
      <h2 id="titulo-pergunta">Pergunta-guia</h2>
      <p class="enunciado">{{ pergunta }}</p>
      <h3>Nossa resposta</h3>
      <slot name="resposta" />
    </section>

    <footer class="fontes">
      <h2>Fontes consultadas</h2>
      <ul>
        <li v-for="fonte in fontes" :key="fonte.url">
          <a :href="fonte.url" target="_blank" rel="noopener">{{ fonte.titulo }}</a>
        </li>
      </ul>
    </footer>
  </article>
</template>

<style scoped>
.cabecalho {
  border-bottom: 0.1875rem solid var(--cor-cota);
  margin-bottom: var(--espaco-4);
}

.cabecalho h1 {
  margin: 0 0 var(--espaco-2);
}

.numero {
  font-family: var(--fonte-mono);
  color: var(--cor-cota);
}

.pergunta {
  margin-block: var(--espaco-5);
  padding: var(--espaco-3);
  border-left: 0.375rem solid var(--cor-cota);
  background: var(--cor-papel-escuro);
}

.pergunta h2 {
  margin-top: 0;
}

.enunciado {
  font-style: italic;
  color: var(--cor-texto-suave);
}

.fontes {
  font-size: 0.875rem;
  border-top: var(--borda);
}

.fontes h2 {
  font-size: var(--texto-m);
}

.fontes ul {
  padding-left: var(--espaco-3);
}
</style>
