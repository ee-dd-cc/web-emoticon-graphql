/*
 * @Author: EdisonGu
 * @Date: 2022-08-09 12:03:18
 * @LastEditors: EdisonGu
 * @LastEditTime: 2022-08-09 12:20:24
 * @Descripttion: 
 */
'use strict';

const Controller = require('egg').Controller;
const { ctxBody, objectBody, adjacentBody, minCount, maxCount } = require('../utils/common')

class MovieController extends Controller {
  /**
   * 获取表情包详情
   */
  async getMovieInfo() {
    let obj = null
    try {
      const {ctx: { service }} = this
      obj = await service.movie.getMovieInfo()
    } catch (error) {
      console.log('getEmojiDetail---error', error)
    } finally {
      this.ctx.body = objectBody({obj})
    }
  }
  
}

module.exports = MovieController;