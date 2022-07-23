/*
 * @Author: EdisonGu
 * @Date: 2022-05-03 12:03:57
 * @LastEditors: EdisonGu
 * @LastEditTime: 2022-07-23 18:23:21
 * @Descripttion: 
 */
'use strict';

const Controller = require('egg').Controller
const { ctxBody, objectBody, adjacentBody, randomCount } = require('../utils/common')


class EmoticonController extends Controller {
  async getEmoticonList() {
    let list = null
    let total = 0
    let randomPageNo = 1
    try {
      console.log('getEmoticonList----this.ctx.query', this.ctx.query)
      let { pageNo = 1, pageSize = 20, random = '', needhot = '' } = this.ctx.query
      total = await this.ctx.model.Emoticon.count()
      if (total && random == '100') {
        pageNo = randomCount(Math.ceil(total / pageSize))
        randomPageNo = pageNo
      }
      list = await this.ctx.model.Emoticon.find().skip(pageSize * (pageNo - 1)).limit(+pageSize)
    } catch (error) {
      console.log('getEmoticonList---error', error)
    } finally {
      this.ctx.body = ctxBody({list, custom: { total, randomPageNo }})
    }
  }
  async getEmoticonDetail() {
    let adjacentInfo = {}
    try {
      let { id = 1000 } = this.ctx.query // 没有表情包默认返回第一张
      id = Number(id)
      const list = await this.ctx.model.Emoticon.find({ id })
      const upNode = await this.ctx.model.Emoticon.find({ // 升序
        id: { "$gt": id }
      }).sort({id: 1}).limit(1)
      const downNode = await this.ctx.model.Emoticon.find({ // 降序
        id: { "$lt": id }
      }).sort({id: -1}).limit(1)
      adjacentInfo = {
        selfNode: list[0],
        upNode: upNode[0],
        downNode: downNode[0]
      }
    } catch (error) {
      console.log('getEmoticonDetail---error', error)
    } finally {
      
      this.ctx.body = adjacentBody({item: adjacentInfo})
    }
  }
  async searchKeyword() {
    let list = null
    let emojiList = null
    let emoticonList = null
    let total = 0
    let bodyType = ''
    try {
      const { keyword = '', pageNo = 1, pageSize = 20, type = 'emoji' } = this.ctx.query
      if (!keyword) {
        return {
          code: 1,
          data: null,
          total: 0
        }
      }
      if (type === 'emoji') {
        total = await this.ctx.model.Emoji.find({imgDes: { $regex: keyword }}).count()
        list = await this.ctx.model.Emoji.find({imgDes: { $regex: keyword }}).skip(pageSize * (pageNo - 1)).limit(+pageSize)
      }
      if (type === 'emoticon') {
        total = await this.ctx.model.Emoticon.find({title: { $regex: keyword }}).count()
        list = await this.ctx.model.Emoticon.find({title: { $regex: keyword }}).skip(pageSize * (pageNo - 1)).limit(+pageSize)
      }
      if (type === 'all') {
        bodyType = type
        emojiList = await this.ctx.model.Emoji.find({imgDes: { $regex: keyword }}).skip(pageSize * (pageNo - 1)).limit(+pageSize)
        emoticonList = await this.ctx.model.Emoticon.find({title: { $regex: keyword }}).skip(pageSize * (pageNo - 1)).limit(+pageSize)
      }
    } catch (error) {
      console.log('searchEmoticon---error', error)
    } finally {
      this.ctx.body = bodyType === 'all' 
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
