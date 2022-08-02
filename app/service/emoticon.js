/*
 * @Author: EdisonGu
 * @Date: 2022-08-02 15:38:50
 * @LastEditors: EdisonGu
 * @LastEditTime: 2022-08-02 18:40:50
 * @Descripttion: 
 */
const { Service } = require('egg')
const { CACHE_TIME } = require('../constants')
const { EMOTICON_TOTAL, EMOTICON_LIST, EMOTICON_DETAIL } = require('../constants/redis')

class EmoticonService extends Service {
  /**
   * 获取表情包的total
   */
  async getEmoticonTotal() {
    const { app, ctx: { model: { Emoticon } } } = this
    const rTotal = await app.redis.get('emoticon').get(EMOTICON_TOTAL)
    if (rTotal) {
      return rTotal
    } else {
      const total = await Emoticon.count()
      app.redis.get('emoticon').set(EMOTICON_TOTAL, total, 'EX', CACHE_TIME)
      return total
    }
  }
  /**
   * 获取表情包列表
   * @param {数据查询条件} findQuery 
   * @param {url请求参数} params 
   * @returns 
   */
  async getEmoticonList({findQuery = {}, params = {}}) {
    const { app, ctx: { model: { Emoticon } } } = this
    const { pageSize = 20, pageNo = 1 } = params
    const rList = await app.redis.get('emoticon').get(EMOTICON_LIST({pageNo, pageSize, findQuery}))
    if (rList) {
      return JSON.parse(rList)
    } else {
      const list = await Emoticon.find(findQuery).skip(pageSize * (pageNo - 1)).limit(+pageSize)
      if (list && list.length) {
        app.redis.get('emoticon').set(EMOTICON_LIST({pageSize, pageNo, findQuery}), JSON.stringify(list), 'EX', CACHE_TIME)
      }
      return list
    }
  }
  /**
   * 获取表情包详情
   */
  async getEmoticonDetail({id}) {
    const { app, ctx: { model: { Emoticon } } } = this
    const rDetail = await app.redis.get('emoticon').get(EMOTICON_DETAIL(id))
    if (rDetail) {
      return JSON.parse(rDetail)
    } else {
      const list = await Emoticon.find({id})
      if (list && list.length) {
        app.redis.get('emoticon').set(EMOTICON_DETAIL(id), JSON.stringify(list[0]), 'EX', CACHE_TIME)
      }
      return list[0]
    }
  }
}
module.exports = EmoticonService