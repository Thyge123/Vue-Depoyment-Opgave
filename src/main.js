import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

import App from './App.vue';
import TeamsList from './components/teams/TeamsList.vue';
import UsersList from './components/users/UsersList.vue';
import TeamMembers from './components/teams/TeamMembers.vue';
import NotFound from './components/nav/NotFound.vue';
import TeamsFooter from './components/teams/TeamsFooter.vue';
import UsersFooter from './components/users/UsersFooter.vue';
import ProjectList from './components/projects/ProjectList.vue';
import ProjectsFooter from './components/projects/ProjectsFooter.vue';
import ProjectMembers from './components/projects/ProjectMembers.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/teams' },
    {
      name: 'teams',
      path: '/teams',
      components: { default: TeamsList, footer: TeamsFooter },
      children: [
        {
          name: 'team-members',
          path: ':teamId',
          component: TeamMembers,
          props: true,
        }, // /teams/t1
      ],
    }, // our-domain.com/teams => TeamsList
    {
      path: '/users',
      components: {
        default: UsersList,
        footer: UsersFooter,
      },
    },
    {
      name: 'projects',
      path: '/projects',
      components: {
        default: ProjectList,
        footer: ProjectsFooter,
      },
      children: [
        {
          name: 'project-members',
          path: ':projectId',
          component: ProjectMembers,
          props: true,
        },
      ],
    },
    { path: '/:notFound(.*)', component: NotFound },
  ],
  linkActiveClass: 'active',
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return { left: 0, top: 0 };
  },
});

const app = createApp(App);

app.use(router);

app.mount('#app');
