/*
 * @Author: EdisonGu
 * @Date: 2022-05-03 21:04:12
 * @LastEditors: EdisonGu
 * @LastEditTime: 2022-07-29 23:09:31
 * @Descripttion: 
 */
'use strict';

const Controller = require('egg').Controller;
const { ctxBody, objectBody, adjacentBody, randomListById } = require('../utils/common')

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
      
      hot = await this.getHotEmoji({ id })
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
  async getHotEmoji({id, pageSize = 20}) {
    let list = null
    const { id: qId = 1000, pageSize: qPageSize } = this.ctx.query
    try {
      const count = await this.ctx.model.Emoji.find().count()
      const orList = randomListById({
        id: id || +qId,
        pageSize: pageSize || qPageSize,
        maxId: count + 1000 - 1,
        isUp: false
      })
      list = await this.ctx.model.Emoji.find({
        $or: orList
      })
    } catch (error) {
      console.log('---error', error)
    } finally {
      this.ctx.body = ctxBody({ list })
      return list
    }
  }

  
}

module.exports = EmojiController;
