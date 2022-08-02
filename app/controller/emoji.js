/*
 * @Author: EdisonGu
 * @Date: 2022-05-03 21:04:12
 * @LastEditors: EdisonGu
 * @LastEditTime: 2022-08-02 12:28:26
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
    const { app, ctx } = this
    const cacheTime = 24 * 3600
    const { id: qId = 1000, pageSize: qPageSize } = ctx.query
    let list = null
    id = id ? id : Number(qId)
    pageSize = pageSize ? pageSize : Number(qPageSize)
    try {
      const count = await ctx.model.Emoji.find().count()
      const rList = await app.redis.get(`emoji_hot_${id}`)
      if (rList && JSON.parse(rList).length === pageSize) {
        list = JSON.parse(rList)
      } else {
        list = await ctx.model.Emoji.aggregate([
          {
            $match: {
              id: { $gt: id + 100, $lt: id + 900  }
            }
          }
        ]).sample(pageSize)
        if (list && list.length) {
          app.redis.set(`emoji_hot_${id}`, JSON.stringify(list), 'EX', cacheTime)
        }
      }
    } catch (error) {
      console.log('---error', error)
    } finally {
      ctx.body = ctxBody({ list })
      return list
    }
  }

  
}

module.exports = EmojiController;
