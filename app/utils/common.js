/*
 * @Author: EdisonGu
 * @Date: 2022-05-10 5:20:00
 * @LastEditors: EdisonGu
 * @LastEditTime: 2022-08-09 19:53:58
 * @Descripttion: 
 */
'use strict';
// const fs = require('fs')

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

/**
 * 去除前后空格和多余的字符
 * @param {*} str 
 */
const dealStr = ({str, strList = []}) => {
  strList.forEach(el => {
    str = str.replace(el, '')
  })
  return str.replace(/(^\s*)|(\s*$)/g, '')
}

const transCode = key => {
  let code = ''
  switch (key) {
    case '导演':
      code = 'director'
      break;
    case '编剧':
      code = 'author'
      break;
    case '主演':
      code = 'actor'
      break;
    case '类型':
      code = 'type'
      break;
    case '制片国家/地区':
      code = 'area'
      break;
    case '语言':
      code = 'language'
      break;
    case '上映日期':
      code = 'publish_time'
      break;
    case '片长':
      code = 'video_time'
      break;
    case '又名':
      code = 'other_name'
      break;
    case 'IMDb':
      code = 'imdb_no'
      break;
    case '首播': // 电视剧
      code = 'first_area'
      break;
    case '集数': // 电视剧
      code = 'tv_total'
      break;
    case '单集片长': // 电视剧
      code = 'single_episode_time'
      break;
  
    default:
      break;
  }
  return code
}

module.exports = {
  ctxBody,
  objectBody,
  adjacentBody,
  randomCount,
  minCount,
  maxCount,
  dealStr,
  transCode
}