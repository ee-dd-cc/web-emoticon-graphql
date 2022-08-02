/*
 * @Author: EdisonGu
 * @Date: 2022-05-03 12:03:57
 * @LastEditors: EdisonGu
 * @LastEditTime: 2022-08-02 18:40:06
 * @Descripttion: 
 */
'use strict';

const { Controller } = require('egg')
const { ctxBody, objectBody, adjacentBody, randomCount } = require('../utils/common')


class EmoticonController extends Controller {
  async getEmoticonList() {
    const { ctx, ctx: { query, service, model: { Emoticon } } } = this
    let list = null
    let total = 0
    let randomPageNo = 1
    try {
      let { pageNo = 1, pageSize = 20, random = '', hot = null } = query
      total = await service.emoticon.getEmoticonTotal()
      if (total && random == '100') {
        pageNo = randomCount(Math.ceil(total / pageSize))
        randomPageNo = pageNo
      }
      const findQuery = hot ? { hot: +hot } : {}
      list = await service.emoticon.getEmoticonList({findQuery, params: { pageNo, pageSize }})
    } catch (error) {
    } finally {
      ctx.body = ctxBody({list, custom: { total, randomPageNo }})
      return list
    }
  }
  async getEmoticonDetail() {
    const { ctx } = this
    let adjacentInfo = {}
    try {
      let { id = 1000 } = ctx.query // 没有表情包默认返回第一张
      id = Number(id)
      const detail = await this.service.emoticon.getEmoticonDetail({id})
      const upNode = await ctx.model.Emoticon.find({ // 升序
        id: { "$gt": id }
      }).sort({id: 1}).limit(1)
      const downNode = await ctx.model.Emoticon.find({ // 降序
        id: { "$lt": id }
      }).sort({id: -1}).limit(1)
      adjacentInfo = {
        selfNode: detail,
        upNode: upNode[0],
        downNode: downNode[0]
      }
    } catch (error) {
      console.log('getEmoticonDetail---error', error)
    } finally {
      ctx.body = adjacentBody({item: adjacentInfo})
    }
  }
  async searchKeyword() {
    const { ctx } = this
    let list = null
    let emojiList = null
    let emoticonList = null
    let total = 0
    let bodyType = ''
    try {
      const { keyword = '', pageNo = 1, pageSize = 20, type = 'emoji' } = ctx.query
      if (!keyword) {
        return {
          code: 1,
          data: null,
          total: 0
        }
      }
      if (type === 'emoji') {
        total = await ctx.model.Emoji.find({imgDes: { $regex: keyword }}).count()
        list = await ctx.model.Emoji.find({imgDes: { $regex: keyword }}).skip(pageSize * (pageNo - 1)).limit(+pageSize)
      }
      if (type === 'emoticon') {
        total = await ctx.model.Emoticon.find({title: { $regex: keyword }}).count()
        list = await ctx.model.Emoticon.find({title: { $regex: keyword }}).skip(pageSize * (pageNo - 1)).limit(+pageSize)
      }
      if (type === 'all') {
        bodyType = type
        emojiList = await ctx.model.Emoji.find({imgDes: { $regex: keyword }}).skip(pageSize * (pageNo - 1)).limit(+pageSize)
        emoticonList = await ctx.model.Emoticon.find({title: { $regex: keyword }}).skip(pageSize * (pageNo - 1)).limit(+pageSize)
      }
    } catch (error) {
      console.log('searchEmoticon---error', error)
    } finally {
      ctx.body = bodyType === 'all' 
      ? {
          code: emojiList && emoticonList ? 1 : -1,
          data: emojiList && emoticonList ? {
            emoji: emojiList,
            emoticon: emoticonList
          } : null
        }
      : ctxBody({list, custom: { total }})
    }
  }
  
}

module.exports = EmoticonController;
