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
      let { pageSize = 10, pageNo = 1, random = '' } = this.ctx.query
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
      const { id = '' } = this.ctx.query
      const list = await this.ctx.model.Emoticon.find({
        _id: id
      })
      const preNode = await this.ctx.model.Emoticon.find({
        _id: { "$lt": id }
      }).sort({"_id": -1}).limit(1)
      const nextNode = await this.ctx.model.Emoticon.find({
        _id: { "$gt": id }
      }).sort({"_id": 1}).limit(1)
      adjacentInfo = {
        selfNode: list[0],
        preNode: preNode[0],
        nextNode: nextNode[0]
      }
    } catch (error) {
      console.log('getEmoticonDetail---error', error)
    } finally {
      this.ctx.body = adjacentBody(adjacentInfo)
    }
  }
  async searchKeyword() {
    let emoticonList = null
    let emojiList = null
    let emoticonTotal = 0
    let emojiTotal = 0
    try {
      const { keyword = '', pageNo = 1, pageSize = 15 } = this.ctx.query
      emoticonTotal = await this.ctx.model.Emoticon
        .find({
          title: { $regex: keyword }
        })
        .count()
      emojiTotal = await this.ctx.model.Emoji
        .find({
          imgTitle: { $regex: keyword }
        })
        .count()
      emoticonList = await this.ctx.model.Emoticon
        .find({
          title: { $regex: keyword }
        })
        .skip(pageSize * (pageNo - 1))
        .limit(+pageSize)
      emojiList = await this.ctx.model.Emoji
        .find({
          imgTitle: { $regex: keyword }
        })
        .skip(pageSize * (pageNo - 1))
        .limit(+pageSize)
      console.log('----emoticonTotal', emoticonTotal)
      console.log('----emojiTotal', emojiTotal)
    } catch (error) {
      console.log('searchEmoticon---error', error)
    } finally {
      this.ctx.body = objectBody({
        obj: {
          emoticon: {
            data: emoticonList,
            total: emoticonTotal
          },
          emoji: {
            data: emojiList,
            total: emojiTotal
          }
        }
      })
    }
  }
}

module.exports = EmoticonController;
