"use strict";

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      components: {
        menu: menu_v,
        left_column: about_v,
        right_column: question_list_v,
        full_column: null,
      }
    },
    {
      path: '/new',
      components: {
        menu: menu_v,
        left_column: new_v,
        right_column: question_list_v,
        full_column: null,
      }
    },
    {
      path: '/privacy',
      components: {
        menu: menu_v,
        left_column: null,
        right_column: null,
        full_column: null,
      }
    },
    {
      path: '/question/:id',
      name: 'question',
      components: {
        menu: menu_v,
        left_column: null,
        right_column: null,
        full_column: null,
      }
    },
    {
      path: '/me',
      components: {
        menu: menu_v,
        left_column: me_v,
        right_column: question_list_v,
        full_column: null,
      }
    }
  ]
});