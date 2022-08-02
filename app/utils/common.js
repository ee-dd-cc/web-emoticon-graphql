/*
 * @Author: EdisonGu
 * @Date: 2022-05-10 5:20:00
 * @LastEditors: EdisonGu
 * @LastEditTime: 2022-08-02 14:25:14
 * @Descripttion: 
 */
'use strict';

const ctxBody = ({list = [], custom = {}}) => {
  let body = {
    code: list ? 1 : -1,
    data: list,
    ...custom
  }
  return body
}

const objectBody = ({obj = {}}) => {
  let body = {
    code: obj ? 1 : -1,
    data: obj ? obj : null
  }
  return body
}
/**
 * 处理相邻的文档
 * @params
 */
const adjacentBody = ({item, custom = {}}) => {
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
}

const randomCount = count => {
  return Math.floor(Math.random() * count)
}
/**
   * 根据id和total获取范围
   */
const minCount = ({id, total, pageSize, multiple = 20, spacing = 50}) => {
  let minCount = id + spacing
  const maxCount = id + pageSize * multiple
  if ((maxCount - 1000) > total) { // 数据库id，默认从1000开始
    minCount = id - pageSize * multiple
  }
  return minCount
}
/**
 * 根据id和total获取范围
 */
const maxCount = ({id, total, pageSize, multiple = 20, spacing = 50}) => {
  let maxCount = id + pageSize * multiple
  if ((maxCount - 1000) > total) {
    maxCount = id - spacing
  }
  return maxCount
}

module.exports = {
  ctxBody,
  objectBody,
  adjacentBody,
  randomCount,
  minCount,
  maxCount
}