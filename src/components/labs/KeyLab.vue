<script setup>
import { ref } from 'vue'
import AnimalItem from './AnimalItem.vue'

const ANIMAIS = [
  { id: 1, nome: 'Capivara' },
  { id: 2, nome: 'Tucano' },
  { id: 3, nome: 'Jabuti' },
  { id: 4, nome: 'Lobo-guará' },
]

const semKey = ref([...ANIMAIS])
const comKey = ref([...ANIMAIS])

function removerPrimeiro() {
  semKey.value.shift()
  comKey.value.shift()
}

// Remontar os dois blocos (pelo :key do contador) limpa também o texto digitado
const rodada = ref(0)
function reiniciar() {
  semKey.value = [...ANIMAIS]
  comKey.value = [...ANIMAIS]
  rodada.value++
}
</script>

<template>
  <div class="lab">
    <h3>v-for com e sem :key</h3>
    <ol class="passos">
      <li>Digite um apelido no <strong>Tucano</strong> (o 2º) das duas listas.</li>
      <li>Clique em "Remover o primeiro".</li>
      <li>Veja em qual animal o texto foi parar.</li>
    </ol>
    <div class="controles">
      <button type="button" @click="removerPrimeiro">Remover o primeiro</button>
      <button type="button" @click="reiniciar">Reiniciar</button>
    </div>

    <div :key="rodada" class="listas">
      <section>
        <h4 class="errado">Sem :key</h4>
        <ul>
          <!-- Sem :key de propósito: é o erro que estamos demonstrando -->
          <AnimalItem
            v-for="(animal, i) in semKey"
            :nome="animal.nome"
            @remover="semKey.splice(i, 1)"
          />
        </ul>
      </section>
      <section>
        <h4 class="certo">Com :key="animal.id"</h4>
        <ul>
          <AnimalItem
            v-for="(animal, i) in comKey"
            :key="animal.id"
            :nome="animal.nome"
            @remover="comKey.splice(i, 1)"
          />
        </ul>
      </section>
    </div>
  </div>
</template>

<style scoped>
.passos {
  font-size: 0.875rem;
}

.listas {
  display: grid;
  gap: var(--espaco-3);
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

h4 {
  margin: 0 0 var(--espaco-2);
  font-family: var(--fonte-mono);
}

.errado {
  color: var(--cor-erro);
}

.certo {
  color: var(--cor-ok);
}

@media (min-width: 36em) {
  .listas {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
