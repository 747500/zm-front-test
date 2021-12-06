import { createWebHistory, createRouter } from 'vue-router';
import Home from './Home.vue';
import LkPage from './components/lk/Page.vue';
import LkDeliveryPage from './components/lk/Delivery/Page.vue';
import LkProfilePage from './components/lk/Profile/Page.vue';
import LkExtAuthPage from './components/lk/ExtAuth/Page.vue';
import LkPasswordPage from './components/lk/Password/Page.vue';
import LkNotifyPage from './components/lk/Notify/Page.vue';

import PasswordRecovery from './PasswordRecovery.vue';
import Page404 from './404.vue';

const routes = [
  {
    path: '/',
    name: "Home",
    component: Home,
    children: [
      {
        path: '/lk',
        name: "Личный кабинет",
        component: LkPage,
        children: [
          {
            path: 'profile',
            name: 'Профайл',
            component: LkProfilePage,
          },
          {
            path: 'password',
            name: 'Пароль',
            component: LkPasswordPage,
          },
          {
            path: 'social',
            name: 'Соц. сети',
            component: LkExtAuthPage,
          },
          {
            path: 'delivery',
            name: "Адреса для доставки",
            component: LkDeliveryPage,
          },
          {
            path: 'notify',
            name: 'Уведомления',
            component: LkNotifyPage,
          }
        ]
      },
    ]
  },
  {
    path: "/passwordRecovery",
    name: "Password Recovery",
    component: PasswordRecovery,
  },
  {
    path: "/:catchAll(.*)",
    component: Page404,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
