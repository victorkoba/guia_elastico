<script setup>
import GuideSection from '../components/GuideSection.vue'
import CodeBlock from '../components/CodeBlock.vue'
import KeyLab from '../components/labs/KeyLab.vue'

const pastas = `
src/
├── assets/main.css        → design tokens (:root) e estilos globais
├── components/            → peças reutilizáveis
│   ├── GuideSection.vue   → molde de toda seção
│   ├── CodeBlock.vue
│   └── labs/              → um arquivo por laboratório
├── router/index.js        → uma rota por seção, com import() sob demanda
├── stores/viewport.js     → Pinia: largura da janela compartilhada
└── views/                 → uma página por rota (sufixo View)`

const codigoComponente = `
<!-- AnimalItem.vue: nome em PascalCase e com duas palavras,
     para nunca colidir com uma tag HTML (como <item>) -->
<script setup>
// Props tipadas: se o pai mandar um número, o Vue avisa no console
defineProps({
  nome: { type: String, required: true },
})
// Eventos declarados: o filho avisa, o pai decide
const emit = defineEmits(['remover'])
<\/script>

<template>
  <li>
    {{ nome }}
    <button @click="emit('remover')">✕</button>
  </li>
</template>

<!-- No pai: :key com um id ÚNICO e ESTÁVEL (nunca o índice) -->
<AnimalItem
  v-for="animal in animais"
  :key="animal.id"
  :nome="animal.nome"
  @remover="remover(animal.id)"
/>`

const codigoRotas = `
// router/index.js
// import() = carregamento sob demanda: o código da página só é baixado
// quando a pessoa entra nela. A primeira tela abre mais rápido (melhor LCP).
{ path: '/imagens', component: () => import('../views/ImagensView.vue') }`

const codigoTokens = `
/* main.css: design tokens. Mude aqui, muda o site inteiro. */
:root {
  --cor-cota: #ffd23f;
  --espaco-3: 1rem;
}

.pergunta {
  border-left: 0.375rem solid var(--cor-cota);
  padding: var(--espaco-3);
}`

const fontes = [
  { titulo: 'Vue — Guia de estilo (Style Guide)', url: 'https://vuejs.org/style-guide/' },
  { titulo: 'Vue — Validação de props', url: 'https://vuejs.org/guide/components/props.html#prop-validation' },
  { titulo: 'Vue — Mantendo o estado com key', url: 'https://vuejs.org/guide/essentials/list.html#maintaining-state-with-key' },
  { titulo: 'Vue Router — Lazy loading routes', url: 'https://router.vuejs.org/guide/advanced/lazy-loading.html' },
  { titulo: 'web.dev — Web Vitals', url: 'https://web.dev/articles/vitals' },
  { titulo: 'MDN — Usando propriedades personalizadas (variáveis CSS)', url: 'https://developer.mozilla.org/pt-BR/docs/Web/CSS/Using_CSS_custom_properties' },
]
</script>

<template>
  <GuideSection
    numero="05"
    titulo="Boas práticas em projetos Vue"
    pergunta="Uma lista de animais é exibida com v-for, sem :key, e cada item tem um campo de texto. A pessoa digita algo no campo do segundo animal, e em seguida o primeiro animal é removido da lista. O que pode acontecer com o texto digitado, e por quê?"
    :fontes="fontes"
  >
    <p>
      Um projeto organizado é mais fácil de entender, de dividir em dupla e de deixar rápido. Este
      próprio guia segue as regras abaixo; os exemplos são o código dele.
    </p>

    <h2>Estrutura de pastas</h2>
    <CodeBlock :codigo="pastas" />

    <h2>Componentes, props, eventos e :key</h2>
    <ul>
      <li>Nomes em <strong>PascalCase</strong> e com mais de uma palavra: <code>AnimalItem</code>, <code>GuideSection</code>.</li>
      <li><strong>Props</strong> descem do pai para o filho, sempre com tipo. <strong>Eventos</strong> sobem do filho para o pai.</li>
      <li>Todo <code>v-for</code> leva <code>:key</code> com um valor único e estável, como o <code>id</code> do banco.</li>
    </ul>
    <CodeBlock arquivo="AnimalItem.vue" :codigo="codigoComponente" />

    <h2>Variáveis CSS como design tokens</h2>
    <p>
      Cores, espaços e fontes ficam em variáveis no <code>:root</code>. Os componentes só usam
      <code>var(--nome)</code>, nunca o valor solto. Trocar o tema vira trabalho de uma linha.
    </p>
    <CodeBlock arquivo="main.css" :codigo="codigoTokens" />

    <h2>Core Web Vitals</h2>
    <p>As três métricas do Google para a experiência real de quem usa o site:</p>
    <ul>
      <li><strong>LCP</strong> (Largest Contentful Paint): quanto tempo até o maior elemento aparecer. Bom: até 2,5 s.</li>
      <li><strong>INP</strong> (Interaction to Next Paint): quanto a tela demora para reagir a um clique ou toque. Bom: até 200 ms.</li>
      <li><strong>CLS</strong> (Cumulative Layout Shift): o quanto a página "pula" sozinha. Bom: até 0,1.</li>
    </ul>

    <h2>Rotas sob demanda</h2>
    <CodeBlock arquivo="router/index.js" :codigo="codigoRotas" />

    <KeyLab />

    <template #resposta>
      <p>
        O texto pode aparecer no animal <strong>errado</strong>. Se a lista era Capivara, Tucano,
        Jabuti e a pessoa escreveu no campo do Tucano, depois de remover a Capivara o texto aparece no
        campo do <strong>Jabuti</strong>.
      </p>
      <p>
        Sem <code>:key</code>, o Vue não sabe qual elemento da página pertence a qual animal. Ele
        usa a estratégia mais barata, "atualizar no lugar": reaproveita os elementos pela
        <strong>posição</strong>. Depois da remoção, a lista tem um item a menos, então o Vue troca o
        nome escrito em cada posição (o 1º elemento passa a mostrar "Tucano", o 2º passa a mostrar
        "Jabuti") e apaga o último elemento. O campo de texto do 2º elemento não muda, porque o texto
        digitado não está nos dados do animal: está guardado no próprio elemento. Resultado: o apelido
        do Tucano agora está ao lado do Jabuti, e quem foi apagado de verdade foi o elemento do último
        animal.
      </p>
      <p>
        Com <code>:key="animal.id"</code>, o Vue identifica cada elemento pelo id. Ao remover a
        Capivara, ele remove exatamente o elemento dela, e o campo do Tucano continua com o Tucano.
        Usar o índice (<code>:key="i"</code>) não resolve, porque o índice também muda quando a lista
        muda. Teste no laboratório acima.
      </p>
    </template>
  </GuideSection>
</template>
