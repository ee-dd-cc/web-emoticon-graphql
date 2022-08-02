/*
 * @Author: EdisonGu
 * @Date: 2022-05-03 21:04:12
 * @LastEditors: EdisonGu
 * @LastEditTime: 2022-08-02 13:25:05
 * @Descripttion: 
 */
'use strict';

const Controller = require('egg').Controller;
const { ctxBody, objectBody, adjacentBody, minCount, maxCount } = require('../utils/common')

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
    let count = null
    id = id ? id : Number(qId)
    pageSize = pageSize ? pageSize : Number(qPageSize)
    try {
      const rCount = await app.redis.get(`emoji_count`)
      const rList = await app.redis.get(`emoji_hot_${id}`)
      if (rList && rCount && JSON.parse(rList).length === pageSize) {
        count = rCount
        list = JSON.parse(rList)
      } else {
        count = await ctx.model.Emoji.find().count()
        list = await ctx.model.Emoji.aggregate([
          {
            $match: {
              id: { $gt: minCount({id, pageSize, total: count}), $lt: maxCount({id, pageSize, total: count})  }
            }
          }
        ]).sample(pageSize)
        if (list && list.length) {
          app.redis.set(`emoji_hot_${id}`, JSON.stringify(list), 'EX', cacheTime)
          app.redis.set(`emoji_count`, count, 'EX', cacheTime)
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
