import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

// Cada seção vira uma rota e um item do menu. Para criar uma nova seção, basta adicionar um item aqui.
// O import() faz cada página ser baixada só quando alguém a visita (carregamento sob demanda).
export const secoes = [
  { path: '/por-que', numero: '01', titulo: 'Por que importa', component: () => import('../views/PorQueView.vue') },
  { path: '/unidades', numero: '02', titulo: 'Unidades CSS', component: () => import('../views/UnidadesView.vue') },
  { path: '/flex-grid', numero: '03', titulo: 'Flexbox e Grid', component: () => import('../views/FlexGridView.vue') },
  { path: '/imagens', numero: '04', titulo: 'Imagens', component: () => import('../views/ImagensView.vue') },
  { path: '/boas-praticas', numero: '05', titulo: 'Boas práticas Vue', component: () => import('../views/BoasPraticasView.vue') },
  { path: '/desafio', numero: '??', titulo: 'Desafio', component: () => import('../views/DesafioView.vue') },
]

const router = createRouter({
  // Hash (#/rota) funciona em Vercel, Netlify e GitHub Pages sem configurar redirecionamento.
  history: createWebHashHistory(),
  routes: [
    { path: '/', component: HomeView, meta: { titulo: 'Início' } },
    ...secoes.map(({ path, component, ...meta }) => ({ path, component, meta })),
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
  scrollBehavior: () => ({ top: 0 }),
})

router.afterEach((to) => {
  document.title = `${to.meta.titulo} · Guia Elástico`
})

export default router
