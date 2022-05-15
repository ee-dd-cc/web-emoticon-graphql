'use strict';

const Controller = require('egg').Controller;
const { ctxBody, objectBody, adjacentBody, randomCount } = require('../utils/common')

class EmojiController extends Controller {
  async getEmojiDetail() {
    let adjacentInfo = {}
    let hot = null
    try {
      const { id = '' } = this.ctx.query
      const list = await this.ctx.model.Emoji.find({
        _id: id
      })
      const preNode = await this.ctx.model.Emoji.find({
        _id: { "$lt": id }
      }).sort({"_id": -1}).limit(1)
      const nextNode = await this.ctx.model.Emoji.find({
        _id: { "$gt": id }
      }).sort({"_id": 1}).limit(1)
      hot = await this.ctx.model.Emoji.find().skip(15 * 18).limit(16)
      console.log('----hot', hot.length)
      adjacentInfo = {
        selfNode: list[0],
        preNode: preNode[0],
        nextNode: nextNode[0]
      }
    } catch (error) {
      console.log('getEmojiDetail---error', error)
    } finally {
      this.ctx.body = adjacentBody({ item: adjacentInfo, custom: { hot } })
    }
  }
}

module.exports = EmojiController;
