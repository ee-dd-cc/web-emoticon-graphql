'use strict';

const Controller = require('egg').Controller;

class EmojiController extends Controller {
  async getEmojiDetail() {
    const { id = '' } = this.ctx.query
    // console.log('----id', id)
    const list = await this.ctx.model.Emoji.find({
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

module.exports = EmojiController;
