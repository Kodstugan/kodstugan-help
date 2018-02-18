"use strict";

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
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
    }
  ]
});