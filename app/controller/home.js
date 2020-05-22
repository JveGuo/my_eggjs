'use strict';

// const Controller = require('egg').Controller;
const Controller = require('../core/base_controller');

class HomeController extends Controller {

  async index () {
    const { ctx } = this;
    ctx.body = 'hi, egg';
    // this.notFound();
  }

  async test () {

    const { ctx } = this;


    this.sessionHasOut(
      () => {
        const errors = this.app.validator.validate({ name: { type: 'string', required: true } }, ctx.request.body);

        if (errors) {
          const [{ field, message }] = errors;
          this.error(`${field} -- ${message}`);
          return;
        }
        this.success(`接受的id:${ctx.request.body.id}， 接受的name: ${ctx.request.body.name}`);
      }
    );
  }

  async login () {
    const { ctx } = this;
    const { id } = ctx.request.body;

    // service
    const userInfo = await ctx.service.logIn.userInfo(id);
    if (userInfo) {
      this.success(userInfo);
    } else {
      this.error('该用户不存在！');
    }
  }

  async addUser () {
    const { ctx } = this;
    const errors = this.app.validator.validate({ name: { type: 'string', required: true } }, ctx.request.body);
    if (errors) {
      const [{ field, message }] = errors;
      this.error(`${field} -- ${message}`);
      return;
    }

    try {
      const result = await this.app.mysql.insert('user', { name: ctx.request.body.name });
      if (result.affectedRows === 1) {
        this.success('添加成功：' + ctx.request.body.name);
      }
    } catch (error) {
      console.log(error);
      this.error();
    }
  }

}

module.exports = HomeController;
