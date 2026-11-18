<script setup>
import GuideSection from '../components/GuideSection.vue'
import CodeBlock from '../components/CodeBlock.vue'
import UnitLab from '../components/labs/UnitLab.vue'

const unidades = [
  { u: 'px', tipo: 'absoluta', ref: 'fixo', uso: 'Bordas finas e sombras: detalhes que não devem crescer com a fonte.' },
  { u: 'rem', tipo: 'relativa', ref: 'fonte do <html>', uso: 'Fontes e espaçamentos. Respeita a fonte escolhida pelo usuário.' },
  { u: 'em', tipo: 'relativa', ref: 'fonte do próprio elemento', uso: 'Espaço que acompanha o texto do componente (padding de botão) e media queries.' },
  { u: '%', tipo: 'relativa', ref: 'tamanho do pai', uso: 'Larguras dentro de um contêiner, como max-width: 100%.' },
  { u: 'fr', tipo: 'relativa', ref: 'espaço livre do grid', uso: 'Só em Grid: divide o que sobra em frações (1fr 2fr).' },
  { u: 'vw', tipo: 'relativa', ref: '1% da largura da janela', uso: 'Tamanhos ligados à tela inteira, com cuidado (100vw inclui a barra de rolagem).' },
  { u: 'vh', tipo: 'relativa', ref: '1% da altura da janela', uso: 'Seções de tela cheia no computador.' },
  { u: 'dvh', tipo: 'relativa', ref: '1% da altura visível agora', uso: 'Tela cheia no celular: acompanha a barra do navegador aparecendo e sumindo.' },
  { u: 'ch', tipo: 'relativa', ref: 'largura do caractere "0"', uso: 'Limitar linha de texto: max-width: 65ch deixa a leitura confortável.' },
]

const codigo = `
:root {
  --espaco: 1rem;          /* 16px com a fonte padrão */
}

h1 {
  font-size: 2.25rem;      /* rem: cresce se a pessoa aumentar a fonte */
}

.botao {
  font-size: 1.25rem;
  padding: 0.5em 1em;      /* em: 0.5 × 1.25rem; botão maior, padding maior */
  border: 1px solid;       /* px: a borda fica fina em qualquer tamanho */
}

.texto {
  max-width: 65ch;         /* ch: cerca de 65 caracteres por linha */
}

.capa {
  min-height: 100dvh;      /* dvh: tela cheia sem esconder conteúdo no celular */
}

.layout {
  display: grid;
  grid-template-columns: 1fr 3fr;  /* fr: menu 1 parte, conteúdo 3 partes */
}`

const fontes = [
  { titulo: 'MDN — Valores e unidades do CSS', url: 'https://developer.mozilla.org/pt-BR/docs/Learn_web_development/Core/Styling_basics/Values_and_units' },
  { titulo: 'MDN — <length>', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/length' },
  { titulo: 'web.dev — The large, small, and dynamic viewport units', url: 'https://web.dev/blog/viewport-units' },
  { titulo: 'Josh W. Comeau — The Surprising Truth About Pixels and Accessibility', url: 'https://www.joshwcomeau.com/css/surprising-truth-about-pixels-and-accessibility/' },
]
</script>

<template>
  <GuideSection
    numero="02"
    titulo="Unidades CSS"
    pergunta="Uma pessoa com baixa visão aumenta o tamanho da fonte nas configurações do navegador. O texto definido em px continua do mesmo tamanho, e o definido em rem aumenta. Por que essa diferença acontece?"
    :fontes="fontes"
  >
    <p>
      Uma unidade <strong>absoluta</strong> tem sempre o mesmo tamanho (o <code>px</code> é a única
      que usamos na tela). Uma unidade <strong>relativa</strong> é calculada a partir de outra coisa:
      a fonte, o elemento pai ou a janela. Unidades relativas deixam o layout se adaptar sozinho.
    </p>

    <ul class="unidades">
      <li v-for="item in unidades" :key="item.u">
        <code class="u">{{ item.u }}</code>
        <span class="tipo">{{ item.tipo }} · {{ item.ref }}</span>
        <span>{{ item.uso }}</span>
      </li>
    </ul>

    <CodeBlock arquivo="unidades.css" :codigo="codigo" />

    <UnitLab />

    <template #resposta>
      <p>
        Quando a pessoa muda a fonte nas configurações, o navegador muda só uma coisa: o tamanho de
        fonte padrão da raiz da página, o elemento <code>&lt;html&gt;</code>. Ele passa de 16px para,
        por exemplo, 24px.
      </p>
      <p>
        <code>rem</code> significa "root em": 1rem é igual à fonte do <code>&lt;html&gt;</code>. Se a
        raiz cresce para 24px, <code>1.5rem</code> vira 36px automaticamente. Já <code>px</code> é um
        valor absoluto: <code>font-size: 16px</code> manda usar 16px, e o navegador obedece, ignorando
        a preferência da pessoa.
      </p>
      <p>
        O zoom (Ctrl +) é diferente: ele aumenta tudo, inclusive px. Mas muita gente com baixa visão
        usa a configuração de fonte, que só funciona se o site usar rem ou em. Por isso fontes e
        espaçamentos devem estar em rem, e o <code>&lt;html&gt;</code> não deve receber
        <code>font-size</code> em px. No laboratório, mexa em "fonte da raiz" e compare as duas
        frases de exemplo.
      </p>
    </template>
  </GuideSection>
</template>

<style scoped>
.unidades {
  list-style: none;
  padding: 0;
  display: grid;
  gap: var(--espaco-2);
}

.unidades li {
  display: grid;
  gap: var(--espaco-1);
  padding: var(--espaco-2) var(--espaco-3);
  border-left: 0.25rem solid var(--cor-cota);
  background: var(--cor-papel-escuro);
}

.u {
  font-size: var(--texto-m);
  color: var(--cor-cota);
  background: none;
  padding: 0;
}

.tipo {
  font-family: var(--fonte-mono);
  font-size: 0.8125rem;
  color: var(--cor-texto-suave);
}

@media (min-width: 36em) {
  .unidades li {
    grid-template-columns: 4rem 1fr;
  }

  .unidades li > :last-child {
    grid-column: 2;
  }
}
</style>
