'use strict';
const Service = require('egg').Service;
const arrayToTree = require('array-to-tree');

class MenuService extends Service {

  // 登录用户
  async logUser (tel, pwd) {
    // 查询用户
    // console.log(tel, pwd);
    const user = await this.app.mysql.get('user', { tel });
    if (!user) {
      return null;
    }
    if (pwd !== user.pwd) {
      return 'errPwd';
    }

    let formateMenus; // 格式化后的menu

    if (user.menus) {
      const menusArr = user.menus.split(',');

      const meuns = await this.app.mysql.select('menus', {
        where: { id: menusArr }, // WHERE 条件
      });

      formateMenus = await arrayToTree(meuns, {
        parentProperty: 'pid',
        customID: 'id',
      });

    }

    delete user.menus;

    return { user, meuns: formateMenus || [] };
  }

  // 处理菜单信息
  async userInfo (munuIds) {
    const user = await this.app.mysql.get('user', { id: munuIds });
    if (!user) {
      return null;
    }

    let formateMenus; // 格式化后的menu

    if (user.menus) {
      const menusArr = user.menus.split(',');

      const meuns = await this.app.mysql.select('menus', {
        where: { id: menusArr }, // WHERE 条件
      });
      // const meuns = await this.app.mysql.query(`select * from menus where id in (${user.menus})`);

      formateMenus = await arrayToTree(meuns, {
        parentProperty: 'pid',
        customID: 'id',
      });

    }

    delete user.menus;

    return { user, meuns: formateMenus || [] };
  }
}

module.exports = MenuService;
