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
      path: '/login',
      components: {
        left_column: login_v,
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
      },
      beforeEnter: (to, from, next) => {
        if (isLoggedIn()) {
          next();
        } else {
          next('/login');
        }
      }
    },
    {
      path: '/privacy',
      components: {
        left_column: null,
        right_column: null,
        full_column: null,
      }
    },
    {
      path: '/profile',
      components: {
        left_column: profile_v,
        right_column: null,
        full_column: null,
      },
      beforeEnter: (to, from, next) => {
        if (isLoggedIn()) {
          next();
        } else {
          next('/login');
        }
      }
    },
    {
      path: '/question/:id',
      name: 'question',
      components: {
        left_column: null,
        right_column: null,
        full_column: null,
      },
      beforeEnter: (to, from, next) => {
        if (isLoggedIn()) {
          next();
        } else {
          next('/login');
        }
      }
    }
  ]
});

function isLoggedIn() {
  FB.getLoginStatus(function (response) {
    console.log(response.status);
    return response.status === 'connected';
  });
}