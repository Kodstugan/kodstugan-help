"use strict";

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      components: {
        left_column: about_v,
        right_column: question_list_v,
        full_column: null,
      }
    },
    {
      path: '/register',
      components: {
        left_column: null,
        right_column: null,
        full_column: null,
      }
    },
    {
      path: '/new',
      components: {
        left_column: null,
        right_column: null,
        full_column: null,
      }
    },
    {
      path: '/question/:id',
      name: 'question',
      components: {
        left_column: null,
        right_column: null,
        full_column: null,
      }
    }
  ]
});