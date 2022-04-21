'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  async getEmoticonList() {
    console.log('----this.ctx', this.ctx.query)
    const list = await this.ctx.model.Emoticon.find(this.ctx.query).limit(10);
    this.ctx.body = list
  }
  // async index() {
  //   const list = await this.ctx.model.User.find({});
  //   this.ctx.body = list;
  // }
  // async web_demo() {
  //   const list = await this.ctx.model.Web.find({});
  //   this.ctx.body = list;
  // }
  // async addUser() {
  //   const user = new this.ctx.model.Web({
  //     username: '123',
  //     sex: '男'
  //   });
  //   const res = await user.save();
  //   console.log('----res', res);
  //   this.ctx.body = '增加用户成功';
  // }
}

module.exports = UserController;
