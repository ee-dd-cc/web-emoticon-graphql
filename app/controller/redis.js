/*
 * @Author: EdisonGu
 * @Date: 2022-08-02 10:19:42
 * @LastEditors: EdisonGu
 * @LastEditTime: 2022-08-02 10:53:15
 * @Descripttion: redis
 */
const Controller = require('egg').Controller

class RedisController extends Controller {
  async eggDemo() {
    const { ctx, app } = this
    // await app.redis.set('emoji_1000', {id: 1000})
    await app.redis.set('emoji_1000', 2)
    const list = await app.redis.get('emoji_10001')
    ctx.body = {
      code: 1,
      data: list
    }
    console.log('----list', list)
  }
}

module.exports = RedisController