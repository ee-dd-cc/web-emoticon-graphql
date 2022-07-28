/*
 * @Author: EdisonGu
 * @Date: 2022-05-03 21:04:12
 * @LastEditors: EdisonGu
 * @LastEditTime: 2022-07-28 23:38:00
 * @Descripttion: 
 */
'use strict';

const Controller = require('egg').Controller;
const { ctxBody, objectBody, adjacentBody, randomCount } = require('../utils/common')

class EmojiController extends Controller {
  first = true
  /**
   * 获取表情包详情
   */
  async getEmojiDetail() {
    let adjacentInfo = {}
    let hot = null
    try {
      let { id = 1000 } = this.ctx.query
      id = Number(id)
      const list = await this.ctx.model.Emoji.find({ id })
      const upNode = await this.ctx.model.Emoji.find({
        id: { "$gt": id }
      }).sort({id: 1}).limit(1)
      const downNode = await this.ctx.model.Emoji.find({
        id: { "$lt": id }
      }).sort({id: -1}).limit(1)
      
      hot = await this.ctx.model.Emoji.find().skip(4 * 16).limit(16)
      adjacentInfo = {
        selfNode: list[0],
        upNode: upNode.length ? upNode[0] : null,
        downNode: downNode.length ? downNode[0] : null
      }
    } catch (error) {
      console.log('getEmojiDetail---error', error)
    } finally {
      this.ctx.body = adjacentBody({ item: adjacentInfo, custom: { hot } })
    }
  }
  /**
   * 获取首页热门表情
   */
  async getHotEmoji() {
    let list = null
    let count = 0
    try {
      count = await this.ctx.model.Emoji.find().count()
      // 随机取大于1000id的5条数据
      list = await this.ctx.model.Emoji.aggregate([
        {'$match': {id: {$gt: 1000, $lt: 1050}}}
      ]).sample(5)
      console.log('----first', this.first)
    } catch (error) {
      console.log('---error', error)
    } finally {
      this.ctx.body = ctxBody({ list })
    }
  }
}

module.exports = EmojiController;
