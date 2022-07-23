/*
 * @Author: EdisonGu
 * @Date: 2022-05-10 11:20:00
 * @LastEditors: EdisonGu
 * @LastEditTime: 2022-07-23 18:24:00
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
  }
}