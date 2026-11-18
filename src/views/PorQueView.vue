<script setup>
import GuideSection from '../components/GuideSection.vue'
import CodeBlock from '../components/CodeBlock.vue'
import ViewportLab from '../components/labs/ViewportLab.vue'

const codigoMeta = `
<head>
  <!-- width=device-width: a página usa a largura real do aparelho (ex.: 390px) -->
  <!-- initial-scale=1: começa sem zoom, 1px do CSS = 1px "de tela" -->
  <meta name="viewport" content="width=device-width, initial-scale=1">
</head>`

const codigoMobileFirst = `
/* 1. Fora de media query: o layout do CELULAR (uma coluna) */
.produtos {
  display: grid;
  gap: 1rem;
}

/* 2. min-width: a partir de 48em (768px), acrescenta colunas */
@media (min-width: 48em) {
  .produtos {
    grid-template-columns: repeat(3, 1fr);
  }
}`

const fontes = [
  { titulo: 'MDN — <meta name="viewport">', url: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Viewport_meta_tag' },
  { titulo: 'web.dev — Responsive web design basics', url: 'https://web.dev/articles/responsive-web-design-basics' },
  { titulo: 'MDN — Usando media queries', url: 'https://developer.mozilla.org/pt-BR/docs/Web/CSS/CSS_media_queries/Using_media_queries' },
  { titulo: 'StatCounter — Desktop vs Mobile market share', url: 'https://gs.statcounter.com/platform-market-share/desktop-mobile-tablet' },
]
</script>

<template>
  <GuideSection
    numero="01"
    titulo="Por que responsividade importa"
    pergunta="Um site tem media queries bem escritas, mas não tem a meta tag viewport. No celular, ele aparece como a versão de computador, só que minúscula. Por que isso acontece, e o que a meta viewport muda?"
    :fontes="fontes"
  >
    <p>
      Hoje a maior parte das visitas na internet vem do celular. Um site <strong>responsivo</strong>
      é um único site que se reorganiza conforme o espaço disponível: em tela estreita os blocos ficam
      um embaixo do outro; em tela larga, lado a lado. Sem isso a pessoa precisa dar zoom e arrastar
      a página para os lados, e acaba desistindo.
    </p>
    <p>
      A estratégia que usamos é <strong>mobile-first</strong>: primeiro escrevemos o CSS do celular
      (o mais simples), depois usamos <code>@media (min-width: ...)</code> para acrescentar coisas
      quando sobra espaço. Mas tudo isso depende de uma linha no HTML: a meta viewport.
    </p>

    <CodeBlock arquivo="index.html" :codigo="codigoMeta" />
    <CodeBlock arquivo="estilo.css" :codigo="codigoMobileFirst" />

    <ViewportLab />

    <template #resposta>
      <p>
        Os primeiros celulares com navegador completo precisavam abrir sites feitos só para
        computador. A solução foi <strong>fingir</strong> uma tela larga: sem instrução nenhuma, o
        navegador do celular monta a página numa largura virtual de cerca de <strong>980px</strong> e
        depois encolhe o resultado para caber na tela de ~390px. Por isso tudo fica minúsculo.
      </p>
      <p>
        As media queries perguntam a largura dessa tela virtual. Para o CSS, a tela tem 980px, então
        uma regra como <code>@media (min-width: 48em)</code> é verdadeira e o layout de computador é
        aplicado, mesmo num aparelho pequeno. As media queries estão certas; elas só recebem a largura
        errada.
      </p>
      <p>
        A meta <code>width=device-width, initial-scale=1</code> manda o navegador usar a largura real
        do aparelho como largura da página e não aplicar zoom. Aí a tela "mede" 390px, as media
        queries passam a responder ao aparelho de verdade, e o layout de celular aparece no tamanho
        certo. No laboratório acima, marque e desmarque a caixa para ver as duas situações.
      </p>
    </template>
  </GuideSection>
</template>
