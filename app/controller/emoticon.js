'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  async getEmoticonList() {
    console.log('----this.ctx', this.ctx.query)
    const list = await this.ctx.model.Emoticon.find(this.ctx.query).limit(12);
    if(list && list.length) {
      this.ctx.body = {
        code: 1,
        data: list
      }
    }
  }
  async getEmoticonDetail() {
    const { id = '' } = this.ctx.query
    const list = await this.ctx.model.Emoticon.find({
      _id: id
    });
    if(list && list.length) {
      this.ctx.body = {
        code: 1,
        data: list[0]
      }
    } else {
      this.ctx.body = {
        code: -1,
        data: null
      }
    }
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
