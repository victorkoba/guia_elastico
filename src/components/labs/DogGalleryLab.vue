<script setup>
import { ref, onMounted } from 'vue'

const fotos = ref([])
const estado = ref('carregando') // carregando | ok | erro
const ajuste = ref('cover')
const proporcao = ref('1 / 1')

// API pública e gratuita, sem chave: devolve URLs de fotos de cachorros de tamanhos variados.
async function buscar() {
  estado.value = 'carregando'
  try {
    const resposta = await fetch('https://dog.ceo/api/breeds/image/random/6')
    if (!resposta.ok) throw new Error(resposta.status)
    const dados = await resposta.json()
    // Dado externo: só aceitamos uma lista de URLs https
    if (!Array.isArray(dados.message)) throw new Error('formato inesperado')
    fotos.value = dados.message.filter((url) => typeof url === 'string' && url.startsWith('https://'))
    estado.value = 'ok'
  } catch {
    estado.value = 'erro'
  }
}

onMounted(buscar)
</script>

<template>
  <div class="lab">
    <h3>Galeria com fotos de tamanhos diferentes</h3>
    <p>
      Cada foto da API tem um tamanho diferente. Com <code>aspect-ratio</code> todas as molduras
      ficam iguais, e o <code>object-fit</code> decide como a foto se encaixa.
    </p>

    <div class="controles">
      <label>
        object-fit
        <select v-model="ajuste">
          <option>cover</option>
          <option>contain</option>
          <option>fill</option>
        </select>
      </label>
      <label>
        aspect-ratio
        <select v-model="proporcao">
          <option>1 / 1</option>
          <option>4 / 3</option>
          <option>16 / 9</option>
          <option>3 / 4</option>
        </select>
      </label>
      <button type="button" :disabled="estado === 'carregando'" @click="buscar">Outros cachorros</button>
    </div>

    <p v-if="estado === 'carregando'" class="leitura">Buscando na API...</p>
    <p v-else-if="estado === 'erro'" class="leitura erro" role="alert">
      Não foi possível falar com a API dog.ceo. Verifique a conexão e tente de novo.
    </p>

    <ul v-else class="galeria">
      <li v-for="url in fotos" :key="url">
        <img
          :src="url"
          alt="Foto de cachorro vinda da API dog.ceo"
          width="300"
          height="300"
          loading="lazy"
          :style="{ objectFit: ajuste, aspectRatio: proporcao }"
        />
      </li>
    </ul>
  </div>
</template>

<style scoped>
.galeria {
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(8rem, 1fr));
  gap: var(--espaco-2);
}

.galeria img {
  display: block;
  width: 100%;
  height: auto;
  background: var(--cor-papel-escuro);
  border: 0.125rem solid var(--cor-texto-suave);
}

.erro {
  color: var(--cor-erro);
}
</style>
