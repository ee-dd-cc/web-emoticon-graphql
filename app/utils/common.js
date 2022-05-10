'use strict';

module.exports = {
  ctxBody({list = [], type = 'array'}) {
    let body = {
      code: -1,
      data: null
    }
    if (list && list.length) {
      body = {
        code: 1,
        data: type === 'array' ? list : list[0]
      }
    }
    return body
  },
  /**
   * 处理相邻的文档
   * @params
   */
  adjacentBody(item) {
    let body = {
      code: -1,
      data: null
    }
    const { selfNode, preNode = {}, nextNode = {} } = item
    if (selfNode) {
      body = {
        code: 1,
        data: {
          selfNode,
          preNode,
          nextNode
        }
      }
    }
    return body
  }
}