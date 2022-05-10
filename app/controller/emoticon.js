'use strict';

const Controller = require('egg').Controller;

class EmoticonController extends Controller {
  async getEmoticonList() {
    console.log('----this.ctx', this.ctx.query)
    const list = await this.ctx.model.Emoticon.find(this.ctx.query).limit(12);
    if(list && list.length) {
      // list.forEach(item => {
      //   console.log('----typeof item.imgList', typeof item.imgList)
      //   if(typeof item.imgList == 'string') {
      //     item.imgList = JSON.parse(item.imgList)
      //   }
      // })
      this.ctx.body = {
        code: 1,
        data: list
      }
    }
  }
  async getEmoticonDetail() {
    const { id = '' } = this.ctx.query
    // console.log('----id', id)
    const list = await this.ctx.model.Emoticon.find({
      _id: `${id}`
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
}

module.exports = EmoticonController;
