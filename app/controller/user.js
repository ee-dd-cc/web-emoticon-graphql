'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  async index() {
    const list = await this.ctx.model.User.find({});
    this.ctx.body = list;
  }
  async web_demo() {
    const list = await this.ctx.model.Web.find({});
    this.ctx.body = list;
  }
  async addUser() {
    const user = new this.ctx.model.Web({
      username: '张三1111',
    });
    const res = await user.save();
    console.log('----res', res);
    this.ctx.body = '增加用户成功';
  }
}

module.exports = UserController;
