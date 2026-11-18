<script setup>
import GuideSection from '../components/GuideSection.vue'
import CodeBlock from '../components/CodeBlock.vue'
import ImageShiftLab from '../components/labs/ImageShiftLab.vue'
import DogGalleryLab from '../components/labs/DogGalleryLab.vue'

const codigoHtml = `
<!-- width e height: o tamanho original da imagem.
     Com eles, o navegador sabe a proporção (800/450) e reserva o espaço antes de baixar. -->
<!-- loading="lazy": só baixa quando a imagem estiver perto de aparecer na tela. -->
<img
  src="planta-800.jpg"
  srcset="planta-400.jpg 400w, planta-800.jpg 800w, planta-1600.jpg 1600w"
  sizes="(min-width: 64em) 50vw, 100vw"
  width="800"
  height="450"
  loading="lazy"
  alt="Planta baixa de uma casa"
>
<!-- srcset + sizes: o navegador escolhe o arquivo certo para a tela.
     Celular baixa o de 400px, monitor grande o de 1600px. -->`

const codigoCss = `
img {
  max-width: 100%; /* nunca mais larga que o pai: sem vazar da tela */
  height: auto;    /* a altura acompanha a largura e mantém a proporção */
}

.avatar {
  width: 6rem;
  aspect-ratio: 1 / 1; /* moldura sempre quadrada */
  object-fit: cover;   /* a foto preenche a moldura e corta as sobras, sem deformar */
}`

const fontes = [
  { titulo: 'MDN — Imagens responsivas', url: 'https://developer.mozilla.org/pt-BR/docs/Web/HTML/Responsive_images' },
  { titulo: 'web.dev — Cumulative Layout Shift (CLS)', url: 'https://web.dev/articles/cls' },
  { titulo: 'web.dev — Optimize Cumulative Layout Shift', url: 'https://web.dev/articles/optimize-cls' },
  { titulo: 'web.dev — Browser-level image lazy loading', url: 'https://web.dev/articles/browser-level-image-lazy-loading' },
  { titulo: 'MDN — object-fit', url: 'https://developer.mozilla.org/pt-BR/docs/Web/CSS/object-fit' },
  { titulo: 'API usada no laboratório: dog.ceo', url: 'https://dog.ceo/dog-api/' },
]
</script>

<template>
  <GuideSection
    numero="04"
    titulo="Imagens responsivas"
    pergunta="Ao abrir uma página, o texto aparece primeiro. Quando a imagem termina de carregar, ela empurra o texto para baixo. Por que isso acontece quando a imagem não tem width e height no HTML? Qual métrica do Google mede esse problema?"
    :fontes="fontes"
  >
    <p>Imagem é o que mais costuma "quebrar" um layout no celular. O kit básico:</p>
    <ul>
      <li><code>max-width: 100%</code> + <code>height: auto</code>: a imagem encolhe com a tela e não deforma.</li>
      <li><code>width</code> e <code>height</code> no HTML: reservam o espaço certo antes do download.</li>
      <li>
        <code>loading="lazy"</code>: adia imagens que estão longe da tela. <strong>Não use</strong> na
        imagem principal do topo (a primeira coisa que aparece): ela ficaria atrasada e pioraria o LCP.
      </li>
      <li><code>aspect-ratio</code>: fixa a proporção de uma moldura, como 1/1 ou 16/9.</li>
      <li><code>object-fit</code>: decide como a foto preenche essa moldura (cortando ou encaixando).</li>
      <li><code>srcset</code> e <code>sizes</code>: oferecem vários arquivos para o navegador escolher o menor que serve.</li>
    </ul>

    <CodeBlock arquivo="pagina.html" :codigo="codigoHtml" />
    <CodeBlock arquivo="imagens.css" :codigo="codigoCss" />

    <ImageShiftLab />
    <DogGalleryLab />

    <template #resposta>
      <p>
        O navegador monta a página assim que recebe o HTML, antes de baixar as imagens. Se o
        <code>&lt;img&gt;</code> não diz o seu tamanho, o navegador não tem como saber a altura dela e
        reserva <strong>zero</strong> de espaço. O texto é desenhado logo abaixo. Quando o arquivo
        chega, o navegador descobre que a imagem tem, por exemplo, 450px de altura, refaz o layout, e
        tudo o que estava embaixo é empurrado.
      </p>
      <p>
        Com <code>width="800" height="450"</code>, o navegador calcula a proporção (800/450) e, mesmo
        com <code>width: 100%; height: auto</code> no CSS, já reserva a altura certa para a largura da
        tela. Quando a imagem chega, ela ocupa um espaço que já era dela e nada se move.
      </p>
      <p>
        A métrica do Google que mede isso é o <strong>CLS (Cumulative Layout Shift)</strong>, uma das
        Core Web Vitals. Ela soma o quanto os elementos visíveis "pulam" sem a pessoa ter feito nada.
        Bom é <strong>até 0,1</strong>. No primeiro laboratório, compare quantos px o texto se move com
        e sem as dimensões.
      </p>
    </template>
  </GuideSection>
</template>
