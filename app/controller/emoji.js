/*
 * @Author: EdisonGu
 * @Date: 2022-05-03 21:04:12
 * @LastEditors: EdisonGu
 * @LastEditTime: 2022-07-03 23:28:23
 * @Descripttion: 
 */
'use strict';

const Controller = require('egg').Controller;
const { ctxBody, objectBody, adjacentBody, randomCount } = require('../utils/common')

class EmojiController extends Controller {
  async getEmojiDetail() {
    let adjacentInfo = {}
    let hot = null
    try {
      let { id = 1000 } = this.ctx.query
      id = Number(id)
      const list = await this.ctx.model.Emoji.find({ id })
      const preNode = await this.ctx.model.Emoji.find({
        id: { "$lt": id }
      }).sort({id: -1}).limit(1)
      const nextNode = await this.ctx.model.Emoji.find({
        id: { "$gt": id }
      }).sort({id: 1}).limit(1)
      hot = await this.ctx.model.Emoji.find().skip(4 * 16).limit(16)
      console.log('----hot', hot.length)
      // console.log('----hot', hot.length)
      // console.log('----list', list.length)
      console.log('----preNode', preNode.length)
      console.log('----nextNode', nextNode.length)
      adjacentInfo = {
        selfNode: list[0],
        preNode: preNode.length ? preNode[0] : null,
        nextNode: nextNode.length ? nextNode[0] : null
      }
    } catch (error) {
      console.log('getEmojiDetail---error', error)
    } finally {
      this.ctx.body = adjacentBody({ item: adjacentInfo, custom: { hot } })
    }
  }
}

module.exports = EmojiController;
