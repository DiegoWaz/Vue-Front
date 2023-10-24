import HomePage from '../pages/front/home.vue';
import AdminPage from '../pages/back/admin.vue';
import AboutPage from '../pages/about.vue';
import NewsPage from '../pages/front/article.vue';
import Articles from '../pages/front/articles.vue';
import Category from '../pages/front/category.vue';
import PlayerPage from '../pages/front/player.vue';
import CreateNews from '../pages/back/createArticle.vue';
import UploadImage from '../pages/back/UploadImage.vue';
import ImportImage from '../pages/back/import.vue';
import NotFoundPage from '../pages/404.vue';
import store from '../../store/index';

const ifNotAuthenticated = (to, from, next) => {
  if (!store.getters["account/isAuthenticated"]) {
    next()
    return
  }
  window.location.url = "/"
}

const ifAuthenticated = (to, from, next) => {
  if (store.getters["account/isAuthenticated"]) {
    next()
    return
  }
  window.location.url = "/"
}

const ifAdmin = (to, from, next) => {
  if (store.getters["account/isAdmin"]) {
    next()
    return
  }
  window.location.url = "/"
}

var routes = [
  {
    path: '/',
    component: HomePage,
  },
  {
    path: '/admin',
    component: AdminPage,
    beforeEnter: ifAdmin,
  },
  {
    path: '/about/',
    component: AboutPage,
  },
  {
    path: '/players/:id',
    component: PlayerPage,
  },
  {
    path: '/articles',
    component: Articles,
    options: {
      transition: 'f7-circle',
    },
    master: true,
    detailRoutes: [
      {
        /* We need to specify detail route path from root */
        path: '/article-:id-:slug',
        component: NewsPage,
      },
      {
        path: '/category-:id-:slug',
        component: Category
      },
    ],
  },
  {
    path: '/create/news',
    component: CreateNews,
    beforeEnter: ifAuthenticated,
  },
  {
    path: '/upload/image',
    component: UploadImage,
    beforeEnter: ifAuthenticated,
  },
  {
    path: '/import',
    component: ImportImage,
    beforeEnter: ifAuthenticated,
  },
  {
    path: '(.*)',
    component: NotFoundPage,
  },
];

export default routes;
