'use strict';

const Controller = require('egg').Controller
const { ctxBody, adjacentBody } = require('../utils/common')

class EmoticonController extends Controller {
  async getEmoticonList() {
    let list = []
    try {
      const { pageSize = 10, pageNo = 1 } = this.ctx.query
      console.log('getEmoticonList----this.ctx.query', this.ctx.query)
      list = await this.ctx.model.Emoticon.find().skip(pageSize * pageNo).limit(+pageSize)
    } catch (error) {
      console.log('getEmoticonList---error', error)
    } finally {
      this.ctx.body = ctxBody({list})
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
      console.log('----preNode', preNode.length)
      console.log('----nextNode', nextNode.length)
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
}

module.exports = EmoticonController;
