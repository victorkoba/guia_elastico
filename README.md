# Guia Elástico

Guia interativo de responsividade feito em Vue 3. Cada seção tem uma explicação curta, código
comentado, a resposta da pergunta-guia, as fontes consultadas e pelo menos um laboratório.

**Site publicado:** _(colar aqui o link da Vercel/Netlify)_

## Seções e laboratórios

| Rota | Seção | Laboratório |
|------|-------|-------------|
| `#/por-que` | 01 · Por que responsividade importa | Celular com e sem meta viewport |
| `#/unidades` | 02 · Unidades CSS | Conversor de unidades (o próprio navegador converte) |
| `#/flex-grid` | 03 · Flexbox e Grid | Controle de largura: grid auto-fit × flex |
| `#/imagens` | 04 · Imagens responsivas | Imagem que empurra o texto; galeria com a API dog.ceo |
| `#/boas-praticas` | 05 · Boas práticas Vue | v-for com e sem `:key` |
| `#/desafio` | Desafio | — |

Em todas as páginas: selo fixo no canto com a largura da janela e o breakpoint ativo (estado no Pinia).

## Tecnologias

- Vue 3 + Vite (criado com `npm create vue@latest`)
- Vue Router: uma rota por seção, todas com carregamento sob demanda (`import()`)
- Pinia: `src/stores/viewport.js` guarda largura, altura e breakpoint
- Consumo de API: `src/components/labs/DogGalleryLab.vue` busca fotos em https://dog.ceo

## Regras de CSS seguidas

- Mobile-first: o CSS fora de media query é o do celular; media queries só com `min-width`
  (em `em`: 36em, 48em, 64em).
- Fontes e espaçamentos em `rem`; cores e espaçamentos como variáveis em `:root`
  (`src/assets/main.css`).
- Sem rolagem horizontal: imagens com `max-width: 100%`, blocos de código quebram linha.
- No celular o menu vira um botão (`src/App.vue`).
- Exceção consciente: o laboratório da seção 01 usa px fixos para simular um celular em escala.

## Rodar localmente

Requer Node `^22.18` ou `>=24.12`.

```sh
npm install
npm run dev      # servidor de desenvolvimento
npm run build    # gera a pasta dist/
```

## Publicar

O roteador usa hash (`/#/rota`), então funciona em qualquer hospedagem estática sem configurar
redirecionamentos.

- **Vercel / Netlify:** importar o repositório do GitHub. Build: `npm run build`. Pasta: `dist`.
- **GitHub Pages:** em `vite.config.js`, adicionar `base: '/guia_elastico/'` e publicar a
  pasta `dist`.

## Dupla

- Victor Luiz Koba Batista
- Rodrigo Santos Graça
