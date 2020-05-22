'use strict';

const Controller = require('../core/base_controller');

class UserController extends Controller {
  async login () {
    const { ctx } = this;
    const { tel, pwd } = ctx.request.body;

    // 校验参数格式
    const errors = await this.app.validator.validate({
      tel: { type: 'string', required: true },
      pwd: { type: 'string', required: true },
    }, ctx.request.body);

    // 抛出错误异常提示
    if (errors) {
      const [{ field, message }] = errors;
      this.error(`${field}: ${message}`);
      return;
    }

    const logUserInfo = await this.service.logIn.logUser(tel, pwd);
    if (!logUserInfo) {
      this.error('用户不存在！');
    } else if (logUserInfo === 'errPwd') {
      this.error('密码错误！');
    } else {
      // 设置登录 session
      this.ctx.session.userId = logUserInfo.user.id;
      this.success(logUserInfo);
    }
  }
}

module.exports = UserController;
