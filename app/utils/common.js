/*
 * @Author: EdisonGu
 * @Date: 2022-05-10 5:20:00
 * @LastEditors: EdisonGu
 * @LastEditTime: 2022-07-29 23:38:56
 * @Descripttion: 
 */
'use strict';

module.exports = {
  ctxBody({ list = [], custom = {} }) {
    let body = {
      code: list ? 1 : -1,
      data: list,
      ...custom
    }
    return body
  },
  objectBody({ obj = {} }) {
    let body = {
      code: obj ? 1 : -1,
      data: obj ? obj : null
    }
    return body
  },
  /**
   * 处理相邻的文档
   * @params
   */
  adjacentBody({item, custom = {} }) {
    let body = {
      code: -1,
      data: null
    }
    const { selfNode, upNode = {}, downNode = {} } = item
    if (selfNode) {
      body = {
        code: 1,
        data: {
          selfNode,
          upNode,
          downNode,
          ...custom
        }
      }
    }
    return body
  },
  randomCount(count) {
    return Math.floor(Math.random() * count)
  },
  /**
   * 根据传入的id，取随机的查询列表
   * @params isUp 是否升序
   */
  randomListById({id = 1000, pageSize = 20, randomCount = 21, isUp = true, maxId = 1000, miniId = 1000}) {
    let orList = []
    const week = new Date().getDay() // 判断周几
    const maxCount = randomCount * (week + pageSize) + (id % 11) * randomCount // 能获取的最大值id
    if ((id + maxCount) > maxId && isUp) { // 升序的时候，算出来的id > 数据库最大id 就倒叙
      isUp = false
    }
    if ((id - maxCount) < miniId && !isUp) { // 倒序的时候，算出来的id < 数据库最小id 就升叙
      isUp = true
    }
    for (let index = 0; index < pageSize; index++) {
      orList.push({
        id: isUp ? id + randomCount * (week + index + 1) + (id % 11) * randomCount - 1 : id - randomCount * (week + index + 1) -  (id % 11) * randomCount - 1
      })
    }
    return orList
  }
}