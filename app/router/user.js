'use strict';

module.exports = app => {
  const { router, controller } = app;
  router.get('/index', controller.home.index);
  router.post('/user/test', controller.home.test);
  router.post('/user/login1', controller.home.login);
  router.post('/user/addUser', controller.home.addUser);

  router.post('/user/login', controller.user.login);

};

