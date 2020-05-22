/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1585722702552_4272';

  // add your middleware config here
  // eslint-disable-next-line array-bracket-spacing
  config.middleware = ['loginAuth'];
  config.loginAuth = {
    // eslint-disable-next-line array-bracket-spacing
    whiteUrls: ['/index'], // 是使用url的前缀匹配的
    // 不需要登录的页面，白名单URL

    // 也可以使用
    // eslint-disable-next-line array-bracket-spacing
    ignore: ['/user/login', '/'],

    // 使用 match是限制只在这几个页面执行
    // match和ignore不能同时使用
  };

  config.security = {
    csrf: {
      enable: false,
    },
    // eslint-disable-next-line array-bracket-spacing
    domainWhiteList: ['*'],
  };

  config.cors = {
    enable: true,
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  };

  config.session = {
    key: 'EGG_SESS', // eggjs默认session的key
    maxAge: 24 * 3600 * 1000, // 1 day
    httpOnly: true,
    encrypt: true,
    renew: true, // 每次访问页面都会给session会话延长时间
  };


  config.mysql = {
    // 单数据库信息配置
    client: {
      // host
      host: 'localhost',
      // 端口号
      port: '3306',
      // 用户名
      user: 'xxx',
      // 密码
      password: 'xxx',
      // 数据库名
      database: 'test',
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  };

  config.validate = {
    // convert: false,
    // validateRoot: false,
  };


  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
