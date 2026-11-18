<script setup>
import GuideSection from '../components/GuideSection.vue'
import CodeBlock from '../components/CodeBlock.vue'
import GridLab from '../components/labs/GridLab.vue'

const codigoFlex = `
/* Flexbox: UMA dimensão (uma linha OU uma coluna) */
.menu {
  display: flex;
  justify-content: space-between; /* distribui no eixo principal (horizontal) */
  align-items: center;            /* alinha no eixo cruzado (vertical) */
  flex-wrap: wrap;                /* se não couber, quebra para a linha de baixo */
  gap: 1rem;                      /* espaço entre itens, sem margin nas pontas */
}`

const codigoGrid = `
/* Grid: DUAS dimensões (linhas E colunas ao mesmo tempo) */
.cards {
  display: grid;
  /* auto-fit: cria quantas colunas couberem
     minmax(14rem, 1fr): cada coluna tem no mínimo 14rem
     e divide igualmente o espaço que sobrar */
  grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));
  gap: 1rem;
}
/* Nenhuma media query: a quantidade de colunas se ajusta sozinha */`

const fontes = [
  { titulo: 'MDN — Conceitos básicos de Flexbox', url: 'https://developer.mozilla.org/pt-BR/docs/Web/CSS/CSS_flexible_box_layout/Basic_concepts_of_flexbox' },
  { titulo: 'MDN — Layout de grade (CSS Grid)', url: 'https://developer.mozilla.org/pt-BR/docs/Web/CSS/CSS_grid_layout/Basic_concepts_of_grid_layout' },
  { titulo: 'MDN — repeat()', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/repeat' },
  { titulo: 'CSS-Tricks — A Complete Guide to Flexbox', url: 'https://css-tricks.com/snippets/css/a-guide-to-flexbox/' },
  { titulo: 'CSS-Tricks — Auto-Sizing Columns: auto-fill vs auto-fit', url: 'https://css-tricks.com/auto-sizing-columns-css-grid-auto-fill-vs-auto-fit/' },
]
</script>

<template>
  <GuideSection
    numero="03"
    titulo="Flexbox e Grid"
    pergunta="Um contêiner usa grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr)) e gap: 1rem. A partir de qual largura do contêiner, em px, os cards deixam de ficar em 1 coluna e passam para 2? Considerem 1rem = 16px e mostrem a conta."
    :fontes="fontes"
  >
    <p>
      Os dois organizam elementos lado a lado. A diferença está em quantas direções você controla:
    </p>
    <ul>
      <li>
        <strong>Flexbox</strong> pensa em <strong>uma dimensão</strong>: uma fila de itens. Ótimo para
        menus, barras de botões e centralizar algo. Cada item decide seu tamanho pelo conteúdo.
      </li>
      <li>
        <strong>Grid</strong> pensa em <strong>duas dimensões</strong>: uma tabela de linhas e colunas.
        Ótimo para galerias e para o layout geral da página. Os itens se encaixam nas colunas.
      </li>
    </ul>
    <p>
      Regra prática: se você quer que os itens fiquem <em>alinhados em colunas</em> também na linha de
      baixo, use Grid. Se só precisa de uma fila que se ajusta, use Flex. No laboratório, compare a
      última linha: no Grid os cards respeitam as colunas; no Flex eles se arrumam do jeito que der.
    </p>

    <CodeBlock arquivo="menu.css" :codigo="codigoFlex" />
    <CodeBlock arquivo="cards.css" :codigo="codigoGrid" />

    <GridLab />

    <template #resposta>
      <p>Para caber 2 colunas, o contêiner precisa ter espaço para 2 cards no tamanho mínimo e 1 gap entre eles:</p>
      <ul class="conta">
        <li>Card mínimo: 14rem × 16px = <strong>224px</strong></li>
        <li>Gap: 1rem × 16px = <strong>16px</strong></li>
        <li>2 colunas: 224 + 16 + 224 = <strong>464px</strong></li>
      </ul>
      <p>
        Com menos de 464px só cabe uma coluna (que estica até ocupar tudo, por causa do
        <code>1fr</code>). A partir de <strong>464px</strong> de largura do contêiner os cards passam
        para 2 colunas. A regra geral é <code>n × 224 + (n − 1) × 16</code>: 3 colunas a partir de
        704px, 4 a partir de 944px. Teste no laboratório: arraste até 464px e veja a troca.
      </p>
      <p>
        Atenção: é a largura do <em>contêiner</em> (sem o padding), não a da janela.
      </p>
    </template>
  </GuideSection>
</template>

<style scoped>
.conta {
  font-family: var(--fonte-mono);
  font-size: 0.875rem;
}
</style>
