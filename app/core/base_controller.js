'use strict';

const Controller = require('egg').Controller;

class Base_controllerController extends Controller {
  get user () {
    return this.ctx.session.user;
  }

  sessionHasOut (cb) {
    if (!this.user) {
      this.error('登录失效');
    } else {
      cb();
    }
  }

  success (data) {
    this.ctx.body = {
      code: 0,
      data,
    };
  }

  error (msg) {
    this.ctx.body = {
      code: 1,
      msg: msg || '失败',
    };
  }

  notFound (msg) {
    msg = msg || 'not found';
    this.ctx.throw(404, msg);
  }
}

module.exports = Base_controllerController;
