/*
 * @Author: EdisonGu
 * @Date: 2022-08-02 17:08:23
 * @LastEditors: EdisonGu
 * @LastEditTime: 2022-08-02 18:31:27
 * @Descripttion: redis 相关的key
 */

const EMOTICON_TOTAL = 'emoticon_total'

// 表情包列表
const EMOTICON_LIST = ({pageSize = 20, pageNo = 1, findQuery = {}}) => {
  let str = ''
  for (const key in findQuery) {
    str += `_${key}:${findQuery[key]}`
  }
  return `emoticon_list_${pageNo}_${pageSize}${str}`
}

// 表情包详情
const EMOTICON_DETAIL = id => {
  return `emoticon_id:${id}`
}



module.exports = {
  EMOTICON_TOTAL,
  EMOTICON_LIST,
  EMOTICON_DETAIL
}
