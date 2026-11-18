<script setup>
import { ref, watch } from 'vue'
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { secoes } from './router'
import BreakpointBadge from './components/BreakpointBadge.vue'

const menuAberto = ref(false)
const route = useRoute()

// Fecha o menu do celular ao trocar de página
watch(() => route.path, () => (menuAberto.value = false))
</script>

<template>
  <header class="topo">
    <RouterLink to="/" class="marca">
      <span aria-hidden="true">▚</span> Guia Elástico
    </RouterLink>

    <button
      class="botao-menu"
      :aria-expanded="menuAberto"
      aria-controls="menu-principal"
      @click="menuAberto = !menuAberto"
    >
      {{ menuAberto ? '✕ Fechar' : '≡ Menu' }}
    </button>

    <nav id="menu-principal" class="menu" :class="{ aberto: menuAberto }" aria-label="Seções do guia">
      <RouterLink v-for="secao in secoes" :key="secao.path" :to="secao.path">
        <span class="numero">{{ secao.numero }}</span> {{ secao.titulo }}
      </RouterLink>
    </nav>
  </header>

  <main class="conteudo">
    <RouterView />
  </main>

  <BreakpointBadge />
</template>

<style scoped>
/* Celular primeiro: tudo aqui fora é o layout de tela pequena */
.topo {
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--espaco-2);
  padding: var(--espaco-2) var(--espaco-3);
  background: var(--cor-papel-escuro);
  border-bottom: var(--borda);
}

.marca {
  font-family: var(--fonte-titulo);
  font-size: var(--texto-m);
  font-weight: 700;
  text-transform: uppercase;
  color: var(--cor-texto);
  text-decoration: none;
  letter-spacing: 0.05em;
}

.marca span {
  color: var(--cor-cota);
}

.menu {
  display: none;
  flex-basis: 100%;
  flex-direction: column;
  padding-block: var(--espaco-2);
}

.menu.aberto {
  display: flex;
}

.menu a {
  padding: var(--espaco-2) 0;
  color: var(--cor-texto);
  text-decoration: none;
  font-family: var(--fonte-mono);
  font-size: 0.875rem;
  border-bottom: 0.0625rem solid var(--cor-linha-forte);
}

.menu a.router-link-active {
  color: var(--cor-cota);
}

.numero {
  color: var(--cor-texto-suave);
}

.conteudo {
  max-width: var(--largura-pagina);
  margin-inline: auto;
  padding: var(--espaco-4) var(--espaco-3) var(--espaco-6);
}

/* A partir de 48em (768px com fonte padrão) o botão some e o menu fica sempre visível */
@media (min-width: 48em) {
  .botao-menu {
    display: none;
  }

  .menu,
  .menu.aberto {
    display: flex;
    flex-basis: auto;
    flex-direction: row;
    flex-wrap: wrap;
    gap: var(--espaco-3);
    padding: 0;
  }

  .menu a {
    border-bottom: 0;
  }

  .conteudo {
    padding-inline: var(--espaco-5);
  }
}
</style>
